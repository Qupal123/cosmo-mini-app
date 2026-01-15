const c=document.getElementById("bg"),ctx=c.getContext("2d");
function resize(){c.width=innerWidth;c.height=innerHeight}
onresize=resize;resize();
let p=[...Array(80)].map(()=>({x:Math.random()*c.width,y:Math.random()*c.height,v:.3+Math.random()}));
(function draw(){
ctx.clearRect(0,0,c.width,c.height);
p.forEach(o=>{o.y+=o.v;if(o.y>c.height)o.y=0;
ctx.fillStyle="rgba(150,90,255,.8)";
ctx.beginPath();ctx.arc(o.x,o.y,2,0,7);ctx.fill();});
requestAnimationFrame(draw);
})();