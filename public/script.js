var x = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
var turn = 1

$(document).ready(() => {
  $("th").click(click)
})

function isValidStep(position, turn, posX, posY) {
  if (position[posY][posX] == 0) return true
  else return false
}

function setValues(position) {
  for (let i in position) {
    for (let j in position[i]) {
      if (!isValidStep(position, "", i, j))
        $("#" + i + "" + j).text(position[i][j])
    }
  }
}

function resetGame() {
  $("th").text("")
  x = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
}

function click() {
  var pX = this.id[1]
  var pY = this.id[0]

  if (isValidStep(x, "", pX, pY)) {
    if (turn) {
      this.innerHTML = "X"
      x[pY][pX] = "X"
      turn = 0
    } else {
      this.innerHTML = "O"
      x[pY][pX] = "O"
      turn = 1
    }
    showWinner(x)
  }
}

function showWinner(position) {
  var winner = getWinner(position)
  if (winner) {
    setTimeout(() => {
      alert("Ha vinto " + winner)
    }, 1)
    x = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  }
}

function getWinner(pos) {
  var test
  for (let j = 0; j < 8; j++) {
    switch (j) {
      case 0:
        test = pos[0][0] + pos[0][1] + pos[0][2];
        break
      case 1:
        test = pos[0][0] + pos[1][0] + pos[2][0];
        break
      case 2:
        test = pos[0][0] + pos[1][1] + pos[2][2];
        break
      case 3:
        test = pos[1][0] + pos[1][1] + pos[1][2];
        break
      case 4:
        test = pos[2][0] + pos[2][1] + pos[2][2];
        break
      case 5:
        test = pos[0][1] + pos[1][1] + pos[2][1];
        break
      case 6:
        test = pos[0][2] + pos[1][2] + pos[2][2];
        break
      case 7:
        test = pos[0][2] + pos[1][1] + pos[2][0];
        break
    }

    if (test == "XXX") return "X"
    else if (test == "OOO") return "O"
  }
  return null
}