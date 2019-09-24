<template>
  <div class="info-board">
    <ul>
      <li v-for="(info, index) in infolist" :key="index">【ver {{info.version}} - {{info.date}} 】 {{info.msg}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import infoList from '@/assets/data/infolist.json'

@Component
export default class InfoBoard extends Vue {
  private readonly infolist = infoList
}
</script>

<style lang="stylus" scoped>
.info-board
  position: relative
  background: #fffde7
  width: 50%
  margin: 2em auto
  padding: 1.5em 1em
  box-shadow: 1px 1px 4px rgba(0,0,0,0.2)
  color: #795548

  ::after
    content: ''
    position: absolute
    left: 50%
    top: -15px
    margin-left: -75px
    width: 150px
    height: 30px
    background: rgba(245,245,245,0.7)
    box-shadow: 1px 1px 4px rgba(0,0,0,0.2)
    transform: rotate(-4deg)

  ul
    margin: 1em 0.5em 0 2em
    padding: 0 0 0 0
    li
      text-align: left
      margin-bottom: 0.5em
</style>
