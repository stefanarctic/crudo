/* ============================================================
   CRUDO — coș + checkout (doar UI, fără backend)
   ============================================================ */

"use strict";

const CART_KEY = "crudo-cart";

let cart = [];
try {
  cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
} catch {
  cart = [];
}

const saveCart = () => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const lei = (n) => `${n} lei`;
const cartCount = () => cart.reduce((s, c) => s + c.qty, 0);
const cartTotal = () => cart.reduce((s, c) => s + c.qty * c.price, 0);

function addToCart(id) {
  const item = findItem(id);
  if (!item) return;
  const existing = cart.find((c) => c.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
  saveCart();
  renderCart();
  bumpCart();
  toast(`${item.name} e în coș`);
}

function changeQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((c) => c.id !== id);
  saveCart();
  renderCart();
}

function bumpCart() {
  const el = $("#cartCount");
  if (!el) return;
  el.classList.remove("bump");
  void el.offsetWidth;
  el.classList.add("bump");
}

function renderCart() {
  const count = cartCount();
  const total = cartTotal();
  const countEl = $("#cartCount");
  const drawerCount = $("#cartDrawerCount");
  const itemsEl = $("#cartItems");
  const totalEl = $("#cartTotal");
  const checkoutBtn = $("#checkoutBtn");

  if (countEl) {
    countEl.textContent = count;
    countEl.classList.toggle("show", count > 0);
  }
  if (drawerCount) drawerCount.textContent = count ? `· ${count}` : "";
  if (totalEl) totalEl.textContent = lei(total);
  if (checkoutBtn) {
    checkoutBtn.disabled = count === 0;
    checkoutBtn.style.opacity = count === 0 ? ".45" : "1";
  }
  if (!itemsEl) return;

  if (count === 0) {
    itemsEl.innerHTML = `<p class="cart-empty">Coșul e gol. Alege un panini sau o focaccia.</p>`;
    return;
  }

  itemsEl.innerHTML = cart
    .map(
      (c) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${escapeHtml(c.name)}</h4>
          <p>${lei(c.price * c.qty)}</p>
          <div class="qty-controls">
            <button class="qty-btn" type="button" data-id="${c.id}" data-d="-1">−</button>
            <span class="qty-val">${c.qty}</span>
            <button class="qty-btn" type="button" data-id="${c.id}" data-d="1">+</button>
          </div>
        </div>
        <button class="cart-item-remove" type="button" data-id="${c.id}" aria-label="Șterge">×</button>
      </div>`
    )
    .join("");
}

function initCart() {
  const drawer = $("#cartDrawer");
  const overlay = $("#cartOverlay");
  const modal = $("#modalOverlay");
  if (!drawer) return;

  const openCart = () => {
    drawer.classList.add("open");
    overlay.classList.add("open");
  };
  const closeCart = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
  };

  $("#cartBtn")?.addEventListener("click", openCart);
  $("#cartClose")?.addEventListener("click", closeCart);
  overlay?.addEventListener("click", closeCart);

  $("#cartItems")?.addEventListener("click", (e) => {
    const qty = e.target.closest(".qty-btn");
    const rem = e.target.closest(".cart-item-remove");
    if (qty) changeQty(qty.dataset.id, Number(qty.dataset.d));
    if (rem) changeQty(rem.dataset.id, -999);
  });

  $("#checkoutBtn")?.addEventListener("click", () => {
    if (!cart.length) return;
    closeCart();
    setTimeout(() => modal.classList.add("open"), 220);
  });

  $("#modalClose")?.addEventListener("click", () => modal.classList.remove("open"));
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });

  const method = $("#fMethod");
  const addressField = $("#addressField");
  method?.addEventListener("change", () => {
    addressField.classList.toggle("hidden", method.value !== "delivery");
  });

  $("#orderForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#fName");
    const phone = $("#fPhone");
    const err = $("#formError");
    [name, phone].forEach((f) => f.classList.remove("invalid"));

    if (!name.value.trim() || !phone.value.trim()) {
      [name, phone].forEach((f) => !f.value.trim() && f.classList.add("invalid"));
      err.textContent = "Numele și telefonul sunt obligatorii.";
      return;
    }
    if (method.value === "delivery" && !$("#fAddress").value.trim()) {
      $("#fAddress").classList.add("invalid");
      err.textContent = "Adaugă adresa pentru livrare.";
      return;
    }

    const orderId = `CRD-${Date.now().toString().slice(-6)}`;
    const summary = cart.map((c) => `${c.qty}× ${c.name}`).join(", ");
    const total = cartTotal();

    $("#successText").textContent =
      method.value === "pickup"
        ? `Mulțumim, ${name.value.trim()}! Te sunăm când e gata — ridici de pe Bălcescu.`
        : `Mulțumim, ${name.value.trim()}! Livrăm la ${$("#fAddress").value.trim()}.`;
    $("#successOrder").innerHTML = `<strong>#${orderId}</strong><br>${escapeHtml(summary)}<br><strong>Total: ${lei(total)}</strong>`;

    cart = [];
    saveCart();
    renderCart();
    $("#orderForm").classList.add("hidden");
    $("#orderSuccess").classList.remove("hidden");
  });

  $("#successClose")?.addEventListener("click", () => {
    modal.classList.remove("open");
    setTimeout(() => {
      $("#orderForm").reset();
      $("#orderForm").classList.remove("hidden");
      $("#orderSuccess").classList.add("hidden");
      $("#formError").textContent = "";
      addressField?.classList.add("hidden");
    }, 350);
  });

  renderCart();
}
