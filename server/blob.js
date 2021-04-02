'use strict'

/**
 * @Author - Adam InTae Gerard - https://www.linkedin.com/in/adamintaegerard/
 *
 * FS file handling.
 */

const FS = require('fs')

module.exports = {
  READ: path =>
    new Promise((resolve, reject) => {
      try {
        FS.readFile(path, (err, data) => {
          if (err) return reject(`Exception ${err}!`)
          return resolve(data.toString('utf8'))
        })
      } catch (ex) {
        return reject(`Exception ${ex}!`)
      }
    }),

  DELETE: path => {
    try {
      FS.unlinkSync(path, {
        force: true
      })
    } catch (ex) {
      return `Exception ${ex}!`
    }
  },

  CHECK_DIR: path => FS.existsSync(path),

  MKDIR: path => FS.mkdirSync(path),

  WRITE: (path, data) =>
    new Promise((resolve, reject) => {
      try {
        FS.writeFile(path, data, { flag: 'w' }, err => {
          if (err) return reject(`Exception ${err}!`)
          return resolve(data)
        })
      } catch (ex) {
        return reject(`Exception ${ex}!`)
      }
    })
}
