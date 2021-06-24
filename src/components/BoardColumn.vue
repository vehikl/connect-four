<template>
  <div ref="column" class="column" @click="$emit('click')">
    <div v-for="(pieceType, index) in pieces" :key="index"
         :ref="computeRef(pieceType)"
         class="slot"
         :class="{
           'slot-with-red-piece': pieceType === BoardPiece.Red,
           'slot-with-yellow-piece': pieceType === BoardPiece.Yellow,
           'empty-slot': pieceType === BoardPiece.None
         }">
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {BoardPiece} from "@/types";

@Component
export default class BoardColumn extends Vue {
  @Prop({required: true}) public pieces!: boolean[];
  public BoardPiece: BoardPiece = BoardPiece;

  computeRef(pieceType): string {
    if (pieceType === BoardPiece.Red) {
      return 'red-piece';
    }
    if (pieceType === BoardPiece.Yellow) {
      return 'yellow-piece';
    }

    return 'empty-slot';

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.column {
  border-style: solid;
  display: flex;
  flex-direction: column-reverse;
}

.slot-with-red-piece {
  --piece-colour: 'red';
}

.slot-with-yellow-piece {
  --piece-colour: 'yellow';
}

.slot {
  height: 5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  cursor: pointer;
  border: 1px solid black;
}

.slot-with-red-piece {
  animation: 500ms flipRed forwards;
}

.slot-with-yellow-piece {
  animation: 500ms flipYellow forwards;
}

@keyframes flipRed {
  0% {
    transform: rotateY(0);
    background-color: gray;
    color: transparent;
  }
  50% {
    transform: rotateY(90deg);
    background-color: gray;
    color: transparent;
  }
  51% {
    background-color: orangered;
    color: black;
  }
  100% {
    transform: rotateY(180deg);
    background-color: red;
  }
}

@keyframes flipYellow {
  0% {
    transform: rotateY(0);
    background-color: gray;
    color: transparent;
  }
  50% {
    transform: rotateY(90deg);
    background-color: gray;
    color: transparent;
  }
  51% {
    background-color: orangered;
    color: black;
  }
  100% {
    transform: rotateY(180deg);
    background-color: yellow;
  }
}

.empty-slot {
  background-color: gray;
}
</style>
