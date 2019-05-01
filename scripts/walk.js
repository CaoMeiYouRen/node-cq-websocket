const fs = require('fs')
const path = require('path')

/**
 * @param {string} dir
 * @param {{filter: (filepath: string) => boolean}} options
 * @return {Promise<Array<string>>}
 */
module.exports = function walk (dir, options = {}) {
  const filter = options.filter || (() => true)
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (error, files) => {
      if (error) {
        return reject(error)
      }
      Promise.all(files.map((file) => {
        return new Promise((resolve, reject) => {
          const filepath = path.join(dir, file)
          fs.stat(filepath, (error, stats) => {
            if (error) {
              return reject(error)
            }
            if (stats.isDirectory()) {
              walk(filepath, options).then(resolve)
            } else if (stats.isFile() && filter(filepath)) {
              resolve(filepath)
            } else {
              resolve()
            }
          })
        })
      }))
      .then((foldersContents) => {
        resolve(
          foldersContents
            .filter(Boolean)
            .reduce(
              (all, folderContents) => all.concat(folderContents),
              []
            )
        )
      })
    })
  })
}
