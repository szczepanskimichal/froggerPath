function togglePathHint() {
  showPath = !showPath;
  updateView();
}

function createBlankBoard(value=0) {
  return Array(rowCount * colCount).fill(value);
}
