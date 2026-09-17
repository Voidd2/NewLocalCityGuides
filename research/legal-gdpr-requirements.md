# Legal, privacy and tax requirements for launch

**Task:** `RESEARCH-LEGAL-001`  
**Status:** research complete; implementation and professional review still required  
**Checked:** 2026-09-17  
**Scope assumed:** a business established in the Netherlands sells paid, browser-based
digital city tours directly to consumers in the Netherlands and Germany. The product may use
accounts, payments, newsletters, maps, video, analytics and optional device location.

This is an implementation-oriented research checklist, not a substitute for advice on the
final legal entity, product classification or tax position. The classification matters:
immediately accessible videos and route content are likely to include “digital content”, while
an ongoing subscription may also be a “digital service”. The checkout must follow the rules
for the product actually sold.

## Decision summary

Do not open paid checkout until the following launch blockers are closed:

1. The operating entity is identified and, if the three KVK entrepreneur criteria apply,
   registered. The public legal pages show its registered/trade name, physical address,
   contact details, KVK number and VAT ID where applicable.
2. Every personal-data flow has an owner, purpose, legal basis, retention period, recipient
   and deletion path. Processor agreements and international-transfer safeguards have been
   checked for every vendor.
3. Optional cookies, tracking pixels, embedded marketing media and comparable device access
   stay off until valid consent. “Reject” is as direct as “Accept”; choices are granular and
   consent can be withdrawn as easily as it was given.
4. The checkout shows the product, total price, duration, delivery/access, compatibility,
   cancellation and complaint terms before the order. The final button clearly states that
   the order creates a payment obligation.
5. The customer receives the contract information and the accepted terms on a durable medium,
   normally email. Terms are versioned so the accepted version can be proved later.
6. A 14-day withdrawal flow and model form exist. Immediate digital access is enabled only
   after the customer expressly agrees to start and acknowledges the resulting loss of the
   withdrawal right; that agreement is included in the durable confirmation.
7. The terms and refund flow preserve statutory digital-content remedies. They must not use a
   blanket “no refunds” statement for content that is missing, defective or non-conforming.
8. A tax adviser confirms whether the tours are “digital services”, the applicable VAT rates,
   whether the EUR 10,000 EU threshold applies, and whether the Union OSS is used.
9. German-market pages include an easily recognisable, directly accessible and permanently
   available Impressum. German cookie/device access follows TDDDG section 25 as well as GDPR.
10. A legal review confirms the final NL and DE checkout, terms, withdrawal text, privacy
    notice, cookie banner and Impressum before launch.

## 1. Company registration and public identity

KVK says registration is required when all three conditions hold: the operator supplies goods
or services independently, earns money from them, and does so regularly for people beyond
family or friends. A paid public tour site is expected to meet these conditions, but the
operator must complete KVK's assessment using the real business facts.

Before sale, publish at least:

- registered and trade name;
- physical establishment address;
- a fast electronic contact method, including email, plus an effective direct contact route;
- KVK number and the register in which the business is entered;
- VAT identification number where applicable;
- legal form and authorised representative for a legal entity;
- the complaint procedure and contact point.

Place the core identity information in a persistent footer and a dedicated contact/legal page.
Do not hide mandatory pre-contract information only inside the terms.

For Germany, DDG section 5 requires the provider information for commercial digital services
to be easily recognisable, directly accessible and permanently available. Provide a German
`Impressum` link on German pages. A Dutch entity can use the same true Dutch registration and
address; do not invent a German office.

## 2. GDPR operating checklist

### Data inventory and lawful bases

Create a processing register before configuring vendors. Use the following as the starting
data map; confirm each row against the actual implementation.

