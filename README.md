# Belgrade — Wallet App Landing Page

A free, animated landing page template for a fintech / wallet app, distributed as a
[shadcn/ui](https://ui.shadcn.com) registry item.

- **Pages:** `/` (landing), `/about`, `/contact`, `/privacy`, `/terms`
- **Sections:** hero with device mockups, partner marquee, feature grid, bento features,
  scroll-tilted phone with callouts, orbiting integrations, reviews, screen carousel,
  benefits slider, chat-style FAQ, call to action, footer
- **Themes:** dark by default plus light, with a circular View Transition when switching
- **Stack:** Next.js 16, React 19, Tailwind CSS 4, shadcn/ui, Motion, Lucide icons

All phone screens are built in JSX and Tailwind (no screenshots), so they follow the theme
and are easy to edit.

## Install into your project

```bash
npx shadcn@latest add https://YOUR-DOMAIN/r/belgrade.json
```

Then add `suppressHydrationWarning` to the `<html>` tag in `app/layout.tsx`. The theme
script sets the `dark` class before first paint.

This installs:

| Path | What |
| --- | --- |
| `components/belgrade/**` | Shell, header, footer, theme toggle, phone mockups, sections |
| `app/page.tsx`, `app/{about,contact,privacy,terms}/page.tsx` | The five pages |
| `app/globals.css` | Brand tokens, keyframes and theme overrides |

Dependencies `motion` and `lucide-react` are installed automatically, along with the
shadcn `input`, `textarea` and `label` components.

Belgrade's palette applies only on pages that render `<SiteShell>` (through
`:root:has(.belgrade)`), so the rest of your app keeps its own theme.

## Develop this template

```bash
npm install
npm run dev
```

## Publish the registry

1. Set `homepage` in `registry.json` to your deployed URL.
2. Run `npm run registry:build`. This writes `public/r/registry.json` and `public/r/belgrade.json`.
3. Deploy. Both files are served from `/r/` and are what `shadcn add` and registry
   directories read.

Run step 2 again whenever you change a file under `components/belgrade` or one of the pages.

## Customize

- **Brand colors:** the `--brand*` tokens in `app/globals.css` (and `cssVars` in `registry.json`).
- **Partner logos** (`sections/partners.tsx`) are placeholder wordmarks. Swap in your own.
- **Photos** on About and Contact and the hero avatars load from Unsplash. Replace them with your own images.
- **Video ad:** "View video ad" in the hero opens `video-dialog.tsx`. Put your video at
  `public/videos/belgrade-ad.mp4`, or change `VIDEO_AD_SRC` in `sections/hero.tsx`.
- **Contact form** (`contact-form.tsx`) only validates and shows a success state. Connect it to a
  Server Action or API route.
- **Legal pages** use placeholder text. Pass your own content as `children` to `<LegalPage>`.
- **Footer credit:** "Designed with care by Mesbah Lab" in `site-footer.tsx`. Swap in your own name and link.

Animations respect `prefers-reduced-motion`.
