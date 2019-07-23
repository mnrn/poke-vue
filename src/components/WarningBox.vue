<template>
  <div v-if="invalids.length !== 0">
    <div class="warning-box">
      <p v-for="(invalid, index) in invalids" :key="index">
        {{invalid + '\n'}}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  props: {
    invalids: Array as PropType<string[]>
  }
})
export default class WarningBox extends Vue {
  // @Prop() invalids!: Array<string>
}
</script>

<style lang="stylus" scoped>
.warning-box {
  display: table;
  padding: 0.5em 1em;
  margin: 30px auto;
  box-sizing: border-box;

  font-weight: bold;
  color: #ff7d6e;/*文字色*/
  background: #ffebe9;
  border: solid 3px #ff7d6e;/*線*/
  border-radius: 10px;/*角の丸み*/

  div {
    display: table-cell;
    text-align: left;
    vertical-align: middle;
  }
}
</style>
