Startup Landing Page
====================

A modern, conversion-focused landing page system for startups, SaaS products, and digital agencies. Includes two home page variants, marketing subpages, componentized partials, and utility scripts.

## Project structure

```
assets/
  css/        Core, responsive, dark-mode, animation, and Home 2 styles
  js/         Main utilities, SaaS enhancements, form handler, and placeholders for Bootstrap/jQuery
  img/        Organized folders for hero, about, features, testimonials, pricing, team, logos, icons, and Home 2 assets
  fonts/      Place custom font files here
  vendors/    Store 3rd-party libraries if needed
pages/        HTML pages (home variants, features, pricing, team, blog, auth, dashboard, policies, 404)
partials/     Shared header, footer, sidebar, preloader, and modal markup
docs/         Documentation, changelog, and credits
demo/         Preview images
```

## Getting started

1. Replace placeholder logos/images inside `assets/img/` with your own assets.
2. Update copy, navigation links, and CTAs within the `pages/` HTML files.
3. Serve locally with any static server (for example, `npx serve pages`).
4. Optional: swap the placeholder `bootstrap.bundle.js` and `jquery.min.js` with official builds before going live.

## Customization tips

- Tweak colors, typography, and spacing by editing CSS variables at the top of `assets/css/style.css`.
- Each section uses descriptive classes and `data-animate` attributes for scroll-triggered animations.
- Include partials with `<div data-include="../partials/header.html"></div>` and the loader in `assets/js/main.js` will insert them automatically.
- Home Page 2 specific styles and scripts live in `assets/css/home2.css` and `assets/js/home2.js`.

## Forms

`assets/js/form-handler.js` ships with a placeholder endpoint. Replace `FORM_ENDPOINT` with your service (Formspree, Netlify Forms, Zapier, or your own API).

## Dark mode

Dark mode toggles via the switch in the header, storing user preference in `localStorage`. Customize styles in `assets/css/dark-mode.css`.

## Deploying

Upload the project to any static hosting provider (Netlify, Vercel, GitHub Pages). Ensure file paths remain relative as provided.

## License

Use this template freely for personal or commercial projects. Attribution is appreciated but not required.

