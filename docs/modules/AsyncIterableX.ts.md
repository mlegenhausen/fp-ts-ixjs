---
title: AsyncIterableX.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [asyncIterable (constant)](#asynciterable-constant)
- [fromNodeStream (function)](#fromnodestream-function)
- [getMonoid (function)](#getmonoid-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# asyncIterable (constant)

**Signature**

```ts
export const asyncIterable: Monad1<URI> & Alternative1<URI> & Filterable1<URI> = ...
```

# fromNodeStream (function)

**Signature**

```ts
export const fromNodeStream = <E>(
  stream: NodeJS.ReadableStream,
  size: number,
  onreject: (err: unknown) => E
): AsyncIterableX<E.Either<E, string | Buffer>> =>
  catchWith(ixMap(ixFromNodeStream(stream, size), E.right), error => ...
```

# getMonoid (function)

**Signature**

```ts
export function getMonoid<A = never>(): Monoid<AsyncIterableX<A>> { ... }
```
