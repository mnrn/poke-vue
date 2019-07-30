<template>
  <div id="app-title">
    <h1>ポケモンステータス計算</h1>
    <div class="version-info">
      <span v-cloak>ver.{{version}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as Package from '../../package.json'

@Component
export default class AppTitle extends Vue {
  public get version (): string {
    return Package.version
  }
}
</script>

<style lang="stylus" scoped>
#app-title
  display: flex
  justify-content: center

  h1
    text-align: center
    width: auto

  .version-info
    padding: 38px 20px
</style>
