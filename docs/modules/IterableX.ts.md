---
title: IterableX.ts
nav_order: 3
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [iterable (constant)](#iterable-constant)
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

# iterable (constant)

**Signature**

```ts
export const iterable: Monad1<URI> & Alternative1<URI> & Filterable1<URI> = ...
```

# getMonoid (function)

**Signature**

```ts
export function getMonoid<A = never>(): Monoid<IterableX<A>> { ... }
```
