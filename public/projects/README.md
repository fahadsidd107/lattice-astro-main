# Project screenshots

Add final portfolio screenshots to this folder, then reference them from the matching record in `src/data/portfolio.json`.

Each project supports these fields:

```json
{
  "githubUrl": "https://github.com/your-account/project",
  "liveUrl": "https://project.example.com",
  "image": "/projects/project-name.webp",
  "mobileImage": "/projects/project-name-mobile.webp"
}
```

- `githubUrl`: public source repository, or an empty string when the source is private.
- `liveUrl`: public production/demo URL, or an empty string when no public build exists.
- `image`: desktop screenshot path. Recommended size: **1600 × 1000 px**.
- `mobileImage`: mobile screenshot path. Recommended size: **750 × 1334 px**.

Use WebP for screenshots (quality 80–88 is usually enough). PNG is suitable only when tiny interface text needs lossless rendering. Paths always begin with `/projects/`; do not include `public` in the JSON path. Empty values are supported, so do not add fake URLs or placeholder images.
