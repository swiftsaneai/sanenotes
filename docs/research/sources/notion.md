# Notion — Exhaustive Product Research (for a competing note app "Sane Notes")

**Scope:** Web, macOS, Windows, iOS, Android. Sourced from Notion's official Help Center (notion.com/help), Notion pricing/product pages, App/Play store descriptions surfaced in search, and third‑party reviews/forums for complaints. Every claim traces to a fetched page or search snippet; uncertain items are marked **(unverified)**.

**Headline framing for our purposes:** Notion is a **block-based docs + databases + wiki** platform. It is emphatically **not** a pen-first / ink note app. It has **no drawing canvas, no ink engine, no PDF ink annotation, no handwriting recognition, and no native OCR**. Its strengths are structured data (databases, relations, rollups, formulas), collaboration, publishing, and (increasingly) AI. This makes it a poor direct competitor to GoodNotes/Notability but a strong competitor to Evernote/OneNote/Obsidian on the "typed structured notes" axis. The pen-first gap is our biggest opportunity.

---

## Organization & Library (notebooks / folders / tags / favorites / search)

- **Everything is a page, and pages nest infinitely.** There are no "notebooks" or "folders" per se; hierarchy is achieved by nesting pages inside pages (a page can contain sub-pages to any depth). Sub-pages appear as toggle-expandable items in the sidebar.
- **Workspaces** are the top container (one account can belong to many). Within a workspace, the **sidebar** is the primary navigator.
- **Teamspaces** subdivide the sidebar into team areas (see Teamspaces section). Personal pages live under a "Private" section; shared content lives in teamspaces or "Shared."
- **Favorites**: any page can be pinned to a "Favorites" section at the top of the sidebar.
- **No traditional tags for pages.** Tagging is done inside **databases** via Select/Multi-select/Status properties. Loose (non-database) pages cannot be tagged; you organize them by nesting or by turning them into database items.
- **Search:** Global quick-find (`Cmd/Ctrl+P` or `Cmd/Ctrl+K`) jumps to pages by title and recently viewed; in-page find is `Cmd/Ctrl+F`. Search covers page titles and body text. **It does NOT search text inside images or scanned PDFs (no OCR)** — a long-standing, frequently cited gap.
- **Home** dashboard aggregates recent pages, upcoming events, and database widgets.

## Handwriting & Ink Tools — **Effectively none (critical gap)**

This is the category where Notion is weakest, and it matters most for a pen-first competitor.

- **No native drawing/ink canvas.** You cannot draw freehand, sketch diagrams, or take handwritten notes on a blank canvas in Notion. There is no pen tool, no brush/nib selection, no pressure/tilt response, no smoothing, no highlighter pen, no ink eraser, no lasso-select of strokes, no ruler, no shape tools, no ink-to-shape/ink-to-text conversion of drawn strokes.
- **Apple Pencil is only supported via iPadOS "Scribble"** — an OS-level feature (iPadOS 14+) that converts handwriting into **typed text** when you write inside a text block. This is Apple's system feature, not a Notion ink engine; it produces text, not preserved strokes, and cannot draw shapes, diagrams, or mind maps.
- **Workarounds users resort to:** draw in GoodNotes/other apps and paste/embed images; use third-party tools (NoteDex, "Screenshot to Notion & Annotate") to insert handwritten cards. This confirms the native absence.
- **Whiteboard:** Notion's official Help Center documents **no native freeform/infinite-canvas whiteboard**. The "Board" view is a **Kanban database layout**, not a drawing surface. Third-party/SEO pages claiming a "Notion Whiteboard (2024)" appear to describe integrations, not a first-party feature **(unverified; likely false as a native feature)**.
- **Net:** every pen-first capability (pens, nibs, pressure, tilt, highlighters, erasers, lasso, rulers, shapes, ink-to-shape, palm rejection, wrist protection) is **absent**.

## Text & Typing