| Processing | Minimum data | Starting legal-basis analysis | Launch control |
|---|---|---|---|
| Purchase and access | email, order, entitlement, transaction reference | contract; tax records may be a legal obligation | collect only what delivery, support and accounting need |
| Payment | order amount/status; payment details held by provider | contract and legal obligation | processor agreement; do not store card data locally |
| Account, if offered | email, credential/auth identifier, settings | contract | allow correction/deletion where no retention duty overrides |
| Newsletter | email and consent evidence | consent | unticked opt-in, purpose-specific proof, easy unsubscribe; double opt-in recommended as evidence |
| Optional analytics | online identifier, events, device data | consent is the conservative NL/DE baseline | no request, tag or local identifier before opt-in |
| Security/error logs | IP/online identifier, event and time | legitimate interest may apply | document balancing test, restrict access and keep briefly |
| Precise device location | current coordinates | explicit, informed user choice for the requested feature | browser permission is not blanket permission to retain history; process locally or transiently where possible |
| Support | contact and message contents | contract or legitimate interest, depending on request | prevent sensitive free-text data where possible; retention schedule |
| Embedded video/map | IP, identifiers and viewing/request data received by vendor | depends on whether strictly necessary and whether tracking occurs | inspect vendor behaviour; consent-gate optional tracking embeds |

Precise location is personal data when linked or linkable to a visitor. It is not automatically
a GDPR “special category”, but continuous history can be highly intrusive. The MVP should use
location only after an explicit action, avoid server-side history by default and offer the tour
without continuous tracking where feasible.

### Privacy notice

At the moment data is collected, provide a concise and accessible notice that states:

- controller identity and contact details; DPO contact only if a DPO is actually required;
- each purpose and legal basis, including the specific legitimate interest where used;
- recipients/categories and each relevant processor;
- third-country transfers, adequacy decision or safeguards and how to obtain them;
- retention period or objective criteria for determining it;
- rights of access, correction, deletion, restriction, objection and portability;
- withdrawal of consent without affecting earlier lawful processing;
- the right to complain to the Autoriteit Persoonsgegevens;
- whether data is legally/contractually required and the consequence of not providing it;
- automated decision-making/profiling and meaningful information about it, or a clear statement
  that it is not used;
- the source and data categories when data was not obtained from the person.

Publish the notice in the languages used to collect data. For this project's visitor flows that
means NL, EN and DE. The versions must describe the real system, not a generic template.

### Internal controls

- Sign GDPR article 28 processor agreements before production data reaches payment, email,
  hosting, video, analytics, support or authentication providers.
- Check where each provider stores and accesses data. Document adequacy or other GDPR chapter V
  safeguards for transfers outside the EEA.
- Apply data minimisation, least-privilege access, encryption in transit/at rest where
  appropriate, backups with deletion behaviour, and a tested retention/deletion schedule.
- Keep evidence of consent: text/version, purpose, time, method and later withdrawal. Do not
  retain more identity merely to prove consent than is proportionate.
- Create a rights-request procedure. GDPR article 12 normally requires action within one month.
- Keep a breach log and response plan. Notify the competent authority without undue delay and,
  where feasible, within 72 hours unless the breach is unlikely to risk people's rights and
  freedoms; notify affected people without undue delay when high risk is likely.
- Perform a DPIA before processing likely to create high risk, for example if later versions
  add systematic, large-scale or persistent location tracking or profiling.

## 3. Cookies and device access in the Netherlands and Germany

Treat “cookies” as shorthand for any reading from or writing to a visitor's terminal, including
local storage, tracking pixels, advertising identifiers and some embedded third-party code.

### Production baseline

1. On first visit, load only storage/access strictly needed to transmit the communication or
   provide a service the visitor explicitly requested.
2. Block analytics, advertising, social pixels and non-essential embedded trackers until
   consent. Server-side or cookieless does not remove GDPR if personal data is processed.
3. First-layer controls show equally clear `Accept optional` and `Reject optional` actions plus
   granular settings. No pre-ticked optional categories, nudging, consent by scrolling or
   consent walls that disadvantage refusal.
4. Explain purpose, provider, duration and data access before consent. Separate materially
   different purposes; do not bundle newsletter, analytics and advertising.
5. Keep the site usable after refusal, except where a genuinely requested function cannot work
   without its strictly necessary storage.
6. Provide a persistent `Cookie settings` link. Withdrawal must be as easy as consent and stop
   future optional processing.
7. Record and version consent, then periodically re-check every tag and vendor with a clean
   browser and all optional categories refused.

German TDDDG section 25 expressly requires consent for storing information on, or accessing
information already stored on, a user's terminal after clear and comprehensive GDPR-aligned
information. Its narrow exceptions cover transmission of a communication and access strictly
necessary for a digital service explicitly requested by the user. The production baseline
above is designed to satisfy both markets; vendor marketing labels such as “essential” are not
a legal classification.

