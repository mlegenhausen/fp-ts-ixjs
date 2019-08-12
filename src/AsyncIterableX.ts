import { AsyncIterableX, merge, empty, map as ixMap, combineLatest, flatMap, catchWith } from 'ix/asynciterable'
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

export const URI = 'AsyncIterableX'

export type URI = typeof URI

export function getMonoid<A = never>(): Monoid<AsyncIterableX<A>> {
  return {
    concat: (x, y) => merge(x, y),
    empty: empty()
  }
}

export const asyncIterable: Monad1<URI> & Alternative1<URI> & Filterable1<URI> = {
  URI,
  map: (fa, f) => ixMap(fa, f),
  of: a => AsyncIterableX.of(a),
  ap: (fab, fa) => ixMap(combineLatest(fab, fa), ([f, a]) => f(a)),
  chain: (fa, f) => flatMap(fa, f),
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
    flatMap(fa, a =>
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
}

export const fromNodeStream = <E>(
  stream: NodeJS.ReadableStream,
  size: number,
  onreject: (err: unknown) => E
): AsyncIterableX<E.Either<E, string | Buffer>> =>
  catchWith(ixMap(ixFromNodeStream(stream, size), E.right), error => AsyncIterableX.of(E.left(onreject(error))))
