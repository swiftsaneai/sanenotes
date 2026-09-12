# Pricing, Monetization & Student Verification — Research Report
*For a student-first note app (India + global), built local-first with a zero-server goal.*
*Compiled 2026-09-13. Every claim traces to a fetched page or snippet listed under Sources. Items I could not confirm from a fetched page are marked "(unverified)".*

## Executive summary — key takeaways

- **The note-app category has already completed the migration from one-time purchase to freemium subscription.** Notability (2021), GoodNotes (v6, 2023) and Noteshelf (v3) all moved off "buy once" and all kept a **one-time/"lifetime" escape hatch** to blunt backlash. Notion, OneNote and the OS-bundled apps (Apple Notes, Samsung Notes) anchor the free end.
- **A student-first app should price aggressively low in India.** The ₹83/month reference point is roughly US$1 at current INR/USD (~₹83 = $1). Apple offers 800 price points and both stores support fully localized INR pricing, so global price ≠ India price.
- **You do not need to run your own server to sell and verify subscriptions.** Two "serverless-from-the-developer's-view" paths exist: (a) **StoreKit 2 on-device `Transaction.currentEntitlements`** (Apple cryptographically signs each transaction as JWS, verified locally), and (b) a **hosted entitlement backend** — RevenueCat (free to $2,500 MTR, then 1%), Adapty (free under $5K/mo, then 1%), or Qonversion (free to $7K MTR, then 0.8%) — which is the backend so you don't build one.
- **Store commissions are dropping.** Apple/Google both offer **15%** to small developers (<$1M/yr). Apple takes 15% on subscriptions after year one. Google is moving EEA/UK/US to a **10% + 5% billing-fee** structure effective **June 30, 2026**.
- **External billing is now legal in specific places.** Apple's US storefront allows external purchase links **without an entitlement** (post-Epic ruling); the EU allows it under DMA business terms; Google allows **user-choice / alternative billing in India** (−4% fee). This is what makes a web checkout (Razorpay UPI for India, Stripe globally) legally honorable on mobile.
- **Design the pricing UI to avoid dark patterns.** The FTC's deceptive-design categories (hard-to-cancel, hidden fees, obscured disclosures, forced choices) are the concrete "don't" list. The FTC "click-to-cancel" rule was finalized Oct 2024 but **vacated by the 8th Circuit in mid-2025** (unverified specifics) — treat "cancel is as easy as sign-up" as best practice, not settled law.

---

## 1. Competitor pricing snapshots

### Summary table (USD, retail; annual unless noted)

| App | Free tier | Subscription | One-time option | Model history |
|---|---|---|---|---|
| **Notability** | Starter: 5 notes, basic tools, 20k+ templates, 7-day history | Lite $11.99/yr; **Plus $15.99/yr** (most popular); Pro $79.99/yr | None (legacy buyers grandfathered) | One-time → freemium **Nov 2021** (backlash) |
| **GoodNotes 6** | 3 notebooks / 3 files, 100 MB, 20 min audio, 5 MB import, 5 AI Q&A/mo, no sync | Essential $11.99/yr; **Pro $35.99/yr**; AI Pass +$9.99/mo | **$28.99 one-time** (GoodNotes 6) + "Special Edition" $35.99 | GoodNotes 5 one-time (~$7.99, unverified) → GoodNotes 6 freemium+sub+one-time (2023) |
| **Notion** | Free (unlimited solo; limited 2+ members, 5 MB uploads, 10 guests, 7-day history) | Plus $10/user/mo; Business $20/user/mo; Enterprise custom | n/a (SaaS) | Always subscription; **Education Plus free** for students |
| **OneNote / M365** | OneNote free standalone (unverified standalone) | M365 Personal $99.99/yr ($9.99/mo); Family $129.99/yr; Premium $199.99/yr | n/a | OneNote "Included" in all M365 plans |
| **Nebo → MyScript Notes** | Free limited version after 7-day trial | Single licence via App Store/Play (price varies by region) | Single licence (prior Nebo buyers keep it free) | Rebranded from **Nebo to MyScript Notes**; freemium |
| **Noteshelf 3** | Free download (limited) (unverified) | "Noteshelf Club" subscription (unverified) | One-time/lifetime option (unverified); school/enterprise reduced pricing via ASM/ABM | Noteshelf 2 one-time → Noteshelf 3 freemium (unverified) |
| **Samsung Notes** | **Free** (Galaxy devices) | — | — | Free, OEM-bundled |
| **Apple Notes** | **Free** (Apple devices) | — | — | Free, OS-bundled |

