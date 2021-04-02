'use strict'

/**
 * @Author - Adam In Tae Gerard - https://www.linkedin.com/in/adamintaegerard/
 *
 * Simple Public API.
 */

const express = require('express'),
  publicApi = express.Router(),
  C = require('../config'),
  B = require('./blob'),
  { v4: uuidv4 } = require('uuid')

/**
{
    "oid": "2845f5a412dbdfacf95193f296dd0f5b2a16920da5a7ffa4c5832f223b03de96",
    "size": 1234
}
*/

publicApi
  .get('/:repository/:objectID', (req, res) => {
    return new Promise((resolve, reject) => {
      try {
        const repository = req.params.repository,
          objectID = req.params.objectID,
          path = `${C.DATA.DIR}/${repository}/${objectID}`

        B.READ(path).then(
          data => {
            let responseData = data.toString('utf8')
            return resolve(res.status(200).send({ status: 200, data: responseData }))
          }, () => resolve(res.status(404).send({ status: 404, data: `404 Not Found!` }))
        )
        
      } catch (ex) {
        return resolve(
          res.status(400).send({ status: 400, data: 'Exception encountered!' })
        )
      }
    })
  })

  .delete('/:repository/:objectID', (req, res) => {
    return new Promise((resolve, reject) => {
      try {
        const repository = req.params.repository,
          objectID = req.params.objectID,
          path = `${C.DATA.DIR}/${repository}/${objectID}`

        B.DELETE(path)
        return resolve(res.status(200).send({ status: 200 }))

      } catch (ex) {
        return resolve(
          res.status(400).send({ status: 400, data: 'Exception encountered!' })
        )
      }
    })
  })

  .put('/:repository', (req, res) => {
    return new Promise((resolve, reject) => {
      try {
        const obj = req.body,
          repository = req.params.repository,
          uuid = uuidv4(),
          path = `${C.DATA.DIR}/${repository}`,
          blob = JSON.stringify(obj)

        if (!B.CHECK_DIR(path)) B.MKDIR(path)

        B.WRITE(`${path}/${uuid}`, blob).then(() =>
          resolve(res.status(201).send({ status: 201, oid: uuid, size: blob.length }))
        ), () =>resolve(res.status(400).send({ status: 400, data: 'Exception encountered!' }))

      } catch (ex) {
        return resolve(
          res.status(400).send({ status: 400, data: 'Exception encountered!' })
        )
      }
    })
  })

console.log(`Public API initialized`)

module.exports = publicApi
