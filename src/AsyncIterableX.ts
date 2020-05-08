/**
 * @since 0.0.1
 */
import { AsyncIterableX, merge, empty, combineLatest, of as ixOf } from 'ix/asynciterable'
import { map as ixMap, flatMap, catchError } from 'ix/asynciterable/operators'
import { Monoid } from 'fp-ts/lib/Monoid'
import { Alternative1 } from 'fp-ts/lib/Alternative'
import { Filterable1 } from 'fp-ts/lib/Filterable'
import { Monad1 } from 'fp-ts/lib/Monad'
import { identity, Predicate } from 'fp-ts/lib/function'
import { pipe, pipeable } from 'fp-ts/lib/pipeable'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import { fromNodeStream as ixFromNodeStream } from 'ix/asynciterable/fromnodestream'

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    AsyncIterableX: AsyncIterableX<A>
  }
}

/**
 * @since 0.0.1
 */
export const URI = 'AsyncIterableX'

/**
 * @since 0.0.1
 */
export type URI = typeof URI

/**
 * @since 0.0.1
 */
export function getMonoid<A = never>(): Monoid<AsyncIterableX<A>> {
  return {
    concat: (x, y) => merge(x, y),
    empty: empty()
  }
}

/**
 * @since 0.0.1
 */
export const asyncIterable: Monad1<URI> & Alternative1<URI> & Filterable1<URI> = {
  URI,
  map: (fa, f) => pipe(fa, ixMap(f)),
  of: a => ixOf(a),
  ap: (fab, fa) =>
    pipe(
      combineLatest(fab, fa),
      ixMap(([f, a]) => f(a))
    ),
  chain: (fa, f) => pipe(fa, flatMap(f)),
  zero: empty,
  alt: (fx, f) => merge(fx, f()),
  compact: fa => asyncIterable.filterMap(fa, identity),
  separate: fa => asyncIterable.partitionMap(fa, identity),
  partitionMap: (fa, f) => ({
    left: asyncIterable.filterMap(fa, a =>
      pipe(
        f(a),
        E.fold(O.some, () => O.none)
      )
    ),
    right: asyncIterable.filterMap(fa, a =>
      pipe(
        f(a),
        E.fold(() => O.none, O.some)
      )
    )
  }),
  partition: <A>(fa: AsyncIterableX<A>, p: Predicate<A>) => asyncIterable.partitionMap(fa, E.fromPredicate(p, identity)),
  filterMap: <A, B>(fa: AsyncIterableX<A>, f: (a: A) => O.Option<B>) =>
    asyncIterable.chain(fa, a =>
      pipe(
        f(a),
        O.fold<B, AsyncIterableX<B>>(() => empty(), asyncIterable.of)
      )
    ),
  filter: <A>(fa: AsyncIterableX<A>, p: Predicate<A>) => asyncIterable.filterMap(fa, O.fromPredicate(p))
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
} = pipeable(asyncIterable)

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

/**
 * @since 0.0.1
 */
export const fromNodeStream = <E>(
  stream: NodeJS.ReadableStream,
  size: number,
  onreject: (err: unknown) => E
): AsyncIterableX<E.Either<E, string | Buffer>> =>
  pipe(
    ixFromNodeStream(stream, size),
    ixMap(E.right),
    catchError(error => ixOf(E.left(onreject(error))))
  )
