import { getSemigroup, NonEmptyArray, fromArray } from 'fp-ts/lib/NonEmptyArray'
import { getValidation, Either, left, right, map, fromOption, swap } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { sequenceT } from 'fp-ts/lib/Apply'

export function check (checklist: string[], stats: number[], lv: number, individuals: number[], efforts: number[], effects: string[])
: Either<NonEmptyArray<string>, never[]> {
  return pipe(
    sequenceT(getValidation(getSemigroup<string>()))(
      checkLeftovers(checklist, efforts),
      checkUseful(checklist, lv, individuals, efforts),
      checkHP(checklist, stats[0]),
      check11n(checklist, stats, effects)
    ),
    map(() => [])
  )
}

export function getLeftovers (efforts: number[]): number {
  return 508 - efforts.reduce((acc, cur) => acc + cur)
}

export function checkLeftovers (checklist: string[], efforts: number[]): Either<NonEmptyArray<string>, never[]> {
  if (!checklist.includes('leftovers')) {
    return right([])
  }
  const leftovers = getLeftovers(efforts)
  return leftovers > 0
    ? left(['残りの努力値は' + leftovers + 'です！'])
    : right([])
}

export function isUseful (lv: number, individual: number, effort: number): boolean {
  if (effort === 0 || lv === 100) {
    return true
  }
  return (individual % 2 === 1)
    ? effort % 8 === 4
    : effort % 8 === 0
}

export function checkUseful (checklist: string[], lv: number, individuals: number[], efforts: number[]): Either<NonEmptyArray<string>, never[]> {
  if (!checklist.includes('useless')) {
    return right([])
  }
  const list = ['HP', 'こうげき', 'ぼうぎょ', 'とくこう', 'とくぼう', 'すばやさ']
  let validation: string[] = []
  for (let i = 0; i < list.length; i++) {
    if (!isUseful(lv, individuals[i], efforts[i])) {
      validation.push(list[i] + 'の努力値に無駄があります！')
    }
  }
  return pipe(
    validation,
    fromArray,
    fromOption(() => []),
    swap
  )
}

export function isHPAnMinusB (hp: number, a: number, b: number): boolean {
  return hp % a === (a - b)
}

export function isHPAnPlusB (hp: number, a: number, b: number): boolean {
  return hp % a === b
}

export function isHPAnPlusManyB (hp: number, a: number, bs: number[]): boolean {
  return bs.some((b) => isHPAnPlusB(hp, a, b))
}

export function checkHP (checklist: string[], hp: number): Either<NonEmptyArray<string>, never[]> {
  const checkMapHP: any = {
    '2n+1': isHPAnPlusB(hp, 2, 1),
    '2n': isHPAnPlusB(hp, 2, 0),
    '16n-1': isHPAnMinusB(hp, 16, 1),
    '16n+1': isHPAnPlusB(hp, 16, 1),
    '16n+1~3': isHPAnPlusManyB(hp, 16, [1, 2, 3]),
    '4n+1': isHPAnPlusB(hp, 4, 1),
    '6n-1': isHPAnMinusB(hp, 6, 1),
    '8n-1': isHPAnMinusB(hp, 8, 1),
    '10n-1': isHPAnMinusB(hp, 10, 1)
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
    fromOption(() => []),
    swap
  )
}

export function is11n (stat: number, effect: string): boolean {
  return effect === '↑' && stat % 11 === 0
}

export function check11n (checklist: string[], stats: number[], effects: string[]): Either<NonEmptyArray<string>, never[]> {
  if (!(checklist.includes('11n') && effects.includes('↑'))) {
    return right([])
  }
  const index = effects.indexOf('↑')
  return is11n(stats[index], effects[index])
    ? right([])
    : left(['性格補正がかかった箇所が11nを満たしていません！'])
}
