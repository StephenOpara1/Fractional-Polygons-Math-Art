const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const w_x = window.innerWidth;
const w_y = window.innerHeight;

let sides = 1.2
const radius = 230; //px 
const conversion_ratio = Math.PI / 180;

canvas.width = w_x;
canvas.height = w_y;

const fps = 1;
const interval = 1000 / fps;
let lastTime = 0;

function animate(time){
    if (time - lastTime >= interval) {
        lastTime = time;

        const power = 1;
        const new_side = sides + (1 / 10 ** power);
        sides = Number(new_side.toFixed(power));

        const speed = Math.abs(Math.round(sides) - sides);

        ctx.clearRect(0, 0, w_x, w_y);
        ctx.fillStyle = "rgb(20, 20, 20)";
        ctx.fillRect(0, 0, w_x, w_y);

        const vertices = [];
        const turn = 360 / sides;

        let current_angle = 90;
        let has_cycled = false;

        while (!has_cycled) {
            const x = radius * Math.cos(current_angle * conversion_ratio) + w_x / 2;
            const y = radius * Math.sin(current_angle * conversion_ratio) + w_y / 2;

            vertices.push({x, y});

            const fraction = (current_angle - 90) / 360;
            if (Number.isInteger(fraction) && fraction !== 0) has_cycled = true;

            current_angle += turn;
            if ((current_angle - 90) / turn > 500) has_cycled = true;
        };

        for (let i = 0; i < vertices.length - 1; i++) {
            const x1 = vertices[i].x;
            const y1 = vertices[i].y;

            const x2 = vertices[i + 1].x;
            const y2 = vertices[i + 1].y;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 3;

            ctx.stroke();
        };

        ctx.font = '50px sans-serif';
        ctx.fillStyle = "greenyellow";
        ctx.textAlign = 'center';
        ctx.fillText(`${sides} Sides`, w_x / 2, w_y - 30);
    };

    requestAnimationFrame(animate)
};

requestAnimationFrame(animate);