## 4. Consumer checkout, terms and digital-product refunds

### Before the order

Present clearly and near the decision to buy:

- trader identity and contact details;
- essential characteristics and what the buyer receives;
- total price including VAT and any unavoidable additional cost;
- accepted payment methods and when payment is taken;
- access/delivery timing, duration, renewal and cancellation conditions;
- relevant functionality, compatibility/interoperability and technical requirements;
- complaint handling, statutory conformity rights and support;
- the 14-day withdrawal right, any valid exception and the statutory model form;
- the terms in a downloadable/storable form.

The final action must unambiguously communicate payment, for example `Bestelling met
betalingsverplichting` and an equally explicit German wording such as `Zahlungspflichtig
bestellen`. Avoid a vague `Verder` or `Aanmelden` button.

### Immediate access and withdrawal

Online digital content normally has a 14-day withdrawal period after contract confirmation.
For streaming/download access during that period, use an unchecked, clearly worded control
that records both the consumer's express agreement to start and acknowledgement that the
withdrawal right is lost once performance begins. ACM additionally says access must only be
made available after that agreement and the customer must start playback/download themselves.

Recommended checkout evidence, subject to legal review:

> Ik stem er uitdrukkelijk mee in dat de levering van de digitale inhoud direct begint. Ik
> erken dat ik daardoor mijn herroepingsrecht verlies zodra de levering begint.

Repeat the accepted text, terms version, product, price and withdrawal information in the email
confirmation. If the required information and agreement are absent, do not assume the right
has been lost. For subscriptions or services rather than one-off digital content, apply the
separate rules for starting or fully performing a service during the withdrawal period.

As of the research date, Dutch official guidance also requires an online function through
which consumers can withdraw and receive an immediate durable confirmation. The consulted
official pages conflict on the precise June 2026 commencement date (19 versus 25 June). That
date conflict does not change the launch action: implement the function before going live.

### Terms and statutory remedies

The terms should cover the licence/access scope, account rules, availability and supported
devices, payment, cancellation, acceptable use, intellectual property, support, complaints,
liability within mandatory-law limits, governing law and how changes are communicated. Make
them available before purchase and preserve every accepted version.

EU digital-content rules require supplied content/services to conform to the contract and
objective requirements, including relevant updates. Remedies can include bringing the product
into conformity, a proportionate price reduction or termination/refund. Refunds due after
price reduction or termination must generally be made without undue delay and within 14 days,
using the original payment method unless the consumer expressly agrees otherwise. Terms cannot
remove mandatory remedies or German mandatory consumer protection merely by choosing Dutch law.

## 5. VAT for EU digital services

First obtain a written classification of the product. Belastingdienst distinguishes “digital
services” (including electronically supplied services) from other services; the place-of-supply
and threshold analysis depends on that classification.

For qualifying B2C digital services to consumers in other EU countries:

- track the combined, VAT-exclusive annual value of cross-border EU digital services and
  relevant intra-EU distance sales;
- if both the previous and current calendar-year amount meet the conditions and stay at or
  below EUR 10,000, Dutch VAT may generally be used; a business can elect destination VAT for
  at least two years;
- once the threshold is exceeded, destination-country VAT applies from that point;
- foreign VAT can be reported via the Dutch Union scheme (OSS) quarterly, or through local
  registrations in each relevant country;
- determine and retain the legally required evidence of the customer's location and the
  required VAT records; configure checkout prices and receipts accordingly.

The threshold does not solve all cases, including businesses with establishments in other EU
states. Confirm the Dutch and German VAT rates, small-business scheme interaction, location
evidence and record-retention period with an accountant before launch.

## 6. Release evidence

