
import { Context } from './Context'


class CoingeckoError extends Error {

  isCoingeckoError = true

  sdk = 'Coingecko'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CoingeckoError
}

