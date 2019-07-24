<template>
  <div id="pokemon-stats">
    <div class="pokemon-stats-user-select">
      <div class="pokemon-stats-monitor">
        <pokemon-select :selected.sync="selected" :names="names" :lv.sync="lv" @select-event="calc"/>
        <pokemon-stats-input-table :stats="stats" :efforts.sync="efforts" :individuals.sync="individuals" :effects.sync="effects" :result="result" @input-event="calc"/>
      </div>
      <validation-checker @checked-event="checked"/>
    </div>
    <warning-box :invalids="invalids"/>
    <info-board/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { pipe } from 'fp-ts/lib/pipeable'
import { Either, left, right, map, mapLeft, getOrElse, bimap, swap } from 'fp-ts/lib/Either'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

import PokemonSelect from './PokemonSelect.vue'
import PokemonStatsInputTable from './PokemonStatsInputTable.vue'
import ValidationChecker from './ValidationChecker.vue'
import WarningBox from './WarningBox.vue'
import InfoBoard from './InfoBoard.vue'

import BaseStats from '../static/ts/stats'
import { exceptShedinja } from '../static/ts/utility'
import * as Calculator from '../static/ts/calculator'
import * as Validator from '../static/ts/validator'

import pokemonData from '@/assets/data/pokemon_data.json'
import checkList from '@/assets/data/checklist.json'

export type PokemonData = typeof pokemonData
export type CheckList = typeof checkList

@Component({
  components: {
    PokemonSelect,
    PokemonStatsInputTable,
    ValidationChecker,
    WarningBox,
    InfoBoard
  }
})
export default class PokemonStats extends Vue {
  private selected: string = ''
  private lv: number = 50
  private stats: string[] = ['HP', 'こうげき', 'ぼうぎょ', 'とくこう', 'とくぼう', 'すばやさ']
  private individuals: number[] = [...Array(6)].fill(31)
  private efforts: number[] = [...Array(6)].fill(0)
  private effects: string[] = [...Array(6)].fill('-')
  private result: number[] = [...Array(6)].fill(0)

  private checklist: string[] = []
  private invalids: string[] = []

  private pokemon: PokemonData = pokemonData
  private names: string[] = []

  private created () {
    for (let p of this.pokemon) {
      p.name = p.form === ''
        ? p.name
        : p.name + '(' + p.form + ')'
      this.names.push(p.name)
    }
  }

  private calc () {
    pipe(
      this.findStats(this.selected),
      mapLeft((e) => alert(e)),
      map((stats) => {
        this.result = pipe(
          Calculator.exec(stats, this.lv, this.individuals, this.efforts, this.effects),
          mapLeft((e) => alert(e)),
          map((v) => exceptShedinja(this.selected, v as NonEmptyArray<number>)),
          getOrElse(() => this.result)
        )
        this.validation()
      })
    )
  }

  private findStats (selected: string): Either<string, BaseStats> {
    if (selected === '') {
      return left('ポケモン名が入力されていません！')
    }
    for (const pokemon of this.pokemon) {
      if (pokemon['name'] === selected) {
        return right(pokemon['stats'])
      }
    }
    return left('想定外のポケモン名が入力されました！')
  }

  private checked (checklist: CheckList, checked: boolean[]) {
    this.checklist = []
    for (let i = 0; i < checklist.length; i++) {
      if (checked[i]) {
        this.checklist.push(checklist[i].id)
      }
    }
    pipe(
      this.findStats(this.selected),
      bimap((e) => { alert(e) }, (_) => { this.validation() })
    )
  }

  private validation () {
    this.invalids = pipe(
      Validator.check(this.checklist, this.result, this.lv, this.individuals, this.efforts, this.effects),
      swap,
      getOrElse(() => [] as string[])
    )
  }
}
</script>

<style lang="stylus" scoped>
#pokemon-stats {
  .pokemon-stats-user-select {
    display: flex;
    justify-content: center;
    margin-top: -15px;

    .pokemon-stats-monitor {
      display: table;
      text-align: center;
      margin: 50px 100px;
    }
  }
}
</style>
