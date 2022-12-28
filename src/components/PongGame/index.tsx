import React, { useRef, useState, useCallback, useEffect } from 'react';
// import './App.css';
import useSocket from "src/hooks/useSocket"
import { useParams } from 'react-router';



interface CanvasProps {
  width: number;
  height: number;
  userAScore: number;
  userBScore: number;
  gameMode: boolean;
  isA?:boolean;
}

interface Coordinate {
  x: number;
  y: number;
};

const PongGame = ({ width, height,userAScore, userBScore, gameMode,isA  }: CanvasProps) =>{
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas  = canvasRef.current;
  const [socket] = useSocket("sleact");
  const { GameRoom } = useParams<{ GameRoom: string }>();
  const GameRoomName = GameRoom.split("=")[0];
  const isOBS = GameRoom.split("=")[1];
  // const [stopFlag, setStopflag] = useState(false);
  let stopFlag = false;
const ball = {
    x : canvas?canvas.width/2 : 300,
    y : canvas?canvas.height/2 : 250,
    radius : gameMode?30:10,
    velocityX : 5,
    velocityY : 5,
    speed : 5,
    color : "WHITE"
}

// User Paddle
const userA = {
    x : 0, // left side of canvas
    y : (canvas?canvas.height:0 - 100) + 350, // -100 the height of paddle
    width : 10,
    height : 100,
    score : userAScore?userAScore:0,
    color : "WHITE"
}

// const userB = {
//     x : 790, // left side of canvas
//     y : (canvas?canvas.height:0 - 100) + 350, // -100 the height of paddle
//     width : 10,
//     height : 100,
//     score : 0,
//     color : "WHITE"
// }

// userB Paddle
const userB = {
    x : canvas? canvas.width - 10  : 790, // - width of paddle
    y : (canvas?canvas.height:0 - 100) + 350, // -100 the height of paddle
    width : 10,
    height : 100,
    score : userBScore? userBScore: 0,
    color : "WHITE"
}

// NET
const net = {
    x : (800 - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "WHITE"
}

const getKeyEvent = (evt:any) =>{
	// evt.preventDefaultevt();
    // console.log("1",evt);
    // console.log("1",evt.key);
	if (!canvasRef.current) {
	    // console.log("2",evt.key);
		return;
	  }
	const canvas: HTMLCanvasElement = canvasRef.current;
    let rect = canvas.getBoundingClientRect();
    // console.log("3",evt.key);
    if (evt.key === "s")
    {
      console.log("s",GameRoomName,isA,isA?userA.y+50:userB.y+50,gameMode );
        socket?.emit("down",{name: GameRoomName, isA:isA, yPos:(isA?userA.y+50:userB.y+50)});
    }
    else if (evt.key === "w")
    {
      console.log("s",GameRoomName,isA,isA?userA.y-50:userB.y-50 ,gameMode);
      socket?.emit("up", {name: GameRoomName, isA:isA, yPos:(isA?userA.y-50:userB.y-50)});
    }
    else if (evt.key === "p")
    {
      console.log("p");
      socket?.emit("GameSwitch", {name: GameRoomName, isA:isA});
    }
    // console.log( userA.y, evt.clientY, rect.top, userA.height/2)
    // userA.y = evt.clientY - rect.top - userA.height/2;
}
window.addEventListener("keydown", getKeyEvent);

// }
// draw a rectangle, will be used to draw paddles
const drawRect = (x:any, y:any, w:any, h:any, color:any)=>{
	if (!canvasRef.current) {
		return;
	  }
	  const canvas: HTMLCanvasElement = canvasRef.current;
	  const ctx = canvas.getContext('2d');
	if (ctx){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
	}
}

// draw circle, will be used to draw the ball
const drawArc = (x:any, y:any, r:any, color:any)=>{
	if (!canvasRef.current) {
		return;
	  }
	  const canvas: HTMLCanvasElement = canvasRef.current;
	  const ctx = canvas.getContext('2d');
	if (ctx){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
	}
}


// const ball = {
//   x : n,
//   y : ,
//   radius : ,
//   velocityX : ,
//   velocityY : ,
//   speed : ,
//   color : ,
// }

// let isUpdate =false;
useEffect(() => {
  //   if (!canvasRef.current) {
  //     return;
  //   }
  //   const canvas: HTMLCanvasElement = canvasRef.current;
  
  socket?.on("collision", (obj:{
      x : number,
      y : number,
      radius : number,
      velocityX : number,
      velocityY : number,
      speed : number,
      color : string}) => {
      console.log("collsion obj", obj,gameMode);
      ball.x = obj.x;
      ball.y = obj.y;
      ball.radius = obj.radius;
      ball.velocityX = obj.velocityX;
      ball.velocityY = obj.velocityY;
      ball.speed = obj.speed;
      ball.color = obj.color;
    })

  socket?.on("down", (obj:{isA : boolean ,yPos:number}) => {
    console.log("on!",gameMode)
      if (obj.isA)
      {
         userA.y = obj.yPos;
      }
      else
      {
        userB.y = obj.yPos;
      }
      // update();
      // isUpdate = true;
    })
  
    socket?.on("up", (obj:{isA : boolean,yPos:number}) => {
      if (obj.isA)
      {
         userA.y = obj.yPos;
      }
      else
      {
        userB.y = obj.yPos;
      }
      // update();
      // isUpdate = true;
      })
      
      socket?.on("GameSwitch", () => {
        stopFlag = !stopFlag
      });
    
  }, [getKeyEvent, canvasRef]);

// when userB or USER scores, we reset the ball
const resetBall = () =>{
	if (!canvasRef.current) {
		return;
	  }
	  const canvas: HTMLCanvasElement = canvasRef.current;

    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;//????!?!???!?
    ball.speed = 7;
}

const resetUser = () =>{
	if (!canvasRef.current) {
		return;
	  }
	  const canvas: HTMLCanvasElement = canvasRef.current;
    userA.y = 250;
    userB.y = 250;
}

// draw the net
const drawNet = ()=>{
	if (!canvasRef.current) {
		return;
	  }
	  const canvas: HTMLCanvasElement = canvasRef.current;
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// draw text
const drawText=(text:any,x:any,y:any)=>
{
	if (!canvasRef.current) {
		return;
	  }
	  const canvas: HTMLCanvasElement = canvasRef.current;
	  const ctx = canvas.getContext('2d');
	if (ctx){
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
	}
}

// collision detection
const collision = (b:any,p:any)=>{

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    // socket?.()///rlwn
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// update const, the const that does all calculations
const update =()=>{
    
    if (!canvasRef.current) {
		return;
	  }
	  const canvas: HTMLCanvasElement = canvasRef.current;
    // change the score of players, if the ball goes to the left "ball.x<0" userBputer win, else if "ball.x > canvas.width" the user win
    if( ball.x - ball.radius <  -10){
      resetBall();
      userB.score++;
        // resetUser();
        socket?.emit("gameSet", {userA: userA.score, userB:userB.score ,name:GameRoomName!, mode:gameMode});
    }else if( ball.x + ball.radius > canvas.width +10){
      resetBall();
      userA.score++;
        // resetUser();
        socket?.emit("gameSet", {userA: userA.score, userB:userB.score,name:GameRoomName!, mode:gameMode});
    }

      
    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // userBputer plays for itself, and we must be able to beat it
    // simple AI
    // userB.y += ((ball.y - (userB.y + userB.height/2)))*0.1;
    
    // when the ball collides with bottom and top walls we inverse the y velocity.
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
    }
    
    // we check if the paddle hit the user or the userB paddle
    let player = (ball.x + ball.radius < canvas.width/2) ? userA : userB;
    
    // if the ball hits a paddle
    if(collision(ball,player)){
        // we check where the ball hits the paddle
        let collidePoint = (ball.y - (player.y + player.height/2));
        // normalize the value of collidePoint, we need to get numbers between -1 and 1.
        // -player.height/2 < collide Point < player.height/2
        collidePoint = collidePoint / (player.height/2);
        
        // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
        // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
        // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
        // Math.PI/4 = 45degrees
        let angleRad = (Math.PI/4) * collidePoint;
        
        // change the X and Y velocity direction
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        // let direction = 1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        
        // speed up the ball everytime a paddle hits it.
        ball.speed += 0.1;
        
        socket?.emit("collision", {...ball, name:GameRoomName} );
    }
}

// render const, the const that does al the drawing
const render= ()=>{
    
    if (!canvasRef.current) {
		return;
	  }
	  const canvas: HTMLCanvasElement = canvasRef.current;
	  
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    
    // draw the user score to the left
    drawText(userA.score,canvas.width/4,canvas.height/5);
    
    // draw the userB score to the right
    drawText(userB.score,3*canvas.width/4,canvas.height/5);
    
    // draw the net
    drawNet();
    
    // draw the user's paddle
    drawRect(userA.x, userA.y, userA.width, userA.height, userA.color);
    
    // draw the userB's paddle
    drawRect(userB.x, userB.y, userB.width, userB.height, userB.color);
    
    // draw the ball
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}
const game = () =>{
    // if (!isUpdate)
    // console.log("stopFlag", stopFlag);
    if (!stopFlag)
    {
      update();
      render();
    }
    // isUpdate =false;
    return () => {
      // window.addEventListener("keydown", getKeyEvent);
      window.removeEventListener("keydown",getKeyEvent);
    }
}
// number of frames per second
let framePerSecond = 50;
//call the game const 50 times every 1 Sec
let loop = setInterval(game,1000/framePerSecond);

  return (
  <>
      {/* <button onClick={startGo}> 고 </button> */}
	  <div className="App">
      <canvas ref={canvasRef} height={height} width={width} className="canvas"/>
    </div>
    <div>
      <h1>최고급 퐁 게임!</h1>
      <h2>조작법 W 위, S 아래 (한글 지원 안합니다.)</h2>
      <h2>3점을 빨리 내면 승리입니다.</h2>
      <h2>플레이어는 게임 시작 후 나가면 다신 못들어옴</h2>
      <h2>누군가 빡종하면 그 게임은 무효 처리입니다.</h2>
    </div>
    </>
  );
}

PongGame.defaultProps = {
  width: 800,
  height: 600
};

export default PongGame;