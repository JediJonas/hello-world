// Tiny hash-based router. Hash routes (#/about) work on GitHub Pages
// without any server-side configuration.

const routes = {
  "/": {
    title: "Home",
    render: () => `
      <section class="hero">
        <h1>Hello World! 👋</h1>
        <p class="lead">A simple, responsive single page application hosted on GitHub Pages.
        Use the menu to move between pages — no page reloads required.</p>
        <a class="btn" href="#/features">See the features</a>
      </section>
      <div class="grid">
        <div class="card"><div class="icon">⚡</div><h2>Fast</h2><p>Plain HTML, CSS and JavaScript. No build step.</p></div>
        <div class="card"><div class="icon">📱</div><h2>Responsive</h2><p>Looks good on phones, tablets and desktops.</p></div>
        <div class="card"><div class="icon">🌙</div><h2>Dark mode</h2><p>Follows your system colour scheme automatically.</p></div>
      </div>`,
  },
  "/about": {
    title: "About",
    render: () => `
      <h1>About</h1>
      <p class="lead">This site exists purely to test publishing on GitHub Pages.</p>
      <p>It is a single page application: every "page" is rendered by JavaScript into the
      same HTML document, and navigation happens by changing the URL hash
      (for example <code>#/about</code>).</p>
      <p>Because everything is static, GitHub Pages can serve it straight from the repository.</p>`,
  },
  "/features": {
    title: "Features",
    render: () => `
      <h1>Features</h1>
      <p class="lead">A few small things to try out.</p>
      <div class="grid">
        <div class="card">
          <h2>Click counter</h2>
          <p>You clicked <strong id="count">0</strong> times.</p>
          <p style="margin-top:1rem"><button class="btn" id="counter-btn">Click me</button></p>
        </div>
        <div class="card">
          <h2>Current time</h2>
          <p id="clock"></p>
        </div>
        <div class="card">
          <h2>Screen size</h2>
          <p>Your viewport is <strong id="viewport"></strong>. Try resizing the window.</p>
        </div>
      </div>`,
    mount: () => {
      let count = 0;
      const countEl = document.getElementById("count");
      document.getElementById("counter-btn").addEventListener("click", () => {
        countEl.textContent = ++count;
      });

      const clock = document.getElementById("clock");
      const tick = () => { clock.textContent = new Date().toLocaleTimeString(); };
      tick();
      const timer = setInterval(tick, 1000);

      const viewport = document.getElementById("viewport");
      const size = () => { viewport.textContent = `${window.innerWidth} × ${window.innerHeight}`; };
      size();
      window.addEventListener("resize", size);

      return () => {
        clearInterval(timer);
        window.removeEventListener("resize", size);
      };
    },
  },
  "/contact": {
    title: "Contact",
    render: () => `
      <h1>Contact</h1>
      <p class="lead">A demo form. Nothing is actually sent anywhere.</p>
      <form id="contact-form">
        <div><label for="name">Name</label><input id="name" required></div>
        <div><label for="email">Email</label><input id="email" type="email" required></div>
        <div><label for="message">Message</label><textarea id="message" rows="5" required></textarea></div>
        <div><button class="btn" type="submit">Send</button></div>
      </form>
      <div id="form-result"></div>`,
    mount: () => {
      const form = document.getElementById("contact-form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const result = document.getElementById("form-result");
        result.innerHTML = `<p class="notice"></p>`;
        result.firstChild.textContent = `Thanks, ${name}! (This is just a demo — nothing was sent.)`;
        form.reset();
      });
    },
  },
};

const notFound = {
  title: "Not found",
  render: () => `
    <h1>404 — Page not found</h1>
    <p class="lead">That page doesn't exist.</p>
    <a class="btn" href="#/">Go home</a>`,
};

const app = document.getElementById("app");
const nav = document.getElementById("site-nav");
const toggle = document.querySelector(".menu-toggle");
let cleanup = null;

function currentPath() {
  const path = location.hash.replace(/^#/, "") || "/";
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

function render() {
  const path = currentPath();
  const route = routes[path] || notFound;

  if (cleanup) { cleanup(); cleanup = null; }

  app.innerHTML = route.render();
  // Restart the fade animation
  app.style.animation = "none";
  void app.offsetWidth;
  app.style.animation = "";

  if (route.mount) cleanup = route.mount() || null;

  document.title = `${route.title} · Hello World`;
  document.querySelectorAll("[data-route]").forEach((a) => {
    const active = a.dataset.route === path;
    a.classList.toggle("active", active);
    if (active) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  closeMenu();
  window.scrollTo(0, 0);
  app.focus({ preventScroll: true });
}

function closeMenu() {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

document.getElementById("year").textContent = new Date().getFullYear();
window.addEventListener("hashchange", render);
render();
