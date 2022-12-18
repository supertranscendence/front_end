import React, { Component,useRef } from 'react';
import PongGameCom from "src/components/PongGame"
const PongGame = ()=>{
  return (<PongGameCom userAScore={0} userBScore={0}></PongGameCom>);
}
export default PongGame;