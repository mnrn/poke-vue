import { Option, none } from 'fp-ts/lib/Option'
import { getSemigroup, NonEmptyArray, fromArray, } from 'fp-ts/lib/NonEmptyArray'
import { getValidation, Either, left, right, map, fromOption, swap } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable';
import { sequenceT } from 'fp-ts/lib/Apply';

export default class Validator {
  check (checklist: string[], stats: number[], lv: number, individuals: number[], efforts: number[], effects: string[])
  : Either<NonEmptyArray<string>, Option<never>> {
    return pipe(
      sequenceT(getValidation(getSemigroup<string>()))(
        this.checkLeftovers(checklist, efforts),
        this.checkUseful(checklist, lv, individuals, efforts),
        this.checkHP(checklist, stats[0]),
        this.check11n(checklist, stats, effects)
      ),
      map(() => none)
    )
  }

  getLeftovers (efforts: number[]): number {
    return 508 - efforts.reduce((acc, cur) => acc + cur)
  }

  checkLeftovers (checklist: string[], efforts: number[]): Either<NonEmptyArray<string>, Option<never>> {
    if (!checklist.includes('leftovers')) {
      return right(none)
    }
    const leftovers = this.getLeftovers(efforts)
    return leftovers > 0
      ? left(['残りの努力値は' + leftovers + 'です！'])
      : right(none)
  }

  isUseful (lv: number, individual: number, effort: number): boolean {
    if (effort === 0 || lv === 100) {
      return true
    }
    return (individual % 2 === 1)
      ? effort % 8 === 4
      : effort % 8 === 0
  }

  checkUseful (checklist: string[], lv: number, individuals: number[], efforts: number[]): Either<NonEmptyArray<string>, Option<never>> {
    if (!checklist.includes('useless')) {
      return right(none)
    }
    const list = ['HP', 'こうげき', 'ぼうぎょ', 'とくこう', 'とくぼう', 'すばやさ']
    let validation: string[] = []
    for (let i = 0; i < list.length; i++) {
      if (!this.isUseful(lv, individuals[i], efforts[i])) {
        validation.push(list[i] + 'の努力値に無駄があります！')
      }
    }
    return pipe (
      validation,
      fromArray,
      fromOption(() => none),
      swap
    )
  }

  isHPAnMinusB (hp: number, a: number, b: number): boolean {
    return hp % a === (a - b)
  }

  isHPAnPlusB (hp: number, a: number, b: number): boolean {
    return hp % a === b
  }

  isHPAnPlusManyB (hp: number, a: number, bs: number[]): boolean {
    return bs.some((b) => this.isHPAnPlusB(hp, a, b))
  }

  checkHP (checklist: string[], hp: number): Either<NonEmptyArray<string>, Option<never>> {
    const checkMapHP: any = {
      '2n+1': this.isHPAnPlusB(hp, 2, 1),
      '2n': this.isHPAnPlusB(hp, 2, 0),
      '16n-1': this.isHPAnMinusB(hp, 16, 1),
      '16n+1': this.isHPAnPlusB(hp, 16, 1),
      '16n+1~3': this.isHPAnPlusManyB(hp, 16, [1, 2, 3]),
      '4n+1': this.isHPAnPlusB(hp, 4, 1),
      '6n-1': this.isHPAnMinusB(hp, 6, 1),
      '8n-1': this.isHPAnMinusB(hp, 8, 1),
      '10n-1': this.isHPAnMinusB(hp, 10, 1)
    }
    let validation: string[] = []
    for (const check of checklist) {
      if (checkMapHP.hasOwnProperty(check) && !checkMapHP[check]) {
        validation.push('HPが' + check + 'を満たしません！')
      }
    }
    return pipe(
      validation,
      fromArray,
      fromOption(() => none),
      swap
    )
  }

  is11n (stat: number, effect: string): boolean {
    return effect === '↑' && stat % 11 === 0
  }

  check11n (checklist: string[], stats: number[], effects: string[]): Either<NonEmptyArray<string>, Option<never>> {
    if (!(checklist.includes('11n') && effects.includes('↑'))) {
      return right(none)
    }
    const index = effects.indexOf('↑')
    return this.is11n(stats[index], effects[index])
      ? right(none)
      : left(['性格補正がかかった箇所が11nを満たしていません！'])
  }
}
