import * as Validator from '@/static/ts/validator'
import { none } from 'fp-ts/lib/Option'
import { left, right } from 'fp-ts/lib/Either'

describe('数値計算のテスト', () => {
  it('努力値の余り', () => {
    expect(Validator.getLeftovers([0, 0, 0, 0, 0, 0])).toBe(508)
    expect(Validator.getLeftovers([252, 0, 0, 0, 0, 0])).toBe(256)
    expect(Validator.getLeftovers([252, 0, 0, 0, 0, 252])).toBe(4)
    expect(Validator.getLeftovers([252, 4, 0, 0, 0, 252])).toBe(0)
  })

  it('努力値の無駄', () => {
    expect(Validator.isUseful(50, 31, 252)).toBeTruthy()
    expect(Validator.isUseful(50, 30, 248)).toBeTruthy()
    expect(Validator.isUseful(50, 31, 0)).toBeTruthy()
    expect(Validator.isUseful(50, 31, 8)).toBeFalsy()
    expect(Validator.isUseful(50, 0, 4)).toBeFalsy()

    expect(Validator.isUseful(100, 31, 0)).toBeTruthy()
    expect(Validator.isUseful(100, 30, 252)).toBeTruthy()
    expect(Validator.isUseful(100, 31, 8)).toBeTruthy()
  })

  it('2n+1', () => {
    expect(Validator.isHPAnPlusB(131, 2, 1)).toBeTruthy()
    expect(Validator.isHPAnPlusB(204, 2, 1)).toBeFalsy()
  })

  it('2n', () => {
    expect(Validator.isHPAnPlusB(204, 2, 0)).toBeTruthy()
    expect(Validator.isHPAnPlusB(183, 2, 0)).toBeFalsy()
  })

  it('16n-1', () => {
    expect(Validator.isHPAnMinusB(175, 16, 1)).toBeTruthy()
    expect(Validator.isHPAnMinusB(177, 16, 1)).toBeFalsy()
  })

  it('16n+1', () => {
    expect(Validator.isHPAnPlusB(193, 16, 1)).toBeTruthy()
    expect(Validator.isHPAnPlusB(190, 16, 1)).toBeFalsy()
  })

  it('16n+1~3', () => {
    expect(Validator.isHPAnPlusManyB(161, 16, [1, 2, 3])).toBeTruthy()
    expect(Validator.isHPAnPlusManyB(162, 16, [1, 2, 3])).toBeTruthy()
    expect(Validator.isHPAnPlusManyB(163, 16, [1, 2, 3])).toBeTruthy()
    expect(Validator.isHPAnPlusManyB(159, 16, [1, 2, 3])).toBeFalsy()
    expect(Validator.isHPAnPlusManyB(158, 16, [1, 2, 3])).toBeFalsy()
    expect(Validator.isHPAnPlusManyB(157, 16, [1, 2, 3])).toBeFalsy()
  })

  it('4n+1', () => {
    expect(Validator.isHPAnPlusB(165, 4, 1)).toBeTruthy()
    expect(Validator.isHPAnPlusB(163, 4, 1)).toBeFalsy()
  })

  it('6n-1', () => {
    expect(Validator.isHPAnMinusB(179, 6, 1)).toBeTruthy()
    expect(Validator.isHPAnMinusB(191, 6, 1)).toBeTruthy()
    expect(Validator.isHPAnMinusB(183, 6, 1)).toBeFalsy()
  })

  it('8n-1', () => {
    expect(Validator.isHPAnMinusB(183, 8, 1)).toBeTruthy()
    expect(Validator.isHPAnMinusB(191, 8, 1)).toBeTruthy()
    expect(Validator.isHPAnMinusB(185, 8, 1)).toBeFalsy()
  })

  it('10n-1', () => {
    expect(Validator.isHPAnMinusB(159, 10, 1)).toBeTruthy()
    expect(Validator.isHPAnMinusB(175, 10, 1)).toBeFalsy()
  })

  it('11n', () => {
    expect(Validator.is11n(198, '↑')).toBeTruthy()
    expect(Validator.is11n(198, '-')).toBeFalsy()
    expect(Validator.is11n(198, '↓')).toBeFalsy()
    expect(Validator.is11n(210, '↑')).toBeFalsy()
  })
})

