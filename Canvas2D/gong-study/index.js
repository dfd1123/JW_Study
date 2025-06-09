const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const dpr = window.devicePixelRatio;

const canvasWidth = 800;
const canvasHeight = 800;

canvas.style.width = canvasWidth;
canvas.style.height = canvasHeight;

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;

// canvas.width = canvasWidth;
// canvas.height = canvasHeight;

ctx.beginPath();
ctx.fillStyle = '#000';
ctx.fillRect(0,0,50, 50);
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = '#000';
ctx.arc(200, 100, 20, 0, Math.PI * 2);
ctx.fill();
ctx.closePath();
