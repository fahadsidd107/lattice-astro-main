# Muhammad Fahad Siddiqui — Portfolio

A dark, motion-led Astro portfolio for a Frankfurt-based senior full-stack engineer and technical lead. The design keeps Lattice's precise grid and procedural motion while replacing the original fictional studio content with real experience, capabilities, education and selected systems.

## Local development

```sh
npm install
npm run dev
npm run build
npm run preview
```

Astro writes the production site to `dist/`.

## Edit projects

All five project records live in `src/data/portfolio.json`. Edit only these fields when links or screenshots become available:

```json
{
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://...",
  "image": "/projects/project-name.webp",
  "mobileImage": "/projects/project-name-mobile.webp"
}
```

Place project images in `public/projects/`. Empty links and image fields are supported: the UI shows its procedural system visual and never renders a broken link or image. Images are intentionally not required for launch.

Recommended screenshot sizes are 1600 × 1000 px for `image` and 750 × 1334 px for `mobileImage`, preferably exported as WebP. See `public/projects/README.md` for the exact field rules and asset checklist.

## Contact form

The static site supports Formgong. Create a form and expose its public form identifier at build time:

```sh
PUBLIC_FORMGONG_ACCESS_KEY=fk_your_public_form_identifier
```

For local work, put that value in `.env` (not committed). This is a public form identifier embedded in the generated HTML, not a privileged server secret. If no value is supplied, the page replaces the form with a clear email fallback instead of submitting to a dead endpoint.

## CV and assets

- Public CV: `public/assets/Muhammad-Fahad-Siddiqui-CV.pdf`
- Future project screenshots: `public/projects/`
- Bundled fonts: `public/fonts/`
- Site styling and behavior: `public/site.css`, `public/site.js`

To update the CV, replace the public PDF while keeping its filename so the footer link remains valid.

## Deployment

Use build command `npm run build` and output directory `dist`. The output is static and works on Netlify, Vercel, Cloudflare Pages, and similar hosts. Configure `PUBLIC_FORMGONG_ACCESS_KEY` in the host's build environment if form submission is required.

## Content notes

- Frankfurt time is rendered with the `Europe/Berlin` IANA timezone and follows daylight-saving changes.
- FaultLine is deliberately labeled “Concept / in development”; descriptions do not imply unproven production outcomes.
- Secondary technologies are presented as working knowledge rather than equal-depth primary expertise.
