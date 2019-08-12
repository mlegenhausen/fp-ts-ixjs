[![CircleCI](https://circleci.com/gh/werk85/fp-ts-ixjs.svg?style=svg)](https://circleci.com/gh/werk85/fp-ts-ixjs)

[fp-ts](https://github.com/gcanti/fp-ts) bindings for [IxJS](https://github.com/ReactiveX/IxJS)

# Implemented instances

- `Monad`
- `Alternative`
- `Filterable`

# Example

```ts
import { AsyncIterableX } from 'ix/asynciterable'
import { asyncIterable } from 'fp-ts-rxjs/lib/AsyncIterableX'

const fa = AsyncIterableX.from([1, 2, 3])
const fb = asyncIterable.chain(fa, a => AsyncIterableX.from([a, a + 1]))
// fb will emit 1, 2, 2, 3, 3, 4
```

# Documentation

- [API Reference](https://werk85.github.io/fp-ts-ixjs)