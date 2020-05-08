---
title: AsyncIterableX.ts
nav_order: 1
parent: Modules
---

# AsyncIterableX overview

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [alt](#alt)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [asyncIterable](#asynciterable)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [compact](#compact)
- [filter](#filter)
- [filterMap](#filtermap)
- [flatten](#flatten)
- [fromNodeStream](#fromnodestream)
- [getMonoid](#getmonoid)
- [map](#map)
- [partition](#partition)
- [partitionMap](#partitionmap)
- [separate](#separate)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.0.1

# URI

**Signature**

```ts
export declare const URI: 'AsyncIterableX'
```

Added in v0.0.1

# alt

**Signature**

```ts
export declare const alt: <A>(that: () => AsyncIterableX<A>) => (fa: AsyncIterableX<A>) => AsyncIterableX<A>
```

Added in v0.0.1

# ap

**Signature**

```ts
export declare const ap: <A>(fa: AsyncIterableX<A>) => <B>(fab: AsyncIterableX<(a: A) => B>) => AsyncIterableX<B>
```

Added in v0.0.1

# apFirst

**Signature**

```ts
export declare const apFirst: <B>(fb: AsyncIterableX<B>) => <A>(fa: AsyncIterableX<A>) => AsyncIterableX<A>
```

Added in v0.0.1

# apSecond

**Signature**

```ts
export declare const apSecond: <B>(fb: AsyncIterableX<B>) => <A>(fa: AsyncIterableX<A>) => AsyncIterableX<B>
```

Added in v0.0.1

# asyncIterable

**Signature**

```ts
export declare const asyncIterable: Monad1<'AsyncIterableX'> &
  Alternative1<'AsyncIterableX'> &
  Filterable1<'AsyncIterableX'>
```

Added in v0.0.1

# chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => AsyncIterableX<B>) => (ma: AsyncIterableX<A>) => AsyncIterableX<B>
```

Added in v0.0.1

# chainFirst

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => AsyncIterableX<B>) => (ma: AsyncIterableX<A>) => AsyncIterableX<A>
```

Added in v0.0.1

# compact

**Signature**

```ts
export declare const compact: <A>(fa: AsyncIterableX<O.Option<A>>) => AsyncIterableX<A>
```

Added in v0.0.1

# filter

**Signature**

```ts
export declare const filter: {
  <A, B>(refinement: Refinement<A, B>): (fa: AsyncIterableX<A>) => AsyncIterableX<B>
  <A>(predicate: Predicate<A>): (fa: AsyncIterableX<A>) => AsyncIterableX<A>
}
```

Added in v0.0.1

# filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fa: AsyncIterableX<A>) => AsyncIterableX<B>
```

Added in v0.0.1

# flatten

**Signature**

```ts
export declare const flatten: <A>(mma: AsyncIterableX<AsyncIterableX<A>>) => AsyncIterableX<A>
```

Added in v0.0.1

# fromNodeStream

**Signature**

```ts
export declare const fromNodeStream: <E>(
  stream: NodeJS.ReadableStream,
  size: number,
  onreject: (err: unknown) => E
) => AsyncIterableX<E.Either<E, string | Buffer>>
```

Added in v0.0.1

# getMonoid

**Signature**

```ts
export declare function getMonoid<A = never>(): Monoid<AsyncIterableX<A>>
```

Added in v0.0.1

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: AsyncIterableX<A>) => AsyncIterableX<B>
```

Added in v0.0.1

# partition

**Signature**

```ts
export declare const partition: {
  <A, B>(refinement: Refinement<A, B>): (fa: AsyncIterableX<A>) => Separated<AsyncIterableX<A>, AsyncIterableX<B>>
  <A>(predicate: Predicate<A>): (fa: AsyncIterableX<A>) => Separated<AsyncIterableX<A>, AsyncIterableX<A>>
}
```

Added in v0.0.1

# partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => E.Either<B, C>
) => (fa: AsyncIterableX<A>) => Separated<AsyncIterableX<B>, AsyncIterableX<C>>
```

Added in v0.0.1

# separate

**Signature**

```ts
export declare const separate: <A, B>(
  fa: AsyncIterableX<E.Either<A, B>>
) => Separated<AsyncIterableX<A>, AsyncIterableX<B>>
```

Added in v0.0.1
