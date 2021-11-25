const labelDay = document.getElementById("day");
const labelHour = document.getElementById("hour");
const labelMinute = document.getElementById("minute");
const labelSecond = document.getElementById("second");
const canvas = document.getElementById("main_canvas");


// Timer function 
const secondChange = document.getElementById("second_number");

setInterval(function () {
    showTime();
}, 1000);



function showTime() {

    let currentTime = new Date();
    let h = dayjs(currentTime).format('HH');
    let m = dayjs(currentTime).format('mm');
    let s = dayjs(currentTime).format('ss');

    labelDay.textContent = dayjs(currentTime).format("MMMM D YYYY");
    labelHour.textContent = h;
    labelMinute.textContent = m;
    labelSecond.textContent = s;
}

// Manage theme

const toggleBtn = document.getElementById("toggle");
const toggleSlide = document.getElementById("toggle_slide");
const container = document.getElementById("container");
const date = document.getElementById("date");
const cards = document.querySelectorAll("#card");
const separators = document.querySelectorAll("#separator");

var colorCircle = "black";
var colorDark = false;

toggleBtn.addEventListener('click', (e) => {


    cards.forEach(card => { card.classList.toggle('active') })
    separators.forEach(separator => { separator.classList.toggle('active') })

    document.body.classList.toggle('active');
    toggleSlide.classList.toggle('active');
    toggleBtn.classList.toggle('active');
    container.classList.toggle('active');
    date.classList.toggle('active');

    colorDark = colorDark ? false : true;
    colorCircle = colorDark ? '#dde1e7' : 'black';

    initParticles();

})

// card interact

VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 25,
    speed: 400
});

// Canvas code

const ctx = canvas.getContext('2d')
const mouse = {
    x: null,
    y: null
};
var particlesList = [];
const numberParticles = 100;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

setInterval(() => {
    mouse.x = undefined;
    mouse.y = undefined;
}, 200);


class Particles {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.size -= 0.05;
        if (this.size < 0) {
            this.x = (mouse.x + ((Math.random() * 20) - 10));
            this.y = (mouse.y + ((Math.random() * 20) - 10));
            this.size = (Math.random() * 10) + 2;
            this.weight = (Math.random() * 5) - 0.5;
        }
        this.y += this.weight;
        this.weight += 0.2;

        if (this.y > canvas.height - this.size) { this.weight *= -1; }

    }
}
function initParticles() {
    particlesList = [];

    for (let i = 0; i < numberParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = (Math.random() * 5) + 2;
        let weight = 1;
        particlesList.push(new Particles(x, y, size, colorCircle, weight));
    }
}

function animateParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesList.length; i++) {
        particlesList[i].update();
        particlesList[i].draw();
    }
    requestAnimationFrame(animateParticles)
}

initParticles();
animateParticles();