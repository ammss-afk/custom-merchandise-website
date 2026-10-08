const CONFIG = {
  whatsappNumber: "6281234567890", // GANTI DENGAN NOMOR WHATSAPP BISNIS
  brandName: "NOIR ATELIER"
};

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavigation();
  renderProducts("all");
  initFilters();
  initProductModal();
  initQuoteForm();
  initFloatingWhatsApp();
  initScrollReveal();
  initHeaderState();
});

function initLoader() {
  const loader = document.getElementById("pageLoader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hide"), 350);
  });
}

function initNavigation() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  toggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });
}

function renderProducts(filter = "all") {
  const grid = document.getElementById("productGrid");
  const count = document.getElementById("productCount");
  const productSelect = document.getElementById("product");

  if (!grid) return;

  const filtered = PRODUCTS.filter(product =>
    filter === "all" ? true : product.category === filter
  );

  grid.innerHTML = filtered.map((product, index) => `
    <article class="product-card" data-product-id="${product.id}" tabindex="0">
      <div class="product-image">
        <img src="${product.image}" alt="${escapeHTML(product.name)}">
        <span class="product-number">${String(index + 1).padStart(2, "0")}</span>
      </div>
      <div class="product-info">
        <div>
          <p class="product-category">${escapeHTML(product.categoryLabel)}</p>
          <h3>${escapeHTML(product.name)}</h3>
        </div>
        <span class="product-price">FROM<strong>${escapeHTML(product.price)}</strong></span>
      </div>
      <p>${escapeHTML(product.description)}</p>
    </article>
  `).join("");

  count.textContent = `${filtered.length.toString().padStart(2, "0")} PRODUCTS`;

  grid.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => openProductModal(card.dataset.productId));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProductModal(card.dataset.productId);
      }
    });
  });

  if (productSelect) {
    productSelect.innerHTML = `
      <option value="">Belum tahu / Konsultasi</option>
      ${PRODUCTS.map(p => `<option value="${escapeHTML(p.name)}">${escapeHTML(p.name)}</option>`).join("")}
    `;
  }
}

function initFilters() {
  document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      renderProducts(button.dataset.filter);
    });
  });

  document.getElementById("fullCatalogBtn")?.addEventListener("click", () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.getElementById("brief")?.focus(), 600);
  });
}

function initProductModal() {
  document.querySelectorAll("[data-close-modal]").forEach(el => {
    el.addEventListener("click", closeProductModal);
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeProductModal();
  });
}

function openProductModal(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const modal = document.getElementById("productModal");
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalImage").alt = product.name;
  document.getElementById("modalCategory").textContent = product.categoryLabel;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalDescription").textContent = product.description;

  document.getElementById("modalSpecs").innerHTML = Object.entries(product.specs)
    .map(([key, value]) => `
      <div class="modal-spec">
        <b>${escapeHTML(key)}</b>
        ${escapeHTML(value)}
      </div>
    `).join("");

  const text = [
    `Halo, saya tertarik dengan ${product.name}.`,
    "",
    `Mohon informasi quotation untuk minimum order 100 pcs.`,
    `Produk: ${product.name}`,
    "",
    "Saya ingin mengetahui pilihan custom, harga, dan estimasi produksi."
  ].join("\n");

  document.getElementById("modalWhatsApp").href =
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function initQuoteForm() {
  const form = document.getElementById("quoteForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(form);
    const qty = Number(data.get("qty"));

    if (qty < 100) {
      alert("Minimum pemesanan adalah 100 pcs.");
      document.getElementById("qty").focus();
      return;
    }

    const message = [
      `Halo ${CONFIG.brandName}, saya ingin membuat custom merchandise.`,
      "",
      `Nama/Organisasi: ${data.get("name") || "-"}`,
      `Kebutuhan: ${data.get("type") || "-"}`,
      `Jumlah: ${data.get("qty") || "-"} pcs`,
      `Produk: ${data.get("product") || "Belum ditentukan"}`,
      `Deadline: ${data.get("deadline") || "-"}`,
      "",
      "Project brief:",
      data.get("brief") || "-",
      "",
      "Mohon informasi katalog, opsi custom, dan quotation. Terima kasih."
    ].join("\n");

    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
}

function initFloatingWhatsApp() {
  document.getElementById("floatingWa")?.addEventListener("click", () => {
    const text = `Halo ${CONFIG.brandName}, saya ingin konsultasi mengenai custom merchandise dengan MOQ 100 pcs.`;
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".section-heading, .product-card, .why-grid article, .occasion-card, .process-grid article, .faq-list details"
  );

  targets.forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  targets.forEach(el => observer.observe(el));

  document.querySelectorAll(".hero .reveal").forEach(el => {
    requestAnimationFrame(() => el.classList.add("visible"));
  });
}

function initHeaderState() {
  const header = document.getElementById("siteHeader");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }, { passive: true });
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
