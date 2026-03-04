function updateView() {
  const boardEl = document.getElementById("board");
  boardEl.style.gridTemplateColumns = `repeat(${colCount}, 40px)`;

  let html = "";
  for (let index = 0; index < map.length; index++) {
    const v = map[index];
    const isFrog = index === frogIndex;
    const isPath = showPath && path.includes(index);

    html += `
      <div class="cell ${getCellClass(v)} ${isFrog ? "frog" : ""} ${isPath ? "pathHint" : ""}">
         ${getCellIcon(v, isFrog)}
      </div>
    `;
  }
  boardEl.innerHTML = html;

  document.getElementById("meta").innerHTML = `
        <div><b>Frog index:</b> <code>${frogIndex}</code></div>
        <div><b>Path step:</b> <code>${pathStep}</code> / <code>${Math.max(0, path.length - 1)}</code></div>
        <div><b>Path length:</b> <code>${path.length}</code></div>
      `;
}

function getCellClass(v) {
  if (v === 1) return "water";
  if (v === 2) return "rock";
  if (v === 3) return "goal";
  return "safe";
}

function getCellIcon(v, isFrog) {
  if (isFrog) return "🐸";
  if (v === 1) return "🌊";
  if (v === 2) return "🪨";
  if (v === 3) return "🏁";
  return "";
}
