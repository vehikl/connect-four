<template>
  <div ref="column" class="column" @click="columnClick">
    <div v-for="(hasPieceInSlot, index) in hasPieceInSlotArray" :key="index"
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
    this.hasPieceInSlotArray = [true, false, false, false, false, false]

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.column {
  width: 200px;
  height: 60px;
  border-style: solid
}

</style>
