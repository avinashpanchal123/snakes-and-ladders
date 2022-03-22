

  function leftSide_snake(positionX, positionY) {
    positionX = positionX + 7;
    positionY = positionY + 10.5;
   return [positionX, positionY]
  }
  
  
function medium_snake(positionX, positionY) {
  positionX = positionX - 3.5;
  positionY = positionY + 10.5;
  return [positionX, positionY]
}

function long_snake(positionX, positionY) {
  positionX = positionX - 14;
  positionY = positionY + 17.5;
  return [positionX, positionY]
}


function soLong_snake(positionX, positionY) {
  positionX = positionX - 7;
  positionY = positionY + 28;
 return [positionX, positionY]
}


function medium2_snake(positionX, positionY) {
  positionX = positionX + 7;
  positionY = positionY + 14;
  return [positionX, positionY]
}


  export { leftSide_snake, medium_snake, long_snake, soLong_snake, medium2_snake}