- **Block model:** every paragraph, heading, list item, etc. is a "block" that can be dragged, duplicated, converted to another type, colored, and nested (columns via drag). ~15+ basic block types: text, H1/H2/H3 headings (headings can be toggle-collapsible), bulleted list, numbered list, to-do checklist, toggle list, quote, callout, divider, page/sub-page, table of contents, breadcrumb.
- **Rich text:** bold, italic, underline, strikethrough, inline code, links, text/background colors. Selection-based shortcuts (`Cmd/Ctrl+B/I/U/E/K`).
- **Markdown-style input while typing:** `**bold**`, `*italic*`, `` `code` ``, `~strike~`, `#`/`##`/`###` + space for headings, `-`/`*` + space for bullets, `[]` + space for checkbox, `>` + space for toggle, `"` + space for quote.
- **Slash commands** (`/`) insert any block type; `@` mentions people/pages/dates; `[[` links or creates pages; `:` inserts emoji.
- **Fonts:** three page-level typography options only — **Default (sans), Serif, Mono**. No arbitrary font selection, no per-block font, no font size control beyond a page-level "Small text" toggle and "Full width" toggle. This is limited vs. rich word processors.
- **Tables:** two kinds — **simple tables** (a basic block, no database features) and **database tables** (full property/filter/sort power). Checkboxes exist both as to-do blocks and as a database property.
- **Hyperlinks:** inline links, link-to-page mentions (auto-update when the target page is renamed), and "link previews" (live synced embeds from supported apps).
- **Synced blocks:** a block's content can be mirrored across multiple pages; editing one updates all copies.

## Audio

- **Audio block:** insert via `/audio` — Upload, Embed link, or (on some clients) **Record**. The in-app **Record** control availability varies by client/device **(unverified per-platform matrix)**. Audio plays inline.
- **No audio-synced-to-ink or audio-synced-to-text playback** (unlike Notability/OneNote "record while you write" that scrubs to the note position). This is another pen-app feature Notion lacks.
- **AI Meeting Notes** (AI product, Business/Enterprise): records/transcribes and summarizes meetings, extracts action items. Requires ≥ ~300 transcribed characters (~1 min) to summarize. This is the closest thing to audio-first notes, but it is transcription/summarization, not synced scrubbing.
- **Free-plan caveat:** long recordings count against file/storage limits on Free.

## PDF & Documents

- **PDF embedding/viewing:** you can embed a PDF as a block and page through it inline.
- **No native PDF annotation.** You cannot ink, highlight, or mark up a PDF inside Notion. Users must annotate externally (or via third-party extensions) and re-embed. No form filling, no PDF outline/bookmark navigation surfaced natively, no PDF hyperlink editing.
- **Import** of PDFs is supported as files (paid: up to 20 MB PDF); PDFs can also be imported/converted in limited ways.
- **Document import** (see Import/Export): Word, Markdown, HTML, CSV, plaintext, ZIP.

## Images, Media & Stickers

- **Image block:** upload, embed by URL, or Unsplash (1M+ built-in stock). Recommended cover width ~1,500px.
- **Media blocks:** video (upload/embed), audio, file attachments, web bookmarks (rich preview cards), code blocks (syntax highlighting).
- **Embeds from 500+ apps** (Figma, Google Maps, Miro, Loom, tweets, GitHub gists, etc.).
- **Custom emoji:** upload workspace-wide custom emoji (`/emoji`), usable as icons and inline. No dedicated "sticker" library beyond emoji/icons/Unsplash. **(No sticker packs like pen apps.)**

## Templates, Paper Types & Covers

- **Page icons** (emoji or uploaded image, ~280×280px) and **cover images** (gallery, upload, URL, or Unsplash) on every page.
- **Templates:** huge official **Template Gallery/Marketplace** plus **database templates** (pre-filled new-page structures inside a database) and **template buttons** (insert predefined block sets on click).
- **No "paper types."** There are no ruled/grid/dotted paper backgrounds, no notebook paper styles, no page-size/paper presets — because there is no canvas. Pages are infinite-scroll documents, not paper sheets. Another pen-app staple that is absent.

