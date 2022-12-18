import React, { useRef, useState, useCallback, useEffect } from 'react';
// import './App.css';


interface CanvasProps {
  width: number;
  height: number;
}

interface Coordinate {
  x: number;
  y: number;
};

const PongGameCom = ({ width, height }: CanvasProps) =>{
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas  = canvasRef.current;

  
const ball = {
    x : canvas?canvas.width/2 : 0,
    y : canvas?canvas.height/2 : 0,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "WHITE"
}

// User Paddle
const user = {
    x : 0, // left side of canvas
    y : (canvas?canvas.height:0 - 100) + 350, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

// COM Paddle
const com = {
    x : canvas?canvas.width:0 - 10, // - width of paddle
    y : (canvas?canvas.height:0 - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
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





// when COM or USER scores, we reset the ball
const resetBall = () =>{
	if (!canvasRef.current) {
		return;
	  }
	  const canvas: HTMLCanvasElement = canvasRef.current;

    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

const resetUser = () =>{
	if (!canvasRef.current) {
		return;
	  }
	  const canvas: HTMLCanvasElement = canvasRef.current;
    user.y = 250;
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
    // change the score of players, if the ball goes to the left "ball.x<0" computer win, else if "ball.x > canvas.width" the user win
    if( ball.x - ball.radius < 0 ){
        com.score++;
        resetBall();
        resetUser();
    }else if( ball.x + ball.radius > canvas.width){
        user.score++;
        resetBall();
        resetUser();
    }
    
    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // computer plays for itself, and we must be able to beat it
    // simple AI
    com.y += ((ball.y - (com.y + com.height/2)))*0.1;
    
    // when the ball collides with bottom and top walls we inverse the y velocity.
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
    }
    
    // we check if the paddle hit the user or the com paddle
    let player = (ball.x + ball.radius < canvas.width/2) ? user : com;
    
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
    drawText(user.score,canvas.width/4,canvas.height/5);
    
    // draw the COM score to the right
    drawText(com.score,3*canvas.width/4,canvas.height/5);
    
    // draw the net
    drawNet();
    
    // draw the user's paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    
    // draw the COM's paddle
    drawRect(com.x, com.y, com.width, com.height, com.color);
    
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
// let loop = setInterval(game,1000/framePerSecond);
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
    
    user.y = evt.clientY - rect.top - user.height/2;
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
        user.y =  user.y  + 30;
        if (user.y >=500)
	    		user.y =500;
	}
    else if (evt.key === "w")
	{
        user.y =  user.y -30;
        if (user.y <=0)
			    user.y =0;
	}
    // console.log( user.y, evt.clientY, rect.top, user.height/2)
    // user.y = evt.clientY - rect.top - user.height/2;
}




  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
	
    // canvas.addEventListener('mousedown', startPaint);
    // canvas.addEventListener('mousemove', paint);
    // canvas.addEventListener('mouseup', exitPaint);
    // canvas.addEventListener('mouseleave', exitPaint);
    // canvas.addEventListener("keydown", getKeyEvent);
    // canvas.addEventListener("keyup", getKeyEvent);
    window.addEventListener("keydown", getKeyEvent);
    
    // canvas.addEventListener("mousemove", getMousePos);

    return () => {
      window.addEventListener("keydown", getKeyEvent);
		// window.removeEventListener("keypress", ()=>{console.log("d")});
		// canvas.removeEventListener("keypress", getKeyEvent);
    //   canvas.removeEventListener('mousedown', startPaint);
    //   canvas.removeEventListener('mousemove', paint);
    //   canvas.removeEventListener('mouseup', exitPaint);
    //   canvas.removeEventListener('mouseleave', exitPaint);
    };
//   }, [startPaint, paint, exitPaint]);
  }, [getKeyEvent, canvasRef]);
  return (
  <>
      <button onClick={startGo}> 고 </button>
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

PongGameCom.defaultProps = {
  width: 800,
  height: 600
};

export default PongGameCom;