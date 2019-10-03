import test from 'ava'
import { stub, spy } from 'sinon'

import { Connection } from '../../src/connection/Connection'

test('base connection interface', async (t) => {
  const startedAt = Date.now()
  const closeDelay = 500
  const closeCode = 1000
  const closeReason = 'normal close'

  const connection = new Connection({
    url: 'ws://fake_url',
    close: stub()
      .callsFake(() => setTimeout(
        () => connection.handleClose(closeCode, closeReason),
        closeDelay
      ))
  })

  t.is(connection.url, 'ws://fake_url')
  t.true(connection.openedAt instanceof Date)
  t.false(connection.closed)
  t.is(connection.closedAt, undefined)
  t.is(connection.closeCode, undefined)
  t.is(connection.closeReason, undefined)

  const closeSpy = spy()
  connection.on('close', closeSpy)

  await connection.close()
  t.true(closeSpy.calledOnce)
  t.true(Date.now() - startedAt >= closeDelay)
  t.true(connection.closed)
  t.true(connection.closedAt instanceof Date)
  t.is(connection.closeCode, closeCode)
  t.is(connection.closeReason, closeReason)
})
