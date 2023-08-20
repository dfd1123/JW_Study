const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

const dpr = window.devicePixelRatio;

const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

class CircleParticle {
    constructor({x, y, radius}) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vy = (this.radius / 10) * 2;
        this.acc = 1.02;
    }

    update(){
        if(this.y >= canvasHeight + this.radius) {
            this.vy = (this.radius / 10) * 2; 
            this.y = -this.radius * 2;
            this.x = randomNumber(0, canvasWidth);
        }

        this.vy *= this.acc;
        this.y += this.vy;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360);
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.closePath();
    }
}

let canvasWidth;
let canvasHeight;
let particles;

const init = () => {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    
    ctx.scale(dpr, dpr);

    particles = Array.from({length: canvasWidth / 25}).map(() => (
        new CircleParticle({x: randomNumber(0, canvasWidth), y: randomNumber(0, canvasHeight), radius: randomNumber(10, 50)})
    ))
}

let then = Date.now();

function animate(){
    window.requestAnimationFrame(animate);
    const interval = 1000 / 60;
    const now = Date.now();
    const delta = now - then;

    if(delta < interval) return;
    

    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    

    particles.map(particle => {
        particle.update()
        particle.draw()
    })

    then = now - (delta % interval);
}

window.addEventListener('load', () => {
    init();
    animate();
})

window.addEventListener('resize', () => {
    init();
})


const controls = new function() {
    this.blurValue = 28;
    this.colorMatrix = 500;
    this.colorOffset = -34;
}

const gui = new dat.GUI();

gui.add(controls, 'blurValue', 0, 50).onChange((value) => {
    document.querySelector('feGaussianBlur').setAttribute('stdDeviation', value);
})

gui.add(controls, 'colorMatrix', 0, 500).onChange((value) => {
    document.querySelector('feColorMatrix').setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.colorOffset}`);
})

gui.add(controls, 'colorOffset', -50, 50).onChange((value) => {
    document.querySelector('feColorMatrix').setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.colorMatrix} ${value}`);
})