| Gate | Evidence required | Owner | Status |
|---|---|---|---|
| Entity and tax setup | KVK extract, VAT ID/status, product classification, OSS decision | founder + accountant | OPEN |
| Legal identity | footer/contact page and German Impressum checked against registration | founder + legal reviewer | OPEN |
| Data inventory | processing register, lawful-basis record and retention schedule | product owner | OPEN |
| Vendors | processor agreements, subprocessor/transfer review | product owner | OPEN |
| Privacy | NL/EN/DE notices match production data flows | legal reviewer | OPEN |
| Cookies | clean-browser scan: zero optional requests before opt-in; reject/withdraw tests | engineering + legal reviewer | OPEN |
| Checkout | pre-contract information, payment button and durable confirmation tested | engineering + legal reviewer | OPEN |
| Withdrawal | model form/function, confirmation, 14-day logic and immediate-access evidence tested | engineering + legal reviewer | OPEN |
| Digital remedies | complaint, conformity, price-reduction and refund runbook | support + legal reviewer | OPEN |
| Incident response | rights-request and breach exercises completed | product owner | OPEN |

## 7. Questions that must be answered before legal copy is final

1. Which person/legal entity operates the site, and is it already registered?
2. Is access a one-off purchase, timed licence, subscription, guided live service or a bundle?
3. Is any part free in exchange for personal data?
4. Which payment, email, hosting, analytics, video, map, support and authentication vendors
   actually process production data, and from which countries?
5. Are precise coordinates sent to a server or vendor, retained, combined with an account or
   used for profiling?
6. Will the German market be actively targeted with German pages, ads, prices and checkout?
7. Does the operator qualify for any microenterprise accessibility exemption, and does another
   accessibility duty still apply? This needs a separate accessibility assessment.

## Sources

All sources were checked on 2026-09-17. Primary law and regulator/government guidance were
preferred; page content and legislation should be rechecked immediately before launch.

- KVK, [Moet je je bedrijf inschrijven bij KVK?](https://www.kvk.nl/starten/moet-ik-mijn-bedrijf-inschrijven-bij-kvk/)
- Netherlands Enterprise Agency, [Long-distance sales and purchases](https://business.gov.nl/regulations/long-distance-sales-and-purchases/)
- Netherlands Enterprise Agency, [Rules for business correspondence](https://business.gov.nl/regulations/rules-business-correspondence/)
- Netherlands Enterprise Agency, [Draw up a privacy statement](https://business.gov.nl/regulations/draw-up-privacy-statement/)
- Netherlands Enterprise Agency, [GDPR rules checklist](https://business.gov.nl/running-your-business/legal-matters/how-to-comply-with-gdpr-rules-checklist/)
- ACM, [Verplichte informatie vóór en na de koop](https://www.acm.nl/nl/verkoop-aan-consumenten/consumenten-informeren/verplichte-informatie-voor-en-na-de-koop)
- ACM, [Bedenktijd](https://www.acm.nl/nl/verkoop-aan-consumenten/klantenservice/bedenktijd)
- ACM ConsuWijzer, [Bedenktijd](https://consument.acm.nl/aankoop-dienst-annuleren/bedenktijd)
- Autoriteit Persoonsgegevens, [AP pakt misleidende cookiebanners aan](https://autoriteitpersoonsgegevens.nl/actueel/ap-pakt-misleidende-cookiebanners-aan)
- Autoriteit Persoonsgegevens, [Normuitleg: intrekken van toestemming bij cookiebanners (PDF)](https://autoriteitpersoonsgegevens.nl/uploads/2024-03/Normuitleg%20AP%20intrekken%20toestemming%20cookiebanners.pdf)
- EUR-Lex, [General Data Protection Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- EUR-Lex, [Consumer Rights Directive 2011/83/EU](https://eur-lex.europa.eu/eli/dir/2011/83/2022-05-28/eng)
- EUR-Lex, [Digital Content Directive (EU) 2019/770](https://eur-lex.europa.eu/eli/dir/2019/770/oj)
- EUR-Lex, [Directive (EU) 2023/2673 on the online withdrawal function](https://eur-lex.europa.eu/eli/dir/2023/2673/oj)
- German Federal Ministry of Justice, [DDG section 5](https://www.gesetze-im-internet.de/ddg/__5.html)
- German Federal Ministry of Justice, [TDDDG section 25](https://www.gesetze-im-internet.de/ttdsg/__25.html)
- German Data Protection Conference, [Guidance for digital services](https://www.datenschutzkonferenz-online.de/orientierungshilfen.html)
- Belastingdienst, [Ik lever diensten aan particulieren in de EU](https://www.belastingdienst.nl/wps/wcm/connect/nl/btw/content/btw-diensten-particulieren)
