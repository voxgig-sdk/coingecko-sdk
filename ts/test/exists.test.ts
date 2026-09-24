
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CoingeckoSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CoingeckoSDK.test()
    equal(testsdk instanceof CoingeckoSDK, true,
      'CoingeckoSDK.test() must return a client synchronously')
  })

})
