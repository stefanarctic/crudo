/* ============================================================
   CRUDO — utilitare comune (nav, toast, footer)
   ============================================================ */

"use strict";

const $ = (sel) => document.querySelector(sel);

const waLink = (text) => {
  const msg = encodeURIComponent(text || "Bună! Aș vrea să comand de la Crudo.");
  return `https://wa.me/${SITE.whatsapp}?text=${msg}`;
};

const telLink = () => `tel:${SITE.phoneTel}`;
const mapsSearch = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;
const mapsEmbed = () => `https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&z=16&output=embed`;

const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const allMenuItems = () => {
  const cats = SITE.menu.categories.flatMap((c) => c.items.map((item) => ({ ...item, category: c.label })));
  const sig = SITE.menu.signature;
  return [{ ...sig, category: "Semnătură" }, ...cats];
};

const findItem = (id) => allMenuItems().find((item) => item.id === id);

window.addEventListener("load", () => {
  setTimeout(() => $("#preloader")?.classList.add("done"), 500);
});

const navbar = $("#navbar");
if (navbar) {
  const pin = () => navbar.classList.toggle("scrolled", window.scrollY > 40 || navbar.classList.contains("on-light"));
  window.addEventListener("scroll", pin, { passive: true });
  pin();
}

const burger = $("#burger");
const navLinks = $("#navLinks");
if (burger && navLinks) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      navLinks.classList.remove("open");
    })
  );
}

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

function hydrateFooter() {
  const hours = $("#footerHours");
  if (!hours) return;
  hours.innerHTML = SITE.hours
    .map((h) => `<p>${escapeHtml(h.days)}: ${escapeHtml(h.time)}</p>`)
    .join("");
  const phone = $("#footerPhone");
  const email = $("#footerEmail");
  const address = $("#footerAddress");
  const ig = $("#igLink");
  const fb = $("#fbLink");
  if (phone) phone.innerHTML = `<a href="${telLink()}">${escapeHtml(SITE.phoneDisplay)}</a>`;
  if (email) email.innerHTML = `<a href="mailto:${escapeHtml(SITE.email)}">${escapeHtml(SITE.email)}</a>`;
  if (address) address.textContent = SITE.address;
  if (ig) ig.href = SITE.instagram;
  if (fb) fb.href = SITE.facebook;
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
}

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("visible");
        io.unobserve(en.target);
      }
    });
  },
  { threshold: 0.12 }
);

function observeReveals() {
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

function canAddFromPage() {
  return document.body.classList.contains("page-menu") && typeof addToCart === "function";
}

function lockPageScroll(on) {
  document.body.classList.toggle("info-open", on);
}

function ensureInfoPopup() {
  let overlay = $("#infoOverlay");
  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.id = "infoOverlay";
  overlay.className = "info-overlay";
  overlay.innerHTML = `
    <div class="info-modal" role="dialog" aria-modal="true" aria-labelledby="infoTitle">
      <button class="info-close" type="button" aria-label="Închide">&times;</button>
      <div id="infoModalInner"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const close = () => closeInfoPopup();
  overlay.querySelector(".info-close").addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) close();
  });
  overlay.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (!add || !canAddFromPage()) return;
    closeInfoPopup();
  });
  return overlay;
}

function closeInfoPopup() {
  const overlay = $("#infoOverlay");
  if (!overlay) return;
  overlay.classList.remove("open");
  lockPageScroll(false);
}

function openInfoPopup(html, variant = "sheet") {
  const overlay = ensureInfoPopup();
  overlay.querySelector(".info-modal").className = `info-modal ${variant}`;
  $("#infoModalInner").innerHTML = html;
  overlay.classList.add("open");
  lockPageScroll(true);
}

function openItemPopup(id) {
  const item = findItem(id);
  if (!item) return;
  const chips = (item.ingredients || [])
    .map((ing) => `<span class="info-chip">${escapeHtml(ing)}</span>`)
    .join("");
  const action = canAddFromPage()
    ? `<button class="btn btn-wine btn-sm" type="button" data-add="${escapeHtml(item.id)}">Adaugă</button>`
    : `<a class="btn btn-wine btn-sm" href="menu.html">Vezi în meniu</a>`;

  openInfoPopup(
    `
    ${item.image ? `<img class="info-photo" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" />` : ""}
    <div class="info-body">
      <p class="kicker kicker-wine">${escapeHtml(item.category || "Meniu")}</p>
      ${item.tag ? `<span class="tag">${escapeHtml(item.tag)}</span>` : ""}
      <h3 id="infoTitle">${escapeHtml(item.name)}</h3>
      <p class="info-lead">${escapeHtml(item.info || item.desc || "")}</p>
      ${chips ? `<div class="info-chips">${chips}</div>` : ""}
      ${item.allergens ? `<p class="info-note"><strong>Alergeni.</strong> ${escapeHtml(item.allergens)}</p>` : ""}
      ${item.pair ? `<p class="info-pair">${escapeHtml(item.pair)}</p>` : ""}
      <div class="info-foot">
        <span class="menu-price">${item.price}<small>lei</small></span>
        ${action}
      </div>
    </div>
    `,
    "item"
  );
}

function openTextPopup(key) {
  const pop = SITE.popups?.[key];
  if (!pop) return;
  const facts = (pop.facts || [])
    .map(
      (f) =>
        `<li><span>${escapeHtml(f.label)}</span><strong>${escapeHtml(f.value)}</strong></li>`
    )
    .join("");

  openInfoPopup(
    `
    <div class="info-body info-body-text">
      <p class="kicker kicker-wine">${escapeHtml(pop.kicker || "Informații")}</p>
      <h3 id="infoTitle">${escapeHtml(pop.title)}</h3>
      <p class="info-lead">${escapeHtml(pop.text)}</p>
      ${facts ? `<ul class="info-facts">${facts}</ul>` : ""}
    </div>
    `,
    "sheet"
  );
}

function openGalleryPopup(index) {
  const img = SITE.gallery?.[index];
  if (!img) return;
  openInfoPopup(
    `
    <img class="info-photo info-photo-wide" src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt)}" />
    <div class="info-body info-body-gallery">
      <p class="kicker kicker-wine">Galerie</p>
      <h3 id="infoTitle">${escapeHtml(img.alt)}</h3>
    </div>
    `,
    "gallery"
  );
}

function bindInfoTriggers() {
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const gal = e.target.closest("[data-gallery]");
    const pop = e.target.closest("[data-info]");
    if (!gal && !pop) return;
    e.preventDefault();
    if (gal) openGalleryPopup(Number(gal.dataset.gallery));
    else openTextPopup(pop.dataset.info);
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-add]")) return;

    const itemEl = e.target.closest("[data-info-item]");
    if (itemEl) {
      e.preventDefault();
      openItemPopup(itemEl.dataset.infoItem);
      return;
    }

    const popEl = e.target.closest("[data-info]");
    if (popEl) {
      e.preventDefault();
      openTextPopup(popEl.dataset.info);
      return;
    }

    const galEl = e.target.closest("[data-gallery]");
    if (galEl) {
      e.preventDefault();
      openGalleryPopup(Number(galEl.dataset.gallery));
    }
  });
}

hydrateFooter();
observeReveals();
bindInfoTriggers();
