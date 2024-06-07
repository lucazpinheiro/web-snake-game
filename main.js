48
const GRID_SIZE = 48;
const CELLS = []

class Player {
  constructor() {
    this.points = 0
    this.direction = 'right',
    this.x = 23,
    this.y = 23
  }

  getPosition() {
    switch (this.direction) {
      case "left":
          if ((this.y - 1) === -1) {
            this.y = 47
          }
          this.y-- 
          break;
      case "right":
        if ((this.y + 1) === 48) {
          this.y = 0
        }
          this.y++
          break;
      case "up":
        if ((this.x - 1) === -1) {
          this.x = 47
        }
          this.x--
          break;
      case "down":
        if ((this.x + 1) === 48) {
          this.x = 0
        }
          this.x++
    }

    return `${this.x}:${this.y}`
  }

  score() {
    this.points++
  }
}

function mountGrid() {
  const grid = document.getElementById("grid")
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const div = document.createElement("div");
      div.className = "dead-cell"
      const id = `${i}:${j}`
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

function main() {
  let stopLoop = false

  const player = new Player()

  
  mountGrid()
  let foodPosition = selectRandomCell(player.getPosition())
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
      
      const liveCells = []

      const playerPosition = player.getPosition()

      if (playerPosition === foodPosition) {
        foodPosition = selectRandomCell(player.getPosition())
        player.score()
      }
          
      liveCells.push(playerPosition, foodPosition)
      updateGrid(liveCells)
      console.log(player)
  }
  
  setInterval(gameLoop, 80)
}

main()