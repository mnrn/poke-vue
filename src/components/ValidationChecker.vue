<template>
  <div id="validation-checker">
    <fieldset>
      <legend>チェックボックスです</legend>
      <div v-for="(check, index) in checklist" :key="index">
        <input type="checkbox" :id="check.id" name="check" :class="'check-'+check.id" v-model="checks[index]"/>
        <label :for="check.id" v-cloak>{{check.label}}</label>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { Watch, Component, Vue } from 'vue-property-decorator'
import checkList from '@/assets/data/checklist.json'
export type CheckList = typeof checkList

@Component
export default class ValidationChecker extends Vue {
  private checklist: CheckList = checkList
  private checks: boolean[] = [...Array(checkList.length)].fill(false)

  @Watch('checks')
  private watchChecks () {
    this.$emit('checked-event', this.checklist, this.checks)
  }
}
</script>

<style lang="stylus" scoped>
#validation-checker {
  text-align: left;
  fieldset {
    display: inline;
  }
}
</style>
