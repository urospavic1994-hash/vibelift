# VibeLift — Plan for Google sign-in and paid subscription

Written 17 Sep 2026. Status: PLAN ONLY, nothing built. Needs Uroš's approval per phase.
Project tree (decisions, sources, rejected claims): Google Drive → Project Trees → `TREE — VibeLift login and payments`.
Mockups and flow diagram: see the artifact link in the tree.

## How to read the proof marks

Uroš cannot re-verify technical or legal claims, so every claim this plan depends on carries a mark:

- **[A]** Claude opened the official source and read the exact text (law text on eur-lex.europa.eu, provider's own documentation, or VibeLift's own code).
- **[B]** A research agent quoted an official source with a link; Claude did not re-open it.
- **[C]** Not confirmed by any official source. Treated as unknown. The plan never depends on a [C] item without a step that settles it.

This plan is not legal or tax advice. Two items need a professional before the first real charge (section 9).

---

## 1. Decisions recorded from Uroš (17 Sep 2026)

1. The income is personal, not Kos-komerc.
2. Free trial is **3 days** (changes the roadmap's 7 days). No card at trial start.
3. He would like PayPal because it feels easier.
4. Everything must be legal in the EU.
5. Research first, plan second, build only after approval.

## 2. The PayPal question — straight answer

**Selling directly through your own PayPal account: not recommended. PayPal as a button inside a provider's checkout: yes, possible.**

Why direct PayPal is the hard road, not the easy one:

| Fact | Mark | Source |
|---|---|---|
| PayPal is a payment processor. Its user agreement says the seller alone must "assess, collect, report and remit the correct taxes". It sends no VAT to anyone. | [B] | paypal.com legal hub, user agreement |
| EU VAT on app subscriptions sold to EU consumers is owed in the customer's country. For a seller outside the EU there is no small-seller threshold, so it applies from the first sale, through a "Non-Union One Stop Shop" registration and quarterly returns. | [B] | VAT Directive 2006/112 Art. 58; vat-one-stop-shop.ec.europa.eu |
| When a platform that "authorises the charge" or "sets the general terms" sells your digital service, the law presumes the PLATFORM is the supplier for VAT. That is exactly what a merchant of record is. PayPal does not do this. | [A] | Implementing Regulation 282/2011 Art. 9a (text read in Reg. 1042/2013) |
| Polar states: "We are liable for all of the above as your reseller" for US sales tax, EU VAT and others; "you're always responsible for your own income/revenue tax in your country of residency". | [A] | polar.sh/docs/merchant-of-record/introduction |
| Customers who live in Serbia could NOT pay you by PayPal: "Platni promet između rezidenata ne može da se obavlja preko PayPal-a". Collecting from abroad is allowed. | [A] | nbs.rs, showcontent id=9879 |
| PayPal Seller Protection generally excludes digital goods and services, so a disputed $9.99 is lost plus a fee. | [B] | paypal.com help, seller protection |
| Card payment without a PayPal account and Apple Pay for a Serbian PayPal merchant | [C] | PayPal's country list page would not load. Probably not available, which would force every customer to own a PayPal account. |
| With direct selling, every EU consumer-law duty in section 5 is yours alone: the pay button wording, the withdrawal function, refunds, invoices. | [A] | Directive 2011/83 as amended |

How you still get PayPal: **Paddle's checkout offers PayPal, cards, Apple Pay and Google Pay for subscriptions** [B] (paddle.com/help). The customer sees a PayPal button; Paddle is the seller and handles the VAT.

## 3. Provider: apply to both, build on whichever accepts you

| | Paddle | Polar |
|---|---|---|
| PayPal button for subscribers | Yes [B] | Nothing found, treat as no [C] |
| Apple Pay | Yes, for subscriptions; domain verification optional [A] | Appears by itself on hosted checkout [B] |
| Serbia | Not on Paddle's unsupported-countries list [A]; acceptance of a private person not stated anywhere [C] | Serbia listed by name, individuals allowed, payout through Stripe Connect Express [A] |
| Fee on $9.99 | 5% + $0.50 ≈ $1.00 [B] | 5% + $0.50 + 1.5% non-US card ≈ $1.15, plus payout fees ($2 per active month + 0.25% + $0.25 per payout) [A] |
| Approval risk | Reports in 2026 of first-time solo builders rejected; needs a live site with terms, privacy, refund pages [B, anecdotal] | Review "up to 14 days", identity document + selfie, needs a live website [B] |
| Webhook (payment message) rules | Reply within 5 s; retries up to 60 times over 3 days; no order guarantee; replay available [B] | Reply within 10 s; 10 retries; endpoint switched OFF after 10 failures in a row; manual redelivery in dashboard [A] |
| Customer self-service portal | Cancel, update payment [B] | Cancel, update card, invoices [A] |
| Cancel from our server (needed for delete-account) | `POST /subscriptions/{id}/cancel`, immediately or at period end [B] | `DELETE /v1/subscriptions/{id}` = revoke now [B] |
| Pass our user id into checkout | `custom_data` [B] | `external_customer_id` [B] |
| Known complaints | Rejections | Payout stuck 25+ days, thin support (Trustpilot) [B, anecdotal] |

**Recommendation:** because PayPal matters to you, Paddle is first choice and Polar is the fallback. The only way to learn whether either accepts a private person from Serbia is to apply, and applying is free, so apply to both in the same week. Both have a sandbox (test mode) that works before approval, so building does not wait for the answer. All our code talks to the provider through ONE small adapter file, so switching provider later means rewriting one file, not the app.

## 4. What it costs to run a paid app (new information)

| Item | Cost | Mark |
|---|---|---|
| **Vercel Pro — required.** The free plan is "restricted to non-commercial personal use only"; "any method of requesting or processing payment from visitors" counts as commercial. | $20 / month | [A] vercel.com/docs/limits/fair-use-guidelines |
| **Supabase Pro — strongly recommended.** Free projects are paused after 7 quiet days (all logins die); paid projects are never paused and get daily backups. | $25 / month | [B] supabase.com/docs/guides/platform/free-project-pausing |
| Real domain (needed for provider approval, Google branding, email deliverability) | about $12 / year | — |
| Provider fee | about $1.00–1.15 per $9.99 | see section 3 |
| EU data-protection representative (section 5.3) | unknown | [C] |

Rough break-even: about $8.85 reaches you per subscriber, so **6 paying members cover the $45 monthly base**. These costs start only at go-live (Phase 8), not during building and testing.

## 5. EU rules, and who carries each one

### 5.1 Consumer law — text verified

EU consumer law applies even though you are in Serbia, because the app is offered to EU consumers [B] (Rome I Regulation 593/2008 Art. 6).

| Rule | Exact wording / meaning | Mark | Who carries it |
|---|---|---|---|
| Pay button | Button must be labelled "only with the words 'order with obligation to pay' or a corresponding unambiguous formulation". If not, "the consumer shall not be bound". | [A] Dir. 2011/83 Art. 8(2) | Provider (their checkout). We make sure OUR button that opens checkout says plainly that payment follows, e.g. "Subscribe — $9.99/month". |
| 14-day withdrawal | Consumer may withdraw within 14 days without giving a reason. | [A] Art. 9 | Provider refunds; we provide the way in (below). |
| VibeLift is a "digital service", not "digital content" | Court of Justice, case C-234/25 (Sky Österreich, 9 July 2026): a subscription offering "of a dynamic nature which goes beyond the mere stable … provision of specific content" is a digital service. So the easy "download started, no refund" exception (Art. 16(m)) does NOT fit a subscription app. | [A] judgment text read | Means: a member who asks for a refund inside 14 days of paying gets one. Do not design any "you waived your refund" checkbox. |
| If they used it before withdrawing | They pay "an amount which is in proportion to what has been provided" — only if they expressly asked for the service to start during the 14 days. | [A] Art. 14(3) | Provider policy. Simplest honest approach: full refund inside 14 days. At $9.99 the pro-rata math is not worth a dispute. |
| **Withdrawal function (new, applies from 19 June 2026)** | For contracts concluded online the consumer must be able to withdraw through a function labelled "withdraw from contract here" or equivalent, "continuously available throughout the withdrawal period", "prominently displayed", followed by a "confirm withdrawal" button and an acknowledgement on a durable medium (email) with date and time. | [A] Dir. 2023/2673, new Art. 11a | Split between provider and us is [C]. **Step in Phase 0: ask the provider's support in writing how they meet Art. 11a and what they expect from the app.** Regardless of the answer, we build the in-app entry: Settings → Subscription → "Withdraw from contract (14-day refund)". |
| Easy cancel | Germany: a permanent cancel button (§ 312k BGB) [B]. France: cancel in three clicks (L215-1-1) [C]. General EU rule: cancelling must not be harder than subscribing [B]. | | Us: Settings → Subscription → Cancel, two taps, no guilt screens, confirmation email. |
| Before-purchase information | Who the seller is, what the service is, total price, that it renews monthly, how to cancel. | [B] Art. 6 | Us, on the paywall screen and in the Terms. |
| Confirmation email after purchase | Contract confirmation on a durable medium. | [B] Art. 8(7) | Provider sends receipt/invoice. |

### 5.2 Trial design that is legal and honest

The 3-day trial takes no card, so nobody can be charged by surprise — the most common complaint about fitness apps ("charged after trial") cannot happen here. The trial end is shown as a **date**, not only "2 days left". One reminder email goes out the day before the trial ends. Payment only ever happens when the member actively goes through checkout.

Honest business note: the RevenueCat 2025 subscription report shows trials under 4 days converting at roughly 25% against 45% for long trials, and no-card trials converting far lower than card trials [B, industry data]. A 3-day no-card trial is the weakest combination for conversion. It is your decision; the trial length is ONE number in the database setup, so it can be changed later without rebuilding anything. An optional yearly price next to the monthly one is the usual way to offset this; it is left out of the build unless you ask for it.

### 5.3 Data protection (GDPR)

| Point | Mark | Action |
|---|---|---|
| GDPR applies to a non-EU app that offers its service to people in the EU (Art. 3(2)). | [B] EDPB Guidelines 3/2018 | Privacy page must meet Art. 13 (who, what, why, how long, who receives it, rights). A privacy page already exists; it gets a payment section. |
| A non-EU business normally must appoint an EU representative (Art. 27); the exception for "occasional" processing is unlikely to fit a running subscription app. | [B] + cost [C] | Professional question, section 9. |
| Workout logs are ordinary personal data; body weight and body tracking may count as health data depending on context. | [C] | Body tracking is already optional. It gets its own explicit consent switch, off by default. No health claims anywhere in the app. |
| Processor contracts (DPAs) with Supabase, Vercel, Brevo and the payment provider. | [B] Art. 28 | All four offer standard DPAs to accept online. Phase 6 checklist. |
| Card data never touches VibeLift. The provider hosts the checkout. We store four fields: provider customer id, subscription id, status, paid-until date. | [B] PCI SSC guidance on SAQ A | Rule: no other billing data in our database. |
| Deleting an account erases workouts and profile. The provider keeps invoices because tax law requires it. | [B] | Stated in the privacy page. |
| Login session storage is "strictly necessary", so no cookie banner as long as no analytics or ad trackers are added. | [B] ePrivacy Art. 5(3) | Keep it that way. |
| Expired members keep the right to see and export their data. | [B] GDPR Art. 15, 20 | Expired state = read and export allowed, logging new workouts blocked. |

### 5.4 Pages that must be live before the first EU sale

Terms of Service · Privacy Policy (updated) · Refund and withdrawal policy · Contact / seller identification page (your name, a contact email, country). Providers also check for these before approving an account. Claude drafts them in plain language; the professional in section 9 reviews them.

## 6. How it is built — the full loop

### 6.1 The rule that prevents "cancelled in the app but still charged"

**VibeLift never stores its own idea of whether someone is subscribed.** Cancelling, refunding and paying all happen at the provider. Our database holds a mirror that only our server writes, from three inputs:

1. Signed messages (webhooks) from the provider.
2. On every message we do not trust the message content or order; we ask the provider's API "what is the state of this subscription right now?" and store that answer. Out-of-order or duplicate messages become harmless.
3. A nightly job re-reads every subscription from the provider and repairs any difference, and emails you if it had to repair something or if a message failed.

Input 3 is mandatory, not a nicety: Polar switches a webhook endpoint off after 10 failures in a row [A], so without the nightly check a broken deploy could silently stop all updates.

### 6.2 Pieces

| Piece | What it is | Plain meaning |
|---|---|---|
| `subscriptions` table (Supabase) | user id, provider customer id, subscription id, status, paid-until, cancel-at-period-end flag, trial start | The mirror. Members can read only their own row; nobody but our server can write [B: Supabase RLS docs]. |
| Trial start | Filled by a database trigger when the account is created, never sent by the app | A member cannot restart or extend their own trial by editing anything in the browser [B]. |
| `webhook_events` table | One row per provider message id | A message delivered twice is processed once. |
| `/api/pay-webhook` | Server function; checks the signature on the raw message, rejects old timestamps, records the id, re-fetches truth from the provider, updates the mirror, answers fast | The ear. |
| `/api/checkout` | Creates a checkout for the signed-in member with OUR user id attached | Payment is tied to the account, never to an email address that might differ. |
| `/api/portal` | Opens the provider's self-service page for that member | Cancel, change card, invoices. |
| `/api/reconcile` | Nightly, protected by a secret [B: Vercel cron docs] | The safety net. |
| `/api/delete-account` | Cancels at the provider FIRST, waits for confirmation, then deletes the account. If the cancel fails, nothing is deleted and the member is told why. | Closes the loop you asked about. |
| `/api/entitlement` | Answers "may this member use the app right now" and hands the app a signed pass valid 3 days | The gym has no signal: the app keeps working offline for up to 3 days on the last pass. |
| Provider adapter | One file that speaks Paddle or Polar | Switching provider = one file. |
| Alert email | Through the Brevo account already in use | You hear about problems without watching dashboards. |

Honest limit: VibeLift is an offline-first app that runs in the browser, so a technically skilled person can always tamper with their own copy. What they cannot do is get the cloud side (sync, backup, account) to serve them without paying, because the database itself refuses. That is the realistic security level for this kind of app [B: OWASP authorization guidance].

### 6.3 Every event, end to end

| Event | Database mirror | Member sees |
|---|---|---|
| Account created | Row created, trial start stamped by the database | "Trial: free until Sat 20 Sep" |
| Day before trial ends | — | Reminder email; banner "Trial ends tomorrow" |
| Trial over, no payment | Status = expired | Paywall. History readable, export available, new logging blocked |
| Pays | Message arrives → re-fetch → active + paid-until | Paywall lifts within seconds; "You're in" screen |
| Closes checkout page too early | Nothing yet | App shows "Confirming payment…" and re-checks; never trusts the return page |
| Renewal succeeds | Paid-until moves forward | Nothing |
| Card fails | past_due; access stays while provider retries | Banner "Payment failed — update your card" |
| Retries exhausted | canceled | Paywall returns |
| Cancels | Flag "ends at period end"; status stays active | "Cancelled. Access until 17 Oct." Button becomes "Resume" |
| Withdraws inside 14 days | Provider refunds → revoked | "Refund on its way. Access ended." Email confirmation with date and time |
| Refund or chargeback | Access off at once | Paywall |
| Deletes account while subscribed | Cancel at provider → confirmed → delete | "Subscription cancelled and account deleted" |
| Comes back later | New subscription id on the same account | Paywall lifts, history is still there |
| Nightly check finds a difference | Mirror corrected, logged | You get an email |
| Provider unreachable / our server down | No change | Last 3-day pass keeps the app working; nobody is locked out mid-workout |

### 6.4 A gap found in the current app

The login screen has "Skip — use this phone only". With a paywall, skipping would mean no account, no trial clock and free use forever. **When the paywall switch is on, an account is required** and the skip button is hidden. The existing "You're offline" fallback stays so a first launch without internet never traps anyone.

## 7. Google sign-in

Findings (details in the tree, branch 3.1):

- Same email by code and by Google merges into one account; no duplicate, no split workouts [A: Supabase identity-linking docs + our code verifies email by code].
- Our code holds only the public key, and the offline cache does not interfere with the Google return trip [A: read `index.html` and `sw.js`].
- Google consent screen must be set to "In production", otherwise 100-user cap and weekly logouts [B].
- Google's button rules: text "Continue with Google", standard colored G, and it must be "at least as prominently" displayed as other sign-in options [B: developers.google.com/identity/branding-guidelines]. So it cannot be a small link under the email field.
- **Biggest unknown [C]:** inside the iPhone home-screen app the Google page may open in Safari and never hand the login back. Official and developer sources disagree. Only a test on your iPhone settles it. Signing in through Safari first does not help, because iOS copies only cookies to the installed app, not the storage our login uses [A: webkit.org].
- In-app browsers (Instagram, TikTok) are refused by Google; we show "Open in Safari" and the email code keeps working [B].

## 8. Phases

Both features follow the connector rule: one switch each (`GOOGLE_LOGIN_ON`, `PAYWALL_ON`). Switch off, a piece missing, or a provider unreachable → the app behaves exactly as it does today. Every push: compile check, bump `CACHE_VERSION`, verify live.

| Phase | What | Who | Done when |
|---|---|---|---|
| **0. Groundwork** | Accountant question (section 9). Buy the domain. Apply to Paddle and Polar; open both sandboxes. Written question to provider support about the withdrawal function. Approve the mockups. | Uroš, with exact steps from Claude | Domain live, sandbox keys exist, answers logged in the tree |
| **L1. Google, hidden** | Google Cloud project + Supabase Google provider (about 15 minutes of Uroš, step by step). Button in code behind the switch, visible only to Uroš's account. | Both | Button appears for Uroš only |
| **L2. iPhone test** | Test script: Safari, home-screen app, Android, desktop, Instagram browser; existing email account + Google with the same email → same workouts. | Uroš tests, Claude reads results | Every row of the script passes or has a decided fallback |
| **L3. Google for everyone** | Switch on. If the home-screen test failed, the button is hidden inside the installed iPhone app only. | Claude | Live, verified |
| **P1. Database** | Tables, trial trigger, entitlement function, read-only rules. Nothing reads them yet. | Claude writes SQL, Uroš pastes it | Tables exist; an ordinary member cannot write to them (tested) |
| **P2. The ear** | `/api/pay-webhook` in sandbox with signature check, duplicate protection, re-fetch, alert email. | Claude | Test payment in sandbox updates the mirror; a forged message is rejected; a repeated message changes nothing |
| **P3. The rest of the server** | checkout, portal, reconcile (nightly), entitlement pass, delete-account order. | Claude | Each proven in sandbox |
| **P4. Screens** | Trial banner, paywall, confirming, success, payment failed, subscription card, cancel, withdraw, expired, delete. Built from the approved mockups, behind the switch. | Claude | Visible to Uroš's account only |
| **P5. Legal pages and emails** | Terms, privacy update, refund/withdrawal policy, contact page, trial-ending email, DPAs accepted. | Claude drafts, professional reviews | Pages live |
| **P6. Full-loop test in sandbox** | The 15 rows of table 6.3 run one by one with test cards, including cancel, refund, failed card, delete account, server-down. | Claude runs, Uroš repeats the main path on his phone | All 15 pass, results saved in `docs/` |
| **P7. Go live** | Vercel Pro, Supabase Pro, live keys (named separately from sandbox keys; server refuses to start on a mix), one real $9.99 purchase by Uroš, refund it, confirm the mirror followed. | Both | Real money went out and came back correctly |
| **P8. Switch on** | Only when the roadmap's launch gate is met (premium features live). | Uroš decides | Paywall on |
| **9. Keeping it healthy** | Calendar reminders: monthly look at provider dashboard vs member count; yearly domain renewal; provider payout check; Supabase and Vercel invoices. | Claude creates reminders on approval | Reminders exist |

Order: Phase 0 and L1–L3 can start now. P1–P6 need only sandbox keys. Nothing costs money until P7.

## 9. Two questions for professionals — before the first real charge

1. **Serbian accountant:** "I am a private person. A foreign company (Paddle, UK, or Polar, US) will sell my app subscriptions as merchant of record and pay the proceeds to my personal bank account monthly. What do I have to register and pay in Serbia: the self-taxation regime for income from abroad, or registration as an entrepreneur (paušal)?" The official freelancer portal describes work-for-hire income and does not mention app subscriptions [B: frilenseri.purs.gov.rs], so this cannot be answered from public sources [C].
2. **EU privacy professional (one-hour consult or a representative service):** "Non-EU individual, small fitness subscription app with EU users, data stored in Frankfurt. Do I need an Art. 27 EU representative, is optional body-weight tracking special-category data, and are my privacy page and terms adequate?"

## 10. What is still unknown, and the step that settles each

| Unknown [C] | Settled by |
|---|---|
| Will Paddle or Polar accept a private person from Serbia | Phase 0 applications |
| Google sign-in inside the iPhone home-screen app | Phase L2 test |
| Apple Pay inside the iPhone home-screen app | Phase P6, on the real phone |
| How the provider covers the Art. 11a withdrawal function | Phase 0 written question to support |
| Exact PayPal fees and card-without-account for Serbia | Only matters if direct PayPal is chosen against this plan's advice |
| Serbian tax treatment | Section 9, question 1 |
| EU representative, health-data status | Section 9, question 2 |

## 11. Sources read directly by Claude [A]

- Directive 2011/83/EU consolidated, Art. 8(2), 9, 14(3), 16(a), 16(m) — eur-lex.europa.eu, CELEX 02011L0083-20220528
- Directive (EU) 2023/2673, new Art. 11a and application date 19 June 2026 — CELEX 32023L2673
- Court of Justice, C-234/25 Sky Österreich Fernsehen, 9 July 2026, operative part — CELEX 62025CJ0234
- Implementing Regulation (EU) 1042/2013 inserting Art. 9a into Reg. 282/2011 — CELEX 32013R1042
- National Bank of Serbia on PayPal — nbs.rs/sr/scripts/showcontent/index.html?id=9879
- Vercel fair use, commercial usage — vercel.com/docs/limits/fair-use-guidelines
- Polar: supported countries, pricing, merchant-of-record introduction, webhook delivery, customer portal — polar.sh/docs and polar.sh/resources/pricing
- Paddle: Apple Pay concepts page; unsupported seller countries — developer.paddle.com, paddle.com/help
- WebKit on home-screen web app storage — webkit.org/blog/14205
- VibeLift code: `index.html` (login, Supabase client), `sw.js` (cache rules)

All [B] sources are listed with links in the project tree.
