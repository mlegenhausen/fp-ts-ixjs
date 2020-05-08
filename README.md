[![CircleCI](https://circleci.com/gh/werk85/fp-ts-ixjs.svg?style=svg)](https://circleci.com/gh/werk85/fp-ts-ixjs)

[fp-ts](https://github.com/gcanti/fp-ts) bindings for [IxJS](https://github.com/ReactiveX/IxJS)

# Implemented instances

- `Monad`
- `Alternative`
- `Filterable`

# Example

```ts
import { from } from 'ix/asynciterable'
import { asyncIterable } from 'fp-ts-ixjs/lib/AsyncIterableX'

const fa = from([1, 2, 3])
const fb = asyncIterable.chain(fa, a => from([a, a + 1]))
// fb will emit 1, 2, 2, 3, 3, 4
```

# Documentation

- [API Reference](https://werk85.github.io/fp-ts-ixjs)