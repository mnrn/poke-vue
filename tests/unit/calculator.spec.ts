import * as Calculator from '@/static/ts/calculator'
import BaseStats from '@/static/ts/stats'
import { left, right } from 'fp-ts/lib/Either'

describe('Calculatorのテスト', () => {
  const stats: BaseStats = { 'hp': 108, 'attack': 130, 'defence': 95, 'spAttack': 80, 'spDefence': 85, 'speed': 102 }
  const lv = 50
  const individuals = [31, 31, 31, 31, 31, 31]
  const efforts = [0, 252, 0, 0, 4, 252]
  const effects = ['-', '-', '-', '↓', '-', '↑']

  it('最速ASガブ', () => {
    expect(Calculator.exec(stats, lv, individuals, efforts, effects))
      .toEqual(right([183, 182, 115, 90, 106, 169]))
  })

  it('Lv', () => {
    for (const _lv of [1, 75, 999]) {
      expect(Calculator.valid(stats, _lv, individuals, efforts, effects))
        .toEqual(left('Lvは50または100である必要があります！'))
    }
  })

  it('個体値', () => {
    for (const _individuals of [[31, -1, 31, 31, 31, 31], [31, 31, 31, 31, 31, 32]]) {
      expect(Calculator.valid(stats, lv, _individuals, efforts, effects))
        .toEqual(left('個体値は0以上31以下である必要があります！'))
    }
  })

  it('努力値', () => {
    expect(Calculator.valid(stats, lv, individuals, [0, 255, 0, 0, 0, 0], effects))
      .toEqual(left('一つの能力に割り当てられる努力値は0以上252以下である必要があります！'))
    expect(Calculator.valid(stats, lv, individuals, [252, 252, 252, 252, 252, 252], effects))
      .toEqual(left('努力値は508以下である必要があります！'))
    expect(Calculator.valid(stats, lv, individuals, [0, 250, 0, 0, 4, 252], effects))
      .toEqual(left('努力値は4の倍数である必要があります！'))
  })

  it('性格補正', () => {
    expect(Calculator.valid(stats, lv, individuals, efforts, ['-', 'a', '-', '↓', '-', '↑']))
      .toEqual(left('性格補正の入力は"-"または"↑"または"↓"である必要があります！'))
    expect(Calculator.valid(stats, lv, individuals, efforts, ['-', '↑', '-', '↓', '-', '↑']))
      .toEqual(left('性格補正"↑"と"↓"はたかだかひとつずつまでの必要があります！'))
  })

  it('エラーの際に、execがvalidと同じ値を返すか', () => {
    expect(Calculator.exec(stats, 1, individuals, efforts, effects))
      .toEqual(Calculator.valid(stats, 1, individuals, efforts, effects))
  })

  it('複数のエラーが起こる際、先頭のエラーのみ先に捉えるか', () => {
    expect(Calculator.valid(stats, 1, individuals, [0, 255, 0, 0, 0, 0], effects))
      .toEqual(left('Lvは50または100である必要があります！'))
  })
})
