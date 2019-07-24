<template>
  <div id="info-board">
    <ul class="info-list">
      <li v-for="">
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class InfoBoard extends Vue {
  @Prop() private infolist: string[] = 
}
</script>


<style lang="stylus" scoped>

</style>
