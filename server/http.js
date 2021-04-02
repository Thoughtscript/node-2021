'use strict'

/**
 * @Author - Adam In Tae Gerard - https://www.linkedin.com/in/adamintaegerard/
 *
 * Core Http server
 */

module.exports = {
  createHttpServer: () => {
    const S = require('http').createServer(require('./express').createServer())

    console.log('HTTP initialized!')
    console.log('REST API controller initialized!')

    S.on('clientError', (err, sck) => {
      const e = `HTTP/1.1 400 Bad Request! ${err}`
      console.error(e)
      sck.end(e)
    })

    S.listen(require('../config').SERVER.PORT, () => { console.log(`HTTP server started on port: ${S.address().port}`) })

    return S
  }
}
