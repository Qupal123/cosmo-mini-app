const app = document.getElementById("app");

// Telegram
const tg = window.Telegram?.WebApp;
tg?.ready();

function renderCatalog() {
  app.innerHTML = "";

  PRODUCTS.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.img}" class="product-img">
      <h3>${p.name}</h3>
      <div class="price">${p.price} ₽</div>
      <button onclick="buy(${p.id})">Купить</button>
    `;

    app.appendChild(card);
  });
}

function buy(id) {
  const p = PRODUCTS.find(x => x.id === id);

  app.innerHTML = `
    <div class="card">
      <img src="${p.img}" class="product-img">
      <h3>${p.name}</h3>
      <p>Цена: <b>${p.price} ₽</b></p>
      <p>Перевести на номер:</p>
      <p><b>${PAYMENT_PHONE}</b></p>
      <button onclick="renderCatalog()">Назад</button>
    </div>
  `;
}

renderCatalog();
