# Mock products

`products.json` contains 10 products for the Hidromad rebuild, available at
`/data/products.json` when the Next.js development server is running.

Product names and remote image URLs are based on https://hidromad.com/.
Descriptions and category assignments are sample content; `stock` values are
mock booleans, not live inventory. Images are hosted by the source website.

Each entry in `products` contains `name` (string), `img` (URL string),
`category` (string array), `description` (string), and `stock` (boolean).
