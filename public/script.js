var config = {
  apiKey: "AIzaSyC2vgNo1YGPGnCAU4ZjLUgVNNL7qSwm08E",
  authDomain: "tris-b2c.firebaseapp.com",
  databaseURL: "https://tris-b2c.firebaseio.com",
  projectId: "tris-b2c",
  storageBucket: "tris-b2c.appspot.com",
  messagingSenderId: "1051560844282"
}
firebase.initializeApp(config);

var db = firebase.firestore()

var elencoTH
var i, turn = 1
var moves = [0, 0, 0, 0, 0, 0, 0, 0, 0]
var hash = ''

$(document).ready(() => {
  elencoTH = $("th")
  elencoTH.each((i, el) => {
    el.addEventListener("click", draw)
  })
  if (window.location.hash) {
    hash = window.location.hash
    hash = hash.replace("#", "")
  }
  if (hash) startSession()
})

function draw(event) {
  var sign
  if (!event.target.innerHTML) {
    if (turn == 1) sign = "X";
    else sign = "O"
    event.target.innerHTML = sign
    turn = -turn
    moves[event.target.id] = sign
    setMoves()
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

$("input").keypress((event) => {
  if (event.which == 13 && $("input").val()) {
    hash = $("input").val()
    window.location.hash = `#${hash}`
    startSession()
  }
})

$("#session-btn").on("click", () => {
  hash = $("input").val()
  window.location.hash = `#${hash}`
  startSession()
})

function startSession() {
  db.collection("tris").doc(hash).get().then((result) => {
    if (result.exists) {
      getMoves()
    } else
      db.collection("tris").doc(hash).set({
        "moves": moves,
        "turn": 1
      })
  })
  $("th").empty()
}

function drawDB() {
  moves.forEach((el, i) => {
    elencoTH[i].innerHTML = el ? el : ''
  })
  check()
}

function getMoves() {
  db.collection("tris").doc(hash).onSnapshot(
    result => {
      moves = result.data().moves
      turn = result.data().turn
      drawDB()
    }
  )
}

function setMoves() {
  db.collection("tris").doc(hash).set({
    "moves": moves,
    "turn": turn
  })
}

function reset() {
  $("th").empty()
  moves = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  if (hash) setMoves()
}