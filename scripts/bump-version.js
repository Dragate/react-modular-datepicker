const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const semver = require('semver')

const packageJsonPath = path.join(__dirname, '../package.json')
const packageJsonData = fs.readFileSync(packageJsonPath, 'utf8')
const packageJson = JSON.parse(packageJsonData)

let version = packageJson.version
const releaseType = process.env.RELEASE_TYPE
const semverType = process.env.SEMVER_TYPE

function bumpVersion(version) {
    if (process.env.DRY_RUN) {
        console.log(`npm version ${version}`)
    } else {
        try {
            execSync(`npm version ${version}`, { stdio: 'inherit' })
        } catch (error) {
            console.error('Failed to execute npm version:', error)
            process.exit(1)
        }
    }
}

switch (releaseType) {
    case "canary":
        version = semver.prerelease(version)
            ? semver.inc(version, 'prerelease')
            : semver.inc(version, `pre${semverType}`, 'canary')
        break
    case "stable":
        if (!semverType) {
            console.error('Missing semver type. Expected "patch", "minor" or "major".')
            process.exit(1)
        }
        version = semver.inc(version, semverType)
        break
    default:
        console.error('Invalid release type. Expected "canary" or "stable".')
        process.exit(1)
}

bumpVersion(version)