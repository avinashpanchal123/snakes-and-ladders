
function small_ladder(positionX, positionY) {
    positionY = positionY - 3.5;
    positionX = positionX + 10.5;
   return [positionX, positionY]
  }

  function big_ladder(positionX, positionY) {
    positionX = positionX - 14;
    positionY = positionY - 21;
    return [positionX, positionY]
  }


  function medium_ladder(positionX, positionY) {
    positionX = positionX + 7;
    positionY = positionY - 10.5;
   return [positionX, positionY]
  }

  function medium_ladder01(positionX, positionY) {
    positionX = positionX - 7;
    positionY = positionY - 10.5;
    return [positionX, positionY]
  }

  function small_ladder01(positionX, positionY) {
    positionX = positionX - 3.5;
    positionY = positionY - 7;
   return [positionX, positionY]
  }

  export {small_ladder, big_ladder,medium_ladder,medium_ladder01, small_ladder01}