### 1.1 Notability
- **Individual tiers:** Starter (free, "5 free notes," basic editing, PDF/document import, 20,000+ templates, 7-day version history); **Lite** $11.99/yr or $14.99/mo (unlimited notes, third-party backups, iOS only); **Plus** $15.99/yr or $19.99/mo (audio recording/transcription, handwriting search, up to 100 YouTube link-to-note conversions/mo, up to 400 AI quizzes & flashcards, 30-day history); **Pro** $79.99/yr or $99.99/mo (unlimited transcription, unlimited YouTube, unlimited AI, "Chat with your notes," 90-day history).
- **Business:** $60/yr/user; Business Pro $180/yr/user (Intune MAM, audit logs); custom contracts.
- **2021 subscription backlash:** In **November 2021**, Ginger Labs shifted Notability "from a one-time purchase to a freemium model, making the app free to download with a premium subscription tier." **Grandfathering:** "Users who had previously purchased the app under a one-time payment model retained access to the version they had purchased, though new features were not guaranteed." The backlash (users who had paid once objected to losing content behind a new paywall) forced a public clarification of the legacy-access terms. **Lesson for us:** if you ever change model, grandfather paying users to the exact capabilities they bought, communicate before the change, and don't retroactively lock previously-created content.

### 1.2 GoodNotes 6 (App Store listing, confirmed)
- **Free tier:** up to 3 notebooks / 3 total files, 100 MB storage, 20 min audio, 5 MB import size, no templates, limited AI (≤5 monthly Q&A/quiz), **no cross-platform sync**, no real-time collaboration.
- **In-app purchases (App Store):** Essential (Yearly) **$11.99**; Goodnotes Pro (Yearly) **$35.99**; AI Pass (Monthly) **$9.99**; **Goodnotes 6 One-Time Payment $28.99**; Special Edition $35.99; Marketplace content $9.99 / $1.99; 7-day free trial.
- **History:** GoodNotes 5 was a one-time purchase (~$7.99, unverified); GoodNotes 6 (2023) introduced the freemium + subscription + one-time "lifetime" structure. The retained one-time option is the direct analogue of Notability's grandfathering — a hedge against subscription backlash.

### 1.3 Notion
- **Tiers:** Free $0; **Plus $10/member/mo**; **Business $20/member/mo**; Enterprise custom. Annual billing "up to 20%" cheaper.
- **Free limits:** unlimited for solo users but "limited for 2+ members," 5 MB file upload cap, up to 10 guests, 7-day page history; Notion AI is a "limited trial."
- **Notion AI:** Custom Agents free to try, then "$10 per 1,000 monthly Notion credits."
- **Education (student) plan:** **Education Plus free** for students at accredited colleges/universities — unlimited pages & blocks, unlimited file uploads, 30-day version history. **Verification is by school email domain only:** "You have a school email address. We don't accept student IDs or other documentation." Institutions must be listed in the **WHED (World Higher Education Directory)** to be auto-allowlisted; K-12 excluded; personal emails (gmail) excluded. **No SheerID** — this is the cheapest possible verification path (relevant to us below).

### 1.4 OneNote / Microsoft 365
- OneNote is **"Included"** in every paid Microsoft 365 plan; it is also available free as a standalone app (widely true, standalone-free status unverified from the fetched page).
- **M365 consumer pricing:** Personal $9.99/mo or **$99.99/yr** (1 TB, 1 person); Family $12.99/mo or **$129.99/yr** (up to 6 TB, 1–6 people); Premium $19.99/mo or $199.99/yr (AI features).

### 1.5 Nebo → MyScript Notes
- Nebo has been **rebranded to "MyScript Notes."** Freemium: "start with a 7-day free trial… then upgrade to keep all features, or continue with a free limited version." Sold as **single licences** on the App Store and Google Play (region-dependent pricing). "If you previously purchased Nebo, MyScript Notes is yours at no additional cost" — again, honoring prior one-time buyers.

### 1.6 Noteshelf, Samsung Notes, Apple Notes
- **Noteshelf 3:** pricing not disclosed on their site; the marketing mentions "special offers for schools & enterprises" via Apple School Manager / Apple Business Manager at reduced prices. General-market knowledge (unverified): Noteshelf 3 moved to a freemium "Noteshelf Club" subscription with a one-time/lifetime alternative, mirroring the category.
- **Samsung Notes:** free, bundled on Galaxy devices (unverified from a fetched page — well established).
- **Apple Notes:** free, bundled on Apple devices (unverified from a fetched page — well established).

