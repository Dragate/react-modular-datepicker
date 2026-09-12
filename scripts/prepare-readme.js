const fs = require('fs')
const path = require('path')

const packageJsonPath = path.join(__dirname, '../package.json')
const readmePath = path.join(__dirname, '../README.md')

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
const version = process.env.PACKAGE_VERSION || packageJson.version

let readme = fs.readFileSync(readmePath, 'utf8')

const cdnBase = `https://cdn.jsdelivr.net/npm/${packageJson.name}@${version}/docs/images/`

// Replace relative paths like ./docs/images/ or docs/images/ in attributes/markdown links with CDN base URL
readme = readme.replace(/(["'(])(?:\.\/)?docs\/images\//g, `$1${cdnBase}`)

fs.writeFileSync(readmePath, readme, 'utf8')
console.log(`Updated README.md image URLs to use ${cdnBase}`)

