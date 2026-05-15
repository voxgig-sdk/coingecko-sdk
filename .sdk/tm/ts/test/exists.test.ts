
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CoingeckoSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CoingeckoSDK.test()
    equal(null !== testsdk, true)
  })

})
