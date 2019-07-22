import { Option, none } from 'fp-ts/lib/Option'
import { Either, left, right, isLeft, swap, getOrElse } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import BaseStats from '@/static/ts/stats'

export default class Calculator {
  constructor (private stats: BaseStats, private lv: number, private individuals: number[], private efforts: number[], private effects: string[]) {
  }

  setData (stats: BaseStats, lv: number, individuals: number[], efforts: number[], effects: string[]) {
    this.stats = stats
    this.lv = lv
    this.individuals = individuals
    this.efforts = efforts
    this.effects = effects
  }

  require (): Either<string, Option<never>> {
    if (['hp', 'attack', 'defence', 'spAttack', 'spDefence', 'speed'].every((x) => x in this.stats) === false) {
      return left('種族値のキーに必要なキーが含まれていません！')
    }
    if (this.lv !== 50 && this.lv !== 100) {
      return left('Lvは50または100である必要があります！')
    }
    if (this.individuals.some((x) => x < 0 || x > 31)) {
      return left('個体値は0以上31以下である必要があります！')
    }
    if (this.efforts.some((x) => x > 252 || x < 0)) {
      return left('一つの能力に割り当てられる努力値は0以上252以下である必要があります！')
    }
    if (this.efforts.reduce((acc, cur) => acc + cur) > 508) {
      return left('努力値は508以下である必要があります！')
    }
    if (this.efforts.some((x) => x % 4 !== 0)) {
      return left('努力値は4の倍数である必要があります！')
    }
    if (this.effects.every((x) => ['-', '↑', '↓'].find((y) => x === y)) === false) {
      return left('性格補正の入力は"-"または"↑"または"↓"である必要があります！')
    }
    if (this.effects.filter((x) => x === '↑').length > 1 || this.effects.filter((x) => x === '↓').length > 1) {
      return left('性格補正"↑"と"↓"はたかだかひとつずつまでの必要があります！')
    }
    return right(none)
  }

  exec (): Either<string, number[]> {
    // 入力値が要件を満たすか確認して、だめならばアーリーアウトする。
    const required = this.require()
    if (isLeft(required)) {
      return left(pipe(
          required,
          swap,
          getOrElse(() => '')
      ))
    }

    const base = [this.stats['hp'], this.stats['attack'], this.stats['defence'],
      this.stats['spAttack'], this.stats['spDefence'], this.stats['speed']]
    const effects: any = { '-': 1.0, '↑': 1.1, '↓': 0.9 }

    let result = [0, 0, 0, 0, 0, 0]
    for (let i = 0; i < base.length; i++) {
      const t = base[i] * 2 + this.individuals[i] + this.efforts[i] / 4
      result[i] = Math.floor((i === 0) // i === 0のときHPでそれ以外はこうげきなど
        ? t * (this.lv / 100) + this.lv + 10
        : (t * (this.lv / 100) + 5) * effects[this.effects[i]])
    }
    return right(result)
  }
}
