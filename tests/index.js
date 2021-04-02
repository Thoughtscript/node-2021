"use strict"

/**
 * @author - Adam In Tae Gerard - https://www.linkedin.com/in/adamintaegerard/
 *
 * Tests - little inelegant here but scratch built.
 */

const R = require("./restRequest.js")

const INTEGRATION_TESTS = () => {
  let OID = "";

  setTimeout(() => {
    R.asyncGet("http:", "localhost", 7777, `/data/cats/${OID}`).then(
      (success) => {
        success = success.replace("undefined", "")
        console.log(success)
      },
      fail => { console.error(fail) })
  }, 10)

  setTimeout(() => {
    R.asyncPut("http:", "localhost", 7777, "/data/cats", null, {
      name: "hello!"
    }).then(
      (success) => {
        success = success.replace("undefined", "")
        OID = JSON.parse(success).oid
        console.log(success + '\n')
      },
      fail => { console.error(fail) })
  }, 100)

  setTimeout(() => {
    R.asyncGet("http:", "localhost", 7777, `/data/cats/${OID}`).then(
      (success) => {
        success = success.replace("undefined", "")
        console.log(success + '\n')
      },
      fail => { console.error(fail) })
  }, 200)

  setTimeout(() => {
    R.asyncDelete("http:", "localhost", 7777, `/data/cats/${OID}`).then(
      (success) => {
        success = success.replace("undefined", "")
        console.log(success + '\n')
      },
      (fail) => { console.error(fail) })
  }, 300)
};

try {
  INTEGRATION_TESTS();
} catch (ex) {
  console.error(`Exception ${ex}!`);
}
