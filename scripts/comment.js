/**
 * Expect all comments are in the valid format
 * @param {string} code
 * @return {Array<{comment: string, startIndex: number, endIndex: number, raw: string}>}
 */
module.exports.extractBlockComment = function extractBlockComment (code) {
  const lines = code.split('\n')
  const comments = []
  let indent = -1
  let startIndex = -1
  let parsedBuffer = []
  let rawBuffer = []

  function reset () {
    indent = -1
    startIndex = -1
    parsedBuffer = []
    rawBuffer = []
  }

  for (let lineIndex = 0, lineLen = lines.length; lineIndex < lineLen; lineIndex++) {
    let line = lines[lineIndex]
    if (indent >= 0) { // block started
      const endMatches = line.match(new RegExp(`^\\s{${indent + 1}}\\*{1,2}/$`))
      if (endMatches) { // end
        rawBuffer.push(line)
        comments.push({
          startIndex,
          endIndex: lineIndex,
          comment: parsedBuffer.join('\n'),
          raw: rawBuffer.join('\n')
        })
        reset()
        continue
      }

      const bodyMatches = line.match(new RegExp(`^\\s{${indent + 1}}\\*\\s(.*)$`))
      if (bodyMatches) {
        parsedBuffer.push(bodyMatches[1])
        rawBuffer.push(line)
      }
    }
    
    const startMatches = line.match(/^(\s*)\/\*\*$/)
    if (startMatches) { // start
      indent = startMatches[1].length
      startIndex = lineIndex
      rawBuffer.push(line)
    }
  }

  reset()

  return comments
}
