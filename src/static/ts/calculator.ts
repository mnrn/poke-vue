import { Option, none } from 'fp-ts/lib/Option'
import { Either, left, right, isLeft, swap, getOrElse } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import BaseStats from '@/static/ts/stats'

export default class Calculator {
  require (stats: BaseStats, lv: number, individuals: number[], efforts: number[], effects: string[]): Either<string, Option<never>> {
    if (['hp', 'attack', 'defence', 'spAttack', 'spDefence', 'speed'].every((x) => x in stats) === false) {
      return left('種族値のキーに必要なキーが含まれていません！')
    }
    if (lv !== 50 && lv !== 100) {
      return left('Lvは50または100である必要があります！')
    }
    if (individuals.some((x) => x < 0 || x > 31)) {
      return left('個体値は0以上31以下である必要があります！')
    }
    if (efforts.some((x) => x > 252 || x < 0)) {
      return left('一つの能力に割り当てられる努力値は0以上252以下である必要があります！')
    }
    if (efforts.reduce((acc, cur) => acc + cur) > 508) {
      return left('努力値は508以下である必要があります！')
    }
    if (efforts.some((x) => x % 4 !== 0)) {
      return left('努力値は4の倍数である必要があります！')
    }
    if (effects.every((x) => ['-', '↑', '↓'].find((y) => x === y)) === false) {
      return left('性格補正の入力は"-"または"↑"または"↓"である必要があります！')
    }
    if (effects.filter((x) => x === '↑').length > 1 || effects.filter((x) => x === '↓').length > 1) {
      return left('性格補正"↑"と"↓"はたかだかひとつずつまでの必要があります！')
    }
    return right(none)
  }

  exec (stats: BaseStats, lv: number, individuals: number[], efforts: number[], effects: string[]): Either<string, number[]> {
    // 入力値が要件を満たすか確認して、だめならばアーリーアウトする。
    const required = this.require(stats, lv, individuals, efforts, effects)
    if (isLeft(required)) {
      return left(pipe(
          required,
          swap,
          getOrElse(() => '')
      ))
    }

    const base = [stats['hp'], stats['attack'], stats['defence'],
      stats['spAttack'], stats['spDefence'], stats['speed']]
    const effect: any = { '-': 1.0, '↑': 1.1, '↓': 0.9 }

    let result = [0, 0, 0, 0, 0, 0]
    for (let i = 0; i < base.length; i++) {
      const t = base[i] * 2 + individuals[i] + efforts[i] / 4
      result[i] = Math.floor((i === 0) // i === 0のときHPでそれ以外はこうげきなど
        ? t * (lv / 100) + lv + 10
        : (t * (lv / 100) + 5) * effect[effects[i]])
    }
    return right(result)
  }
}
