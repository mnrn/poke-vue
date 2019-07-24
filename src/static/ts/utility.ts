import { NonEmptyArray, tail, cons } from 'fp-ts/lib/NonEmptyArray'

// Exception for Shedinja (ヌケニン) : Fixed HP = 1
export function exceptShedinja (selected: string, result: NonEmptyArray<number>): NonEmptyArray<number> {
  return selected === 'ヌケニン'
    ? cons(1, tail(result))
    : result
}