## Search, OCR & Handwriting Recognition (languages)

- **Text search** across titles and body content, global and in-page.
- **No OCR:** Notion does not extract or index text inside images or scanned PDFs. Widely cited as a competitive weakness vs. Evernote/OneNote. Users rely on third-party OCR tools (OC Rooster, notion-ocr, NoteShot).
- **No handwriting recognition** (there is no handwriting to recognize, since there is no ink). iPadOS Scribble converts pen strokes to text at input time via the OS, not searchable-ink.
- **AI-powered semantic Q&A / Enterprise Search** (Business/Enterprise) can answer natural-language questions across the workspace and connected apps (Slack, Jira, Google Drive, etc.) — but this is AI over typed content, not OCR/ink search.

## Math & Conversion

- **Math equations via KaTeX (LaTeX subset).** Inline equations with `$$ ... $$`; block equations via `/math`. KaTeX supports a large but incomplete subset of LaTeX (no `tikz`, no custom macros, `align` limitations — use `aligned`).
- **Number formatting** in database Number properties (currency, percent, progress bars/rings).
- **No unit conversion / no math-solving / no ink-to-math** (no drawn-equation recognition).

## AI Features (Notion AI)

- **Availability:** now bundled into **Business and Enterprise** plans (Free/Plus get limited trial responses). Historically an add-on; folded into paid plans.
- **Writing assistance:** inline improve/summarize/translate/change tone, drafting, AI blocks that generate custom outputs.
- **Q&A / Enterprise Search:** answers across workspace + connected apps (Slack, Jira, Google Drive, GitHub, etc.), with citations/links.
- **Research Mode:** deep multi-source research on open-ended queries, generating reports, using workspace data + web.
- **Notion Agent:** takes end-to-end tasks — creates/edits pages and databases autonomously using workspace + connected context; chat interface. There are also custom/external agents (recent additions include Claude and Cursor connectors per the help hub).
- **Database Autofill:** AI fills properties (summaries, keywords), writes formulas.
- **AI Meeting Notes:** transcription + summary + action items.
- **Image generation:** create/edit images (beta cap ~10 per 24h).
- **Models & billing:** Notion states it charges tokens "at each provider's published rates, with no markup"; premium models consume **Notion credits** and are admin-gated (off by default). Specific model providers per feature not fully enumerated on the FAQ **(unverified which exact OpenAI/Anthropic models)**.
- **Privacy:** "your feedback isn't used to train Notion AI"; Enterprise gets **zero data retention** on AI. Does not explicitly claim workspace data never trains underlying models beyond the feedback statement.

## Databases, Views, Properties, Relations, Rollups, Formulas (Notion's core strength)

