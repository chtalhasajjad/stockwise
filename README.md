# StockWise

Offline-capable, installable (PWA) supply chain calculators: EOQ, Reorder Point, Safety Stock, Inventory Turnover.

Pure static site, no build step.

## Run locally
    npx serve .        # then open http://localhost:3000

## Deploy (Cloudflare Pages)
Framework preset: None | Build command: (empty) | Build output directory: /

After changing any file, bump `CACHE_VERSION` in `sw.js` so installed users get the update.
