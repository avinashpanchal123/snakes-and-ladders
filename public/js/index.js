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


}




// here is code for handling dice

let dice_img_div = document.querySelector(".dice_img_div");

let result = document.querySelector("#result");

let toss = document.getElementById("toss");



toss.onclick = () => {

  Decision();
  
};

function Decision() {
   let d1 = Math.floor(Math.random() * 6) + 1;
  
  player = players[turn];
  
  let timer = setTimeout(() => {
    result.src = "./images/dice/dice" + d1 + ".png";
    if (flags_arr[turn] == true) {
      oddRowHandler(d1, player, turn);
      if( d1 == 6){
        turn = turn % players.length;
      }
      else{
        turn++;
        turn = turn % players.length;
      }
    } 
    else {
      evenRowHandler(d1, player, turn);
      if( d1 == 6){
        turn = turn % players.length;
      }
      else{
        turn++;
      turn = turn % players.length;
      }
    }
    
    dice_img_div.style.visibility = "visible";
  }, 500);
}



// handeling transform property for edd row

function oddRowHandler(moves_right, p, turn) {
  for (let i = 0; i < moves_right; i++) {
    pX_arr[turn] = pX_arr[turn] + 3.5;

    if (
      pX_arr[turn] < 35 &&
      pX_arr[turn] >= 0 &&
      pY_arr[turn] <= 0 &&
      pY_arr[turn] > -35
    ) {
      translateHandling(pX_arr[turn], pY_arr[turn], p);
    } else {
      pX_arr[turn] = 31.5;
      pY_arr[turn] = pY_arr[turn] - 3.5;

      translateHandling(pX_arr[turn], pY_arr[turn], p);
      flags_arr[turn] = !flags_arr[turn];
      evenRowHandler( (moves_right - i - 1), p, turn);
      break;
    }
  }
  console.log([pX_arr[turn], pY_arr[turn]]);

}


// handeling transform property for even row


function evenRowHandler(moves_left, p, turn) {
  if (pX_arr[turn] <= 21 && pY_arr[turn] == -31.5) {
    go_to_Home(moves_left, p, turn);
  }
   else {
    for (let i = 0; i < moves_left; i++) {
      if (
        pX_arr[turn] < 35 &&
        pX_arr[turn] > 0 &&
        pY_arr[turn] <= 0 &&
        pY_arr[turn] > -35
      ) {
        pX_arr[turn] = pX_arr[turn] - 3.5;
        translateHandling(pX_arr[turn], pY_arr[turn], p)
      } else {
        flags_arr[turn] = true;
        pY_arr[turn] = pY_arr[turn] - 3.5;
        translateHandling(pX_arr[turn], pY_arr[turn], p)
        pX_arr[turn] = 0;
        oddRowHandler(moves_left - i - 1, p, turn);
        break;
      }
    }
  }

  console.log([pX_arr[turn], pY_arr[turn]]);

}




function translateHandling(pX, pY, player) {
  player.style.transform = `translate(${pX}rem,${pY}rem)`;
}
