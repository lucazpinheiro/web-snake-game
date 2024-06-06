
const RANDOM_CELLS_COUNT = 400;
const GRID_SIZE = 48;
const CELLS = []

function mountGrid() {
  const grid = document.getElementById("grid")
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const div = document.createElement("div");
      div.className = "dead-cell"
      const id = `cell:${i}:${j}`
      div.id = id
      CELLS.push(id)
      grid.appendChild(div)
    }
  }
}

function selectRandomCell(playerCell) {
  const shuffled = CELLS.slice().sort(() => 0.5 - Math.random()); // Shuffle the array
  if (shuffled[0] !== playerCell) {
    return shuffled[0]
  } else {
    return shuffled[1]
  }
}


function setInputListener(player) {
  document.body.addEventListener('keydown', (e) => {
    const key = e.key;
    switch (key) {
        case "ArrowLeft":
            player.direction = 'left'
            break;
        case "ArrowRight":
            player.direction = 'right'
            break;
        case "ArrowUp":
            player.direction = 'up'
            break;
        case "ArrowDown":
            player.direction = 'down'
    }
    
  });
}

function updatePosition(player) {
  switch (player.direction) {
    case "left":
        if ((player.y - 1) === -1) {
          player.y = 47
        }
        player.y-- 
        break;
    case "right":
      if ((player.y + 1) === 48) {
        player.y = 0
      }
        player.y++
        break;
    case "up":
      if ((player.x - 1) === -1) {
        player.x = 47
      }
        player.x--
        break;
    case "down":
      if ((player.x + 1) === 48) {
        player.x = 0
      }
        player.x++
  }
}

function main() {
  let stopLoop = false
  const player = {
    direction: 'right',
    x: 23,
    y: 23,
  }

  
  mountGrid()
  let food = selectRandomCell(`cell:${player.x}:${player.y}`)
  setInputListener(player)

  const updateGrid = (newState) => {
    for (let i = 0;i < CELLS.length; i++) {
      const cell = document.getElementById(CELLS[i])
      if (newState.includes(CELLS[i])) {
        cell.className = "live-cell"
      } else {
        cell.className = "dead-cell"
      }
    }
  }



  const gameLoop = () => {
      if (stopLoop) {
        return
      }

      updatePosition(player, food)
      updateGrid([`cell:${player.x}:${player.y}`, food])
  }
  
  setInterval(gameLoop, 80)
}

main()