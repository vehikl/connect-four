<template>
  <div ref="column" class="column" @click="columnClick">
    <div v-for="(hasPieceInSlot, index) in hasPieceInSlotArray" :key="index"
         :class="{'slot-with-piece': hasPieceInSlot, 'empty-slot': !hasPieceInSlot}"
         class="slot"
         :ref="hasPieceInSlot ? 'piece' : 'empty-slot'">
      {{ hasPieceInSlot ? 'X' : '' }}
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class BoardColumn extends Vue {
  @Prop({default: false}) public hasPiece!: boolean;
  private hasPieceInSlotArray: boolean[] = [false, false, false, false, false, false];

  columnClick() {
    let newSlotArray = [...this.hasPieceInSlotArray]
    for (let i = newSlotArray.length - 1; i >= 0; i--) {
      if (newSlotArray[i] && i !== 5) {
        newSlotArray[i + 1] = true;
        break;
      }

      if (i === 0) {
        newSlotArray[0] = true;
      }
    }

    this.hasPieceInSlotArray = newSlotArray;

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

.slot {
  height: 5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  cursor: pointer;
}

.slot-with-piece {
  animation: .5s flip forwards;
}

@keyframes flip {
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
    background-color: green;
    color: black;
  }
  100% {
    transform: rotateY(180deg);
    background-color: green;
  }
}

.empty-slot {
  background-color: gray;
}
</style>
