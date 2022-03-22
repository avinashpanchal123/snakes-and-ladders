import {
  small_ladder,
  big_ladder,
  medium_ladder,
  medium_ladder01,
  small_ladder01,
} from "./ladderFunctions.js";


import { leftSide_snake,
   medium_snake,
    long_snake, 
    soLong_snake,
     medium2_snake}

from "./snakeFunctions.js"

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

let bgm = document.getElementById("bgm")
play_btn.onclick = ()=>{
  playSound("sounds/bgm.mp3")
  
}

function playSound(url) {
  bgm.play()
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
  //  let d1 = Math.floor(Math.random() * 6) + 1;
  let d1 = 1;
  toss.style.visibility = "hidden"
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
    toss.style.visibility = "visible"
    dice_img_div.style.visibility = "visible";
  }, 1000);
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

  if (pY_arr[turn] == 0 && pX_arr[turn] == 10.5) {

    [pX_arr[turn], pY_arr[turn]]  = small_ladder(pX_arr[turn],pY_arr[turn]);
    console.log(pX_arr[turn], pY_arr[turn]);
     translateHandling(pX_arr[turn], pY_arr[turn], p)
     flags_arr[turn] = false;
    
   }
   else
   if (pY_arr[turn] == -7 && pX_arr[turn] == 24.5) {

    [pX_arr[turn], pY_arr[turn]] = big_ladder(pX_arr[turn], pY_arr[turn]);
    alert( [pX_arr[turn], pY_arr[turn]] );
    translateHandling(pX_arr[turn], pY_arr[turn], p)
    flags_arr[turn] = true;
  } 

   else 
  if (pX_arr[turn] == 21 && pY_arr[turn] == -21) {
    [pX_arr[turn], pY_arr[turn]] = medium_ladder(pX_arr[turn], pY_arr[turn])
    translateHandling(pX_arr[turn], pY_arr[turn], p)
    flags_arr[turn] = false;
  } 
  else 
  if (pX_arr[turn] == 0 && pY_arr[turn] == -28) {
    [pX_arr[turn], pY_arr[turn]] = leftSide_snake(pX_arr[turn], pY_arr[turn])
    translateHandling(pX_arr[turn], pY_arr[turn], p)
    flags_arr[turn] = false;
  }


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

    if (pX_arr[turn] == 7 &&  pY_arr[turn] == -10.5) {
    [pX_arr[turn],  pY_arr[turn]] =  medium_ladder01(pX_arr[turn],  pY_arr[turn]);
    translateHandling(pX_arr[turn], pY_arr[turn], p)
    flags_arr[turn] = true;
  }
  else

   if (pX_arr[turn] == 31.5 && pY_arr[turn] == -10.5) {
    [pX_arr[turn], pY_arr[turn]]  = small_ladder01(pX_arr[turn], pY_arr[turn]);
    translateHandling(pX_arr[turn], pY_arr[turn], p)
   flags_arr[turn] = false;
  }

    else

  if (pX_arr[turn] == 10.5 && pY_arr[turn] == -10.5) {
   [pX_arr[turn], pY_arr[turn]] = medium_snake(pX_arr[turn], pY_arr[turn]);
    translateHandling(pX_arr[turn], pY_arr[turn], p)
    flags_arr[turn] = true;
  }


  else

  if (pX_arr[turn] == 31.5 && pY_arr[turn] == -24.5) {
    [pX_arr[turn], pY_arr[turn]] = long_snake(pX_arr[turn], pY_arr[turn])
    translateHandling(pX_arr[turn], pY_arr[turn], p)
  flags_arr[turn] = true;
  }

   else

  if (pX_arr[turn] == 7 && pY_arr[turn] == -31.5) {
    [pX_arr[turn], pY_arr[turn]] = soLong_snake(pX_arr[turn], pY_arr[turn])
    translateHandling(pX_arr[turn], pY_arr[turn], p)
    flags_arr[turn] = false;
  }

 else

   if (pX_arr[turn] == 17.5 && pY_arr[turn] == -24.5) {
    [pX_arr[turn], pY_arr[turn]] = medium2_snake(pX_arr[turn], pY_arr[turn]);
    translateHandling(pX_arr[turn], pY_arr[turn], p)
    flags_arr[turn] = false;
  }

}




function translateHandling(pX, pY, player) {
  player.style.transform = `translate(${pX}rem,${pY}rem)`;
}



function go_to_Home(moves_left, p, turn) {
 
  let move = moves_left * 3.5;
  
  alert(pX_arr[turn]);

  if (pX_arr[turn] - move == 0) {
    pX_arr[turn] = pX_arr[turn] - move;
    translateHandling(pX_arr[turn],pY_arr[turn], p)
    alert(`p${turn+1} wins the game`);
  } else if (pX_arr[turn] - move > 0) {
    pX_arr[turn] = pX_arr[turn] - move;
    translateHandling(pX_arr[turn],pY_arr[turn], p) 
   }
}

