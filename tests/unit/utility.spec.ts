import { exceptShedinja } from '@/static/ts/utility'

describe('Utility', () => {
  it('ヌケニン例外(HP=1)', () => {
    expect(exceptShedinja('ヌケニン', [999, 110, 65, 50, 50, 50]))
      .toEqual([1, 110, 65, 50, 50, 50])
    expect(exceptShedinja('ミミッキュ', [130, 110, 100, 70, 125, 116]))
      .toEqual([130, 110, 100, 70, 125, 116])
  })
})