**Takeaway:** the paid competitive band for a serious note app clusters at **$12–$36/yr** for the "pro" tier globally, with free OS-bundled apps and Notion's free student plan setting a hard floor. A student-first entrant should undercut the low end and localize hard for India.

---

## 2. App Store & Google Play billing rules (2025–2026)

### 2.1 Apple — when IAP is required (Guideline 3.1.1)
- "If you want to unlock features or functionality within your app… you must use in-app purchase. Apps may not use their own mechanisms to unlock content or functionality, such as license keys… QR codes, cryptocurrencies…." So a local-first app that gates premium features on iOS **must** sell those via Apple IAP inside the app (with the external-link exceptions below).
- **External purchase links (3.1.1(a)):** StoreKit External Purchase Link entitlements exist, **but** "These entitlements are not required for developers to include buttons, external links, or other calls to action in their **United States** storefront apps." Outside the US (and outside specific EU/reader/music carve-outs), directing users to non-IAP purchasing is still prohibited. This US carve-out follows the Epic v. Apple injunction (2025); Apple is barred from charging commission on US external-link purchases (specific ruling text unverified from a fetched page).
- **Reader apps (3.1.3(a)):** may let users access previously purchased content (magazines, books, audio, music, video) and can apply for an External Link Account Entitlement (not required in the US). A note app is generally **not** a reader app.
- **Multiplatform services (3.1.3(b)):** "Apps that operate across multiple platforms may allow users to access content, subscriptions, or features they have acquired in your app on other platforms or your web site… provided those items are also available as in-app purchases within the app." **This is the clause that legally lets a web (Stripe/Razorpay) subscriber unlock the iOS app** — as long as you also offer the equivalent via IAP.

### 2.2 Apple — commissions & Small Business Program
- **Standard:** 30% (15% for auto-renewable subscriptions after the subscriber completes one year of paid service — developer share rises from 70% to 85%).
- **Small Business Program:** **15%** on paid apps and IAP for developers with **≤ $1M USD proceeds** in the prior calendar year (and new developers). Cross the $1M threshold mid-year and standard rates apply to future sales. SBP members get the 85% subscription share regardless of tenure. A student-app startup will almost certainly qualify for 15%.
- **Subscriptions mechanics:** subscription groups (one active sub per group), 800 price points (+100 higher on request), **Family Sharing up to five members**, intro offers (Free Trial / Pay as You Go / Pay Up Front), one intro offer redeemable per group.

### 2.3 Apple — EU DMA business terms (evolving)
- **Core Technology Commission (CTC) = 5%** on sales of digital goods for apps distributed via alternative marketplaces / Web Distribution. Effective **October 1, 2026**, the CTC **replaces** the old per-install Core Technology Fee, simplifying to a straight 5% commission.
- **EU App Store commission tiers:** Apple IAP 26% standard / 15% reduced (SBP, subscriptions after year 1); alternative in-app payment processing 20% / 10% reduced; **Store Services commission on out-of-app offers with actionable links 15% / 10%** — but "only sales made within 7 days of the link tap" are charged. The EU lets you communicate and promote offers to a website, alternative marketplace, or another app.

### 2.4 Google Play — policy, fees, and the 2026 change
- **When Google Play Billing is required:** digital items, subscriptions (education/music/video/etc.), ad-free unlocks or new features, and cloud/productivity/storage software. **Exceptions:** physical goods, 1:1 live services, P2P tips (100% to creator), regulated clinical services, and digital goods consumed only outside the app.
- **Current fees (most markets):** **15% on the first $1M USD/yr, 30% above**; **subscriptions a flat 15%** regardless of revenue. Media/Play-partner programs can be lower.
- **New EEA/UK/US structure (effective June 30, 2026):** auto-renewing subscriptions **"10% + 5% billing fee"** on first $1M; other transactions 10%+5% (new installs) up to $1M then 25%+5%; existing installs 20%+5% then 25%+5%. Play Games "Level Up" / "Apps Experience" programs get reduced 10–15% + billing fee.
- **Alternative / user-choice billing (India included):** India is explicitly in the user-choice billing program; developers who let users pay with an alternative billing system get the **service fee reduced by 4%** (e.g., 15% → 11%). Available across 35+ countries (EEA, UK, Australia, Brazil, Indonesia, Japan, South Africa) plus dedicated US and South Korea programs. India's Alternative Billing API launched **Nov 14, 2023**; manual-sunset date for India "TBA." Enrollment is in Play Console → Settings → Alternative billing.

