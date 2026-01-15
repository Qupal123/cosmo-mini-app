const wrapper = document.getElementById("bg-wrapper");

const canvas = document.createElement("canvas");
canvas.id = "bg";
wrapper.appendChild(canvas);

const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

canvas.style.position = "fixed";
canvas.style.inset = "0";
canvas.style.zIndex = "-1";      // 🔥 ВАЖНО
canvas.style.pointerEvents = "none";

const particles = Array.from({ length: 80 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  v: Math.random() * 0.4 + 0.2
}));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.y += p.v;
    if (p.y > canvas.height) p.y = 0;

    ctx.fillStyle = "rgba(150, 90, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();
