import { Either, right, map, filterOrElse } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import BaseStats from '@/static/ts/stats'

export function suspicion (lv: number, individuals: number[], efforts: number[], effects: string[]): Either<string, never[]> {
  return pipe(
    right([]),
    filterOrElse(() => (lv === 50 || lv === 100),
      () => 'Lvは50または100である必要があります！'),
    filterOrElse(() => individuals.every((x) => x >= 0 && x <= 31),
      () => '個体値は0以上31以下である必要があります！'),
    filterOrElse(() => efforts.every((x) => x <= 252 && x >= 0),
      () => '一つの能力に割り当てられる努力値は0以上252以下である必要があります！'),
    filterOrElse(() => efforts.reduce((acc, cur) => acc + cur) <= 508,
      () => '努力値は508以下である必要があります！'),
    filterOrElse(() => efforts.every((x) => x % 4 === 0),
      () => '努力値は4の倍数である必要があります！'),
    filterOrElse(() => effects.every((x) => ['-', '↑', '↓'].find((y) => x === y)),
      () => '性格補正の入力は"-"または"↑"または"↓"である必要があります！'),
    filterOrElse(() => effects.filter((x) => x === '↑').length <= 1 && effects.filter((x) => x === '↓').length <= 1,
      () => '性格補正"↑"と"↓"はたかだかひとつずつまでの必要があります！')
  )
}

export function exec (stats: BaseStats, lv: number, individuals: number[], efforts: number[], effects: string[]): Either<string, number[]> {
  return pipe(
    suspicion(lv, individuals, efforts, effects),
    map(() => {
      const base = [stats['h'], stats['a'], stats['b'],
        stats['c'], stats['d'], stats['s']]
      const effect: any = { '-': 1.0, '↑': 1.1, '↓': 0.9 }

      let result = [0, 0, 0, 0, 0, 0]
      for (let i = 0; i < base.length; i++) {
        const t = base[i] * 2 + individuals[i] + efforts[i] / 4
        result[i] = Math.floor((i === 0) // i === 0のときHPでそれ以外はこうげきなど
          ? t * (lv / 100) + lv + 10
          : (t * (lv / 100) + 5) * effect[effects[i]])
      }
      return result
    })
  )
}