---

## 3. Cross-platform entitlement platforms (RevenueCat / Adapty / Qonversion)

These are the "serverless backend" — they validate receipts, host entitlement state, and sync a user's access across iOS, Android, and web so you never run purchase infrastructure.

| Platform | Free tier | Fee above free | Notable features |
|---|---|---|---|
| **RevenueCat** | Up to **$2,500 MTR** (monthly tracked revenue) free | **1%** of tracked revenue | Cross-platform entitlements shared across all apps in a project; hosted receipt validation; `getCustomerInfo`/`currentEntitlements`; **Web Billing** (Stripe) syncs web purchases to mobile; largest ecosystem |
| **Adapty** | Free while **under $5K/mo** revenue | **1%** of monthly revenue above $5K | Paywall A/B testing, drag-and-drop paywall builder (50+ templates), LTV predictions, cohort analytics; **web paywalls** (Stripe/Paddle) with SDK polling to confirm activation |
| **Qonversion** | Up to **$7,000 MTR** free | **0.8%** of tracked revenue | Cross-platform Access Management, Subscribers API, Stripe/Paddle integrations, Aegis + Refund Keeper receipt validation, A/B testing, unlimited apps/seats |

- **How "serverless" works:** RevenueCat "implements purchases and subscriptions across platforms while syncing tokens with the RevenueCat server… RevenueCat *always* validates transactions." You "simply query this hosted object rather than maintaining your own database." Entitlements are "shared across all apps contained within the same project," so an iOS purchase, an Android purchase, and a web purchase all light up the same entitlement for the same app-user ID.
- **Recommendation preview:** For a solo/student-scale team, RevenueCat's free tier ($2,500 MTR) is the most generous starting point with the widest platform/SDK support; Qonversion is cheapest at scale (0.8%). All three remove the need to touch the App Store Server API or Play Developer API directly.

---

## 4. Web purchases (Stripe / Razorpay UPI) and honoring them on mobile — legally

