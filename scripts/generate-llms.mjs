import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const factsPath = path.join(rootDir, 'src/content/company-facts.ts');
const publicDir = path.join(rootDir, 'public');

export function generateLlmsContent() {
  const llmsV2 = `# MailPlus

> MailPlus is an Australian courier and parcel delivery network for small to medium sized business, founded in 1997. It operates 120+ franchised territories across all metro areas and selected regional areas, with approximately 300 vehicles on the road. Local owner-operators provide express parcel delivery in 1–2 business days Australia-wide, Post Office collect and lodge, and same-day pickup, supported by ShipMate, a free shipping platform. New business customers who send with Australia Post can try the service with five free collections.

## Key facts

- Founded in 1997 by Managing Director Chris Burgess; almost 30 years serving Australian businesses
- 120+ franchises and approximately 300 vehicles on the road, run by local owner-operators
- Franchised territories across all metro areas and selected regional areas
- Express parcel delivery in 1–2 business days Australia-wide; 95% of shipments arrive overnight on business days
- National flat-rate pricing for items up to 5kg; heavier items up to 20kg can also be sent
- Same-day collection by a local owner-operator when booked before the daily cut-off
- No lock-in contract, no monthly fee and no minimum volume
- Works alongside Australia Post: MailPlus collects and lodges mail and parcels on the customer's own Australia Post account
- Free shipping platform, ShipMate, with Shopify and WooCommerce integrations
- Head office: Level 16, 175 Pitt Street, Sydney NSW 2000
- Phone: 1300 65 65 95, Monday to Friday, 9am–5pm Sydney time

## Current offers and how to start

- [5 Free Collections](https://mailplus.com.au/5-free-collections): Free trial for new MailPlus business customers who already send with Australia Post (eParcel, MyPost Business or general mail on an Australia Post account). A local owner-operator collects from the business premises and lodges on the customer's own Australia Post account, so rates and tracking do not change. No credit card, no invoice, no contract and nothing to cancel. To start: enter the business address on the offer page to check for a local driver, activate LocalMile (the free booking app) with the code sent by SMS and email, then book the first collection.
- [ShipMate account](https://mailplus.com.au/shipmate-platform): ShipMate is free, with no subscription, no setup fee and no minimum volume. It suits online stores and any business that sends parcels, with or without an online store. To start: submit the enquiry form on the ShipMate page or call 1300 65 65 95, and the MailPlus team sets up the account.
- [Check your area](https://mailplus.com.au/#enquire): Enter a pickup address to see whether a local MailPlus owner-operator covers it, then choose the service needed.

## Which service fits

- A business that sends with Australia Post and wants to stop making the Post Office run: 5 Free Collections, then Post Office Collect & Lodge.
- An online store on Shopify or WooCommerce that wants fast, flat-rate shipping: Express Parcel Delivery through ShipMate.
- A business without an online store that sends parcels occasionally or urgently: ShipMate used on its own.
- A multi-site or corporate office that needs daily mail in and out, PO Box clearing or banking runs: Post Office Collect & Lodge.
- A 3PL or a business with its own warehouse or order system: MailPlus API.
- Someone looking to own a local courier business: Become a Franchisee.

## Services

- [Express Parcel Delivery](https://mailplus.com.au/express-delivery): Flat-rate express delivery for items up to 5kg, 1–2 business days anywhere in Australia. A local owner-operator collects the same day and partner carriers complete the line-haul, with MailPlus as the single point of contact for tracking and support.
- [Post Office Collect & Lodge](https://mailplus.com.au/post-office-collect-lodge): A local owner-operator delivers inbound Australia Post mail and parcels in the morning, lodges outbound items at the end of the day, clears business PO Boxes and handles express banking runs. Runs on a set schedule with no need to book each time.
- Local hand-to-hand delivery: Same-day local delivery handed to the recipient by a local owner-operator.

## Platform

- [ShipMate Platform](https://mailplus.com.au/shipmate-platform): Free platform for booking pickups, printing labels in bulk and tracking. Orders sync automatically from Shopify and WooCommerce. Includes address validation, customer email updates and messaging with the local operator.
- [MailPlus API](https://mailplus.com.au/mailplus-api): Connects a business's own systems directly to MailPlus for automated labels and tracking, with team support and training.
- [Track a Parcel](https://track.mailplus.com.au/): Parcel tracking.
- [ShipMate Login](https://customer.mailplus.com.au/): Login for existing customers.

## Pricing notes

- Express parcels are flat-rate for items up to 5kg. A collection fee may apply for lower-volume businesses and is agreed upfront.
- Post Office Collect & Lodge is priced to suit the business, across one site or many.
- [Surcharges](https://mailplus.com.au/surcharges): A surcharge applies to services and is published monthly.

## Resources

- [Resource Hub](https://mailplus.com.au/resources): Guides for small businesses that ship.
- [How MailPlus compares](https://mailplus.com.au/resources/how-we-compare)
- [How to choose a courier](https://mailplus.com.au/resources/how-to-choose-a-courier)
- [What is flat-rate shipping?](https://mailplus.com.au/resources/what-is-flat-rate-shipping)
- [Same-day delivery guide](https://mailplus.com.au/resources/same-day-delivery-guide)
- [Owner-operator vs large logistics](https://mailplus.com.au/resources/owner-operator-vs-large-logistics)
- [Integrate Shopify with a courier](https://mailplus.com.au/resources/integrate-shopify-with-a-courier)
- [Sendle shut down in Australia](https://mailplus.com.au/resources/sendle-shut-down-in-australia)

## Company

- [About MailPlus](https://mailplus.com.au/about)
- [Become a Franchisee](https://mailplus.com.au/become-a-franchisee): Exclusive territories for sale across NSW, the ACT, QLD, VIC and TAS.
- [Customer reviews on Reviews.io](https://www.reviews.io/company-reviews/store/mailplus.com.au)
- [Create a Support Ticket](https://track.mailplus.com.au/#support)
- [Pay My Invoice](https://www.bpoint.com.au/pay/mailplus)
- [Privacy Policy](https://mailplus.com.au/privacy)
- [Terms & Conditions](https://mailplus.com.au/terms)
`;

  const llmsFull = `# MailPlus — Full Content Summary

> A structured summary of MailPlus services, offers, pricing notes and company facts, drawn from the public pages of https://mailplus.com.au. Last updated November 2026. For current pricing and availability, visit the website or call 1300 65 65 95.

---

## Company overview

- **Name**: MailPlus Pty Ltd
- **Founded**: 1997, by Managing Director Chris Burgess
- **What it is**: An Australian courier and parcel delivery network for small to medium sized business
- **Network**: 120+ franchises and approximately 300 vehicles on the road, run by local owner-operators
- **Coverage**: Franchised territories across all metro areas and selected regional areas; express parcels delivered Australia-wide
- **Head office**: Level 16, 175 Pitt Street, Sydney NSW 2000
- **Phone**: 1300 65 65 95, Monday to Friday, 9am–5pm Sydney time
- **Website**: https://mailplus.com.au

MailPlus began in 1997 when Chris Burgess started collecting business mail and parcels from offices in Sydney with a single van and lodging them at the local Post Office. The model expanded through local owner-operators: franchisees who run their own exclusive territories. Customers deal with the same local driver each time, backed by an Australian head-office support team.

MailPlus works alongside Australia Post on Post Office runs, collecting and lodging on the customer's own Australia Post account. Its express network is an independent alternative to Australia Post and traditional couriers for door-to-door parcels.

---

## Current offer: 5 Free Collections

**URL**: https://mailplus.com.au/5-free-collections

- **What it is**: A free trial of five collections for new MailPlus business customers.
- **Who it is for**: Businesses that already send with Australia Post, whether eParcel, MyPost Business or general mail items on an Australia Post account.
- **What happens**: A local owner-operator collects parcels and mail from the business premises and lodges them at the Post Office on the customer's own Australia Post account. Rates, tracking and invoicing with Australia Post do not change.
- **Cost**: $0 for the five collections. No credit card, no invoice, no contract and nothing to cancel.
- **After the trial**: Continuing is the customer's choice.

**How to start**

1. Enter the business address on the offer page to check for a local owner-operator.
2. If the area is covered, MailPlus sends an activation code for LocalMile, the free booking app for Australia Post customers, by SMS and email.
3. Book the first collection in LocalMile. The job goes to the local owner-operator.
4. The owner-operator collects from the premises and lodges at the Post Office.

LocalMile is used for these local pickups. It is separate from ShipMate, which handles Australia-wide express shipping.

A business that does not send with Australia Post, or wants to switch, is better suited to Express Parcel Delivery.

---

## Service: Express Parcel Delivery

**URL**: https://mailplus.com.au/express-delivery

- **Delivery time**: 1–2 business days anywhere in Australia; 95% of shipments arrive overnight on business days
- **Pricing**: National flat rates for items up to 5kg. Heavier items up to 20kg can also be sent.
- **Pickup**: Same-day collection by a local owner-operator when booked before the daily cut-off for the area
- **Contract**: No lock-in contract, no monthly fee and no minimum volume
- **Fees**: A collection fee may apply for lower-volume businesses and is agreed upfront
- **Tracking**: Real-time tracking for the sender and the recipient, with updates at each scan
- **Booking**: Through ShipMate, the free shipping platform, or the MailPlus API

**How it works**

1. Print a label in ShipMate. This sends the job to the local driver.
2. The local owner-operator collects from the premises the same day.
3. The parcel moves through the national express network. Partner carriers handle the line-haul.
4. The parcel is delivered and tracked through to the door.

MailPlus remains the single point of contact for tracking and customer service on every shipment.

**Pickup coverage**: All major cities, including Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra and Darwin, plus selected regional areas including the Sunshine Coast, Central Coast, Geelong, Byron Bay and Southeast Queensland.

---

## Service: Post Office Collect & Lodge

**URL**: https://mailplus.com.au/post-office-collect-lodge

- **What it is**: MailPlus runs the Post Office trips for a business, so staff never queue or leave the office.
- **Morning service**: A local owner-operator collects incoming mail and parcels from Australia Post, clears business PO Boxes and delivers everything to the business.
- **Afternoon service**: An end-of-day pickup collects outbound mail and parcels for same-day lodgement.
- **Also handled**: Express banking runs, with deposits lodged the same day.
- **Booking**: Runs on a set schedule with no need to book each time.
- **Pricing**: Tailored to the business, across one site or many.
- **Urgent items**: Priority 1–2 day delivery anywhere in Australia can be collected on the same run.
- **Best suited to**: Multi-site and corporate operations, and any office with a daily mail routine.

---

## Service: Local hand-to-hand delivery

Same-day local delivery handed straight to the recipient by a local owner-operator.

---

## Platform: ShipMate

**URL**: https://mailplus.com.au/shipmate-platform

- **What it is**: The free MailPlus shipping platform for booking pickups and express shipments, printing labels and managing orders in one dashboard.
- **Cost**: Free. No subscription and no minimum volume. A collection fee may apply for lower-volume businesses, agreed upfront at signup.
- **Integrations**: Shopify and WooCommerce. Orders sync automatically with customer details carried across.
- **Labels**: Print labels for multiple orders at once.
- **Carriers**: Discounted, flat-rate pricing across premium carriers in one place.
- **Address validation**: Google address lookup validates suburb, state and postcode.
- **Tracking and updates**: Real-time tracking, plus built-in email updates to recipients.
- **Operator messaging**: Built-in messaging with the local MailPlus operator.
- **Who it is for**: Online stores and any business that sends parcels, including offices such as dentists, law firms, schools and retailers. No online store is required.

**How to get a ShipMate account**: Submit the enquiry form on the ShipMate page or call 1300 65 65 95. The MailPlus team sets up the account. Existing customers log in at https://customer.mailplus.com.au/.

---

## Platform: MailPlus API

**URL**: https://mailplus.com.au/mailplus-api

- **What it is**: A code-level integration that connects a business's own systems directly to MailPlus.
- **What it does**: Generates labels for the MailPlus express service on demand, with live tracking visible in both the customer's system and the MailPlus dashboard, and automatic customer email notifications.
- **Who it is for**: 3PLs and businesses with warehouse or custom shipping systems. Most businesses use ShipMate instead.
- **Support**: API customers get support from the MailPlus sales, customer service, IT systems teams and their local operator, plus team training.
- **How to start**: Submit the enquiry form on the API page or call 1300 65 65 95.

---

## Which service fits

| Situation | Best fit |
| --- | --- |
| Sends with Australia Post and wants to stop making the Post Office run | 5 Free Collections, then Post Office Collect & Lodge |
| Online store on Shopify or WooCommerce wanting fast, flat-rate shipping | Express Parcel Delivery through ShipMate |
| No online store, sends parcels occasionally or urgently | ShipMate used on its own |
| Multi-site or corporate office needing daily mail in and out, PO Box clearing or banking runs | Post Office Collect & Lodge |
| 3PL or business with its own warehouse or order system | MailPlus API |
| Wants to own a local courier business | Become a Franchisee |

---

## Why businesses choose MailPlus

- **The same local driver**: A local owner-operator who owns the territory and knows the business, not a different contract driver each visit.
- **A person answers**: An Australian head-office support team, with no long hold times and no bots.
- **Same-day collection**: From the business premises, with no depot drop-off or counter trip.
- **Predictable pricing**: One flat rate up to 5kg.
- **No commitment**: No lock-in contract and no minimum volume.

---

## Pricing notes

- Express parcels are flat-rate for items up to 5kg.
- A collection fee may apply for lower-volume businesses and is agreed upfront.
- A surcharge applies to services and is published monthly at https://mailplus.com.au/surcharges.
- Post Office Collect & Lodge pricing is tailored to the business.

---

## Frequently asked questions

**What does MailPlus do?**
MailPlus is an Australian courier network for small business, founded in 1997, with around 300 vehicles on the road. It provides express parcel delivery in 1–2 days Australia-wide, Post Office collect and lodge, and same-day local hand-to-hand delivery, all through a local driver.

**How much does MailPlus cost?**
Express parcels are flat-rate for anything up to 5kg. There is no lock-in contract and no minimum volume. New business customers who send with Australia Post can start with five free collections, with no card required.

**Can MailPlus handle a business's Post Office run?**
Yes. A local owner-operator collects parcels and mail, lodges them at the Post Office and clears business PO Boxes, all same-day.

**How fast does MailPlus deliver?**
1–2 business days anywhere in Australia, with 95% of shipments arriving overnight on business days.

**Does MailPlus work with Shopify?**
Yes. ShipMate connects to Shopify and WooCommerce. Orders sync automatically, labels print in a few clicks and tracking updates in real time. The MailPlus API connects custom systems.

**Does a business need an Australia Post account for the 5 free collections?**
Yes. The offer is for businesses already sending with Australia Post. Items are lodged on the customer's own account.

**Why choose MailPlus over Australia Post?**
A dedicated local owner-operator comes to the business, pricing is flat-rate, and a local support team answers quickly. For businesses that send with Australia Post, nothing changes: we collect and lodge on your own account, working alongside the Post Office rather than replacing it.

---

## Franchise opportunity

**URL**: https://mailplus.com.au/become-a-franchisee

A MailPlus franchise is a local, owner-operated courier business with an exclusive territory. Franchisees collect and lodge parcels and mail for local businesses, clear PO Boxes, handle Australia Post items and deliver express parcels. There is no shopfront and no retail trade. Franchisees are supported by head-office sales, marketing, operations and customer service teams. Territories are available across NSW, the ACT, QLD, VIC and TAS; the current list is on the franchise page.

---

## Key links

| Page | URL |
| --- | --- |
| Home | https://mailplus.com.au |
| 5 Free Collections | https://mailplus.com.au/5-free-collections |
| Express Parcel Delivery | https://mailplus.com.au/express-delivery |
| Post Office Collect & Lodge | https://mailplus.com.au/post-office-collect-lodge |
| ShipMate Platform | https://mailplus.com.au/shipmate-platform |
| MailPlus API | https://mailplus.com.au/mailplus-api |
| Check your area and enquire | https://mailplus.com.au/#enquire |
| About | https://mailplus.com.au/about |
| How MailPlus compares | https://mailplus.com.au/resources/how-we-compare |
| Resource Hub | https://mailplus.com.au/resources |
| Surcharges | https://mailplus.com.au/surcharges |
| Become a Franchisee | https://mailplus.com.au/become-a-franchisee |
| Track a Parcel | https://track.mailplus.com.au/ |
| ShipMate Login | https://customer.mailplus.com.au/ |
| Reviews | https://www.reviews.io/company-reviews/store/mailplus.com.au |
`;

  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsV2.trim() + '\n', 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFull.trim() + '\n', 'utf-8');
  console.log('✓ Generated public/llms.txt and public/llms-full.txt successfully.');
}

generateLlmsContent();

