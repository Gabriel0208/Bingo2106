let playerCards = [];
let drawnNumbers = [];

function createCard() {
  const playerName = document.getElementById("player-name").value;

  if (playerName !== "") {
    const newCard = generateCard(playerName);
    playerCards.push(newCard);
    renderCards();
  }
}

function generateCard(playerName) {
  const card = [];

  while (card.length < 15) {
    const randomNumber = Math.floor(Math.random() * 90) + 1;

    if (!card.includes(randomNumber)) {
      card.push(randomNumber);
    }
  }

  return {
    playerName: playerName,
    numbers: card,
    isWinner: false
  };
}

function renderCards() {
  const playerCardsContainer = document.getElementById("player-cards");
  playerCardsContainer.innerHTML = "";

  playerCards.forEach(card => {
    const table = document.createElement("table");
    table.className = "card";
    table.innerHTML = `
      <caption>${card.playerName}</caption>
      <tr>
        <th>B</th>
        <th>I</th>
        <th>N</th>
        <th>G</th>
        <th>O</th>
      </tr>
    `;

    for (let row = 0; row < 3; row++) {
      const tableRow = document.createElement("tr");

      for (let col = 0; col < 5; col++) {
        const tableCell = document.createElement("td");
        const number = card.numbers[row * 5 + col];
        tableCell.textContent = number;
        tableCell.className = "number";
        tableRow.appendChild(tableCell);
      }

      table.appendChild(tableRow);
    }

    playerCardsContainer.appendChild(table);
  });
}

function startGame() {
  const drawNumberButton = document.getElementById("draw-number-button");
  const endGameButton = document.getElementById("end-game-button");
  const numbersTable = document.getElementById("numbers-table");

  drawNumberButton.disabled = false;
  endGameButton.disabled = false;


  const numbersTableBody = numbersTable.querySelector("tbody");
  numbersTableBody.innerHTML = "";

  let numberRow;
  for (let i = 1; i <= 90; i++) {
    if (i % 10 === 1) {
      numberRow = document.createElement("tr");
      numbersTableBody.appendChild(numberRow);
    }

    const tableCell = document.createElement("td");
    tableCell.textContent = i;
    numberRow.appendChild(tableCell);
  }
}

function drawNumber() {
  const drawNumberButton = document.getElementById("draw-number-button");
  const endGameButton = document.getElementById("end-game-button");

  let drawnNumber;

  do {
    drawnNumber = Math.floor(Math.random() * 90) + 1;
  } while (drawnNumbers.includes(drawnNumber));

  drawnNumbers.push(drawnNumber);
  markDrawnNumber(drawnNumber);

  if (isGameWon()) {
    endGame();
  }
}

function markDrawnNumber(number) {
  const allCards = document.querySelectorAll(".card");

  allCards.forEach(card => {
    const numbers = card.querySelectorAll(".number");

    numbers.forEach(cell => {
      if (Number(cell.textContent) === number) {
        cell.classList.add("drawn");
      }
    });
  });

  const numbersTable = document.getElementById("numbers-table");
  const numberCells = numbersTable.getElementsByTagName("td");

  for (let i = 0; i < numberCells.length; i++) {
    if (Number(numberCells[i].textContent) === number) {
      numberCells[i].classList.add("drawn");
      break;
    }
  }
}

function isGameWon() {
  return playerCards.some(card => {
    return card.numbers.every(number => drawnNumbers.includes(number));
  });
}

function endGame() {
  const drawNumberButton = document.getElementById("draw-number-button");
  const endGameButton = document.getElementById("end-game-button");

  drawNumberButton.disabled = true;
  endGameButton.disabled = true;

  const winners = playerCards.filter(card => {
    return card.numbers.every(number => drawnNumbers.includes(number));
  });

  if (winners.length > 0) {
    let winnerNames = "";

    winners.forEach((winner, index) => {
      if (index > 0) {
        winnerNames += " e ";
      }
      winnerNames += winner.playerName;
    });

    alert(`Parabéns, temos um vencedor: ${winnerNames}!`);
  } else {
    alert("O jogo terminou, nenhum vencedor encontrado.");
  }
}
