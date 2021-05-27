<template>
  <div ref="column" class="column" @click="$emit('click')">
    <div v-for="(hasPieceInSlot, index) in pieces" :key="index"
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
  @Prop({required: true}) public pieces!: boolean[];
  private hasPieceInSlotArray: boolean[] = [false, false, false, false, false, false];
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
  animation: 500ms flip forwards;
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
    background-color: greenyellow;
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