- **View types / layouts:** Table, Board (Kanban), Timeline (Gantt-like), Calendar, List, Gallery, **Chart**, plus Dashboards/Feed. Charts: vertical bar, horizontal bar, line, donut, number (no area charts); limits 200 groups/50 subgroups; Free = 1 chart, paid = unlimited.
- **Filters, sorts, groups, sub-groups**; per-view configuration of the same underlying data. "Open pages in" side-peek/center/full-page options.
- **Property types (~25):** Text, Number, Select, Multi-select, Status, Date (with time/range), Person, Files & media, Checkbox, URL, Email, Phone, Formula, Relation, Rollup, Created time, Created by, Last edited time, Last edited by, Button, ID (auto-increment), Place/Location. 
- **Relations:** link two databases; one-way (default) or two-way (bidirectional edits); self-relations (e.g., Next/Previous task).
- **Rollups:** aggregate related data — count all/values/unique/empty/not-empty, percent empty/not-empty; number (sum, average, median, min, max, range); date (earliest, latest, range); show original/unique.
- **Formulas (2.0):** typed language with dot notation (e.g., `current.Status`, `page.Parent item.first()`), functions (`replace`, `sum`, `sort`, `dateAdd`, `length`, `style`), booleans, ternary `X ? Y : Z`. Powerful but no loops/random; self-referencing a property is unsupported.
- **Sub-items & dependencies:** sub-items auto-create Parent/Sub relations; dependencies auto-create Blocked By/Blocked relations with automatic date shifting ("shift & maintain time between items").
- **Forms:** database Form views collect submissions into a database (Form views can't be exported directly).

## Automations & Integrations / API

- **Database automations:** triggers = Page added, Property edited (with conditions), Every {frequency} (scheduled, timezone-aware); combine with any/all logic. Actions = edit property, add page to another DB, edit pages in another DB, send notification, send mail (Gmail), send webhook, **send Slack notification (Plus/Business/Enterprise)**, define variables via formula. Automations run within a ~3-second detection window; automations can't chain-trigger other automations (only button clicks can).
- **Button automations** can run on-demand action sequences (and can trigger automations).
- **Public API / Developer Platform:** REST API to read/write pages, blocks, databases; **File Upload API**; OAuth 2.0 for public integrations; internal integrations with personal tokens. Granular capabilities (read/write/insert content; user info read w/ or w/o email).
- **Rate limits:** ~3 requests/sec average per integration token; HTTP 429 with `Retry-After` on bursts. **(from third-party docs; unverified against official docs)**
- **Webhooks:** integration/connection webhooks (API version 2025-09-03) notify on page/DB changes; connection webhooks span multiple workspaces; cannot track user/membership/settings changes (audit log covers those).
- **Connections/link previews:** first-party connections to Slack, Jira, GitHub, Google Drive, Figma, etc., with live synced link previews.

## Teamspaces & Sidebar

- **Teamspace types:** **Open** (anyone can join/view), **Closed** (visible but invite-only), **Private** (Business/Enterprise only; invisible unless added).
- **Default teamspaces** auto-add all current/future members; Notion recommends ≤3.
- **Roles:** teamspace owners (full access + settings) vs members (page access as granted). Enterprise adds teamspace-level controls (disable public publishing, guest access, exports).
- **Sidebar** organizes Favorites, Teamspaces, Shared, Private, plus Home/Inbox/Search entry points.

## Sync, Backup & Offline

- **Sync:** cloud-first, real-time sync across devices; changes propagate live for collaborators.
- **Offline mode (rolled out ~Aug 2025):** mark a page "Available offline" via `•••` on desktop/mobile apps (**not** web). Paid plans auto-download recently visited + favorited pages. Databases download only the first 50 rows of the first view. Sub-pages must be marked individually. Individually-downloaded pages are device-local (don't roam across your devices). Offline you can create/edit with most basic blocks but **not** embeds, AI blocks, forms, buttons; can't share or change permissions. Changes sync on reconnect.
- **Offline is historically weak / distrusted** — a recurring complaint (see Weaknesses).
- **Backup:** no automatic user-facing local backup; users export manually (see below) or use third-party backup services. Page/version history acts as time-travel restore (retention by plan).

## Sharing, Export, Links & Publishing

- **Permission levels:** Full access, Can edit, Can edit content (DB-only), Can create (Business/Enterprise), Can comment, Can view. Broadest-access-wins model.
- **Guests:** external collaborators invited by email (need a Notion account); guest counts capped by plan; domain restrictions possible.
- **Share to web / general access:** "Anyone with link" view (login-free); optional link expiration; hide from workspace search.
- **Export:** per-page or whole-workspace. Formats: **Markdown & CSV** (DBs → CSV + subpage MD), **HTML** (zip, can include comments), **PDF** (page size/scale options; "Include subpages" ZIP is Business/Enterprise only). Full workspace export can take **up to 30 hours**; download links expire after **7 days**. Custom emoji don't render in PDF; Form views can't be exported; private pages you can't access are excluded.
- **Notion Sites (publishing):** one-click publish any page as a website; unlimited pages; one free `notion.site` domain; **custom domain add-on ~$10/mo** (paid plans). Paid unlocks slug customization, SEO (title/meta), themes, Google Analytics, "Discoverable on web" indexing (can take up to 4 weeks to index). Visitors can optionally duplicate as template; **no password protection**. Pages can be embedded elsewhere via HTML.

## Collaboration & Comments

- **Page comments** (top-of-page discussions) and **inline comments** on selected text (`Cmd/Ctrl+Shift+M`), resolvable/editable/deletable; comments pane (💬).
- **Database comments** on entries and directly on properties.
- **Mentions:** `@person`/group (notifies + can set Person property), `@page` (auto-updating link), `@date` (auto-relative "today/tomorrow").
- **Reactions:** emoji reactions on comments and highlighted text.
- **Notifications:** Inbox with red badges; email only when app is closed.
- **Real-time multiplayer editing**; suggestion/edit modes exist for review workflows **(exact "suggest edits" availability unverified per plan)**.

## Presentation / Whiteboard / Multi-window / Split view

- **No native presentation/slide mode**, **no native whiteboard/infinite canvas** (Board view = Kanban, not freeform).
- **Side-peek / center-peek** opens database entries beside/over the current page (a light split-like view).
- **Multi-window:** desktop apps support multiple windows/tabs **(exact behavior unverified)**; no formal iPad split-view/stage-manager multi-instance documented in Help Center **(unverified)**.

## Stylus Gestures

- **None of the pen-app gestures apply** because there is no ink surface: no double-tap to switch tools, no Pencil squeeze/hover actions, no scribble-to-erase strokes, no palm rejection or wrist-protection (nothing to reject against). The only stylus interaction is iPadOS Scribble → text.

## Keyboard Shortcuts

- **Navigation:** `Cmd/Ctrl+P`/`K` quick find; `Cmd/Ctrl+F` in-page; `Cmd/Ctrl+[`/`]` back/forward.
- **Formatting (selection):** `Cmd/Ctrl+B/I/U/E` (bold/italic/underline/inline-code), `Cmd/Ctrl+K` link.
- **Markdown-on-type:** `**`, `*`, `` ` ``, `~`, `#`/`##`/`###`, `-`/`*`, `[]`, `>`, `"` (all + space where relevant).
- **Blocks:** `Esc` select block, `Cmd/Ctrl+D` duplicate, `Cmd/Ctrl+/` edit/convert selected blocks, `Cmd/Ctrl+Shift+arrows` move blocks, `Cmd/Ctrl+N` new page, `Cmd/Ctrl+Shift/Option+1–9` block-type shortcuts.
- **Slash & symbol menus:** `/` blocks, `@` mentions, `[[` page links, `:` emoji.
- Shortcuts are largely fixed; **customizable keybindings are limited (unverified)** though accessibility notes mention some tabbing/enter/escape editing improvements.

## Platforms & Feature Differences per Platform

- **Web:** full feature set except **offline is unavailable on web**.
- **Desktop (macOS/Windows):** full feature set; offline available; primary power-user surface.
- **iOS/Android apps:** most features, plus **Web Clipper via share sheet** (iOS 13+, Android 7+), home-screen widgets, offline. Mobile is repeatedly described as **slower/buggier**, Android worse; large DBs/complex pages degrade; some DB editing is awkward on small screens; occasional random logouts and offline distrust.
- **Web Clipper:** browser extension for **Chrome and Safari** (desktop) + mobile share sheet; saves pages/photos/local files into a chosen DB (auto-adds URL property).
- **Notion Calendar** (separate app, ex-Cron, rebranded 2024): multi-day view (press 1–9 for day count), scheduling links (Calendly-like), multi-timezone, multi-account, menu-bar/lock-screen widgets, links Notion docs/DB due-dates into events.
- **Notion Mail** (separate app, 2025): email client with Notion-style consistency/dark mode, AI features **(details unverified)**.

## Accessibility

- **Screen readers:** iOS VoiceOver support with labeled elements/logical navigation (per third-party review). General improvements: better tabbing, enter/escape to start/stop editing, screen-reader support for read-only pages, semantic markup for popups/dialogs/landmarks/headings/sidebar/blocks.
- No single comprehensive official accessibility/WCAG statement surfaced from Notion itself **(unverified)**; third parties track Notion accessibility gaps (Heydon Pickering's tracker).

## Localization

- **UI languages:** English, Korean, Japanese, French, plus additions over time; **Arabic and Hebrew** with RTL/mirrored UI and auto-detection of text direction in most blocks (except simple tables). Language is an **account-level** setting (Settings → Preferences → Language & Time); only UI chrome changes, not user content. Set of languages is smaller than many global competitors.

## Pricing & Plans & Free-tier Limits

(Prices are per member/month; annual billing figures shown — monthly billing is higher. **Guest caps approximate/unverified.**)

- **Free — $0:** file uploads ≤ **5 MB/file**; page history **7 days**; ~**10 guests**; blocks unlimited for individuals but a **block/trial limit applies to 2+ member teams**; 1 free chart; Notion AI limited trial; no SSO/SCIM/audit log.
- **Plus — ~$10:** unlimited file uploads (large-file cap ~5 GB); history **30 days**; unlimited guests (capped, e.g. ~100 **(unverified)**); Slack-notification automations; unlimited charts; no SSO/SCIM.
- **Business — ~$20:** history **90 days**; **SAML SSO**; **granular database permissions**; **Notion AI included** (Agent, AI Meeting Notes, Enterprise Search); "Can create" permission; private teamspaces; "Include subpages" PDF export. No SCIM.
- **Enterprise — custom:** **unlimited page history**; **SCIM provisioning**; **audit log**; advanced security suite (domain management, SIEM/DLP, teamspace-level controls); **AI with zero data retention**.
- **Add-ons:** custom domain for Sites (~$10/mo); premium AI models via credits.
- **Education:** Notion offers free/discounted plans for students/educators **(unverified specifics)**.

## Privacy & Security Claims

- **Encryption:** AES-256 at rest; TLS 1.2+ in transit. **No end-to-end encryption** — explicitly a limitation for highly confidential data.
- **No password-locked individual notes / no per-note lock / no biometric note lock** documented **(unverified but consistent with product model)**. Security is workspace/permission-based, not per-note encryption.
- **Compliance:** SOC 2 Type II; ISO 27001/27701/27017/27018; HIPAA (Enterprise + BAA); PCI DSS Level 2; BSI C5; K-FSI.
- **Data location:** AWS, US regions (us-west-2, us-east-2); **no customer-selectable data residency** currently.
- **Identity:** SAML SSO (Business+), SCIM (Enterprise), 2FA/MFA (all plans), audit log (Enterprise).
- **Data access:** Notion staff access only for troubleshooting/recovery; Enterprise workspace owners may access member content per terms. Deletion honored except legal holds; details in DPA.

## Known User Complaints / Weaknesses (cited)

- **No handwriting/ink/drawing** — the top gap for pen users; only iPadOS Scribble-to-text (khitran.medium.com; redeemingproductivity.com; jotlayer.com).
- **No OCR / no image or PDF text search** — repeatedly called a "non-starter" vs Evernote/OneNote (threads.com/@sobri909; producthunt OC Rooster; dev-log.me).
- **No native PDF annotation** — must use external tools (pdf.afirstsoft.com; simple.ink).
- **Performance/slowness** — large pages/databases (noticeable > ~5,000 records), heavy on mobile, degrades on poor connections (Capterra; KDnuggets; hackceleration; larksuite reviews).
- **Mobile app quality** — slower/buggier than desktop, Android worst (lags, keyboard issues), occasional random logouts, small-screen DB friction (Capterra reviews; review roundups).
- **Offline mode weak/distrusted** — historically nonexistent; even post-2025 rollout it's limited (no web, 50-row DB cap, per-device downloads, distrust of sync) (2sync; notionbackups; alternativeto).
- **No end-to-end encryption** — flagged as unsuitable for medical/financial/confidential data (KDnuggets; taskrhino).
- **Steep learning curve / setup overwhelm** — flexibility is intimidating; structure takes time (Capterra; larksuite; hackceleration).
- **API slow/unreliable & rate-limited** (~3 rps) (review snippets; ones.com).
- **Limited typography** (3 fonts, no font control), **no paper styles**, **no presentation mode**, **limited export fidelity** (custom emoji missing in PDF, forms unexportable, 30h workspace export).
- **Localization** limited to a handful of UI languages.

---

## What Sane Notes must match (table stakes)

- **Block-based rich text** with markdown-on-type, headings, lists, checkboxes, toggles, callouts, quotes, code, dividers, tables — plus slash-command insertion and `@`-mentions/`[[`-linking.
- **Nested pages / flexible hierarchy**, favorites, a fast global search, and an in-page find.
- **Cross-device real-time sync**, page/version history with restore, and a **trustworthy offline mode** (Notion's is a low bar — beat it).
- **Databases-lite or at least tags + saved views/filters/sorts** for organizing many notes; if we go full database, support relations/rollups/formulas.
- **Collaboration**: shareable links, granular permissions (view/comment/edit), inline + page comments, mentions, reactions.
- **Publishing**: one-click share-to-web with a public link; ideally custom domain.
- **Import/Export**: Markdown/CSV/HTML/PDF import and export, plus migration from Evernote/Word/Google Docs; whole-notebook export for data portability.
- **Media**: images (with stock library), file attachments, audio, video, web bookmarks, embeds; math via LaTeX/KaTeX.
- **Templates** and page icons/covers.
- **AI baseline**: inline writing help, summarize, Q&A over your notes, transcription/meeting notes.
- **Security/compliance**: AES-256 at rest, TLS in transit, SSO for teams, 2FA, SOC 2; clear privacy stance on AI/data.
- **Platform coverage**: web, macOS, Windows, iOS, Android, with mobile that is fast (Notion's mobile is a liability — beat it).
- **Accessibility** (screen readers, keyboard nav) and **localization** for major languages.

## What Sane Notes could beat them on

- **Be pen-first — the whole open flank.** A real ink engine: multiple pen types, nib shapes, pressure + tilt, stroke smoothing, highlighter modes, precise + stroke erasers, lasso select/move/resize/recolor, rulers/guides, shape tools, and **ink-to-shape / ink-to-text** conversion. Notion has none of this.
- **Handwriting recognition + searchable ink** across languages — index handwritten notes so search finds them. Notion can't search even typed-in images.
- **Native OCR** on images and PDFs so all captured text is searchable — directly fixes Notion's most-cited gap.
- **First-class PDF annotation**: import a PDF and ink/highlight/comment/fill forms on it, with PDF outline navigation and high-fidelity export. Notion only embeds/views.
- **Audio synced to notes** (record-while-you-write; tap a word/stroke to jump to that moment of audio) — the Notability/OneNote feature Notion lacks.
- **Paper types & canvas options**: ruled/grid/dotted/custom paper, page/paper sizes, and a **true infinite/freeform whiteboard canvas** with sticky notes, connectors, and spatial layout — Notion has no canvas at all.
- **Stylus gesture depth**: double-tap tool switch, Pencil squeeze/hover, scribble-to-erase, rock-solid palm rejection and wrist protection.
- **Fast, reliable offline + local-first storage** with real backups and optional **end-to-end encryption / password-locked (biometric) notes** — directly addressing Notion's offline distrust and lack of E2EE/per-note locks.
- **Snappy mobile/tablet performance** on large notebooks — Notion's mobile slowness is a persistent complaint; a fluid pen+scroll experience is a clear win.
- **Richer typography & export fidelity** (real font control, faithful PDF export including emoji/handwriting), and **on-device/private AI** for handwriting, summarization, and transcription without the "your data leaves the device" concern.

---

## Sources

- https://www.notion.com/help (help hub / category index)
- https://www.notion.com/help/guides/types-of-content-blocks
- https://www.notion.com/help/category/database-views
- https://www.notion.com/help/relations-and-rollups
- https://www.notion.com/help/formulas
- https://www.notion.com/help/database-automations
- https://www.notion.com/help/intro-to-teamspaces
- https://www.notion.com/help/sharing-and-permissions (via guides/sharing-and-permissions)
- https://www.notion.com/help/comments-mentions-and-reminders
- https://www.notion.com/help/notion-ai-faqs
- https://www.notion.com/help/use-pages-offline
- https://www.notion.com/help/web-clipper
- https://www.notion.com/help/export-your-content
- https://www.notion.com/help/security-and-privacy
- https://www.notion.com/help/create-integrations-with-the-notion-api
- https://www.notion.com/help/public-pages-and-web-publishing
- https://www.notion.com/help/keyboard-shortcuts
- https://www.notion.com/help/database-properties
- https://www.notion.com/help/import-data-into-notion
- https://www.notion.com/help/customize-and-style-your-content
- https://www.notion.com/help/charts
- https://www.notion.com/help/math-equations
- https://www.notion.com/help/ai-meeting-notes
- https://www.notion.com/help/synced-blocks
- https://www.notion.com/help/tasks-and-dependencies
- https://www.notion.com/help/change-your-language
- https://www.notion.com/pricing
- https://khitran.medium.com/is-the-apple-pencil-supported-by-notion-3291b88cef58
- https://redeemingproductivity.com/handwriting-in-notion-with-ipad-and-apple-pencil/
- https://jotlayer.com/blog/draw-notion-ipad-apple-pencil
- https://www.notedexapp.com/blog/handwriting-in-notion-with-apple-pencil-samsung-s-pen-or-surface-pen-notedex-notion-support
- https://pdf.afirstsoft.com/pdf-annotate/notion-pdf-annotation.html
- https://www.simple.ink/guides/how-to-embed-pdf-notion
- https://www.threads.com/@sobri909/post/DAXcrr3PVbP
- https://www.producthunt.com/products/oc-rooster
- https://github.com/yannick-cw/notion-ocr
- https://www.capterra.com/p/186596/Notion/reviews/
- https://www.kdnuggets.com/review/notion-review-2024-features-pros-cons
- https://www.larksuite.com/en_us/blog/notion-review
- https://hackceleration.com/notion-review/
- https://www.taskrhino.ca/blog/notion-review/
- https://2sync.com/blog/how-to-use-notion-offline
- https://notionbackups.com/guides/notion-offline-mode
- https://alternativeto.net/news/2025/8/notion-rolls-out-offline-mode-edit-pages-without-an-internet-connection
- https://ones.com/blog/demystifying-notion-api-rate-limits-a-clear-documentation-walkthrough/
- https://www.notion.com/help/connect-a-custom-domain-with-notion-sites
- https://accessibletechnologysolutions.com/firm-spotlight-looking-at-notion-from-a-screen-reader-perspective/
- https://heydon.works/notion-accessibility-tracker/
- https://alternativeto.net/news/2024/1/notion-launches-standalone-app-notion-calendar--replacing-the-cron-calendar-app
- https://www.xda-developers.com/replaced-google-apps-with-notion/
