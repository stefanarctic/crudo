/* ============================================================
   CRUDO — homepage
   ============================================================ */

"use strict";

function hydrateHero() {
  $("#heroKicker").textContent = SITE.hero.kicker;
  $("#heroTagline").textContent = SITE.hero.tagline;
  $("#heroWhatsapp").textContent = SITE.hero.primaryCta;
  $("#heroWhatsapp").href = "menu.html";
  $("#heroStats").innerHTML = SITE.hero.stats
    .map((s) => `<div><strong>${escapeHtml(s.value)}${s.suffix ? `<span>${escapeHtml(s.suffix)}</span>` : ""}</strong><p>${escapeHtml(s.label)}</p></div>`)
    .join("");
}

function hydrateStory() {
  $("#storyKicker").textContent = SITE.story.kicker;
  $("#storyTitle").textContent = SITE.story.title;
  $("#storyText").innerHTML = SITE.story.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
}

function hydrateMenuPreview() {
  $("#menuKicker").textContent = SITE.menu.kicker;
  $("#menuTitle").textContent = SITE.menu.title;
  $("#menuSub").textContent = SITE.menu.sub;

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
          <a class="btn btn-primary btn-sm" href="menu.html">Vezi în meniu</a>
        </div>
      </div>
    </div>
  `;

  const previewIds = SITE.menu.preview || [];
  const items = previewIds.map(findItem).filter(Boolean);
  const grid = $("#menuGrid");
  grid.innerHTML = "";
  items.forEach((item, i) => {
    const card = document.createElement("article");
    card.className = "menu-card is-openable";
    card.dataset.infoItem = item.id;
    card.style.animationDelay = `${i * 0.07}s`;
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
            <span class="preview-cat">${escapeHtml(item.category)}</span>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function hydrateGallery() {
  $("#galleryGrid").innerHTML = SITE.gallery
    .map((img, i) => `<figure class="gallery-item reveal${i % 3 === 0 ? " tall" : ""}" data-gallery="${i}" role="button" tabindex="0"><img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt)}" loading="lazy" /></figure>`)
    .join("");
}

function hydrateLocation() {
  $("#locationAddress").textContent = SITE.address;
  $("#hoursList").innerHTML = SITE.hours
    .map((h) => `<li><span>${escapeHtml(h.days)}</span><strong>${escapeHtml(h.time)}</strong></li>`)
    .join("");
  $("#callBtn").href = telLink();
  $("#mapsBtn").href = mapsSearch();
  $("#mapFrame").src = mapsEmbed();
}

function hydrateLoyalty() {
  $("#loyaltyKicker").textContent = SITE.loyalty.kicker;
  $("#loyaltyTitle").textContent = SITE.loyalty.title;
  $("#loyaltyText").textContent = SITE.loyalty.text;

  const stamps = Array.from({ length: SITE.loyalty.stamps }, (_, i) => {
    const filled = i < SITE.loyalty.filled;
    return `<span class="stamp${filled ? " filled" : ""}">${filled ? "✓" : i + 1}</span>`;
  }).join("");

  const card = $("#punchCard");
  card.dataset.info = "loyalty";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.innerHTML = `
    <p class="punch-brand">crudo</p>
    <p class="punch-title">Card de fidelitate</p>
    <div class="stamps">${stamps}</div>
    <p class="punch-reward">${escapeHtml(SITE.loyalty.reward)}</p>
  `;
}

$("#newsletterForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = $("#nlEmail");
  const name = $("#nlName");
  email.classList.remove("invalid");
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    email.classList.add("invalid");
    toast("Introdu un email valid.");
    return;
  }
  toast(`Mulțumim${name.value.trim() ? ", " + name.value.trim() : ""}! Te ținem aproape.`);
  e.target.reset();
});

hydrateHero();
hydrateStory();
hydrateMenuPreview();
hydrateGallery();
hydrateLocation();
hydrateLoyalty();
observeReveals();
