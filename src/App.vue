<template>
  <div id="app">
    <div ref="game-board" class="game-board">
      <BoardColumn :has-piece="firstColumnHasPiece"></BoardColumn>
      <BoardColumn></BoardColumn>
      <BoardColumn></BoardColumn>
      <BoardColumn></BoardColumn>
      <BoardColumn></BoardColumn>
      <BoardColumn></BoardColumn>
      <BoardColumn></BoardColumn>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import BoardColumn from "@/components/BoardColumn.vue";

@Component({
  components: {
    HelloWorld,
    BoardColumn,
  },
})
export default class App extends Vue {
  firstColumnHasPiece = false;
}
</script>

<style lang="scss">
.game-board {
  display: flex;
}
</style>
