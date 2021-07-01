<template>
  <div id="app">
   <GameRender/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import BoardColumn from "@/components/BoardColumn.vue";
import GameRender from "@/components/GameRender.vue";


@Component({
  components: {
    GameRender,
    BoardColumn,
  },
})
export default class App extends Vue {

}
</script>

<style lang="scss">
.game-board {
  display: flex;
}
</style>
