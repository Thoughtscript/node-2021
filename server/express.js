'use strict'

/**
 * @Author - Adam In Tae Gerard
 *
 * Express server.
 */

const express = require('express'),
  app = express()

module.exports = {
  createServer: () => {
    app
      .use(require('morgan')('dev'))
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(require('cookie-parser')())
      .use('/data', require('./api'))

    const listener = app.listen(
      require('../config.js').SERVER.EXPRESS_PORT,
      err => {
        if (err) console.error(err)
        else console.log(`Express server listening on port ${listener.address().port}`)
      }
    )

    return app
  }
}
