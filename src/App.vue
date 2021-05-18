<template>
  <div id="app">
    <div ref="game-board">I am a game board!Roar!</div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
</style>
