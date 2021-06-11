<template>
  <div id="app">
    <button ref="reset" @click="resetBoard">reset</button>
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
  piecesMatrix: boolean[][] = [];
  readonly NUMBER_OF_PIECES_TO_WIN = 4;

  handleClick(currentColumn: number) {
    let newSlotArray = [...this.piecesMatrix[currentColumn]];
    for (let i = newSlotArray.length - 1; i >= 0; i--) {
      if (newSlotArray[i] && i !== 5) {
        newSlotArray[i + 1] = true;
        break;
      }

      if (i === 0) {
        newSlotArray[0] = true;
      }
    }

    for (let i = 0; i < this.piecesMatrix[currentColumn].length; i++) {
      this.piecesMatrix[currentColumn][i] = newSlotArray[i];
    }

    this.piecesMatrix = JSON.parse(JSON.stringify(this.piecesMatrix));
    this.checkForWinCondition(currentColumn);

  }

  resetBoard() {
    this.piecesMatrix = Array.from({length: 7}, () => [false, false, false, false, false, false]);
  }

  mounted() {
    this.resetBoard()
  }

  private checkForWinCondition(currentColumn: number) {
    //Check for vertical win
    this.isGameOver = this.piecesMatrix[currentColumn].filter((hasPiece) => hasPiece).length === this.NUMBER_OF_PIECES_TO_WIN;
    if (this.isGameOver) {
      return;
    }

    let currentRow = 0;
    const numberOfRows = 6;
    const numberOfColumns = 7;
    for (currentRow = 0; currentRow < numberOfRows; currentRow++) {
      if (this.piecesMatrix[currentColumn][currentRow]) {
        break;
      }
    }

    let piecesInARow = 0;
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      if (this.piecesMatrix[columnIndex][currentRow]) {
        piecesInARow++;
        if (piecesInARow == 4) {
          break;
        }
      } else {
        piecesInARow = 0;
      }
    }
    this.isGameOver = piecesInARow == 4;

    // need diagonal condition next.
  }
}
</script>

<style lang="scss">
.game-board {
  display: flex;
}
</style>
