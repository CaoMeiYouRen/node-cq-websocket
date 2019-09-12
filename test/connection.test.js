import test from 'ava'
import { spy } from 'sinon'

import { Connection } from '../src/connection/Connection'

test('cov test', async (t) => {
  const socket = {
    url: 'ws://fake_url',
    close: spy(),
    send: spy()
  }
  // new Connection()
})
