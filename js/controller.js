document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.querySelector('.controls button:nth-child(1)');
  const nextBtn = document.querySelector('.controls button:nth-child(2)');
  const newBoardBtn = document.querySelector('.controls button:nth-child(3)');

  	prevBtn.onclick = prevStep;
	nextBtn.onclick = nextStep;
  newBoardBtn.onclick = resetGame;
  

  console.log("Start:", path[0], "Goal:", path[path.length - 1], "Len:", path.length);
console.log("Goal cell value:", map[path[path.length - 1]]);
  resetGame();
});

function resetGame() {
  let newPath = null;

  for (let i = 0; i < 10; i++) {
    newPath = generatePath(25); // np. stałe 25, możesz zmienić
    if (newPath) break;
  }

  if (!newPath) {
    alert("Brak ścieżki!");
    return;
  }

  path = newPath;
  map = randomizeBoard(path);
  pathStep = 0;
  frogIndex = path[pathStep];

  updateView();
}


function nextStep() {
  if (pathStep >= path.length - 1) return;
  pathStep++;
  frogIndex = path[pathStep];
  updateView();
}

function prevStep() {
  if (pathStep <= 0) return;
  pathStep--;
  frogIndex = path[pathStep];
  updateView();
}

function generatePath(maxSteps) {
  const startRow = rowCount - 1;
  const startCol = Math.floor(Math.random() * colCount);

  let currentRow = startRow;
  let currentCol = startCol;

  const path = [currentRow * colCount + currentCol];

  const moveOptions = [
    { rowDelta: -1, colDelta: 0 },
    { rowDelta: -1, colDelta: 0 },
    { rowDelta: -1, colDelta: 0 },
    { rowDelta: -1, colDelta: 0 },
    { rowDelta: -1, colDelta: 0 },
    { rowDelta: -1, colDelta: -1 },
    { rowDelta: -1, colDelta: -1 },
    { rowDelta: -1, colDelta: 1 },
    { rowDelta: -1, colDelta: 1 },
    { rowDelta: 0, colDelta: -1 },
    { rowDelta: 0, colDelta: 1 },
  ];

  // ⬇️ TUTAJ: podmieniona pętla generowania kroków
  for (let step = 1; step < maxSteps; step++) {
    let moved = false;

    for (let tries = 0; tries < 10; tries++) {
      const move = moveOptions[Math.floor(Math.random() * moveOptions.length)];
      const newRow = currentRow + move.rowDelta;
      const newCol = currentCol + move.colDelta;

      // jeśli ruch wychodzi poza planszę, próbujemy inny
      if (newRow < 0 || newRow >= rowCount || newCol < 0 || newCol >= colCount) continue;

      const newIndex = newRow * colCount + newCol;

      // jeśli pole już odwiedzone, próbujemy inny
      if (path.includes(newIndex)) continue;

      // akceptujemy ruch
      path.push(newIndex);
      currentRow = newRow;
      currentCol = newCol;
      moved = true;
      break;
    }

    // nie znaleźliśmy żadnego poprawnego ruchu w tym kroku
    if (!moved) return null;

    // sukces: doszliśmy do górnego rzędu
    if (currentRow === 0) return path;
  }

  // nie udało się dojść do góry w maxSteps
  return null;
}

function randomizeBoard(path) {
	// 1. Tworzymy pustą planszę
	let board = createBlankBoard(0);

	// 2. Oznaczamy pole celu na końcu ścieżki
	const goalIndex = path[path.length - 1];
	board[goalIndex] = 3;

	// 3. Iterujemy po wszystkich polach
	for (let i = 0; i < board.length; i++) {
		// 4. Jeśli pole należy do ścieżki, zostaje bezpieczne (0)
		if (path.includes(i)) continue;
		// 5. Pole celu już ustawione
		if (i === goalIndex) continue;

		// 6. Losujemy typ pola: woda (1) lub kamień (2)
		let r = Math.random();
		board[i] = r < 0.6 ? 1 : 2; // 60% woda, 40% kamień
	}

	// 7. Zwracamy wygenerowaną planszę
	return board;
}