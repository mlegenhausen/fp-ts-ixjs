/**
 * @since 0.0.1
 */
import { IterableX, empty, concat, of as ixOf } from 'ix/iterable'
import { map as ixMap, flatMap } from 'ix/iterable/operators'
import { Monoid } from 'fp-ts/lib/Monoid'
import { Alternative1 } from 'fp-ts/lib/Alternative'
import { Filterable1 } from 'fp-ts/lib/Filterable'
import { Monad1 } from 'fp-ts/lib/Monad'
import { identity, Predicate } from 'fp-ts/lib/function'
import { pipe, pipeable } from 'fp-ts/lib/pipeable'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    IterableX: IterableX<A>
  }
}

/**
 * @since 0.0.1
 */
export const URI = 'IterableX'

/**
 * @since 0.0.1
 */
export type URI = typeof URI

/**
 * @since 0.0.1
 */
export function getMonoid<A = never>(): Monoid<IterableX<A>> {
  return {
    concat: (x, y) => concat(x, y),
    empty: empty()
  }
}

/**
 * @since 0.0.1
 */
export const iterable: Monad1<URI> & Alternative1<URI> & Filterable1<URI> = {
  URI,
  map: (fa, f) => pipe(fa, ixMap(f)),
  of: ixOf,
  ap: (fab, fa) => iterable.chain(fab, f => iterable.map(fa, f)),
  chain: (fa, f) => pipe(fa, flatMap(f)),
  zero: empty,
  alt: (fx, f) => concat(fx, f()),
  compact: fa => iterable.filterMap(fa, identity),
  separate: fa => iterable.partitionMap(fa, identity),
  partitionMap: (fa, f) => ({
    left: iterable.filterMap(fa, a =>
      pipe(
        f(a),
        E.fold(O.some, () => O.none)
      )
    ),
    right: iterable.filterMap(fa, a =>
      pipe(
        f(a),
        E.fold(() => O.none, O.some)
      )
    )
  }),
  partition: <A>(fa: IterableX<A>, p: Predicate<A>) => iterable.partitionMap(fa, E.fromPredicate(p, identity)),
  filterMap: <A, B>(fa: IterableX<A>, f: (a: A) => O.Option<B>) =>
    iterable.chain(fa, a =>
      pipe(
        f(a),
        O.fold<B, IterableX<B>>(() => empty(), iterable.of)
      )
    ),
  filter: <A>(fa: IterableX<A>, p: Predicate<A>) => iterable.filterMap(fa, O.fromPredicate(p))
}

const {
  alt,
  ap,
  apFirst,
  apSecond,
  chain,
  chainFirst,
  compact,
  filter,
  filterMap,
  flatten,
  map,
  partition,
  partitionMap,
  separate
} = pipeable(iterable)

export {
  /**
   * @since 0.0.1
   */
  alt,
  /**
   * @since 0.0.1
   */
  ap,
  /**
   * @since 0.0.1
   */
  apFirst,
  /**
   * @since 0.0.1
   */
  apSecond,
  /**
   * @since 0.0.1
   */
  chain,
  /**
   * @since 0.0.1
   */
  chainFirst,
  /**
   * @since 0.0.1
   */
  compact,
  /**
   * @since 0.0.1
   */
  filter,
  /**
   * @since 0.0.1
   */
  filterMap,
  /**
   * @since 0.0.1
   */
  flatten,
  /**
   * @since 0.0.1
   */
  map,
  /**
   * @since 0.0.1
   */
  partition,
  /**
   * @since 0.0.1
   */
  partitionMap,
  /**
   * @since 0.0.1
   */
  separate
}
