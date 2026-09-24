# Hello World

A simple, responsive single page application for testing GitHub Pages.

- `index.html` – page shell with header, menu and footer
- `style.css` – responsive styles (hamburger menu under 640px, automatic dark mode)
- `app.js` – tiny hash-based router with four pages: Home, About, Features, Contact

No build step and no dependencies.

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Publish on GitHub Pages

1. Push to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick the branch and the `/ (root)` folder, then save.
4. After a minute the site is live at `https://<username>.github.io/<repo>/`.
