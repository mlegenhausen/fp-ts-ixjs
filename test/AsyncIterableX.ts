import * as assert from 'assert'
import { Readable } from 'stream'
import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import { identity } from 'fp-ts/lib/function'
import { toArray, from } from 'ix/asynciterable'
import { asyncIterable as R } from '../src'

describe('AsyncIterableX', () => {
  it('of', () => {
    const fa = R.asyncIterable.of(1)
    return toArray(fa).then(events => {
      assert.deepStrictEqual(events, [1])
    })
  })

  it('map', () => {
    const fa = from([1, 2, 3])
    const double = (n: number): number => n * 2
    const fb = R.asyncIterable.map(fa, double)
    return toArray(fb).then(events => {
      assert.deepStrictEqual(events, [2, 4, 6])
    })
  })

  it('ap', () => {
    const fa = from([1, 2, 3])
    const double = (n: number): number => n * 2
    const triple = (n: number): number => n * 3
    const fab = from([double, triple])
    const fb = R.asyncIterable.ap(fab, fa)
    return toArray(fb).then(events => {
      assert.deepStrictEqual(events, [2, 3, 6, 9])
    })
  })

  it('chain', () => {
    const fa = from([1, 2, 3])
    const fb = R.asyncIterable.chain(fa, a => from([a, a + 1]))
    return toArray(fb).then(events => {
      assert.deepStrictEqual(events, [1, 2, 2, 3, 3, 4])
    })
  })

  it('filterMap', () => {
    const fa = from([1, 2, 3])
    const fb = R.asyncIterable.filterMap(
      fa,
      O.fromPredicate(n => n > 1)
    )
    return toArray(fb).then(events => {
      assert.deepStrictEqual(events, [2, 3])
    })
  })

  it('compact', () => {
    const fa = from([1, 2, 3].map(O.fromPredicate(n => n > 1)))
    const fb = R.asyncIterable.compact(fa)
    return toArray(fb).then(events => {
      assert.deepStrictEqual(events, [2, 3])
    })
  })

  it('filter', () => {
    const fa = from([1, 2, 3])
    const fb = R.asyncIterable.filter(fa, n => n > 1)
    return toArray(fb).then(events => {
      assert.deepStrictEqual(events, [2, 3])
    })
  })

  it('partitionMap', () => {
    const fa = from([1, 2, 3])
    const s = R.asyncIterable.partitionMap(
      fa,
      E.fromPredicate(n => n > 1, identity)
    )
    return toArray(s.left)
      .then(events => {
        assert.deepStrictEqual(events, [1])
      })
      .then(() =>
        toArray(s.right).then(events => {
          assert.deepStrictEqual(events, [2, 3])
        })
      )
  })

  it('separate', () => {
    const fa = from([1, 2, 3].map(E.fromPredicate(n => n > 1, identity)))
    const s = R.asyncIterable.separate(fa)
    return toArray(s.left)
      .then(events => {
        assert.deepStrictEqual(events, [1])
      })
      .then(() =>
        toArray(s.right).then(events => {
          assert.deepStrictEqual(events, [2, 3])
        })
      )
  })

  it('partition', () => {
    const fa = from([1, 2, 3])
    const s = R.asyncIterable.partition(fa, n => n > 1)
    return toArray(s.left)
      .then(events => {
        assert.deepStrictEqual(events, [1])
      })
      .then(() =>
        toArray(s.right).then(events => {
          assert.deepStrictEqual(events, [2, 3])
        })
      )
  })

  it('zero', async () => {
    const events = await toArray(R.asyncIterable.zero())

    assert.deepStrictEqual(events, [])
  })

  it('alt', async () => {
    const events = await toArray(R.asyncIterable.alt(R.asyncIterable.of(1), () => R.asyncIterable.of(2)))
    assert.deepStrictEqual(events, [1, 2])
  })

  it('getMonoid', async () => {
    const M = R.getMonoid<number>()
    const events = await toArray(M.concat(R.asyncIterable.of(1), R.asyncIterable.of(2)))
    assert.deepStrictEqual(events, [1, 2])
  })

  describe('fromNodeStream', () => {
    it('success', () => {
      let eventCount = 0
      const mockedStream = new Readable({
        objectMode: true,
        read: function() {
          if (eventCount < 3) {
            eventCount = eventCount + 1
            this.push({ message: `event${eventCount}` })
          } else {
            this.push(null)
          }
        }
      })
      return toArray(R.fromNodeStream(mockedStream, 1, E.toError)).then(results =>
        assert.deepStrictEqual(results, [
          E.right({ message: 'event1' }),
          E.right({ message: 'event2' }),
          E.right({ message: 'event3' })
        ])
      )
    })

    it('error', () => {
      let eventCount = 0
      const error = new Error('Fail')
      const mockedStream = new Readable({
        objectMode: true,
        read: function() {
          if (eventCount < 1) {
            eventCount = eventCount + 1
            this.push({ message: `event${eventCount}` })
          } else {
            setTimeout(() => this.emit('error', error), 0)
          }
        }
      })
      return toArray(R.fromNodeStream(mockedStream, 1, E.toError)).then(results =>
        assert.deepStrictEqual(results, [E.right({ message: 'event1' }), E.left(error)])
      )
    })
  })
})
