// here appending all the cells on the board

let board_container = document.getElementById("board_container");

let odd_row = 100;
let even_row = 81;

function makeBoard(){
  for (let r = 1; r < 11; r++) {
    let row = document.createElement("div");
    row.classList.add("rows");
    // row.setAttribute("id", r);
    board_container.appendChild(row);
  
    for (let c = 1; c < 11; c++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      if (r % 2 == 0) {
        cell.setAttribute("id", even_row);
        cell.innerText = even_row++;
        if (c % 2 == 0) {
          cell.style.background = "#A683E3";
        }
      } else {
        cell.setAttribute("id", odd_row);
        cell.innerText = odd_row--;
        if (c % 2 != 0) {
          cell.style.background = "#E4E9FD";
          cell.style.color = "black"
        }
      }
      row.appendChild(cell);
    }
    if (r % 2 == 0) {
      odd_row = odd_row - 10;
    } else if (r > 1) {
      even_row = even_row - 30;
    }
  }
}

makeBoard()








// here is logic for the choosing number of players

let n = 4;  // default value of number of players

let options = document.querySelectorAll(".options");

options.forEach((el)=>{
  el.onclick = ()=>{
    n = +el.id;
    el.style.background = "#07423f"
  }
})


// here is function for bgm  modal visiblility handling

let play_btn  = document.getElementById("play_btn");

let modal = document.getElementById("modal")

play_btn.onclick = ()=>{
  playSound("sounds/bgm.mp3")
}

function playSound(url) {
  const audio = new Audio(url);
  console.log(n);
  modal.style.display = "none"
  // audio.play();
  createPlayers(n)
}


// creating players and postions arrays 


let players = [];

let players_container = document.getElementById("players_container");

let pX_arr = [];
let pY_arr = [];
let flags_arr = []

let turn = 0;
let player;


function createPlayers(n){
  for (let i = 0; i < n; i++) {
  let p =  document.createElement("div")

  p.setAttribute("id", `p${(i+1).toString()}`);

  pX_arr.push(0);

  pY_arr.push(0);

  flags_arr.push(true)

  p.innerText = `p${i+1}`

  players_container.appendChild(p);
  players.push(p)
  
 }
 console.log(players);
}
