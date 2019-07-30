<template>
  <div class="pokemon-select">
    <div class="pokemon-name-select">
      <span class="name">ポケモン:</span>
      <input class="pokemon-name-input"
        v-model="pokeSelected"
        list="pokemon-name"
        type="text"
        autocomplete="off"
        placeholder="ポケモン名"
        @change="calc"
      />
      <div v-if="pokeSelected.length >= 2">
        <datalist id="pokemon-name">
          <option v-for="(name, index) in names" :key="index">{{name}}</option>
        </datalist>
      </div>
    </div>
    <div class="pokemon-lv-select">
      <span class="lv">Lv:</span>
      <select
        class="pokemon-lv"
        size="1"
        type="number"
        v-model.number="pokeLv"
        required="true"
        @change="calc"
      >
        <option v-for="(lv, index) in [50, 100]" :key="index">{{lv}}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PokemonSelect extends Vue {
  @Prop() private selected!: string
  @Prop() private names!: string[]
  @Prop() private lv!: number

  private calc () {
    this.$emit('select-event')
  }

  private get pokeSelected (): string {
    return this.selected
  }

  private set pokeSelected (selected: string) {
    this.$emit('update:selected', selected)
  }

  private get pokeLv (): number {
    return this.lv
  }

  private set pokeLv (lv: number) {
    this.$emit('update:lv', lv)
  }
}
</script>

<style lang="stylus" scoped>
.pokemon-select
  display: inline-flex
  .pokemon-lv-select
    margin-left: 20px
</style>
