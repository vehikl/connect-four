<template>
  <div id="app">
    <p v-if="isGameOver">You won!</p>
    <div ref="game-board" class="game-board">
      <BoardColumn v-for="(pieces, index) in piecesMatrix" :key="index" :pieces="pieces"
                   @click="() => handleClick(index)" @game-over="isGameOver = true"></BoardColumn>
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
  piecesMatrix: boolean[][] = []

  handleClick(index: number) {

    let newSlotArray = [...this.piecesMatrix[index]];
    for (let i = newSlotArray.length - 1; i >= 0; i--) {
      if (newSlotArray[i] && i !== 5) {
        newSlotArray[i + 1] = true;
        break;
      }

      if (i === 0) {
        newSlotArray[0] = true;
      }
    }

    for (let i = 0; i < this.piecesMatrix[index].length; i++) {
      this.piecesMatrix[index][i] = newSlotArray[i];
    }

    this.piecesMatrix = JSON.parse(JSON.stringify(this.piecesMatrix));

    let NUMBER_OF_PIECES_TO_WIN = 4;
    this.isGameOver = this.piecesMatrix[index].filter((hasPiece) => hasPiece).length === NUMBER_OF_PIECES_TO_WIN;

  }

  mounted() {
    this.piecesMatrix = Array.from({length: 7}, () => [false, false, false, false, false, false]);
  }
}
</script>

<style lang="scss">
.game-board {
  display: flex;
}
</style>
