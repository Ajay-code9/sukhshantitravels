# Sukh Shanti Tour & Travels

Single-page travel enquiry website for Bijhar and Deotsidh, Hamirpur, Himachal Pradesh. Built with React, TypeScript and Vite.

## Local preview

1. Install Node.js and run `npm ci`.
2. Start with `npm run dev`.
3. Open http://localhost:3000/.

## Validation

- `npm run build` creates the production site in `dist`.
- `npm run lint` checks TypeScript.

## Enquiries

The website has no booking backend, payment processing or form storage. The enquiry form opens WhatsApp with the entered travel details. The visitor must send the message in WhatsApp; a booking requires direct confirmation from the business.

No Gemini API key or environment file is required.

## Business details

The phone number and content are in `src/App.tsx`. Map links show the two operating areas, not verified office pins. Obtain exact office coordinates before replacing those links with office directions. Add vehicle photos, vehicle capacities and customer reviews only after the business provides and verifies them.

## Deployment

Production is hosted on Vercel at `www.sukhshantitravels.co.in`. Vercel runs `npm run build` and serves `dist`, as configured in `vercel.json`.

## Destination carousel

The Destinations section covers 12 popular Himachal destinations. Content and route references live in `src/destinations.ts`; images and licence information are in `src/destinationImages.json`. Photos are served locally from `public/destinations` as optimized WebP files. Visible photo credits and licence links are part of the carousel and must be retained when reusing these images.

Distances are approximate one-way road estimates. The suggested trip lengths include outward travel, sightseeing and return travel, with separate suggestions for Delhi and Chandigarh. They are planning suggestions, not guaranteed schedules. Some slides use a named endpoint or seasonal route; preserve those notes when editing numbers.

Controls support destination shortcuts, previous/next buttons, keyboard arrows and touch swiping on the photo. The optional slideshow pauses on hover or focus and respects reduced-motion preferences. Destination enquiry buttons open WhatsApp with the selected place and suggested duration.

## Responsive layout

Layouts use fluid spacing and type, with compact navigation through 960px. Services use one, two or four columns according to available space; the contact section stacks through 1100px. The enquiry form uses its own available width to choose one or two columns. Destination photos and controls stack through 900px, with controls above the photo on compact layouts. Inputs use 16px text and controls provide touch-friendly targets. Phone actions account for safe-area insets, and the floating desktop action appears only when there is room outside the content.

Verified in a Chromium browser at 25 viewport sizes from 280px to 2560px, including short landscape screens. Checks covered every destination at 320px, expanded FAQs and photo credits, long form values, image bounds, menu dismissal and resizing, and horizontal overflow. Phone, tablet and desktop section screenshots were also inspected.

## Fleet

The fleet section uses locally served, optimized photos supplied by the business. Vehicle selectors show Ertiga, Alto K10, Alto 800 and Traveller details with WhatsApp enquiry links. Ertiga registration is HP 01 H 3303. There are no third-party model viewers, WebGL requirements or fleet scroll animations.

The destination card uses content-driven height with no internal scroll panel or clipped trip information. Desktop uses a photo beside compact trip details; mobile stacks a shorter photo above the complete details. Expanded itineraries grow the page naturally. Verified at six phone, tablet, desktop and landscape sizes, including long destination content.

## Local search SEO

Production builds prerender the full page to HTML and hydrate it in the browser. The canonical URL and sitemap default to https://www.sukhshantitravels.co.in/; override with SITE_URL when moving the site. Build generates dist/robots.txt and dist/sitemap.xml. BASE_PATH defaults to / for the custom domain; use an explicit subpath only for a separate subpath deployment. The GitHub Pages workflow is a separate optional deployment; it does not deploy to Vercel.

Structured data lists the real business name, phone, service areas and services. No unverified office address, coordinates, ratings or reviews are invented. Complete verified office details and the Google Business Profile URL before adding those fields.

After publishing: verify the domain in Google Search Console, submit /sitemap.xml, inspect the homepage and request indexing. Verify the legitimate Google Business Profile, keep business name/phone/site consistent, add genuine fleet photos and ask customers for honest reviews. Use separate location profiles only for eligible, real locations. Localhost changes do not affect Google until deployed and crawled; rankings are not guaranteed.
