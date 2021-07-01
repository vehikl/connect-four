<template>
  <div id="app">
    <GameRender v-if="hasGameStarted"/>

    <button ref="start-button" @click="hasGameStarted = true">Start Game</button>
    <br>
    <input ref="name1-box" placeholder="Player 1 Name"/>
    <br>
    <input ref="name2-box" placeholder="Player 2 Name"/>
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
  hasGameStarted = false;
}
</script>

<style lang="scss">
.game-board {
  display: flex;
}
</style>
