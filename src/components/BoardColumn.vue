<template>
  <div ref="column" class="column" @click="() => $emit('click')">
    <div v-if="hasPiece" ref="piece">I am a piece!</div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class BoardColumn extends Vue {
  @Prop({default: false}) public hasPiece!: boolean;
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
