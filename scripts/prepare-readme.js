const fs = require('fs')
const path = require('path')

const packageReadmePath = path.join(__dirname, '../packages/react-modular-datepicker/README.md')

let readme = fs.readFileSync(packageReadmePath, 'utf8')

const cdnBase = `https://6pcvnpdosyar2uqr.public.blob.vercel-storage.com/docs/images/`

// Replace relative paths like ./docs/images/ or docs/images/ in attributes/markdown links with CDN base URL
readme = readme.replace(/(["'(])(?:\.\/)?docs\/images\//g, `$1${cdnBase}`)

fs.writeFileSync(packageReadmePath, readme, 'utf8')
console.log(`Updated README.md image URLs to use ${cdnBase}`)

