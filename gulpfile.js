const semver = require('semver')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const walk = require('./scripts/walk')
const { extractBlockComment } = require('./scripts/comment')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

const CQHTTP_DOCS_REGEX = () => /(https:\/\/cqhttp\.cc\/docs\/)\d+\.\d+/

const SRC_DIR = path.resolve(__dirname, `src`)

function getPackage () {
  return require('./package.json')
}

async function updateCQHTTPVersion () {
  const { engines: { cqhttp: cqhttpVersion } } = getPackage()
  const { major, minor } = semver.minVersion(cqhttpVersion)
  const versionTag = `${major}.${minor}`

  const tsFiles = await walk(SRC_DIR, { filter (filepath) { return filepath.substr(-3) === '.ts' } })
  let index = 0
  const promises = tsFiles.map(async function (file) {
    const content = await readFileAsync(file, 'utf8')
    const lines = content.split('\n')
    const comments = extractBlockComment(content)
    let updateLines = 0
    comments.forEach(function ({ startIndex, endIndex }) {
      for (let curIndex = startIndex + 1; curIndex < endIndex; curIndex++) {
        lines[curIndex] = lines[curIndex].replace(CQHTTP_DOCS_REGEX(), function (_, prefix) {
          updateLines++
          return prefix + versionTag
        })
      }
    })
    if (updateLines > 0) {
      await writeFileAsync(file, lines.join('\n'), 'utf8')
      console.log('Update CQHTTP URL [#%d]: "%s"', index++, file)
    }
  })

  await Promise.all(promises)
}

module.exports = {
  'docs:update-cqhttp-version': updateCQHTTPVersion
}
