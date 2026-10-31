# Portfolio Revamp Roadmap

## Approved implementation status — 30 October 2026

- [x] LinkedIn confirmed and added.
- [x] Employer names approved for public display.
- [x] Five featured projects finalized: Plotlyst, PitchPulse, Anue, Mentora AI, FaultLine.
- [x] Central project JSON created at `src/data/portfolio.json`; future URLs and image paths are documented in README.
- [x] Numerical vanity statistics omitted in favor of system ownership and qualitative evidence.
- [x] Public phone number added.
- [x] Availability set to full-time roles and selected freelance projects.
- [x] Master CV copied to a downloadable public asset.
- [x] Contact architecture uses optional `PUBLIC_FORMGONG_ACCESS_KEY` with an email fallback when unconfigured.
- [x] Frankfurt `Europe/Berlin` clock, accessibility, keyboard controls and reduced-motion behavior implemented.
- [ ] Add project GitHub/live URLs and screenshots when supplied.
- [ ] Configure the Formgong public identifier in the deployment environment if the web form is desired.

## Goal

Transform the Lattice Astro template into Muhammad Fahad Siddiqui's personal portfolio while preserving its defining character: a restrained dark grid, generous negative space, kinetic typography, procedural orb visuals, and deliberate scroll-led motion.

The finished site should position Muhammad as a senior full-stack engineer and hands-on technical lead with strong backend, frontend, cloud/DevOps, and practical AI-integration experience. It must be concise enough to feel like a portfolio rather than a copy of the master CV.

## Source-of-truth rules

- Use the supplied October 2026 master CV as the primary content source.
- Present approximately five years of cumulative software-development experience, not an inflated rounded-up claim.
- Emphasize evidenced strengths: Java/Spring Boot, TypeScript/Node.js, React/Next.js, Angular, Python/Django, PostgreSQL, API architecture, technical leadership, AWS/Docker/CI/CD, and production ownership.
- Present LLM/RAG and conversational-AI work as practical integration experience, not AI-research or model-training expertise.
- Label Mentora AI as an independent project and Plotlyst/PitchPulse as in development.
- Keep exposure-only items such as TensorFlow, PyTorch, Spark, Kubernetes, Terraform, D3.js, and ECharts out of primary proficiency lists unless their exact depth is confirmed.
- Do not invent testimonials, client quotes, performance claims, repository links, team sizes, or project outcomes.
- Do not expose private keys or secrets in client-side source.

## Confirmed portfolio identity

- Name: Muhammad Fahad Siddiqui
- Positioning: Senior Full-Stack Engineer / Technical Lead / AI & Backend Engineering
- Location: Frankfurt am Main, Germany
- Timezone: `Europe/Berlin`
- Email: `fsiddiqui107@gmail.com`
- Phone: `+49 176 23876395`
- GitHub: `https://github.com/fahadsidd107`
- LinkedIn: `https://www.linkedin.com/in/muhammad-fahad-siddiqui-595484176/`
- Languages: English (IELTS 7.0), German (B1), Urdu (native)

## Information architecture

Keep the one-page experience, but revise it to the following sequence:

1. **Hero**
   - Name/monogram intro and Frankfurt local time.
   - Concise positioning across full-stack, backend architecture, technical leadership, and applied AI.
   - Direct email/phone access and an honest availability line.

2. **Selected work**
   - Retain a five-item interactive project carousel.
   - Final projects: Plotlyst, PitchPulse, Anue education SaaS, Mentora AI, and FaultLine.
   - Clearly distinguish professional systems, independent products, production work, and in-development projects.
   - Replace all fictional screenshots and fictional project copy.
   - Link only to verified live sites or repositories supplied/approved by Muhammad.

3. **Capabilities**
   - Replace the template's generic creative services with engineering capability groups:
     - Full-stack product engineering
     - Backend and API architecture
     - Frontend systems
     - Cloud, DevOps, and production operations
     - Applied AI, LLM, and RAG integration
     - Technical leadership and mentoring
   - Preserve the rotating interactive service module.
   - Replace fictional stats and testimonials with verified evidence, such as 300+ documented REST endpoints and an approximately 26,000-course catalog, only where context is clear.

4. **Experience**
   - Add a compact chronological experience section without turning the page into a long-form CV.
   - Include Anue Education Solutions, MSE Technology, Ashtar Global Solutions / Tumi Labs, Sidat Technologies, Binary Div, and Core2Plus.
   - Show role, company, dates, location/remote context, and one concise evidence-led summary per role.
   - Make the timeline navigable and responsive while staying within the grid language.

5. **About and skills**
   - Replace the six-item tool row with grouped, depth-aware skills.
   - Highlight primary tools first; place secondary or exposure technologies in quieter supporting treatments.
   - Add education and spoken languages in a compact secondary block.
   - Include a CV download link if the public version is approved.

6. **Contact**
   - Replace all Lisbon and fictional contact details with Frankfurt and Muhammad's confirmed channels.
   - Add GitHub and LinkedIn; keep phone and email accessible.
   - Keep the contact form and its success/error states.
   - Replace placeholder privacy/terms links with real destinations or remove them until pages exist.

