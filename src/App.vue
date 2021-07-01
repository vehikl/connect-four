<template>
  <div id="app">
    <div v-if="isGameOver">
      <button ref="reset" @click="resetBoard">reset</button>
      <p>You won!</p>
    </div>
    <div ref="game-board" class="game-board">
      <BoardColumn v-for="(pieces, index) in piecesMatrix" :key="index" :pieces="pieces"
                   @click="() => handleClick(index)" @game-over="isGameOver = true"></BoardColumn>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import BoardColumn from "@/components/BoardColumn.vue";
import {BoardPiece} from "@/types";


@Component({
  components: {
    BoardColumn,
  },
})
export default class App extends Vue {
  turnNumber = 0;
  isGameOver = false;
  piecesMatrix: BoardPiece[][] = [];

  readonly NUMBER_OF_PIECES_TO_WIN = 4;

  get pieceOfTheTurn(): BoardPiece {
    return this.turnNumber % 2 === 0 ? BoardPiece.Red : BoardPiece.Yellow;
  }

  handleClick(currentColumn: number) {
    let newSlotArray = [...this.piecesMatrix[currentColumn]];
    for (let i = newSlotArray.length - 1; i >= 0; i--) {
      if (newSlotArray[i] !== BoardPiece.None && i !== 5) {
        newSlotArray[i + 1] = this.pieceOfTheTurn;
        break;
      }

      if (i === 0) {
        newSlotArray[0] = this.pieceOfTheTurn;
      }
    }

    for (let i = 0; i < this.piecesMatrix[currentColumn].length; i++) {
      this.piecesMatrix[currentColumn][i] = newSlotArray[i];
    }

    this.piecesMatrix = JSON.parse(JSON.stringify(this.piecesMatrix));
    this.checkForWinCondition(currentColumn);
    this.turnNumber++;
  }

  resetBoard() {
    this.isGameOver = false;
    this.turnNumber = 0;
    this.piecesMatrix = Array.from({length: 7}, () => [BoardPiece.None, BoardPiece.None, BoardPiece.None, BoardPiece.None, BoardPiece.None, BoardPiece.None]);
  }

  mounted() {
    this.resetBoard()
  }

  private checkForWinCondition(currentColumn: number) {
    //Check for vertical win
    this.isGameOver = this.piecesMatrix[currentColumn].filter((pieceType) => pieceType === this.pieceOfTheTurn).length === this.NUMBER_OF_PIECES_TO_WIN;
    if (this.isGameOver) {
      return;
    }

    let currentRow = 0;
    const numberOfRows = 6;
    const numberOfColumns = 7;
    for (currentRow = 0; currentRow < numberOfRows; currentRow++) {
      if (this.piecesMatrix[currentColumn][currentRow] !== BoardPiece.None) {
        break;
      }
    }

    let piecesInARow = 0;
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      if (this.piecesMatrix[columnIndex][currentRow] !== BoardPiece.None) {
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
