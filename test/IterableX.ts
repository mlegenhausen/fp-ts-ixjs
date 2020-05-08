import * as assert from 'assert'
import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import { identity } from 'fp-ts/lib/function'
import { toArray, from } from 'ix/iterable'
import { iterable as R } from '../src'

describe('IterableX', () => {
  it('of', () => {
    const fa = R.iterable.of(1)
    assert.deepStrictEqual(toArray(fa), [1])
  })

  it('map', () => {
    const fa = from([1, 2, 3])
    const double = (n: number): number => n * 2
    const fb = R.iterable.map(fa, double)
    assert.deepStrictEqual(toArray(fb), [2, 4, 6])
  })

  it('ap', () => {
    const fa = from([1, 2, 3])
    const double = (n: number): number => n * 2
    const triple = (n: number): number => n * 3
    const fab = from([double, triple])
    const fb = R.iterable.ap(fab, fa)
    assert.deepStrictEqual(toArray(fb), [2, 4, 6, 3, 6, 9])
  })

  it('chain', () => {
    const fa = from([1, 2, 3])
    const fb = R.iterable.chain(fa, a => from([a, a + 1]))
    assert.deepStrictEqual(toArray(fb), [1, 2, 2, 3, 3, 4])
  })

  it('filterMap', () => {
    const fa = from([1, 2, 3])
    const fb = R.iterable.filterMap(
      fa,
      O.fromPredicate(n => n > 1)
    )
    assert.deepStrictEqual(toArray(fb), [2, 3])
  })

  it('compact', () => {
    const fa = from([1, 2, 3].map(O.fromPredicate(n => n > 1)))
    const fb = R.iterable.compact(fa)
    assert.deepStrictEqual(toArray(fb), [2, 3])
  })

  it('filter', () => {
    const fa = from([1, 2, 3])
    const fb = R.iterable.filter(fa, n => n > 1)
    assert.deepStrictEqual(toArray(fb), [2, 3])
  })

  it('partitionMap', () => {
    const fa = from([1, 2, 3])
    const s = R.iterable.partitionMap(
      fa,
      E.fromPredicate(n => n > 1, identity)
    )
    assert.deepStrictEqual(toArray(s.left), [1])
    assert.deepStrictEqual(toArray(s.right), [2, 3])
  })

  it('separate', () => {
    const fa = from([1, 2, 3].map(E.fromPredicate(n => n > 1, identity)))
    const s = R.iterable.separate(fa)
    assert.deepStrictEqual(toArray(s.left), [1])
    assert.deepStrictEqual(toArray(s.right), [2, 3])
  })

  it('partition', () => {
    const fa = from([1, 2, 3])
    const s = R.iterable.partition(fa, n => n > 1)
    assert.deepStrictEqual(toArray(s.left), [1])
    assert.deepStrictEqual(toArray(s.right), [2, 3])
  })

  it('zero', async () => {
    const events = await toArray(R.iterable.zero())
    assert.deepStrictEqual(events, [])
  })

  it('alt', async () => {
    const events = await toArray(R.iterable.alt(R.iterable.of(1), () => R.iterable.of(2)))
    assert.deepStrictEqual(events, [1, 2])
  })

  it('getMonoid', async () => {
    const M = R.getMonoid<number>()
    const events = await toArray(M.concat(R.iterable.of(1), R.iterable.of(2)))
    assert.deepStrictEqual(events, [1, 2])
  })
})