## Visual and interaction direction

- Preserve the near-black palette, one-pixel grid, procedural orbs, section framing, and restrained amber/teal accents.
- Make Montserrat only slightly heavier: increase the lightest large-display weights modestly while retaining the airy look.
- Use IBM Plex Mono for metadata, dates, labels, stack details, and the Frankfurt clock.
- Add a narrow, low-contrast custom scrollbar with clear hover/active feedback.
- Add subtle pointer-aware responses to project thumbnails, skill cells, timeline entries, and primary links. Avoid novelty effects that compete with the content.
- Keep click, keyboard, touch, reduced-motion, and focus states equivalent.
- Retain the desktop pinned/grid behavior where it remains readable; allow longer experience/skills content to flow naturally rather than forcing cramped viewport panels.
- Maintain the intro's visual signature, adapted to a short personal monogram or name treatment.
- Avoid stock photography and generic developer imagery. Prefer authentic product screenshots supplied by Muhammad; use restrained code/data-inspired abstract visuals only where screenshots are unavailable.

## Content and data refactor

- Move project and capability arrays out of `public/site.js` and into structured source data so content has one source of truth.
- Replace opaque numbered keys in `src/content.json` with semantic field names where practical.
- Make repeated UI (projects, capabilities, skills, experience, social links) data-driven Astro components.
- Keep JavaScript responsible for interactions, not portfolio copy.
- Update document title, description, favicon/monogram, accessible names, and social-sharing metadata.
- Add a downloadable public CV only after confirming which CV version should be exposed.

## Contact-form and secret handling

Current state:

- The form posts directly from the browser to `https://formgong.com/submit`.
- `src/content.json` contains the placeholder `fk_your_access_key`; no live API key from the original developer is present.
- The old email, phone number, Telegram URL, and Lisbon timezone are fictional template values, not active credentials.
- A Formgong access key used this way is necessarily visible in the built frontend. It should be treated as a form identifier, not as a general-purpose private secret.

Planned options:

- **Preferred for the existing static architecture:** create Muhammad's own Formgong form, restrict/verify its allowed origin if the service supports that, enable spam protection, and provide the form access key through deployment configuration rather than committing it as personal configuration.
- **Alternative:** add a server-side/serverless contact endpoint and keep provider credentials private. This adds hosting and maintenance complexity but gives tighter control.
- Never commit email-provider, cloud, OpenAI, or other privileged API secrets into Astro client code or public environment variables.

## Engineering tasks

1. Baseline and preserve
   - Run the existing build and capture desktop/mobile references.
   - Verify keyboard navigation, reduced-motion behavior, contact-form states, and current responsive breakpoints.

2. Restructure content
   - Create semantic portfolio data for identity, socials, projects, experience, skills, education, and languages.
   - Remove all Halden/Lisbon/template-person content and fictional claims.

3. Build sections
   - Adapt header/hero.
   - Rebuild selected work with five verified entries.
   - Convert services to capability groups.
   - Add experience timeline.
   - Expand about/skills and add education/languages.
   - Update contact/footer and optional CV download.

4. Refine the design
   - Tune typography weights and spacing.
   - Add the thin scrollbar and restrained pointer/click responses.
   - Adapt grid heights for denser real content without losing negative space.
   - Replace template imagery with authentic screenshots or approved abstract assets.

5. Configure contact and metadata
   - Connect the selected contact backend.
   - Add spam protection and clear error/fallback messaging.
   - Update SEO, Open Graph, structured data, favicon, canonical URL, and social links.

6. Quality assurance
   - Build and test at desktop, tablet, and mobile widths.
   - Check all links, phone/email actions, project controls, menu behavior, form states, and Frankfurt clock.
   - Check semantic headings, labels, focus visibility, contrast, reduced motion, and keyboard-only use.
   - Check for overflow, layout shift, broken images, console errors, and accidental secret exposure.
   - Run an external visual-design review and iterate on priority findings.

7. Documentation
   - Rewrite `README.md` for Muhammad's portfolio, local development, content editing, contact configuration, deployment, and secret handling.
   - Document which project assets and links are public versus placeholders awaiting confirmation.

## Remaining launch inputs

1. Add public repository/live URLs and screenshots to `src/data/portfolio.json` when available.
2. Configure `PUBLIC_FORMGONG_ACCESS_KEY` in the deployment environment if web-form delivery is desired; direct email remains the fallback.
3. Replace the downloadable master CV later if a shorter public version is prepared.

## Definition of done

- No fictional Halden/Lisbon identity, content, projects, images, stats, testimonials, or links remain.
- Portfolio claims are traceable to the CV or explicitly confirmed by Muhammad.
- The visual identity still reads as Lattice: minimal, dark, grid-led, motion-aware, and spacious.
- The site presents work, experience, capabilities, skills, education, languages, and contact details clearly on desktop and mobile.
- The Frankfurt clock uses `Europe/Berlin` and handles daylight-saving time correctly.
- The contact path works end-to-end without exposing privileged secrets.
- Production build passes and the final responsive/visual/accessibility review has no unresolved high-priority issues.
