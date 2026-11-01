// PISTON Admin Portal (demo) — shared by admin/*.html. Demo auth only: nothing leaves the browser.
(function () {
  document.querySelectorAll("[data-year]").forEach((e) => (e.textContent = new Date().getFullYear()));
  const AUTH_KEY = "piston_admin_session";
  const CLICK_KEY = "piston_quote_clicks";
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const param = (k) => new URLSearchParams(location.search).get(k);
  const S = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';

  const ICONS = {
    grid: `<path ${S} d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>`,
    home: `<path ${S} d="M3 11 12 4l9 7M5 10v10h5v-6h4v6h5V10"/>`,
    box: `<path ${S} d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3zM4 7.5l8 4.5 8-4.5M12 12v9"/>`,
    factory: `<path ${S} d="M3 21V9l5 3V9l5 3V4h4v17zM3 21h18M7 16h2M12 16h2"/>`,
    folder: `<path ${S} d="M3 6h7l2 2h9v11H3zM3 10h18"/>`,
    case: `<path ${S} d="M3 7h18v13H3zM9 7V4h6v3M3 13h18"/>`,
    news: `<path ${S} d="M4 4h13v16H6a2 2 0 0 1-2-2zM17 8h3v10a2 2 0 0 1-2 2M7 8h7M7 12h7M7 16h4"/>`,
    video: `<path ${S} d="M3 6h13v12H3zM16 10l5-3v10l-5-3"/>`,
    calendar: `<path ${S} d="M4 5h16v16H4zM4 10h16M8 3v4M16 3v4"/>`,
    cal2: `<path ${S} d="M4 5h16v16H4zM4 10h16M8 3v4M16 3v4M8 14h3v3H8z"/>`,
    buoy: `<circle ${S} cx="12" cy="12" r="9"/><circle ${S} cx="12" cy="12" r="4"/><path ${S} d="m5.6 5.6 3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/>`,
    gear: `<circle ${S} cx="12" cy="12" r="3"/><path ${S} d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>`,
    play: `<circle ${S} cx="12" cy="12" r="9"/><path ${S} d="m10 8.5 5 3.5-5 3.5z"/>`,
    tool: `<path ${S} d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>`,
    help: `<circle ${S} cx="12" cy="12" r="9"/><path ${S} d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17h.01"/>`,
    wa: `<path ${S} d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path ${S} d="M9 9.5c.3 2.5 2.5 4.6 5 5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z"/>`,
    headset: `<path ${S} d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H5a1 1 0 0 1-1-1zM20 14h-3v5h2a1 1 0 0 0 1-1zM17 19c0 1.5-2 2-4 2"/>`,
    mail: `<path ${S} d="M3 5h18v14H3zM3 6l9 7 9-7"/>`,
    meet: `<circle ${S} cx="8" cy="8" r="3"/><circle ${S} cx="16" cy="8" r="3"/><path ${S} d="M2 19a6 6 0 0 1 12 0M10 19a6 6 0 0 1 12 0"/>`,
    send: `<path ${S} d="M21 3 3 10l7 3 3 7zM10 13l11-10"/>`,
    image: `<path ${S} d="M3 5h18v14H3z"/><circle ${S} cx="9" cy="10" r="2"/><path ${S} d="m3 17 5-5 4 4 3-3 6 6"/>`,
    building: `<path ${S} d="M4 21V4h10v17M14 9h6v12M7 8h2M7 12h2M7 16h2M17 13h1M17 17h1M2 21h20"/>`,
    users: `<circle ${S} cx="9" cy="8" r="3.5"/><path ${S} d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6"/>`,
    globe: `<circle ${S} cx="12" cy="12" r="9"/><path ${S} d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>`,
    seo: `<circle ${S} cx="11" cy="11" r="7"/><path ${S} d="m20 20-4-4M8 11h6M11 8v6"/>`,
    lang: `<path ${S} d="M4 5h9M8.5 3v2M6 5c1 4 4 7 7 8M11 5c-1 4-4 7-7 8M13 21l4-10 4 10M14.5 17h5"/>`,
    stats: `<path ${S} d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>`,
    shield: `<path ${S} d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path ${S} d="m8.5 12 2.5 2.5 4.5-5"/>`,
    activity: `<path ${S} d="M3 12h4l3-8 4 16 3-8h4"/>`,
    bell: `<path ${S} d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/>`,
    collapse: `<path ${S} d="M4 4h16v16H4zM9 4v16M15 9l-3 3 3 3"/>`,
    plus: `<path ${S} d="M12 5v14M5 12h14"/>`,
    chev: `<path ${S} d="m6 9 6 6 6-6"/>`,
    right: `<path ${S} d="M4 12h16M14 6l6 6-6 6"/>`,
    left: `<path ${S} d="M20 12H4M10 6l-6 6 6 6"/>`,
    lock: `<path ${S} d="M5 11h14v10H5zM8 11V8a4 4 0 0 1 8 0v3M12 15v2"/>`,
    lockR: `<path ${S} d="M5 11h10M5 11v10h7M8 11V8a4 4 0 0 1 8 0v1"/><path ${S} d="M21 16a4 4 0 1 1-1.2-2.8M21 12v3h-3"/>`,
    lockQ: `<path ${S} d="M13 21H5V11h12v1.5M8 11V7.5a4 4 0 0 1 8 0V11"/><circle ${S} cx="18" cy="18" r="4.2"/><path ${S} stroke-width="1.5" d="M16.8 17a1.3 1.3 0 1 1 1.7 1.2c-.3.1-.5.4-.5.7v.2M18 20.6h.01"/>`,
    key: `<circle ${S} cx="8" cy="15" r="4"/><path ${S} d="m11 12 9-9M16 7l3 3M14 9l2 2"/>`,
    eye: `<path ${S} d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle ${S} cx="12" cy="12" r="3"/>`,
    eyeOff: `<path ${S} d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.6 9.6 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2"/>`,
    check: `<path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" d="m4 12 5 5L20 6"/>`,
    checkC: `<circle ${S} cx="12" cy="12" r="9"/><path ${S} d="m8 12 3 3 5-6"/>`,
    info: `<circle ${S} cx="12" cy="12" r="9"/><path ${S} d="M12 11v6M12 7.5h.01"/>`,
    menu: `<path ${S} d="M3 6h18M3 12h18M3 18h18"/>`,
    search: `<circle ${S} cx="11" cy="11" r="7"/><path ${S} d="m20 20-4-4"/>`,
    cube: `<path ${S} d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9"/>`,
    sheet: `<path ${S} d="M5 3h14v18H5zM5 9h14M5 15h14M12 9v12"/>`,
    doc: `<path ${S} d="M6 2h9l5 5v15H6zM14 2v6h6M9 13h8M9 17h8"/>`,
    alert: `<circle ${S} cx="12" cy="12" r="9"/><path ${S} d="M12 7v6M12 16.5h.01"/>`,
    clock: `<circle ${S} cx="12" cy="12" r="9"/><path ${S} d="M12 7v5l3 2"/>`,
    access: `<path ${S} d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path ${S} d="m8.5 12 2.5 2.5 4.5-5"/>`,
    perm: `<circle ${S} cx="9" cy="8" r="3.5"/><path ${S} d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6"/>`,
    track: `<circle ${S} cx="12" cy="12" r="9"/><path ${S} d="M12 6v6l4 2"/><path ${S} d="M3 12h2M19 12h2"/>`,
    backup: `<path ${S} d="M7 18a5 5 0 0 1-.6-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1-1 9M12 20v-8M9 14.5l3-3 3 3"/>`,
    logout: `<path ${S} d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11"/>`
  };
  const icon = (name, cls = "") => `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  let toastEl;
  function toast(text) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "ad-toast"; toastEl.setAttribute("role", "status"); document.body.append(toastEl); }
    toastEl.textContent = text;
    toastEl.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(() => toastEl.classList.remove("show"), 2600);
  }

  // Render data-icon placeholders used in static markup.
  function hydrateIcons(root = document) {
    qsa("[data-icon]", root).forEach((el) => { el.outerHTML = icon(el.dataset.icon, el.getAttribute("class") || ""); });
  }

  const session = () => { try { return JSON.parse(sessionStorage.getItem(AUTH_KEY)); } catch { return null; } };
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

  function setError(input, msg) {
    const box = input.closest(".ad-input");
    box.classList.toggle("bad", !!msg);
    let err = box.parentElement.querySelector(".ad-err");
    if (!msg) { err && err.remove(); return; }
    if (!err) { err = document.createElement("p"); err.className = "ad-err"; box.after(err); }
    err.textContent = msg;
  }

  function wireEyes(root = document) {
    qsa(".ad-eye", root).forEach((b) => b.addEventListener("click", () => {
      const inp = b.parentElement.querySelector("input");
      const show = inp.type === "password";
      inp.type = show ? "text" : "password";
      b.innerHTML = icon(show ? "eyeOff" : "eye");
      b.setAttribute("aria-label", show ? "Hide password" : "Show password");
    }));
  }

  // ---------------- Sign in ----------------
  function initLogin() {
    const f = qs("#loginForm");
    const email = qs("#email", f), pwd = qs("#password", f), remember = qs("#remember", f);
    const saved = localStorage.getItem("piston_admin_email");
    if (saved) { email.value = saved; remember.checked = true; }
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      // Demo: any non-empty email + password signs in.
      const okE = !!email.value.trim(), okP = !!pwd.value;
      setError(email, okE ? "" : "Enter your email address.");
      setError(pwd, okP ? "" : "Enter your password.");
      if (!okE || !okP) return;
      sessionStorage.setItem(AUTH_KEY, JSON.stringify({ email: email.value.trim(), at: Date.now() }));
      if (remember.checked) localStorage.setItem("piston_admin_email", email.value.trim()); else localStorage.removeItem("piston_admin_email");
      location.href = "dashboard.html";
    });
  }

  // ---------------- Forgot password ----------------
  function initForgot() {
    const f = qs("#forgotForm");
    const email = qs("#email", f);
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!emailOk(email.value)) { setError(email, "Enter a valid email address."); return; }
      const card = qs(".ad-card");
      card.innerHTML = `
        <div class="ad-badge-ico ok">${icon("mail")}</div>
        <h2>Check Your Email</h2>
        <p class="ad-sub">If an account exists for <b>${esc(email.value.trim())}</b>,<br>we've sent a link to reset your password.</p>
        <div class="ad-how">${icon("info")}<div><b>Didn't get the email?</b><p>The link expires in 30 minutes. Check your spam folder,<br>or request a new link below.</p></div></div>
        <a class="ad-btn" href="reset.html">Open Reset Link (Demo) ${icon("right")}</a>
        <button class="ad-btn ad-btn-ghost" type="button" id="resend" style="margin-top:14px">${icon("send")} Resend link</button>
        <a class="ad-back" href="login.html">${icon("left")} Back to sign in</a>`;
      qs("#resend").addEventListener("click", () => toast("A new reset link has been sent (demo)"));
      qs("h2", card).setAttribute("tabindex", "-1"); qs("h2", card).focus();
    });
  }

  // ---------------- Reset password ----------------
  const RULES = [
    ["len", "At least 8 characters", (v) => v.length >= 8],
    ["up", "One uppercase letter", (v) => /[A-Z]/.test(v)],
    ["low", "One lowercase letter", (v) => /[a-z]/.test(v)],
    ["num", "One number", (v) => /\d/.test(v)],
    ["sp", "One special character", (v) => /[^A-Za-z0-9]/.test(v)]
  ];
  function initReset() {
    const card = qs(".ad-card");
    const showDone = () => {
      card.classList.add("ad-done");
      card.parentElement.classList.add("is-done");
      card.innerHTML = `
        <div class="ad-badge-ico ok">${icon("checkC")}</div>
        <h2>Password Reset Successful!</h2>
        <p class="ad-sub">Your password has been reset successfully.<br>You can now sign in with your new password.</p>
        <img class="ad-done-art" src="../assets/img/admin/reset-done.png" alt="Browser window with a lock and a green check mark">
        <a class="ad-btn" href="login.html">Go to Sign In ${icon("right")}</a>
        <a class="ad-btn ad-btn-ghost" href="dashboard.html">${icon("home")} Return to Admin Portal</a>`;
      document.title = "Password Reset Successful — PISTON Admin";
    };
    if (param("done") === "1") { showDone(); return; }
    const f = qs("#resetForm");
    const pwd = qs("#password", f), conf = qs("#confirm", f), meter = qs(".ad-meter", f);
    qs(".ad-rules ul", f).innerHTML = RULES.map(([k, t]) => `<li data-rule="${k}">${icon("check")}${t}</li>`).join("");
    const update = () => {
      const v = pwd.value;
      const passed = RULES.filter(([k, , fn]) => { const ok = fn(v); qs(`[data-rule="${k}"]`, f).classList.toggle("ok", ok); return ok; }).length;
      // "Strong" fills 2 of 3 bars as in mockup 08.10.19; the 3rd bar needs 14+ characters.
      const level = !v ? 0 : passed <= 2 ? 1 : passed < RULES.length ? 2 : v.length >= 14 ? 4 : 3;
      meter.className = "ad-meter " + ["", "weak", "fair", "strong", "strong"][level];
      qsa("i", meter).forEach((i, n) => i.classList.toggle("on", n < [0, 1, 2, 2, 3][level]));
      qs("span", meter).textContent = ["", "Weak", "Fair", "Strong", "Very strong"][level];
      return passed;
    };
    if (param("demo") === "1") { pwd.value = conf.value = "Piston@2024"; }
    pwd.addEventListener("input", () => { update(); setError(pwd, ""); });
    conf.addEventListener("input", () => setError(conf, ""));
    update();
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const strong = update() === RULES.length;
      setError(pwd, strong ? "" : "Your password doesn't meet all the requirements yet.");
      const match = conf.value && conf.value === pwd.value;
      setError(conf, match ? "" : "Passwords don't match.");
      if (strong && match) showDone();
    });
  }

  // ---------------- Dashboard ----------------
  function smooth(pts) {
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  }
  let gid = 0;
  function spark(values, color) {
    const w = 77, h = 26, max = Math.max(...values), min = Math.min(...values);
    const pts = values.map((v, i) => [i * w / (values.length - 1), 2 + (h - 4) * (1 - (v - min) / (max - min || 1))]);
    const id = "sg" + gid++;
    return `<svg class="spark" viewBox="0 0 ${w} ${h}" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".16"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
      <path d="${smooth(pts)} L${w},${h} L0,${h}Z" fill="url(#${id})"/><path d="${smooth(pts)}" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round"/></svg>`;
  }

  function leadChart(series) {
    const W = 382, H = 160, x0 = 30, x1 = 362, y0 = 140, yTop = 9, max = 40;
    const xs = [0, .084, .162, .25, .318, .372, .482, .566, .647, .728, .844, .925, 1];
    const Y = (v) => y0 - (y0 - yTop) * v / max;
    const grid = [0, 10, 20, 30, 40].map((v) => `<line x1="${x0}" x2="${x1}" y1="${Y(v)}" y2="${Y(v)}" stroke="#eef0f3"/><text x="10" y="${Y(v) + 3.5}" text-anchor="end">${v}</text>`).join("");
    const days = ["May 12", "May 13", "May 14", "May 15", "May 16", "May 17", "May 18"];
    const labels = days.map((d, i) => `<text x="${x0 + (x1 - x0) * i / 6}" y="${H - 4}" text-anchor="middle">${d}</text>`).join("");
    const lines = series.map((s, n) => {
      const pts = s.values.map((v, i) => [x0 + (x1 - x0) * xs[i], Y(v)]);
      const id = "lg" + n;
      return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.color}" stop-opacity=".14"/><stop offset="1" stop-color="${s.color}" stop-opacity="0"/></linearGradient></defs>
        <path d="${smooth(pts)} L${x1},${y0} L${x0},${y0}Z" fill="url(#${id})"/>
        <path d="${smooth(pts)}" fill="none" stroke="${s.color}" stroke-width="1.6"/>
        ${pts.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="1.8" fill="${s.color}"><title>${s.name}: ${Math.round(s.values[pts.indexOf(p)])}</title></circle>`).join("")}`;
    }).join("");
    return `<svg class="ad-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Lead activity, May 12 to May 18">${grid}${labels}${lines}</svg>`;
  }

  const ago = (iso) => {
    const m = Math.max(1, Math.round((Date.now() - new Date(iso)) / 60000));
    return m < 60 ? `${m}m ago` : m < 1440 ? `${Math.round(m / 60)}h ago` : `${Math.round(m / 1440)}d ago`;
  };

  function initDashboard() {
    if (!session() && param("demo") === "1") sessionStorage.setItem(AUTH_KEY, JSON.stringify({ email: "admin@piston-machinery.com", at: Date.now() }));
    const s = session();
    if (!s) { location.replace("login.html"); return; }
    qs("#userEmail").textContent = s.email;

    // KPI cards (demo figures as in the mockup; the real numbers come from the CMS).
    const KPIS = [
      ["Total Products", "48", "4", "this month", "box", "c-red", "#ef3340", [5, 6, 5, 7, 5, 6, 4, 6, 12, 13]],
      ["Industries", "6", "1", "this month", "factory", "c-blue", "#2f80ed", [5, 6, 5, 7, 5, 6, 4, 6, 12, 14]],
      ["Projects", "38", "6", "this month", "folder", "c-violet", "#7c3aed", [5, 6, 5, 7, 5, 6, 4, 6, 12, 12]],
      ["WhatsApp Quote Clicks", "124", "18", "this week", "wa", "c-orange", "#f59e0b", [5, 6, 5, 6, 7, 5, 6, 4, 6, 12, 11]],
      ["Engineer Requests", "24", "5", "this week", "headset", "c-green", "#16a34a", [3, 4, 3, 5, 3, 4, 3, 6, 4, 11, 4]],
      ["Support Tickets", "32", "3", "this week", "buoy", "c-red", "#ef3340", [4, 5, 4, 7, 5, 6, 3, 7, 5, 9, 6, 8], true],
      ["News Articles", "28", "7", "this month", "news", "c-amber", "#f5b400", [4, 5, 4, 6, 4, 7, 4, 5, 9, 11]],
      ["Events", "7", "2", "upcoming", "cal2", "c-teal", "#0f9f8f", [4, 5, 6, 5, 7, 5, 4, 5, 11, 5, 9]]
    ];
    qs("#kpis").innerHTML = KPIS.map(([t, v, d, unit, ic, c, col, data, down]) => `
      <article class="ad-kpi"><div class="ad-kpi-ico ${c}">${icon(ic)}</div>
        <div><b>${t}</b><strong>${v}</strong><small><i class="${down ? "dn" : ""}">${down ? "↓" : "↑"} ${d}</i> ${unit}</small></div>${spark(data, col)}</article>`).join("");

    qs("#leadChart").innerHTML = leadChart([
      { name: "WhatsApp Quote Clicks", color: "#ef3340", values: [14, 22.5, 23, 22.5, 29, 34, 23, 20, 22.5, 29.5, 23, 29.5, 33.5] },
      { name: "Engineer Requests", color: "#2f80ed", values: [7, 14, 15, 13.5, 19, 20, 15, 12.5, 13, 19, 13.5, 17.5, 20] }
    ]);

    // Anonymous WhatsApp quote-click log: clicks made on the public demo in this browser come first.
    const PILL = { Product: "p-amber", "Quote List": "p-blue", Finder: "p-green", Compare: "p-gray", "Spare Parts": "p-gray" };
    const seed = [
      ["EG", "c-red", "Cairo, Egypt", "Desktop · English", "R32 Sliding Table Saw", "Quantity: 1", "Product", "20m ago"],
      ["SA", "c-blue", "Riyadh, Saudi Arabia", "Mobile · Arabic", "PEB 368 Edge Banding", "Quantity: 2", "Quote List", "1h ago"],
      ["AE", "c-green", "Dubai, UAE", "Desktop · English", "PVPM 2500 Vacuum Press", "Quantity: 1", "Finder", "2h ago"],
      ["JO", "c-violet", "Amman, Jordan", "Mobile · Arabic", "PBD 21 Drilling Machine", "Quantity: 3", "Compare", "3h ago"],
      ["KW", "c-orange", "Kuwait City, Kuwait", "Desktop · English", "PJ 1300 Panel Saw", "Quantity: 1", "Product", "5h ago"]
    ];
    let local = [];
    try { local = JSON.parse(localStorage.getItem(CLICK_KEY) || "[]"); } catch { local = []; }
    const rows = local.slice(0, 5).map((c) => ["••", "c-gray", "This browser (demo)", c.source || "Website", c.items || "General enquiry", c.channel === "parts" ? "Spare Parts channel" : "Sales channel",
      c.channel === "parts" ? "Spare Parts" : "Product", ago(c.at)]).concat(seed).slice(0, 5);
    qs("#quotes").insertAdjacentHTML("beforeend", rows.map(([cc, c, place, dev, item, qty, src, t]) => `
      <div class="ad-q"><span class="ad-av ${c}" title="Country (from IP, anonymous)">${esc(cc)}</span>
        <div><b>${esc(place)}</b><small>${esc(dev)}</small></div>
        <div><b>${esc(item)}</b><small>${esc(qty)}</small></div>
        <div class="r"><span class="ad-pill ${PILL[src] || "p-gray"}">${esc(src)}</span><small>${esc(t)}</small></div></div>`).join(""));

    const CONTENT = [["Products", 48, "#ef3340"], ["Projects", 38, "#2f80ed"], ["Case Studies", 42, "#22a55a"], ["News", 28, "#f59e0b"], ["Videos", 16, "#8b5cf6"], ["Events", 7, "#14b8a6"], ["Others", 58, "#cfd3da"]];
    const total = CONTENT.reduce((a, c) => a + c[1], 0);
    let acc = 0;
    // 1.2deg white slivers separate the segments, as in the mockup.
    qs("#donut").style.background = `conic-gradient(${CONTENT.map(([, v, col]) => { const a = acc; acc += v; const s = a / total * 360, e = acc / total * 360; return `${col} ${s.toFixed(2)}deg ${(e - 1.2).toFixed(2)}deg, #fff ${(e - 1.2).toFixed(2)}deg ${e.toFixed(2)}deg`; }).join(", ")})`;
    qs("#donutTotal").textContent = total;
    qs("#contentLegend").innerHTML = CONTENT.map(([n, v, col]) => `<li><i style="background:${col}"></i>${n}<span>${v} (${(v / total * 100).toFixed(1)}%)</span></li>`).join("");

    // Sidebar / header actions that are outside this demo.
    const app = qs(".ad-app"), burger = qs(".ad-burger");
    const setNav = (open) => { app.classList.toggle("nav-open", open); burger.setAttribute("aria-expanded", open); };
    document.addEventListener("click", (e) => {
      const mod = e.target.closest("[data-mod]");
      if (mod) { e.preventDefault(); toast(`${mod.dataset.mod} — demo`); return; }
      const user = e.target.closest(".ad-user");
      const menu = qs(".ad-menu");
      if (user) { menu.classList.toggle("show"); user.setAttribute("aria-expanded", menu.classList.contains("show")); return; }
      if (!e.target.closest(".ad-menu")) menu.classList.remove("show");
      if (e.target.closest(".ad-burger")) setNav(!app.classList.contains("nav-open"));
      else if (e.target === app) setNav(false); // backdrop (.ad-app::after) of the off-canvas sidebar
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && app.classList.contains("nav-open")) { setNav(false); burger.focus(); } });
    qs("#signOut").addEventListener("click", (e) => { e.preventDefault(); sessionStorage.removeItem(AUTH_KEY); location.href = "login.html"; });
    const search = qs(".ad-search input");
    document.addEventListener("keydown", (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); search.focus(); } });
    qs(".ad-search").addEventListener("submit", (e) => { e.preventDefault(); toast(`Global search for “${search.value || "…"}” — demo`); });
  }

  hydrateIcons();
  wireEyes();
  qsa(".ad-lang").forEach((b) => b.addEventListener("click", () => toast("Arabic (RTL) is available in the full portal — demo")));
  const page = document.body.dataset.page;
  ({ login: initLogin, forgot: initForgot, reset: initReset, dashboard: initDashboard }[page] || (() => {}))();
  window.AD = { icon, toast };
})();