describe('チェック関数のテスト', () => {
  const stats = [175, 100, 100, 100, 100, 100]
  const lv = 50
  const individuals = [31, 31, 31, 31, 31, 31]
  const efforts = [0, 252, 0, 0, 4, 252]
  const effects = ['-', '↑', '-', '↓', '-', '-']

  it('空配列チェック', () => {
    expect(Validator.check([], stats, lv, individuals, efforts, effects))
      .toEqual(right(none))
  })

  it('努力値の余りチェック', () => {
    expect(Validator.checkLeftovers(['leftovers'], efforts))
      .toEqual(right(none))
    expect(Validator.checkLeftovers(['leftovers'], [0, 0, 0, 0, 0, 0]))
      .toEqual(left(['残りの努力値は508です！']))
    expect(Validator.checkLeftovers(['leftovers'], [0, 0, 0, 252, 0, 0]))
      .toEqual(left(['残りの努力値は256です！']))
    expect(Validator.checkLeftovers(['leftovers'], [0, 0, 0, 252, 0, 252]))
      .toEqual(left(['残りの努力値は4です！']))

    expect(Validator.check(['leftovers'], stats, lv, individuals, [0, 0, 0, 0, 0, 0], effects))
      .toEqual(Validator.checkLeftovers(['leftovers'], [0, 0, 0, 0, 0, 0]))
  })

  it('努力値の無駄チェック', () => {
    expect(Validator.checkUseful(['useless'], 50, individuals, efforts))
      .toEqual(right(none))
    expect(Validator.checkUseful(['useless'], 100, individuals, efforts))
      .toEqual(right(none))
    expect(Validator.checkUseful(['useless'], 50, [30, 31, 31, 31, 31, 31], [4, 252, 0, 0, 0, 252]))
      .toEqual(left(['HPの努力値に無駄があります！']))
    expect(Validator.checkUseful(['useless'], 100, [30, 31, 31, 31, 31, 31], [4, 252, 0, 0, 0, 252]))
      .toEqual(right(none))
    expect(Validator.checkUseful(['useless'], 50, [30, 30, 31, 31, 31, 31], [4, 252, 0, 0, 0, 252]))
      .toEqual(left(['HPの努力値に無駄があります！', 'こうげきの努力値に無駄があります！']))
    expect(Validator.checkUseful(['useless'], 100, [30, 30, 31, 31, 31, 31], [4, 252, 0, 0, 0, 252]))
      .toEqual(right(none))

    expect(Validator.check(['useless'], stats, 50, [30, 30, 31, 31, 31, 31], [4, 252, 0, 0, 0, 252], effects))
      .toEqual(Validator.checkUseful(['useless'], 50, [30, 30, 31, 31, 31, 31], [4, 252, 0, 0, 0, 252]))
  })

  it('An-Bチェック', () => {
    expect(Validator.checkHP(['16n-1'], 175))
      .toEqual(right(none))
    expect(Validator.checkHP(['16n-1'], 177))
      .toEqual(left(['HPが16n-1を満たしません！']))

    expect(Validator.check(['16n-1'], stats, lv, individuals, efforts, effects))
      .toEqual(Validator.checkHP(['16n-1'], 175))
  })

  it('An+Bチェック', () => {
    expect(Validator.checkHP(['16n+1'], 193))
      .toEqual(right(none))
    expect(Validator.checkHP(['16n+1'], 175))
      .toEqual(left(['HPが16n+1を満たしません！']))

    expect(Validator.check(['16n+1'], stats, lv, individuals, efforts, effects))
      .toEqual(Validator.checkHP(['16n+1'], 175))
  })

  it('An+Bsチェック', () => {
    expect(Validator.checkHP(['16n+1~3'], 195))
      .toEqual(right(none))
    expect(Validator.checkHP(['16n+1~3'], 197))
      .toEqual(left(['HPが16n+1~3を満たしません！']))

    expect(Validator.check(['16n+1~3'], [197, 100, 100, 100, 100, 100], lv, individuals, efforts, effects))
      .toEqual(Validator.checkHP(['16n+1~3'], 197))
  })

  it('11nチェック', () => {
    expect(Validator.check11n(['11n'], [159, 198, 100, 100, 100, 100], effects))
      .toEqual(right(none))
    expect(Validator.check11n(['11n'], [159, 100, 100, 100, 100, 100], effects))
      .toEqual(left(['性格補正がかかった箇所が11nを満たしていません！']))

    expect(Validator.check(['11n'], stats, lv, individuals, efforts, effects))
      .toEqual(Validator.check11n(['11n'], stats, effects))
  })

  it('同時に複数チェック', () => {
    expect(Validator.check(['useless', '16n-1', '6n-1', '8n-1', '11n'], [191, 150, 150, 176, 150, 150], lv, individuals, [0, 0, 0, 252, 0, 0], ['-', '-', '-', '↑', '-', '-']))
      .toEqual(right(none))
    expect(Validator.check(['useless', '4n+1', '11n'], [159, 166, 150, 150, 150, 200], lv, individuals, [4, 8, 0, 0, 252, 8], ['-', '↑', '-', '↓', '-', '-']))
      .toEqual(left(['こうげきの努力値に無駄があります！', 'すばやさの努力値に無駄があります！', 'HPが4n+1を満たしません！', '性格補正がかかった箇所が11nを満たしていません！']))
    expect(Validator.check(['useless', '4n+1', '11n'], [161, 166, 150, 150, 150, 200], lv, individuals, [4, 8, 0, 0, 252, 8], ['-', '↑', '-', '↓', '-', '-']))
      .toEqual(left(['こうげきの努力値に無駄があります！', 'すばやさの努力値に無駄があります！', '性格補正がかかった箇所が11nを満たしていません！']))
  })
})
