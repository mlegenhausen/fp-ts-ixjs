---
title: IterableX.ts
nav_order: 3
parent: Modules
---

# IterableX overview

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [alt](#alt)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [compact](#compact)
- [filter](#filter)
- [filterMap](#filtermap)
- [flatten](#flatten)
- [getMonoid](#getmonoid)
- [iterable](#iterable)
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
export declare const URI: 'IterableX'
```

Added in v0.0.1

# alt

**Signature**

```ts
export declare const alt: <A>(that: () => IterableX<A>) => (fa: IterableX<A>) => IterableX<A>
```

Added in v0.0.1

# ap

**Signature**

```ts
export declare const ap: <A>(fa: IterableX<A>) => <B>(fab: IterableX<(a: A) => B>) => IterableX<B>
```

Added in v0.0.1

# apFirst

**Signature**

```ts
export declare const apFirst: <B>(fb: IterableX<B>) => <A>(fa: IterableX<A>) => IterableX<A>
```

Added in v0.0.1

# apSecond

**Signature**

```ts
export declare const apSecond: <B>(fb: IterableX<B>) => <A>(fa: IterableX<A>) => IterableX<B>
```

Added in v0.0.1

# chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => IterableX<B>) => (ma: IterableX<A>) => IterableX<B>
```

Added in v0.0.1

# chainFirst

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => IterableX<B>) => (ma: IterableX<A>) => IterableX<A>
```

Added in v0.0.1

# compact

**Signature**

```ts
export declare const compact: <A>(fa: IterableX<O.Option<A>>) => IterableX<A>
```

Added in v0.0.1

# filter

**Signature**

```ts
export declare const filter: {
  <A, B>(refinement: Refinement<A, B>): (fa: IterableX<A>) => IterableX<B>
  <A>(predicate: Predicate<A>): (fa: IterableX<A>) => IterableX<A>
}
```

Added in v0.0.1

# filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fa: IterableX<A>) => IterableX<B>
```

Added in v0.0.1

# flatten

**Signature**

```ts
export declare const flatten: <A>(mma: IterableX<IterableX<A>>) => IterableX<A>
```

Added in v0.0.1

# getMonoid

**Signature**

```ts
export declare function getMonoid<A = never>(): Monoid<IterableX<A>>
```

Added in v0.0.1

# iterable

**Signature**

```ts
export declare const iterable: Monad1<'IterableX'> & Alternative1<'IterableX'> & Filterable1<'IterableX'>
```

Added in v0.0.1

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: IterableX<A>) => IterableX<B>
```

Added in v0.0.1

# partition

**Signature**

```ts
export declare const partition: {
  <A, B>(refinement: Refinement<A, B>): (fa: IterableX<A>) => Separated<IterableX<A>, IterableX<B>>
  <A>(predicate: Predicate<A>): (fa: IterableX<A>) => Separated<IterableX<A>, IterableX<A>>
}
```

Added in v0.0.1

# partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => E.Either<B, C>
) => (fa: IterableX<A>) => Separated<IterableX<B>, IterableX<C>>
```

Added in v0.0.1

# separate

**Signature**

```ts
export declare const separate: <A, B>(fa: IterableX<E.Either<A, B>>) => Separated<IterableX<A>, IterableX<B>>
```

Added in v0.0.1
