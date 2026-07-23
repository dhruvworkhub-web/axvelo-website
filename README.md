# AXVELO — Static Website

**Pure HTML / CSS / JavaScript. No npm. No build step. No framework.**

---

## ⚡ Quick Start — Deploy to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Deploy manually**
2. Drag the entire **`Website/`** folder into the drop zone
3. Your site is live in seconds ✅

---

## 📁 Folder Structure

```
Website/
├── index.html            ← Full website (one page, all sections)
├── css/
│   ├── style.css         ← All visual styles (edit colors, layouts here)
│   ├── animations.css    ← All @keyframes (edit speeds, effects here)
│   └── responsive.css    ← Mobile / tablet breakpoints
├── js/
│   ├── config.js         ← 🔑 MAIN CONFIG — edit text, links, contacts here
│   ├── main.js           ← Site interactivity (navbar, scroll, particles, etc.)
│   └── portfolio.js      ← Renders portfolio cards from data/projects.js
├── data/
│   ├── projects.js       ← 🔑 PORTFOLIO — add/remove projects here
│   └── projects.json     ← Same data as JSON (reference copy)
├── assets/
│   └── images/           ← Drop all images here
│       ├── founder.jpg
│       ├── project-*.jpg / .png
│       └── opengraph.jpg
├── favicon.svg           ← Browser tab icon
└── netlify.toml          ← Netlify deployment config
```

---

## ✏️ How to Edit Everything

### Change contact info, social links, phone, email
→ Open **`js/config.js`** — every section is labelled.

```js
email:    "axveloofficial@gmail.com",   // ← change here
whatsapp: "918619890337",               // ← country code + number, no +

social: {
  instagram: "https://instagram.com/YOUR_HANDLE",
  whatsapp:  "https://wa.me/918619890337",
  email:     "mailto:your@email.com",
},
```

### Add / remove portfolio projects
→ Open **`data/projects.js`**

1. Drop your image in `assets/images/`
2. Add an object at the top of the array:

```js
{
  title:       "My New Project",
  category:    "Graphic Design / Branding",
  description: "One-sentence description.",
  tools:       ["Canva", "Photoshop"],
  image:       "assets/images/my-new-project.jpg",
},
```

To remove a project — delete its object.

### Change the primary colour (orange)
→ Open **`css/style.css`**, find the `:root` block at the top:

```css
--primary:     #ff6b00;   /* change this to any colour */
--primary-rgb: 255, 107, 0;   /* same colour as R, G, B numbers */
```

Both variables must match. Example for blue:
```css
--primary:     #3b82f6;
--primary-rgb: 59, 130, 246;
```

### Change page text (headings, paragraphs)
→ Open **`index.html`** and find the section. Text is plain HTML — just edit it.

### Change the founder section
→ Open **`js/config.js`** → `founder` object:
- Replace `photo` path with your image path
- Update `name`, `role`, `age`, `bio`, `skills`, `stats`

### Change services
→ Open **`js/config.js`** → `services` array:
- Edit `title` and `description` for each card
- Available `icon` values: `pen-tool`, `video`, `monitor`, `map-pin`

### Replace the logo / favicon
- Logo is text rendered in HTML: edit the `.logo-ax` / `.logo-velo` spans in `index.html`
- Favicon: replace `favicon.svg` with your own SVG

### Change fonts
→ In `index.html` `<head>`, swap the Google Fonts `<link>`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700;900&display=swap" rel="stylesheet" />
```
Then in `css/style.css` `:root`:
```css
--font-sans: 'YourFont', system-ui, sans-serif;
```

### Change animation speeds
→ Open **`css/animations.css`** — each `@keyframes` block has duration values in `css/style.css` where the animation is applied.

---

## 🌐 Custom Domain on Netlify

1. Netlify dashboard → **Site settings → Domain management → Add domain**
2. Add your domain name
3. Follow the DNS instructions (add CNAME or A record at your registrar)
4. Netlify issues a free SSL certificate automatically

---

## 💻 Local Preview (without Netlify)

Opening `index.html` directly in a browser works for everything **except** the portfolio (which reads from `data/projects.js` — already embedded, no server needed).

For the best local experience, use one of these free tools:
- **VS Code**: Install the **Live Server** extension → right-click `index.html` → "Open with Live Server"
- **Python**: Run `python3 -m http.server 8080` in the `Website/` folder → open `http://localhost:8080`
- **Node**: Run `npx serve .` in the `Website/` folder

---

## 📋 Full Editing Checklist

| What | File | Where |
|------|------|--------|
| Email, phone, WhatsApp | `js/config.js` | `email`, `whatsapp` |
| Social media links | `js/config.js` | `social` object |
| Add portfolio project | `data/projects.js` | Add object to array |
| Remove portfolio project | `data/projects.js` | Delete object from array |
| Portfolio image | `assets/images/` | Drop file, update path in `data/projects.js` |
| Founder photo | `assets/images/founder.jpg` | Replace file |
| Founder info | `js/config.js` | `founder` object |
| Services | `js/config.js` | `services` array |
| Why Choose Us reasons | `js/config.js` | `whyChooseUs.reasons` |
| Primary colour | `css/style.css` | `:root` → `--primary` |
| Page headings / text | `index.html` | Find the section, edit text |
| SEO title + description | `index.html` | `<head>` meta tags |
| OG image (social preview) | `assets/opengraph.jpg` | Replace file |
| Footer copyright | `js/config.js` | `footer.copyright` |
| Fonts | `index.html` + `css/style.css` | Google Fonts link + `--font-sans` |
| Animation speeds | `css/animations.css` | Duration values |
| Favicon | `favicon.svg` | Replace file |

---

## 🔒 No Dependencies

- ✅ No npm
- ✅ No Node.js
- ✅ No build command
- ✅ No React / Vue / Angular
- ✅ No Webpack / Vite
- ✅ No backend server
- ✅ Works on **any** static host (Netlify, GitHub Pages, Vercel, Cloudflare Pages)
