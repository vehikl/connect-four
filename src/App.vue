<template>
  <div id="app">
    <p v-if="isGameOver">You won!</p>
    <div ref="game-board" class="game-board">
      <BoardColumn @game-over="isGameOver = true"></BoardColumn>
      <BoardColumn @game-over="isGameOver = true"></BoardColumn>
      <BoardColumn @game-over="isGameOver = true"></BoardColumn>
      <BoardColumn @game-over="isGameOver = true"></BoardColumn>
      <BoardColumn @game-over="isGameOver = true"></BoardColumn>
      <BoardColumn @game-over="isGameOver = true"></BoardColumn>
      <BoardColumn @game-over="isGameOver = true"></BoardColumn>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import BoardColumn from "@/components/BoardColumn.vue";

@Component({
  components: {
    BoardColumn,
  },
})
export default class App extends Vue {
  isGameOver = false;
}
</script>

<style lang="scss">
.game-board {
  display: flex;
}
</style>
