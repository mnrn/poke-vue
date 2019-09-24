<template>
  <div class="home">
    <app-title/>
    <pokemon-stats/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppTitle from '@/components/AppTitle.vue'
import PokemonStats from '@/components/PokemonStats.vue'

@Component({
  components: {
    AppTitle,
    PokemonStats
  }
})
export default class Home extends Vue {}
</script>
