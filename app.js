const tg=Telegram.WebApp;tg.ready();
const uid=tg.initDataUnsafe?.user?.id||0;
const isAdmin=uid===ADMIN_ID;
const app=document.getElementById("app");

isAdmin?adminPanel():catalog();

function catalog(){
let html="";
PRODUCTS.forEach(p=>{
html+=`<div class="card">
<img src="${p.img}" style="width:100%;border-radius:14px">
<h3>${p.name}</h3>
<p>${p.price} ₽</p>
<button onclick="pay(${p.id})">Купить</button>
</div>`;
});
app.innerHTML=html+`<button onclick="myOrders()">Мои заказы</button>`;
}

function pay(id){
const p=PRODUCTS.find(x=>x.id===id);
app.innerHTML=`<div class="card">
<h3>Оплата</h3>
<p>${p.name} — ${p.price} ₽</p>
<p>Перевод на: <b>${PAYMENT_PHONE}</b></p>
<input placeholder="Supercell ID Email">
<input type="file">
<button onclick="saveOrder(${id})">Я оплатил</button>
</div>`;
}

function saveOrder(pid){
let orders=db.get("orders");
let o={id:Date.now(),user:uid,product:pid,status:1,code:null,video:null,review:null};
o.sig=sign(o);
orders.push(o);
db.set("orders",orders);
notifyAdmin("Новый заказ #"+o.id);
catalog();
}

function myOrders(){
let orders=db.get("orders").filter(o=>o.user===uid);
let html="";
orders.forEach(o=>{
html+=`<div class="card">
<p>#${o.id}</p>
<p class="stat">${STATUSES[o.status]}</p>
${o.status===3?`<input placeholder="Код Supercell" onblur="sendCode(${o.id},this.value)">`:""}
${o.status===5 && o.video?`<video src="${o.video}" controls style="width:100%"></video>
<button onclick="leaveReview(${o.id})">Оставить отзыв</button>`:""}
</div>`;
});
app.innerHTML=html+`<button onclick="catalog()">Назад</button>`;
}

function sendCode(id,val){
let orders=db.get("orders");
orders.find(o=>o.id===id).code=val;
db.set("orders",orders);
}

function leaveReview(id){
app.innerHTML=`<div class="card">
<input placeholder="Оценка 1–5">
<textarea placeholder="Отзыв"></textarea>
<button onclick="saveReview(${id})">Отправить</button>
</div>`;
}

function saveReview(id){
let orders=db.get("orders");
let o=orders.find(x=>x.id===id);
o.review="ok";
o.status=6;
db.set("orders",orders);
myOrders();
}

// ADMIN

function adminPanel(){
let orders=db.get("orders");
let html="";
orders.forEach(o=>{
if(!verify(o))return;
html+=`<div class="card">
<p>#${o.id}</p>
<p>${STATUSES[o.status]}</p>
${o.status>=4?`<input type="file" onchange="uploadVideo(${o.id},this.files[0])">`:""}
<button onclick="nextStatus(${o.id})">Следующий статус</button>
</div>`;
});
app.innerHTML=html;
}

function uploadVideo(id,file){
let orders=db.get("orders");
orders.find(o=>o.id===id).video=URL.createObjectURL(file);
db.set("orders",orders);
}

function nextStatus(id){
let orders=db.get("orders");
let o=orders.find(x=>x.id===id);
o.status=Math.min(o.status+1,STATUSES.length-1);
db.set("orders",orders);
adminPanel();
}
