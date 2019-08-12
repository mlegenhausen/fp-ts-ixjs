import { IterableX, empty, map as ixMap, flatMap, concat } from 'ix/iterable'
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

export const URI = 'IterableX'

export type URI = typeof URI

export function getMonoid<A = never>(): Monoid<IterableX<A>> {
  return {
    concat: (x, y) => concat(x, y),
    empty: empty()
  }
}

export const iterable: Monad1<URI> & Alternative1<URI> & Filterable1<URI> = {
  URI,
  map: (fa, f) => ixMap(fa, f),
  of: a => IterableX.of(a),
  ap: (fab, fa) => flatMap(fab, f => ixMap(fa, f)),
  chain: (fa, f) => flatMap(fa, f),
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
    flatMap(fa, a =>
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
