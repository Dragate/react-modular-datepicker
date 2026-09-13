const fs = require('fs')
const path = require('path')

const readmePath = path.join(__dirname, '../README.md')

let readme = fs.readFileSync(readmePath, 'utf8')

const cdnBase = `https://6pcvnpdosyar2uqr.public.blob.vercel-storage.com/docs/images/`

// Replace relative paths like ./docs/images/ or docs/images/ in attributes/markdown links with CDN base URL
readme = readme.replace(/(["'(])(?:\.\/)?docs\/images\//g, `$1${cdnBase}`)

fs.writeFileSync(readmePath, readme, 'utf8')
console.log(`Updated README.md image URLs to use ${cdnBase}`)

