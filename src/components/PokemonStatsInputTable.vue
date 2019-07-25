<template>
  <div class="pokemon-stats-input-table">
    <table class="stats-table">
      <thead><th></th>
      <th>能力値</th><th>努力値</th><th>個体値</th><th>性格補正</th></thead>
      <tbody>
        <tr v-for="(stat, index) in stats" :key="index">
          <th v-cloak>{{stat}}</th>
          <td><input v-model.number="result[index]" type="number" required="true" min="1" max="999" step="1" :class="label[index]" readonly></td>
          <td><input v-model.number="efforts[index]" type="number" required="true" min="0" max="252" step="4" :class="'effort-' + label[index]" @change="updateEffort($event.target.valueAsNumber, index)"></td>
          <td><input v-model.number="individuals[index]" type="number" required="true" min="0" max="31" step="1" :class="'individual-' + label[index]" @change="updateIndividual($event.target.valueAsNumber, index)"></td>
          <td v-if="index!==0">
            <select name="effects" size="1" v-model="effects[index]" required="true" :class="'effect-' + label[index]" @change="updateEffect($event.target.value, index)">
              <option v-for="(effect, j) in ['-', '↑', '↓']" :key="j">{{effect}}</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PokemonStatsInputTable extends Vue {
  @Prop() private stats!: string[]
  @Prop() private efforts!: number[]
  @Prop() private individuals!: number[]
  @Prop() private effects!: string[]
  @Prop() private result!: number[]
  private readonly label = ['hp', 'attack', 'defence', 'sp-attack', 'sp-defence', 'speed']

  private updateEffort (effort: number, index: number) {
    const newEfforts = [...this.efforts.slice(0, index), effort, ...this.efforts.slice(index + 1)]
    this.$emit('update:efforts', newEfforts)
    this.$emit('input-event')
  }

  private updateIndividual (individual: number, index: number) {
    const newIndividuals = [...this.individuals.slice(0, index), individual, ...this.individuals.slice(index + 1)]
    this.$emit('update:individuals', newIndividuals)
    this.$emit('input-event')
  }
  private updateEffect (effect: string, index: number) {
    const newEffects = [...this.effects.slice(0, index), effect, ...this.effects.slice(index + 1)]
    this.$emit('update:effects', newEffects)
    this.$emit('input-event')
  }
}
</script>

<style>

</style>
