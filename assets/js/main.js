// PISTON demo — shared behaviour (header/footer, WhatsApp quote flow, quote list, tabs, helpers)
(function () {
  const D = window.PISTON_DATA;
  const S = D.settings;
  const base = document.body.dataset.base || "";
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const param = (k) => new URLSearchParams(location.search).get(k);

  const ICONS = {
    search: '<path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4.3-4.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    globe: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    wa: '<path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    gear: '<circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m8.5 12 2.5 2.5 4.5-5" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    globe2: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    award: '<circle cx="12" cy="9" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    truck: '<path d="M2 6h11v10H2zM13 10h4l4 4v2h-8z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    users: '<circle cx="9" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    cut: '<circle cx="6" cy="6" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6" stroke="currentColor" stroke-width="1.8"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5zM3 13l9 5 9-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    press: '<path d="M4 4h16v4H4zM8 8v5M16 8v5M3 13h18v3H3zM5 16v4M19 16v4" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    drill: '<circle cx="7" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 5h18v14H3z" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    dots: '<circle cx="5" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="19" cy="12" r="2" fill="currentColor"/>',
    home: '<path d="M3 11 12 4l9 7v9h-6v-6H9v6H3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    door: '<path d="M6 3h12v18H6zM14 12h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    sofa: '<path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M2 13a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v5H2zM5 18v2M19 18v2" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    factory: '<path d="M2 20V10l6 4V10l6 4V6h3l1 14z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    hammer: '<path d="m14 6 4 4-9.5 9.5-4-4zM12 4l3-2 5 5-2 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    cabinet: '<path d="M4 3h16v18H4zM4 12h16M12 3v18M9 7.5h.01M15 7.5h.01M9 16.5h.01M15 16.5h.01" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    doc: '<path d="M6 2h9l5 5v15H6zM14 2v6h6M9 13h8M9 17h8" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    video: '<path d="M3 6h13v12H3zM16 10l5-3v10l-5-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    phone: '<path d="M5 3h4l2 5-3 2a11 11 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    mail: '<path d="M3 5h18v14H3zM3 6l9 7 9-7" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    pin: '<path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="9" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    help: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17h.01" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    calendar: '<path d="M4 5h16v16H4zM4 10h16M8 3v4M16 3v4" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    rotate: '<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'
  };
  const icon = (name, cls = "") => `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  // Stylised machine illustrations (placeholders for real product photography)
  function machineSVG(kind = "saw", dark = false) {
    const body = dark ? "#d9d9de" : "#2b2b30";
    const top = dark ? "#f2f2f4" : "#4a4a52";
    const accent = "#e30613";
    const metal = dark ? "#9a9aa2" : "#8a8a92";
    const shapes = {
      saw: `<rect x="40" y="120" width="320" height="18" rx="3" fill="${top}"/><rect x="20" y="108" width="210" height="12" rx="2" fill="${metal}"/>
            <rect x="150" y="138" width="130" height="80" rx="4" fill="${body}"/><rect x="160" y="148" width="40" height="8" fill="${accent}"/>
            <circle cx="235" cy="104" r="34" fill="none" stroke="${metal}" stroke-width="6"/><path d="M215 72h46l10 20h-56z" fill="${accent}" opacity=".9"/>
            <rect x="300" y="100" width="70" height="20" rx="2" fill="${body}"/><rect x="330" y="138" width="40" height="40" rx="3" fill="${body}"/>
            <rect x="160" y="218" width="12" height="20" fill="${body}"/><rect x="258" y="218" width="12" height="20" fill="${body}"/><rect x="40" y="138" width="10" height="100" fill="${metal}"/>`,
      edge: `<rect x="20" y="110" width="360" height="90" rx="6" fill="${body}"/><rect x="20" y="96" width="360" height="16" rx="3" fill="${top}"/>
             <rect x="30" y="120" width="340" height="10" fill="${accent}"/><rect x="60" y="140" width="60" height="44" rx="3" fill="${top}"/>
             <rect x="140" y="140" width="60" height="44" rx="3" fill="${top}"/><rect x="220" y="140" width="60" height="44" rx="3" fill="${top}"/>
             <rect x="300" y="60" width="60" height="36" rx="4" fill="${body}"/><rect x="306" y="66" width="48" height="20" fill="#1fa855" opacity=".7"/>
             <circle cx="50" cy="96" r="14" fill="${metal}"/><rect x="30" y="200" width="14" height="30" fill="${body}"/><rect x="356" y="200" width="14" height="30" fill="${body}"/>`,
      press: `<rect x="30" y="70" width="340" height="30" rx="4" fill="${body}"/><rect x="40" y="100" width="12" height="70" fill="${metal}"/><rect x="348" y="100" width="12" height="70" fill="${metal}"/>
              <rect x="30" y="170" width="340" height="40" rx="4" fill="${body}"/><rect x="40" y="160" width="320" height="10" fill="${accent}"/>
              <rect x="60" y="210" width="16" height="26" fill="${body}"/><rect x="324" y="210" width="16" height="26" fill="${body}"/>
              <rect x="300" y="40" width="60" height="30" rx="4" fill="${top}"/><path d="M80 85h240" stroke="${metal}" stroke-width="4" stroke-dasharray="10 8"/>`,
      drill: `<rect x="40" y="150" width="320" height="22" rx="3" fill="${top}"/><rect x="70" y="172" width="260" height="56" rx="4" fill="${body}"/>
              <rect x="60" y="60" width="280" height="40" rx="4" fill="${body}"/><rect x="60" y="100" width="280" height="10" fill="${accent}"/>
              ${Array.from({ length: 9 }, (_, i) => `<rect x="${82 + i * 30}" y="110" width="6" height="34" fill="${metal}"/>`).join("")}
              <rect x="40" y="60" width="16" height="90" fill="${metal}"/><rect x="344" y="60" width="16" height="90" fill="${metal}"/>`,
      other: `<rect x="30" y="140" width="340" height="20" rx="3" fill="${top}"/>${Array.from({ length: 8 }, (_, i) => `<circle cx="${55 + i * 42}" cy="150" r="7" fill="${metal}"/>`).join("")}
              <rect x="40" y="160" width="12" height="60" fill="${body}"/><rect x="348" y="160" width="12" height="60" fill="${body}"/>
              <rect x="140" y="70" width="120" height="70" rx="6" fill="${body}"/><rect x="152" y="82" width="96" height="46" rx="3" fill="#1fa855" opacity=".55"/>
              <rect x="152" y="82" width="40" height="8" fill="${accent}"/><path d="M160 120l18-14 16 10 20-18 22 12" fill="none" stroke="#fff" stroke-width="3"/>`
    };
    return `<svg viewBox="0 0 400 250" aria-hidden="true"><ellipse cx="200" cy="238" rx="170" ry="10" fill="#000" opacity=".18"/>${shapes[kind] || shapes.saw}</svg>`;
  }

  const product = (id) => D.products.find((p) => p.id === id);
  const industry = (slug) => D.industries.find((i) => i.slug === slug);
  const catName = (id) => (D.categories.find((c) => c.id === id) || {}).name || "";

  // ---------- Quote list (browser session only) ----------
  const QL_KEY = "piston_quote_list";
  const getQL = () => { try { return JSON.parse(sessionStorage.getItem(QL_KEY)) || []; } catch { return []; } };
  const setQL = (l) => { sessionStorage.setItem(QL_KEY, JSON.stringify(l.slice(0, 20))); updateBadge(); };
  function addToQL(id, qty = 1, silent = false) {
    const l = getQL(); const it = l.find((x) => x.id === id);
    if (!it && l.length >= 20) { toast("Your quote list is full (max 20 machines)"); return; }
    if (it) it.qty += qty; else l.push({ id, qty });
    setQL(l);
    if (!silent) toast(`${product(id)?.model || "Item"} added to your quote list`);
  }
  function updateBadge() {
    const n = getQL().reduce((a, b) => a + b.qty, 0);
    qsa(".quote-count").forEach((b) => { b.textContent = n; b.classList.toggle("hidden", !n); });
  }

  // ---------- Compare (browser session only) ----------
  const CMP_KEY = "piston_compare";
  const getCmp = () => { try { return JSON.parse(sessionStorage.getItem(CMP_KEY)) || []; } catch { return []; } };
  const setCmp = (l) => sessionStorage.setItem(CMP_KEY, JSON.stringify(l.slice(0, 4)));

  // ---------- WhatsApp ----------
  const CLICK_KEY = "piston_quote_clicks";
  function logClick(channel, items, source) {
    // Anonymous click log — demo stand-in for the server log shown on the Admin dashboard.
    const log = JSON.parse(localStorage.getItem(CLICK_KEY) || "[]");
    log.unshift({ channel, items: items.map((i) => `${i.label}${i.qty > 1 ? " ×" + i.qty : ""}`).join(", "), source, at: new Date().toISOString() });
    localStorage.setItem(CLICK_KEY, JSON.stringify(log.slice(0, 50)));
  }
  function buildMessage(channel, items, source) {
    if (channel === "support") return ["Hello Piston Technical Support team,", "I need help with my machine.", "", `Source: ${source}`, "Language: English"].join("\n");
    const lines = [channel === "parts" ? "Hello Piston Spare Parts team," : "Hello Piston team,"];
    if (items.length) {
      lines.push(channel === "parts" ? "I would like a quotation for these spare parts:" : "I would like a quotation for:");
      items.forEach((i) => lines.push(`• ${i.label}${i.qty ? " — Qty: " + i.qty : ""}`));
    } else {
      lines.push("I would like a quotation for your machinery.");
    }
    lines.push("", `Source: ${source}`, "Language: English");
    return lines.join("\n");
  }
  function openWhatsApp({ channel = "sales", items = [], source = document.title }) {
    const msg = buildMessage(channel, items, source);
    const num = S.whatsapp[channel] || S.whatsapp.sales;
    const url = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
    const label = { parts: "Spare Parts", support: "Technical Support" }[channel] || "Sales";
    const m = modal(`
      <div class="wa-head"><div class="wa-ico">${icon("wa")}</div><div><h3 class="mb-0">Continue on WhatsApp</h3>
      <small class="muted">${esc(label)} · ${esc(S.whatsappDisplay[channel] || S.whatsappDisplay.sales)}</small></div></div>
      <p class="muted" style="font-size:14px">${channel === "support" ? "Your support request continues in WhatsApp directly with our technical team." : "Your quote request continues in WhatsApp directly with our team."} We reply within 24 hours. You can edit the message before sending.</p>
      <div class="wa-preview">${esc(msg)}</div>
      <div class="wa-qr"><img src="${base}assets/img/qr/wa-${S.whatsapp[channel] ? channel : "sales"}.png" alt="QR code to chat with Piston on WhatsApp" width="92" height="92">
        <p class="muted" style="font-size:12px;margin:0">No WhatsApp on this computer? Scan the code with your phone or message <b>${esc(S.whatsappDisplay[channel] || S.whatsappDisplay.sales)}</b>. The conversation is subject to WhatsApp's terms.</p></div>
      <div class="flex mt-2"><a class="btn btn-wa" target="_blank" rel="noopener" href="${url}" data-wa-go>${icon("wa")} Open WhatsApp</a>
      <button class="btn btn-outline" data-close>Cancel</button></div>`);
    qs("[data-wa-go]", m).addEventListener("click", () => { logClick(channel, items, source); setTimeout(closeModal, 300); });
  }

  // ---------- Modal + toast ----------
  let backdrop;
  function modal(html) {
    if (!backdrop) {
      backdrop = document.createElement("div"); backdrop.className = "modal-backdrop";
      backdrop.addEventListener("click", (e) => { if (e.target === backdrop || e.target.closest("[data-close]")) closeModal(); });
      document.body.appendChild(backdrop);
    }
    backdrop.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><button class="modal-close" data-close aria-label="Close">×</button>${html}</div>`;
    backdrop.classList.add("show");
    return backdrop;
  }
  function closeModal() { backdrop && backdrop.classList.remove("show"); }
  let toastEl, toastT;
  function toast(text) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; document.body.appendChild(toastEl); }
    toastEl.textContent = text; toastEl.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("show"), 2400);
  }

  // ---------- Header / footer ----------
  const LOGO = () => `<a class="logo" href="${base}index.html"><img src="${base}assets/img/home/logo-mark.png" alt="" width="34" height="33">PISTON</a>`;
  function header(active) {
    const navs = [
      { key: "products", label: "Products", href: "products.html", drop: D.categories.map((c) => [c.name, `products.html?cat=${c.id}`]).concat([["Compare Machines", "compare.html"], ["View All Products", "products.html"]]) },
      { key: "industries", label: "Industries", href: "industries.html", drop: D.industries.map((i) => [i.name, `industry.html?slug=${i.slug}`]).concat([["View All Industries", "industries.html"]]) },
      { key: "solutions", label: "Solutions", href: "machine-finder.html", drop: [["Machine Finder", "machine-finder.html"], ["Build Your Production Line", "industries.html"], ["Custom Solutions", "talk-to-engineer.html?type=custom"]] },
      { key: "support", label: "Support", href: "support.html", drop: [["Support Center", "support.html"], ["User Manuals", "support.html#res"], ["Spare Parts", "spare-parts.html"], ["Maintenance Videos", "videos.html"], ["Technical Support", "technical-support.html"], ["FAQ", "faq.html"]] },
      { key: "about", label: "About Piston", href: "about.html", drop: [["About Piston", "about.html"], ["News, Case Studies & Projects", "hub.html"], ["Case Studies", "case-studies.html"], ["Projects", "projects.html"], ["News & Insights", "news.html"], ["Videos", "videos.html"], ["Events & Exhibitions", "event.html"]] },
      { key: "contact", label: "Contact", href: "contact.html" }
    ];
    return `
    <header class="site-header"><div class="container header-inner">
      ${LOGO()}
      <nav class="main-nav" id="mainNav">${navs.map((n) => `
        <div class="nav-item ${n.key === active ? "active" : ""}"><a class="nav-link" href="${base}${n.href}">${n.label}${n.key === "products" ? ' <span class="caret">⌄</span>' : ""}</a>
        ${n.drop ? `<div class="nav-drop">${n.drop.map(([t, h]) => `<a href="${base}${h}">${t}</a>`).join("")}</div>` : ""}</div>`).join("")}
      </nav>
      <div class="header-tools">
        <form class="header-search" id="hSearch" action="${base}search.html"><input name="q" placeholder="Search machines, models…" aria-label="Search"></form>
        <button class="h-icon" aria-label="Search" onclick="document.getElementById('hSearch').classList.toggle('open');document.querySelector('#hSearch input').focus()">${icon("search")}</button>
        <a class="h-icon quote-icon" href="${base}quote-list.html" title="Quote list">${icon("list")}<span class="quote-count hidden">0</span></a>
        <span class="lang" title="Arabic coming soon">${icon("globe")}EN <span class="caret">⌄</span></span>
        <button class="btn btn-red btn-head" data-wa-quote data-source="Header">Request a Quote</button>
        <button class="burger" aria-label="Menu" onclick="document.getElementById('mainNav').classList.toggle('open')">${icon("menu")}</button>
      </div>
    </div></header>`;
  }

  const SOCIAL = {
    in: '<path fill="currentColor" d="M6.5 8.5h-3v11h3zM5 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.5 13.2c0-3-1.6-4.9-4.2-4.9-1.4 0-2.4.8-2.8 1.5V8.5h-3v11h3v-6c0-1.4.6-2.6 2-2.6s1.9 1.1 1.9 2.6v6h3.1z"/>',
    yt: '<path fill="currentColor" d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8zM10 15V9l5.2 3z"/>',
    fb: '<path fill="currentColor" d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4a20 20 0 0 0-2.2-.1c-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21z"/>',
    ig: '<rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="16.8" cy="7.2" r="1" fill="currentColor"/>',
    send: '<path fill="currentColor" d="M3 11 21 3l-8 18-2-7-8-3zm8 2 1.3 4.5L17.8 6z"/>'
  };
  const sIcon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${SOCIAL[k]}</svg>`;

  function ctaStrip() {
    const b = document.body.dataset;
    return `<section class="cta-strip"><div class="container">
      <div><h2>${esc(b.ctaTitle || "Need a complete production solution?")}</h2><p>${b.ctaText ? esc(b.ctaText) : "Tell us what you need and our team will help you find<br>the right machinery configuration."}</p></div>
      <div class="cta-action"><button class="btn btn-white btn-cta" data-wa-quote data-source="CTA strip">Request a Quote Now <span>→</span></button><small>${esc(b.ctaNote || "It's fast, easy and free!")}</small></div>
      <img class="cta-art" src="${base}${b.ctaArt || "assets/img/home/cta-wireframe.png"}" alt="">
    </div></section>`;
  }

  function footer() {
    const col = (title, links) => `<div><h4>${title}</h4>${links.map(([t, h]) => `<a href="${base}${h}">${t}</a>`).join("")}</div>`;
    const simple = document.body.dataset.footer === "simple";
    const plain = document.body.dataset.footer === "plain";
    const v5 = document.body.dataset.footer === "values5";
    const v6 = document.body.dataset.footer === "values6";
    const values6 = [["Premium Quality", "Built for performance<br>and long life"], ["Precise Engineering", "High accuracy for<br>professional results"], ["Reliable Support", "Global service and<br>technical assistance"],
      ["Spare Parts", "Genuine parts for<br>maximum uptime"], ["Warranty", "2 Years warranty on<br>standard machines"], ["Training", "Operator and maintenance<br>training programs"]];
    const values5 = [["Global Delivery", "Worldwide shipping<br>& installation"], ["Quality Guaranteed", "Certified machines<br>& components"], ["Expert Support", "Technical support<br>available 24/7"],
      ["Spare Parts", "Genuine parts for<br>maximum uptime"], ["Training", "Operator and maintenance<br>training programs"]];
    const contact = `<div class="footer-contact"><h4>Contact Us</h4>
          <span>${icon("pin")}${esc(S.address)}</span>
          <a href="tel:${esc(S.phone)}">${icon("phone")}${esc(S.phone)}</a>
          <a href="mailto:${esc(S.infoEmail)}">${icon("mail")}${esc(S.infoEmail)}</a>
          <a href="${base}index.html">${icon("globe")}${esc(S.website)}</a></div>`;
    const about = `<div class="footer-about">${LOGO()}<p>Piston is a leading manufacturer of professional woodworking machinery built for precision, durability and industrial performance.</p>
          <div class="socials">${[["in", "LinkedIn"], ["yt", "YouTube"], ["fb", "Facebook"], ["ig", "Instagram"]].map(([k, t]) => `<a href="#" aria-label="${t}" data-toast="${t} page — link set from the Admin Portal (demo)">${sIcon(k)}</a>`).join("")}</div></div>`;
    const products = col("Products", [["Sliding Table Saws", "products.html?cat=saws"], ["Edge Banding Machines", "products.html?cat=edge"], ["Vacuum Presses", "products.html?cat=press"], ["Drilling Machines", "products.html?cat=drill"], ["Other Machinery", "products.html?cat=other"], ["View All Products", "products.html"]]);
    const support = col("Support", [["User Manuals", "support.html#res"], ["Spare Parts", "spare-parts.html"], ["Maintenance Videos", "videos.html"], ["Technical Support", "technical-support.html"], ["FAQ", "faq.html"]]);
    const company = col("Company", [["About Piston", "about.html"], ["Quality & Certifications", "about.html"], ["News & Events", "news.html"], ["Contact Us", "contact.html"]]);
    const values = [["val-delivery", "Global Delivery", "Worldwide shipping<br>& installation"], ["val-quality", "Quality Guaranteed", "Certified machines<br>& components"],
      ["val-support", "Expert Support", "Technical support<br>available 24/7"], ["val-service", "After Sales Service", "Spare parts & maintenance<br>support"]];
    return `
    ${document.body.hasAttribute("data-cta") ? ctaStrip() : ""}
    <footer class="site-footer"><div class="container">
      ${v5 ? `<div class="footer-top v5">${values5.map(([t, d], i) => `<div class="fval"><img src="${base}assets/img/finder/fv-${i + 1}.png" alt=""><div><b>${t}</b><small>${d}</small></div></div>`).join("")}</div>` : ""}
      ${v6 ? `<div class="footer-top v6">${values6.map(([t, d], i) => `<div class="fval"><img src="${base}assets/img/viewer/fv6-${i + 1}.png" alt=""><div><b>${t}</b><small>${d}</small></div></div>`).join("")}</div>` : ""}
      ${simple || plain || v5 || v6 ? "" : `<div class="footer-top">
        <div class="stay"><h4>Stay Updated</h4><p>Subscribe to our newsletter for the latest machines, solutions and offers.</p>
          <form class="newsletter-mini" data-newsletter><input type="email" required placeholder="Your email address" aria-label="Your email address"><button aria-label="Subscribe">${sIcon("send")}</button></form></div>
        ${values.map(([img, t, d]) => `<div class="fval"><img src="${base}assets/img/products/${img}.png" alt=""><div><b>${t}</b><small>${d}</small></div></div>`).join("")}
      </div>`}
      <div class="footer-grid ${simple ? "simple" : ""} ${v6 || document.body.hasAttribute("data-footer-solutions") ? "v6" : ""}">
        ${about}${products}
        ${simple ? "" : col("Industries", D.industries.slice(0, 5).map((i) => [i.name, `industry.html?slug=${i.slug}`]).concat([["View All Industries", "industries.html"]]))}
        ${v6 || document.body.hasAttribute("data-footer-solutions") ? col("Solutions", [["Machine Finder", "machine-finder.html"], ["Production Line Builder", "industries.html"], ["Custom Solutions", "talk-to-engineer.html?type=custom"]]) : ""}
        ${support}${company}${contact}
        ${simple ? `<div><h4>Newsletter</h4><p class="nl-text">Subscribe to get the latest updates and offers.</p>
          <form class="newsletter-mini" data-newsletter><input type="email" required placeholder="Your email" aria-label="Your email"><button aria-label="Subscribe">${sIcon("send")}</button></form></div>` : ""}
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} ${esc(S.company)}. All rights reserved.</span><span class="legal">${["Privacy Policy", "Terms of Use"].map((t) => `<a href="#" data-toast="${t} — page content to be provided by Piston (demo)">${t}</a>`).join("")}<a href="${base}sitemap.html">Sitemap</a></span></div>
    </div></footer>`;
  }

  // ---------- Renderers ----------
  const PHOTOS = ["r32", "r42", "pj1300", "peb368", "peb468", "peb580", "pvpm2500", "pvpm3000", "pbd21", "pbd29", "pbd42"];
  const KEY_LABELS = { saw: ["Power", "Max Cutting Length", "Blade Diameter"], edge: ["Power", "Edge Thickness", "Feed Speed"], press: ["Power", "Table Size", "Vacuum Pressure"], drill: ["Power", "Drilling Heads", "Max Drilling Depth"], other: ["Power", "Capacity", "Control"] };
  const KEY_ICONS = ["bolt", "cut", "gear"];
  function productImg(p, cls = "") {
    return PHOTOS.includes(p.id) ? `<img class="${cls}" src="${base}assets/img/products/${p.id}.png" alt="${esc(p.model)} ${esc(p.name)}">` : machineSVG(p.kind);
  }
  function productCard(p, opts = {}) {
    const labels = KEY_LABELS[p.kind] || KEY_LABELS.other;
    return `<article class="pcard">
      ${opts.badge ? '<span class="pc-badge">Featured</span>' : ""}<button class="pc-fav" aria-label="Save" onclick="this.classList.toggle('on')">♡</button>
      <a class="pc-img" href="${base}product.html?id=${p.id}">${productImg(p)}</a>
      <a class="pc-model" href="${base}product.html?id=${p.id}">${esc(p.model)}</a>
      <div class="pc-type">${esc(p.name)}</div>
      <p class="pc-desc">${esc(p.desc)}</p>
      <div class="pc-specs">${p.key.map((k, i) => `<div><span>${icon(KEY_ICONS[i])}<b>${esc(k)}</b></span><small>${labels[i]}</small></div>`).join("")}</div>
      <div class="pc-actions"><a class="btn btn-outline btn-xs" href="${base}product.html?id=${p.id}">View Details</a>
        <button class="btn btn-red btn-xs" data-wa-quote data-items="${p.id}" data-source="${esc(opts.source || "Product card")}">Request a Quote</button></div>
      ${opts.compare !== false ? `<label class="pc-compare"><input type="checkbox" data-compare="${p.id}" ${getCmp().includes(p.id) ? "checked" : ""}> Add to Compare</label>` : ""}
    </article>`;
  }
  function statsHTML(list = S.stats) {
    return list.map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("");
  }
  function caseCard(c) {
    const ind = industry(c.industry);
    return `<article class="card"><a href="${base}case-study.html?id=${c.id}" class="photo ${c.photo}"><span class="loc">${esc(c.city)}, ${esc(c.country)}</span></a>
      <div class="card-body"><span class="badge ${c.type === "Project" ? "blue" : "red"}" style="align-self:flex-start">${c.type}</span>
      <h3 class="mb-0"><a href="${base}case-study.html?id=${c.id}">${esc(c.title)}</a></h3>
      <small class="muted">Industry: ${esc(ind ? ind.name : "")} · Solution: ${esc(c.solutionType)} · ${c.year}</small>
      <p>${esc(c.summary)}</p>
      <div class="metrics">${c.metrics.slice(0, 3).map(([v, l]) => `<div><div class="metric">${v}</div><small>${l}</small></div>`).join("")}</div>
      <a class="link-arrow mt-1" href="${base}case-study.html?id=${c.id}">Read ${c.type === "Project" ? "Project" : "Case Study"}</a></div></article>`;
  }
  function hubTabs(active) {
    const n = { cases: D.cases.filter((c) => c.type === "Case Study").length, projects: D.cases.length, news: D.news.length, videos: D.videos.length };
    const all = n.projects + n.news + n.videos;
    return `<div class="tabs">${[["hub", "All Content", all, "hub.html"], ["cases", "Case Studies", n.cases, "case-studies.html"], ["projects", "Projects", n.projects, "projects.html"],
      ["news", "News", n.news, "news.html"], ["videos", "Videos", n.videos, "videos.html"], ["events", "Events", D.events.length, "event.html"]]
      .map(([k, t, c, h]) => `<a class="tab ${k === active ? "active" : ""}" href="${base}${h}">${t}<span class="n">(${c})</span></a>`).join("")}</div>`;
  }
  function hoursHTML() {
    return S.hours.map((h) => `<div class="kv"><span>${esc(h.channel)}</span><span style="text-align:right">${esc(h.days)}<br>${esc(h.time)} <small class="muted">${esc(h.tz)}</small></span></div>`).join("");
  }

  // ---------- Generic interactions ----------
  function initTabs(root = document) {
    qsa("[data-tabs]", root).forEach((wrap) => {
      const tabs = qsa(".tab", wrap);
      const activate = (name, push) => {
        tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
        qsa(`.tab-panel[data-group="${wrap.dataset.tabs}"]`).forEach((p) => p.classList.toggle("active", p.dataset.panel === name));
        if (push && wrap.dataset.hash !== undefined) history.replaceState(null, "", "#" + name);
      };
      tabs.forEach((t) => t.addEventListener("click", () => activate(t.dataset.tab, true)));
      const fromHash = location.hash.slice(1);
      activate(wrap.dataset.hash !== undefined && tabs.some((t) => t.dataset.tab === fromHash) ? fromHash : tabs[0]?.dataset.tab, false);
    });
  }

  function itemsFromAttr(attr) {
    if (!attr) return [];
    return attr.split(",").map((id) => { const p = product(id.trim()); return p ? { label: `${p.model} ${p.name}`, qty: 1 } : null; }).filter(Boolean);
  }

  // Carousel arrows: move the highlighted card, or rotate the cards when none is highlighted.
  function carousel(arrow) {
    const g = arrow.parentElement.querySelector(".mcards, .rel-grid"), cards = g ? [...g.children] : [];
    if (cards.length < 2) return;
    const next = arrow.classList.contains("r"), on = cards.findIndex((c) => c.classList.contains("on"));
    if (on < 0) { if (next) g.append(cards[0]); else g.prepend(cards[cards.length - 1]); return; }
    const to = cards[(on + (next ? 1 : cards.length - 1)) % cards.length], btn = cards[on].querySelector(".circle-btn");
    cards[on].classList.remove("on"); to.classList.add("on");
    if (btn) to.querySelector(".foot").append(btn);
  }

  document.addEventListener("click", (e) => {
    const tst = e.target.closest("[data-toast]");
    if (tst) { e.preventDefault(); toast(tst.dataset.toast); return; }
    const arrow = e.target.closest(".nav-arrow");
    if (arrow) { carousel(arrow); return; }
    const wa = e.target.closest("[data-wa-quote]");
    if (wa) { e.preventDefault(); openWhatsApp({ channel: wa.dataset.channel || "sales", items: itemsFromAttr(wa.dataset.items), source: wa.dataset.source || document.title }); return; }
    const add = e.target.closest("[data-quote-add]");
    if (add) { e.preventDefault(); add.dataset.quoteAdd.split(",").forEach((id, i, arr) => addToQL(id.trim(), 1, arr.length > 1)); if (add.dataset.quoteAdd.includes(",")) toast("Machines added to your quote list"); if (add.dataset.go) location.href = base + "quote-list.html"; return; }
    const acc = e.target.closest(".acc-q");
    if (acc) acc.parentElement.classList.toggle("open");
  });

  document.addEventListener("change", (e) => {
    const c = e.target.closest("[data-compare]");
    if (!c) return;
    let l = getCmp();
    if (c.checked) { if (l.length >= 4) { c.checked = false; toast("You can compare up to 4 machines"); return; } l.push(c.dataset.compare); }
    else l = l.filter((x) => x !== c.dataset.compare);
    setCmp(l); renderCompareBar();
  });

  function renderCompareBar() {
    let bar = qs(".compare-bar");
    if (!document.body.hasAttribute("data-compare-bar")) return;
    if (!bar) { bar = document.createElement("div"); bar.className = "compare-bar"; document.body.appendChild(bar); }
    const l = getCmp();
    bar.innerHTML = `<div class="container"><div class="flex"><b>${l.length} machine${l.length === 1 ? "" : "s"} selected</b>
      <div class="chips">${l.map((id) => `<span class="chip dark">${esc(product(id)?.model)}</span>`).join("")}</div></div>
      <div class="flex"><button class="btn btn-outline btn-sm" id="cmpClear">Clear</button><a class="btn btn-red btn-sm" href="${base}compare.html">Compare Machines</a></div></div>`;
    bar.classList.toggle("show", l.length > 0);
    qs("#cmpClear", bar).onclick = () => { setCmp([]); qsa("[data-compare]").forEach((x) => (x.checked = false)); renderCompareBar(); };
  }

  function initForms() {
    qsa("form[data-demo-form]").forEach((f) => f.addEventListener("submit", (e) => {
      e.preventDefault();
      const prefix = f.dataset.demoForm || "REQ";
      const ref = `${prefix}-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900000) + 100000)}`;
      f.innerHTML = `<div class="success-box"><div class="tick">✓</div><h3>Thank you — request received</h3>
        <p class="muted">Your reference number</p><div class="ref">${ref}</div>
        <p class="muted mt-2">A confirmation email has been sent. Our team replies within 24 business hours.</p>
        <a class="btn btn-dark mt-2" href="${base}index.html">Back to Home</a></div>`;
      f.scrollIntoView({ behavior: "smooth", block: "center" });
    }));
    qsa("form[data-newsletter]").forEach((f) => f.addEventListener("submit", (e) => { e.preventDefault(); f.reset(); toast("Please check your inbox to confirm your subscription"); }));
  }

  // Analytics consent (GEN-10): GA4 would only load after "Accept".
  function consentBanner() {
    const K = "piston_consent";
    if (localStorage.getItem(K)) return;
    const b = document.createElement("div");
    b.className = "consent"; b.setAttribute("role", "dialog"); b.setAttribute("aria-label", "Cookie consent");
    b.innerHTML = `<b>We value your privacy</b>We use essential cookies to run this site and, with your consent, analytics cookies to improve it.
      <div class="row"><button class="btn btn-red" data-c="all">Accept analytics</button><button class="btn btn-outline" data-c="essential">Essential only</button></div>`;
    b.addEventListener("click", (e) => { const c = e.target.closest("[data-c]"); if (!c) return; localStorage.setItem(K, c.dataset.c); b.remove(); });
    document.body.appendChild(b);
  }

  // ---------- Boot ----------
  document.addEventListener("DOMContentLoaded", () => {
    const h = qs("#site-header"); if (h) h.outerHTML = header(document.body.dataset.nav);
    const f = qs("#site-footer"); if (f) f.outerHTML = footer();
    qsa("[data-stats]").forEach((el) => (el.innerHTML = statsHTML(el.dataset.stats === "extra" ? S.statsExtra : S.stats)));
    qsa("[data-hours]").forEach((el) => (el.innerHTML = hoursHTML()));
    qsa("[data-setting]").forEach((el) => (el.textContent = S[el.dataset.setting] ?? ""));
    updateBadge(); initForms(); renderCompareBar(); consentBanner();
    document.dispatchEvent(new Event("piston:ready"));
    initTabs();
  });

  window.P = { D, S, base, qs, qsa, esc, param, icon, machineSVG, product, productImg, industry, catName, productCard, caseCard, hubTabs, statsHTML, hoursHTML,
    getQL, setQL, addToQL, getCmp, setCmp, openWhatsApp, toast, modal, closeModal, initTabs, renderCompareBar };
})();
