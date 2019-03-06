var elencoTH = $("th")
var i, turn = 1

for (i = 0; i < elencoTH.length; i++) {
  elencoTH[i].addEventListener("click", draw)
}

function draw(event) {
  var sign
  if (!event.target.innerHTML) {
    if (turn == 1) sign = "X";
    else sign = "O"
    event.target.innerHTML = sign
    turn = -turn
    check()
  }
}

function check() {
  var pos = []
  for (i = 0; i < elencoTH.length; i++) {
    pos.push(elencoTH[i].innerHTML)
  }
  var test
  for (var j = 0; j < 8; j++) {
    switch (j) {
      case 0:
        test = pos[0] + pos[1] + pos[2];
        break
      case 1:
        test = pos[3] + pos[4] + pos[5];
        break
      case 2:
        test = pos[6] + pos[7] + pos[8];
        break
      case 3:
        test = pos[0] + pos[3] + pos[6];
        break
      case 4:
        test = pos[0] + pos[4] + pos[8];
        break
      case 5:
        test = pos[1] + pos[4] + pos[7];
        break
      case 6:
        test = pos[2] + pos[5] + pos[8];
        break
      case 7:
        test = pos[2] + pos[4] + pos[6];
        break

    }
    if (test == "XXX") alert("Le X vincono!")
    if (test == "OOO") alert("Le O vincono!")
  }
}

function reset() {
  $("th").empty();
}