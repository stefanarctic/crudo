/* ============================================================
   CRUDO — pagina de meniu
   ============================================================ */

"use strict";

function renderSignature() {
  const s = SITE.menu.signature;
  $("#signature").innerHTML = `
    <p class="kicker">${escapeHtml(s.kicker)}</p>
    <div class="signature-body">
      <div>
        <h3>${escapeHtml(s.name)}</h3>
        <p>${escapeHtml(s.desc)}</p>
        <span class="signature-note">${escapeHtml(s.note)}</span>
      </div>
      <div class="signature-aside">
        <span class="menu-price">${s.price}<small>lei</small></span>
        <div class="signature-actions">
          <button class="btn btn-ghost btn-sm" type="button" data-info-item="${s.id}">Detalii</button>
          <button class="btn btn-primary btn-sm" type="button" data-add="${s.id}">Adaugă</button>
        </div>
      </div>
    </div>
  `;
}

function renderMenu(catId) {
  const cat = SITE.menu.categories.find((c) => c.id === catId) || SITE.menu.categories[0];
  const grid = $("#menuGrid");
  grid.innerHTML = "";
  cat.items.forEach((item, i) => {
    const card = document.createElement("article");
    card.className = "menu-card is-openable";
    card.dataset.infoItem = item.id;
    card.style.animationDelay = `${i * 0.06}s`;
    card.innerHTML = `
      ${item.image ? `<img class="menu-card-photo" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" />` : ""}
      <div class="menu-card-body">
        <div class="menu-card-top">
          <div>
            ${item.tag ? `<span class="tag">${escapeHtml(item.tag)}</span>` : ""}
            <h3>${escapeHtml(item.name)}</h3>
          </div>
        </div>
        <p class="desc">${escapeHtml(item.desc)}</p>
        <div class="menu-card-bottom">
          <span class="menu-price">${item.price}<small>lei</small></span>
          <div class="menu-card-actions">
            <button class="card-details" type="button" data-info-item="${item.id}">Detalii</button>
            <button class="btn btn-wine btn-sm" type="button" data-add="${item.id}">Adaugă</button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function hydrateMenu() {
  renderSignature();
  const tabs = $("#menuTabs");
  tabs.innerHTML = SITE.menu.categories
    .map((c, i) => `<button class="tab${i === 0 ? " active" : ""}" type="button" data-cat="${escapeHtml(c.id)}">${escapeHtml(c.label)}</button>`)
    .join("");

  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    tabs.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");
    renderMenu(btn.dataset.cat);
  });

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (!add) return;
    addToCart(add.dataset.add);
    add.classList.add("just-added");
    const prev = add.textContent;
    add.textContent = "Adăugat";
    setTimeout(() => {
      add.classList.remove("just-added");
      add.textContent = prev;
    }, 900);
  });

  renderMenu(SITE.menu.categories[0].id);
}

hydrateMenu();
initCart();
observeReveals();