### 4.1 Payment rails
- **Stripe Billing (global):** subscriptions with free/paid trials, prorations, tiered/per-seat pricing, self-serve customer portal, dunning (Smart Retries), 135+ currencies, 100+ payment methods. Exact per-transaction fee not stated on the fetched page (Stripe's standard is ~2.9% + fixed, plus a small Billing fee — unverified). **Stripe does not do domestic INR recurring well** in India; use Razorpay there.
- **Razorpay (India):** Razorpay Subscriptions supports **UPI AutoPay** (PhonePe, Google Pay, Paytm, BHIM, 40+ bank apps), cards (RBI-compliant), e-mandate/netbanking, and ~100 international currencies. **Fee: promo 0.5%/txn (standard 0.9%)** as an add-on to the underlying payment platform fee, + GST. UPI AutoPay is essential for Indian students who often have no card.

### 4.2 Honoring web purchases on mobile — the legal path
- **The rule you rely on is Apple 3.1.3(b) (multiplatform services)** and Google's equivalent tolerance for cross-platform access: a subscription bought on your website can unlock the mobile app **as long as the same purchase is also available via in-app IAP/Play Billing.** Do not advertise or deep-link the cheaper web price from inside the iOS app outside the US/EU carve-outs, or you risk rejection.
- **External-link caveats:** Apple allows external purchase **links** without entitlement **only in the US storefront** (post-Epic) and in the EU under DMA terms; Adapty's docs bluntly note "The App Store allows external payment options only in the USA and Japan," so you must segment paywalls by geography/platform. Google's **user-choice billing in India** is the clean way to offer Razorpay UPI alongside Play Billing on Android and save 4%.
- **Mechanics via RevenueCat/Adapty:** the user signs in with the same account on web and mobile; the web purchase (Stripe/Razorpay) is recorded by the entitlement provider; the mobile SDK polls/reads `CustomerInfo` and grants access. Adapty: "when they return to the app, Adapty SDK polls for profile updates to confirm the subscription activated."

---

## 5. Family plans

- **Apple Family Sharing:** a subscriber can share an auto-renewable subscription "with **up to five family members**." You enable it per-subscription in App Store Connect (**cannot be undone**); use the `ownershipType` property to tell subscriber from family member. This is a real acquisition/retention lever — a "Family" tier that covers up to 6 people.
- **Google Play Family Library:** shares **paid apps**, games, movies, books with up to 5 members (6 total) — **but explicitly "You can't share in-app purchases and apps downloaded at no charge."** So on Android, a freemium note app's *subscription* is **not** shareable via Family Library. To offer a real family plan on Android you must build it yourself (one purchase entitles N linked accounts via your entitlement provider) rather than rely on the store.
- **Design implication:** implement family/household plans in **your own entitlement layer** (RevenueCat "shared across a group" pattern or a household record) so the experience is identical across iOS and Android, and treat Apple Family Sharing as an optional bonus, not the mechanism.

---

## 6. Student / edu discounts & verification

### 6.1 Verification options (cheapest → most robust)
- **School email domain (free):** Notion's model — accept a recognized institutional email; auto-allowlist domains listed in **WHED**; manually review unknown domains. No third-party cost. Weakness: alumni emails persist, and many Indian colleges use shared/informal domains.
- **`.edu` / country academic domains:** In the US, `.edu` is tightly controlled and a strong signal. In **India there is no single student TLD** — colleges use `.ac.in`, `.edu.in`, university-specific domains, or generic providers, so domain-matching alone is weaker and needs a curated allowlist (e.g., NCU's `ncuindia.edu`, IIT `.ac.in`, etc.).
- **SheerID (paid, robust):** "Instantly verify consumers' identities worldwide" against "200K+ authoritative data sources," used by Spotify, T-Mobile, Comcast for student offers. Instant enrollment-database match with a **document-upload fallback** when no instant match; hosted verification + API integration. Country-by-country coverage (incl. India specifics) not enumerated on the fetched page — confirm India instant-match coverage with SheerID before committing (unverified).
- **UNiDAYS (paid, discovery + verification):** UNiDAYS iD digital identity across **115 markets / 29M members**; strong in UK/US/AU/EU. India not called out in their coverage on the fetched page (unverified) — likely thinner instant coverage in India; better as a marketing/discovery channel than as India verification.
- **Manual ID upload:** last-resort fallback (student ID card / enrollment letter) reviewed manually or via SheerID's doc path. Higher friction and fraud surface; use only when instant methods fail.

### 6.2 Recommended student-verification approach for India + global
- **Tiered:** (1) instant institutional-email match against a curated allowlist (free, covers most Indian universities + global WHED list); (2) SheerID instant database match for anything not in the allowlist; (3) SheerID document upload as the final fallback. Re-verify annually (subscription re-check) so graduates roll off.
- **Grant mechanism:** verification issues a **time-boxed entitlement/promo code** (e.g., one academic year of the Student price), redeemed as a **promotional offer / offer code** on the App Store and Play so the discount flows through official billing (keeps you store-compliant) — not a hidden license key (which 3.1.1 forbids).

---

## 7. Regional pricing, trials, grandfathering, refunds

### 7.1 Regional / India pricing (the ₹83 reference)
- ₹83 ≈ US$1 at the current INR/USD rate, so **"₹83/month" ≈ a $1/month India-specific price**, far below the global $3–4/month you might charge elsewhere. Both stores support this: Apple offers **800 price points across all currencies**; you set an explicit local INR price (or let Apple auto-convert, which you should override for India to hit round, psychologically-priced numbers like ₹79, ₹99, ₹499/yr).
- **Tax:** India levies **18% GST** on digital subscriptions (unverified exact rate from a fetched page — well established); the stores handle collection/remittance for IAP. For your own Razorpay web checkout, GST is your responsibility (Razorpay notes "GST applicable").
- **Purchasing-power pricing** is the single biggest lever for a student-first India launch: aim ~₹79–99/month or ~₹499–799/year for the paid tier, vs. ~$3–4/month globally.

### 7.2 Trials
- Apple intro offers: **Free Trial**, **Pay as You Go**, **Pay Up Front**; one intro offer per subscription group per user. Competitors use **7-day free trials** (GoodNotes, MyScript Notes). A 7-day trial + annual plan is the category default.

### 7.3 Grandfathering
- **Store mechanics help you:** Apple counts "days of paid service" per subscription group (upgrades/downgrades within a group don't reset the year-1→year-2 85% share; lapses reset only if not renewed within 60 days). If you ever change price or model, **grandfather existing subscribers** on their current price (both stores let you keep existing subscribers at the old price when you raise prices) and, like Notability/GoodNotes/MyScript, **preserve access for any prior one-time buyers**.

### 7.4 Refunds
- **Apple:** users self-serve via **reportaproblem.apple.com** ("Request a refund"); Apple decides at its discretion (varies by region); expect a 24–48h update. You generally cannot refund directly — Apple owns the transaction. Build in-app cancellation deep-links and a generous goodwill policy for web (Stripe/Razorpay) purchases where you *do* control refunds.
- **Google:** similar store-mediated refund flow (Play refund window / Google Play support).

---

## 8. Receipt validation & serverless entitlement verification

### 8.1 The two "no-server" strategies
1. **On-device (Apple StoreKit 2):** `Transaction.currentEntitlements` returns the user's active entitlements; each `Transaction` is delivered as **JWS (JSON Web Signature) signed by Apple** and **verified locally by StoreKit** using Apple's public keys — no network call, no server. This is genuinely serverless for iOS. (Apple still *recommends* server validation for high-value cases, but local checks "are sufficient for many use cases.") Android's Play Billing Library exposes purchase tokens and lets you acknowledge purchases; on-device verification is possible but Google "strongly recommends" server verification, so Android is the weaker link for pure-client validation.
2. **Hosted backend (RevenueCat / Adapty / Qonversion):** they are the server. RevenueCat/Qonversion validate every transaction, store entitlement state, and expose it via SDK — you get robust cross-platform + web sync without operating the App Store Server API or Play Developer API yourself.

### 8.2 The store server APIs (what the hosted providers wrap)
- **App Store Server API + App Store Server Notifications V2:** server-to-server API to get transaction/subscription status and receive real-time lifecycle webhooks (renewals, cancellations, refunds). **Requires a server** — which is exactly why you either use StoreKit 2 on-device or delegate to RevenueCat.
- **Google Play Developer (Android Publisher) API + Real-time Developer Notifications (RTDN via Pub/Sub):** verify purchases and manage subscriptions server-side; Google "strongly recommends a secure backend." Again, delegate to a hosted provider to stay serverless.

**Net:** A zero-server app should use **StoreKit 2 on-device verification on iOS** and a **hosted entitlement provider (RevenueCat) for Android + web sync + robustness**. The only "server" is the SaaS you rent.

---

## 9. Preventing piracy of a local-first app

A local-first app stores notes on-device, so the threat is unlocking premium features without paying (cracked APKs, sideloaded IPAs, sniffed receipts). You cannot make it impossible; you can make it not worth the effort:

- **Apple:** rely on StoreKit 2's **cryptographically signed (JWS) transactions** — a cracked client can't forge a valid Apple-signed entitlement. Avoid custom license keys (also forbidden by 3.1.1).
- **Android — Play Integrity API:** verifies (a) **app integrity** ("interacting with your unmodified binary that Google Play recognizes" — catches tampered/cracked builds), (b) **licensing** (`appLicensingVerdict = LICENSED` confirms "the user installed or paid for your app… on Google Play"), and (c) **device integrity** (genuine certified device vs. emulator/rooted). Use **hardware-backed** signals; Google's own guidance: "works best… as part of your overall anti-abuse strategy and not as your sole mechanism," and use a **tiered enforcement** response (degrade/limit rather than hard-block, to avoid false-positive lockouts).
- **Entitlement caching, not trust:** cache the last-known-good entitlement locally so paying users work offline, but re-verify periodically (RevenueCat/StoreKit) and after a grace window. Keep premium *feature flags* gated behind a verified entitlement object, not a boolean written to disk.
- **Pragmatic stance for a student app:** heavy DRM annoys legitimate users and students; a light Play Integrity licensing check + signed StoreKit entitlements + periodic re-validation is the right effort level. Don't punish offline usage of already-created notes.

---

## 10. Accessibility of pricing UI & dark patterns to avoid

### 10.1 FTC deceptive-design ("dark patterns") categories — the concrete "don't" list
1. **Misleading / disguised ads & fake urgency** — no fake countdown timers, no ads dressed as editorial.
2. **Difficult subscription cancellation** — no "difficult-to-find, lengthy, and confusing cancellation path," no promo-screen gauntlet before you can quit.
3. **Concealed terms / hidden fees** — don't bury price, renewal terms, or mandatory charges "behind tooltip buttons and in between more prominent text" or late in the flow.
4. **Manipulated data-sharing choices** — don't pre-tick data sharing or steer toward maximum disclosure; make privacy defaults honest.

### 10.2 FTC "click-to-cancel" / Negative Option Rule
- **Finalized Oct 2024:** cancellation must be "as easy… to cancel… as it was to sign up," with a "simple mechanism to cancel… and immediately halt charges," **express informed consent** before charging, and clear up-front disclosure of all material terms. Effective 180 days after Federal Register publication.
- **2025 status:** the rule was **vacated by the Eighth Circuit** in mid-2025 on procedural grounds (specifics unverified from a fetched page; corroborated by the FTC's legal-library page showing a **new Advance Notice of Proposed Rulemaking dated March 13, 2026**, i.e., the FTC restarting rulemaking). **Treat click-to-cancel as best practice and likely-returning law**, and note many US states (California, etc.) have their own click-to-cancel statutes regardless.

### 10.3 Accessible, honest pricing-UI checklist (adopt)
- Show the **real recurring price, currency, and renewal cadence** before the CTA; state "renews at ₹X/year, cancel anytime."
- Make **cancel one tap** from within the app (deep-link to the store's manage-subscription screen; self-serve portal for web).
- **No pre-selected add-ons or hidden auto-renew;** trials must clearly say when and how much the first charge is.
- **Localized prices** (₹, round numbers) and clear tax-inclusive display for India.
- Accessibility basics: sufficient color contrast, screen-reader labels on price/plan controls, keyboard/switch-control operability, no color-only differentiation of "recommended" plans, large tap targets.

---

## Recommended plan structure

A **student-first, freemium** structure that undercuts the category, localizes hard for India, and keeps a one-time hedge:

- **Free ("Student Free")** — the acquisition engine, deliberately generous so students can do real coursework:
  - Unlimited notes/notebooks (do **not** copy GoodNotes' 3-notebook cap — it's the most-complained-about limit; unlimited free notes is a differentiator).
  - Core ink/typing/PDF import, a solid template set, on-device search.
  - Sync limited to 1 device (or a modest storage cap) to create an upgrade reason without crippling note-taking.
  - No AI beyond a small monthly quota; 7-day version history.
- **Pro (Student) — the hero tier, India-localized:**
  - **India: ~₹79–99/month or ~₹499–799/year** (the ₹83/mo reference point). **Global: ~$2.99/month or ~$19.99/year** (undercuts GoodNotes Pro $35.99 and Notability Plus $15.99 on the monthly, competitive on annual).
  - Unlocks: multi-device sync, unlimited version history, handwriting search, audio recording/transcription, and the AI features (Q&A, flashcards/quizzes) that Notability/GoodNotes charge for.
  - **7-day free trial**, annual default (biggest LTV/CAC win), monthly available.
  - **Verified-student discount:** offer the India price (or ~40–50% off global) to verified students via store **promotional offers / offer codes**, re-verified annually.
- **Pro (Standard / non-student)** — same features, higher price (e.g., $4.99/mo, $39.99/yr) once the app graduates beyond pure student focus.
- **Family / Household** — covers up to 6 people; enable **Apple Family Sharing** on the subscription and implement the household grant in your own entitlement layer for Android (where Play Family Library can't share subscriptions).
- **One-time "Lifetime" hedge (optional)** — a single-purchase unlock (e.g., ~$49.99 / ₹1,999) that mirrors GoodNotes' $28.99 and Notability's grandfathered buyers. It defuses subscription backlash, converts subscription-averse users, and is a proven category pattern. Exclude ongoing server-cost features (heavy AI, cloud sync beyond a cap) from lifetime, or make those a small subscription add-on, so a one-time price stays sustainable.
- **Grandfather forever:** any price change keeps existing subscribers at their old price; any model change preserves what one-time/lifetime buyers already paid for. Communicate before, never after.

Rationale: unlimited free notes + a sub-$1 India price + verified-student discount attacks the exact gap competitors leave (GoodNotes/Notability paywall basics; Notion's free student plan is document-centric, not handwriting/ink). The lifetime option is the insurance policy the whole category has learned to carry.

## Recommended entitlement architecture (zero-server)

**Goal:** sell and verify entitlements on iOS, Android, and web, share them across platforms per user, and never operate purchase infrastructure yourself.

- **Backend = a hosted entitlement provider (RevenueCat recommended).**
  - Free to **$2,500 MTR**, then **1%** — effectively free through early growth. It validates every transaction, hosts entitlement state, and shares entitlements "across all apps contained within the same project," giving you one `entitlement = active` signal for a user regardless of where they paid. Adapty (free < $5K/mo) or Qonversion (free to $7K MTR, then 0.8%) are equivalent alternatives; pick RevenueCat for the widest SDK/ecosystem and built-in **Web Billing (Stripe)**.
- **iOS purchases:** StoreKit 2 IAP via the provider SDK. Belt-and-suspenders offline check with **`Transaction.currentEntitlements`** (Apple-signed **JWS**, verified on-device) so premium works offline and can't be trivially forged. Enroll in the **Small Business Program (15%)** and enable **Family Sharing** on the subscription.
- **Android purchases:** Google Play Billing via the provider SDK; acknowledge purchases; add a lightweight **Play Integrity** licensing/app-integrity check with **tiered enforcement** (degrade, don't hard-lock). In India, adopt **user-choice billing** to also offer Razorpay UPI and shave 4% off the fee.
- **Web purchases (the India-critical and margin-friendly path):**
  - **India → Razorpay Subscriptions with UPI AutoPay** (many students have no card); ~0.5–0.9% + GST.
  - **Global → Stripe Billing** (trials, proration, customer portal, 135+ currencies).
  - Wire web checkout to the same provider (RevenueCat **Web Billing**/Stripe, or Adapty/Qonversion web paywalls) so the purchase writes the **same cross-platform entitlement** for the signed-in user.
- **Identity glue:** require a **lightweight account/login** (email or social) as the entitlement key so the same user is recognized on iOS, Android, and web. Without it, cross-platform grant can't work. Keep notes local-first; sync only the entitlement/account, not necessarily the notes, if you want to stay minimal.
- **Honoring web purchases on mobile legally:** rely on Apple **3.1.3(b) multiplatform** and Google's cross-platform tolerance — **always also offer the same plan via IAP/Play Billing**, and don't surface the cheaper web price *inside* the iOS app except in the US storefront (post-Epic) or EU (DMA) where external links/CTAs are permitted. On the app, the SDK reads/polls `CustomerInfo` and unlocks.
- **Student verification:** curated institutional-email allowlist (free, India `.ac.in`/`.edu.in`/university domains + global WHED) → **SheerID** instant match → SheerID document fallback; issue the discount as a **store promo/offer code** (compliant) and **re-verify annually**.
- **What you never build:** App Store Server API integration, Play Developer API + RTDN pipelines, receipt databases, or webhook servers — the hosted provider owns all of it. Your only "server" is that SaaS plus the payment gateways' hosted checkout.

**One-line architecture:** *StoreKit 2 on-device verification (iOS) + Play Billing + Play Integrity (Android) + Razorpay UPI / Stripe (web), all unified behind RevenueCat's hosted entitlements keyed to a lightweight user account — a genuinely zero-server monetization stack.*

---

## Sources

- https://www.notion.com/pricing
- https://www.notion.com/students
- https://notability.com/pricing
- https://www.goodnotes.com/pricing
- https://apps.apple.com/us/app/goodnotes-6/id1444383602
- https://en.wikipedia.org/wiki/Notability_(app)
- https://noteshelf.net/
- https://www.myscript.com/notes
- https://www.microsoft.com/en-us/microsoft-365/buy/compare-all-microsoft-365-products
- https://developer.apple.com/app-store/review/guidelines/
- https://developer.apple.com/app-store/small-business-program/
- https://developer.apple.com/app-store/subscriptions/
- https://developer.apple.com/support/dma-and-apps-in-the-eu/
- https://developer.apple.com/support/storekit-external-entitlement/
- https://developer.apple.com/news/?id=hj39p8sh
- https://developer.apple.com/documentation/appstoreserverapi
- https://developer.apple.com/documentation/storekit/transaction/currententitlements
- https://support.apple.com/en-us/118223
- https://support.google.com/googleplay/android-developer/answer/10281818
- https://support.google.com/googleplay/android-developer/answer/112622
- https://support.google.com/googleplay/android-developer/answer/13821247
- https://support.google.com/googleplay/answer/7007852
- https://developers.google.com/android-publisher
- https://developer.android.com/google/play/integrity/overview
- https://developer.android.com/google/play/billing
- https://www.revenuecat.com/pricing/
- https://www.revenuecat.com/docs/getting-started/entitlements
- https://www.revenuecat.com/docs/getting-started/quickstart
- https://adapty.io/pricing/
- https://adapty.io/docs/web-paywall
- https://qonversion.io/pricing/
- https://razorpay.com/subscriptions/
- https://stripe.com/billing
- https://www.sheerid.com/
- https://corporate.myunidays.com/
- https://www.ftc.gov/news-events/news/press-releases/2024/10/federal-trade-commission-announces-final-click-cancel-rule-making-it-easier-consumers-end-recurring
- https://www.ftc.gov/legal-library/browse/rules/negative-option-rule
- https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers
