const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const semver = require('semver')

const packageJsonPath = path.join(__dirname, '../package.json')
const packageJsonData = fs.readFileSync(packageJsonPath, 'utf8')
const packageJson = JSON.parse(packageJsonData)

let version = packageJson.version

switch (process.env.RELEASE_TYPE) {
    case "canary":
        version = semver.prerelease(version)
            ? semver.inc(version, 'prerelease')
            : semver.inc(version, `pre${process.env.SEMVER_TYPE}`, 'canary')
        break
    case "stable":
        if (!process.env.SEMVER_TYPE) {
            console.error('Missing semver type. Expected "patch", "minor" or "major".')
            process.exit(1)
        }
        version = semver.inc(version, process.env.SEMVER_TYPE)
        break
    default:
        console.error('Invalid release type. Expected "canary" or "stable".')
        process.exit(1)
}

if (process.env.DRY_RUN) {
    console.log(`pnpm version ${version}`)
} else {
    try {
        execSync(`pnpm version ${version}`, { stdio: 'inherit' })
    } catch (error) {
        console.error('Failed to execute version:', error)
        process.exit(1)
    }
}