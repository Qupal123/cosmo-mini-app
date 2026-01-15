const app = document.getElementById("app");

// Telegram
const tg = window.Telegram?.WebApp;
tg?.ready();

function renderCatalog() {
  app.innerHTML = "<h2 style='text-align:center'>Каталог</h2>";

  PRODUCTS.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img 
        src="${p.img}" 
        alt="${p.name}"
        class="product-img"
        onerror="this.onerror=null;this.src='https://via.placeholder.com/300x180?text=NO+IMAGE';"
      >
      <h3>${p.name}</h3>
      <p class="price">${p.price} ₽</p>
      <button onclick="buy(${p.id})">Купить</button>
    `;

    app.appendChild(card);
  });
}

function buy(id) {
  const product = PRODUCTS.find(p => p.id === id);

  app.innerHTML = `
    <div class="card">
      <img 
        src="${product.img}" 
        class="product-img"
        onerror="this.onerror=null;this.src='https://via.placeholder.com/300x180?text=NO+IMAGE';"
      >
      <h3>${product.name}</h3>
      <p>Цена: <b>${product.price} ₽</b></p>
      <p>Перевести на номер:</p>
      <p><b>${PAYMENT_PHONE}</b></p>

      <input placeholder="Почта Supercell ID">
      <input type="file">

      <button onclick="renderCatalog()">Я оплатил</button>
    </div>
  `;
}

// старт
renderCatalog();
