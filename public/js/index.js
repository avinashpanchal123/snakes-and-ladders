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
