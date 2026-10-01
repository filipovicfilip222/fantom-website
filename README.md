# fantom.systems

Site for Fantom Systems (Filip Filipović). Next.js 14, Tailwind, no client-side
frameworks beyond React. Everything is static at build time.

The site has one job: when a client follows a link from an Upwork proposal or a
LinkedIn message, it has to show working systems and measured results in under
a minute. No blog, no product, no newsletter until that changes on purpose.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # must pass before every push
```

## Structure

| Path | What it is |
|---|---|
| `lib/site.ts` | Every URL and switch. **Start here.** Empty strings mean "not yet" and the UI falls back. |
| `lib/content.ts` | Home-page copy: three offers, package sizes, working principles, about text |
| `lib/work.ts` | The four case studies. Every number must exist in the project's README or published report |
| `app/page.tsx` | Home: hero with a real result, offers, demos, work, how I work, about, contact |
| `app/work/[slug]/page.tsx` | Case-study pages, generated from `lib/work.ts` |
| `app/demo/page.tsx` | Invoice-to-JSON demo, embeds the Hugging Face Space once its URL is set |
| `app/opengraph-image.png`, `app/icon.png` | Link preview and favicons (generated, see below) |
| `public/mark.png` | Brand mark recoloured to ink for the light theme; `mark-white.png` for dark backgrounds |

## Switches to flip (lib/site.ts)

| Field | Set it when | Effect |
|---|---|---|
| `links.upworkCatalog` | The MCP catalog project URL is copied from Upwork | Upwork buttons point at the catalog instead of the profile |
| `links.booking` | A cal.com (or similar) link exists | "Book 20 minutes" opens the calendar instead of an email |
| `links.linkedin` | Decided to show it | LinkedIn appears in the footer |
| `demos.invoiceSpace` | The HF Space is public, e.g. `https://filipovicfilip222-invoice-to-json.hf.space` | Demo card appears on the home page, `/demo` embeds the Space, `/demo` enters the sitemap |
| `demos.mcpRemoteUrl` | `mcp.fantom.systems/belex` is deployed | The belex-mcp demo shows the remote URL next to the npx install |

Before setting `demos.invoiceSpace`, make sure the Space does not keep uploaded
files; the demo page says they are processed in memory and not stored.

## Deploy

The repo was previously deployed on Vercel; pushing to `main` redeploys. If the
project is not connected any more: Vercel → Add New Project → import this repo,
framework preset Next.js, no environment variables needed.

Domain: in Vercel add `fantom.systems` and `www.fantom.systems` (redirect www to
apex). At the DNS provider:

```
A      @     76.76.21.21
CNAME  www   cname.vercel-dns.com
```

Vercel shows the exact records when you add the domain; use those if they differ.

## Email (filip@fantom.systems)

Pick one provider, add its MX records, then add these three so mail from the
domain is not treated as spam:

```
TXT  @        v=spf1 include:<provider SPF> ~all
TXT  _dmarc   v=DMARC1; p=none; rua=mailto:filip@fantom.systems
CNAME/TXT     DKIM record(s) as given by the provider
```

Provider SPF includes: Google Workspace `_spf.google.com`; Zoho Mail (EU data
centre) `zohomail.eu`. After a month with no failures in the DMARC reports,
tighten `p=none` to `p=quarantine`.

## Subdomains planned

| Host | Points at | When |
|---|---|---|
| `mcp.fantom.systems` | Remote belex-mcp (Cloudflare Workers or Fly.io) | After the remote transport is built |
| `demo.fantom.systems` | Redirect to `/demo` | Optional; `/demo` is enough |

## Regenerating images

`app/opengraph-image.png`, `app/twitter-image.png`, `app/icon.png`,
`app/apple-icon.png` and `public/mark.png` were generated with Pillow from
`public/logo1.png` and IBM Plex Sans. If the headline changes, regenerate the
Open Graph image so link previews match.

## Content rules

1. Promise only what a demo or a published project already shows.
2. A number goes on the site after it is in the project's README or report, not before.
3. Limitations are listed on every case study. They are what makes the numbers believable.
4. No arrows, no superlatives, no "production-grade" until there is production.
5. English only. Local clients are not the audience.
6. The current employer is not named until the employment contract's clauses on
   side work and public profiles have been checked.
