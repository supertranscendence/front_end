import React, { useRef, useState, useCallback, useEffect } from 'react';
// import './App.css';
import useSocket from "src/hooks/useSocket"
import { useParams } from 'react-router';



interface CanvasProps {
  width: number;
  height: number;
  userAScore: number;
  userBScore: number;
}

interface Coordinate {
  x: number;
  y: number;
};

const PongGame = ({ width, height,userAScore, userBScore  }: CanvasProps) =>{
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas  = canvasRef.current;

  
const ball = {
    x : canvas?canvas.width/2 : 300,
    y : canvas?canvas.height/2 : 250,
    radius : 10,
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
    x : (canvas?canvas.width:0 - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "WHITE"
}
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

// listening to the mouse

//   const canvas: HTMLCanvasElement = canvasRef.current;





// when userB or USER scores, we reset the ball
const resetBall = () =>{
	if (!canvasRef.current) {
		return;
	  }
	  const canvas: HTMLCanvasElement = canvasRef.current;

    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    // ball.velocityX = -ball.velocityX;
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
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// update const, the const that does all calculations
const update =()=>{
    
    if (!canvasRef.current) {
		return;
	  }
	  const canvas: HTMLCanvasElement = canvasRef.current;
    // change the score of players, if the ball goes to the left "ball.x<0" userBputer win, else if "ball.x > canvas.width" the user win
    if( ball.x - ball.radius < 0 ){
        userB.score++;
        resetBall();
        resetUser();
        socket?.emit("gameSet", {userA: userA.score, userB:userB.score ,name:GameRoom});//
    }else if( ball.x + ball.radius > canvas.width){
      userA.score++;
        resetBall();
        resetUser();
        socket?.emit("gameSet", {userA: userA.score, userB:userB.score,name:GameRoom});
        //TODO:게임셋 보내면서 게임 던이면 누가 이겼는지 이름보내줘
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
    
    drawRect(userB.x, userB.y, userB.width, userB.height, userB.color);
    
    // draw the userB's paddle
    drawRect(userB.x, userB.y, userB.width, userB.height, userB.color);
    
    // draw the ball
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}
const game = () =>{
    update();
    render();
}
// number of frames per second
let framePerSecond = 60;

//call the game const 50 times every 1 Sec
let loop = setInterval(game,1000/framePerSecond);
////////////////
const startGo = ()=>{
console.log("gogo");
	setInterval(game,1000/framePerSecond);
}
const getMousePos = (evt:any) =>{
	console.log("1",evt);
	if (!canvasRef.current) {
		return;
	  }
	  const canvas: HTMLCanvasElement = canvasRef.current;
    let rect = canvas.getBoundingClientRect();
    
    userA.y = evt.clientY - rect.top - userA.height/2;
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
        socket?.emit("down",GameRoom);
        if (userA.y >=500)
        {
	    	  userA.y =500;
        }
	}
    else if (evt.key === "w")
	{
    socket?.emit("up", GameRoom);
    
    if (userA.y <=0)
      userA.y =0;
	}
    // console.log( userA.y, evt.clientY, rect.top, userA.height/2)
    // userA.y = evt.clientY - rect.top - userA.height/2;
}
const [socket] = useSocket("sleact");
const { GameRoom } = useParams<{ GameRoom?: string }>();
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
	
	  socket?.on("down", (isA : boolean) => {
	    if (isA)
	    {
	      userA.y +=  40
        if (userA.y >=500)
        {
	    	  userA.y =500;
        }
      }
	    else
	    {
        if (userB.y >=500)
        {
	    	  userB.y =500;
        }
	      userB.y +=  40
      }
	    
	  })
	
	  socket?.on("up", (isA : boolean) => {
      if (isA)
      {
        if (userA.y <= 0)
        {
	    	  userA.y =0;
        }
	      userA.y -=  40
      }
	    else
	    {
	      if (userB.y <= 0)
	      {
	    	  userB.y =0;
        }
	      userB.y -= 40
      }
	  })

    window.addEventListener("keydown", getKeyEvent);
    
    // canvas.addEventListener("mousemove", getMousePos);

    return () => {
      // window.addEventListener("keydown", getKeyEvent);
      window.removeEventListener("keydown",getKeyEvent);
    };
//   }, [startPaint, paint, exitPaint]);
  }, [getKeyEvent, canvasRef]);

  return (
  <>
      {/* <button onClick={startGo}> 고 </button> */}
	  <div className="App">
      <canvas ref={canvasRef} height={height} width={width} className="canvas"/>
    </div>
    </>
  );
}
// else
// 	return <div className="App">
// 	<canvas ref={canvasRef} height={height} width={width} className="canvas"/>

//   </div>
// }

PongGame.defaultProps = {
  width: 800,
  height: 600
};

export default PongGame;