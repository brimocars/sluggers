<template>
  <div class="container">
    <div id="roundInfo">
      <div id="h2Container">
        <h2 id="h2Round">Round {{ roundNumber }}</h2>
        <h2 id="h2Draft">Draft {{ draftNumber }}</h2>
        <h2 id="h2Current">Currently drafting: {{ nextDrafter?.name ?? '' }}</h2>
      </div>
      <div
        id="hoveredInfo"
        :style="{ height: showStats ? '250px' : '32px' }"
      >
        <player-card
          :player="hoverPlayer"
          :show-stats="showStats"
          @toggle-show-stats="showStats = !showStats"
        />
      </div>
    </div>
    <div id="managerContainer">
      <manager-in-draft 
        v-for="manager in managers"
        :key="manager.name"
        :manager="manager"
        :is-this-manager="manager.name === managerName"
        :is-drafting="manager.name === nextDrafter?.name"
        :hover-player="hoverPlayer"
        @hover-start="hoverStart"
      />
    </div>
    <div
      id="playerContainer"
    >
      <div
        v-for="player in players"
        @click="() => draftPlayer(player)" 
        @mouseenter="() => hoverStart(player)"
        class="player"
        :class="{ 'drafted': player.isDrafted, 'chem-highlight': !player.isDrafted && hoverPlayer?.chemistry?.includes(player.name) }"
        :style="{ cursor: isCurrentDrafter ? 'pointer' : 'not-allowed' }"
      >
        <span class="captain" :class="{ 'show': player.isCaptain }" ></span>
        <span class="player-name">
          {{ player.name }}
        </span>
        <span class="chemistry" :class="{ 'show': hoverPlayer?.chemistry?.includes(player.name) }" >♪</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, inject, computed, watch } from 'vue';
import * as api from '../api';
import PlayerCard from './PlayerCard.vue';
import ManagerInDraft from './ManagerInDraft.vue';

const socket = inject('socket');

const players = ref([]);
const roundNumber = ref(0);
const draftNumber = ref(0);
const nextDrafter = ref(socket.nextDrafter);
const hoverPlayer = ref(null);
const showStats = ref(true);

const props = defineProps({
  managerName: {
    type: String,
    required: true,
  },
  managers: {
    type: Array,
    required: true,
  }
});
const isCurrentDrafter = computed(() => {
  return props.managerName === nextDrafter.value.name;
})
onMounted(async () => {
  players.value = await api.getAllPlayers();
  nextDrafter.value = socket.nextDrafter;
  console.log(nextDrafter.value);
});

// just need one watcher for all the playerDrafted data. draft number will always change 
watch(
  () => socket.newDraftNumber,
  (newValue, oldValue) => {
    draftNumber.value = newValue;
    roundNumber.value = socket.newRoundNumber;
    nextDrafter.value = socket.nextDrafter;
    const draftedPlayer = players.value.find((player) => player.name === socket.draftedPlayer);
    draftedPlayer.isDrafted = true;
    // manager will be updated by prop
  },
);
watch(
  () => socket.ended,
  (newValue, oldValue) => {
    console.log('draft over');
    // TODO: do crud when it's over. Probably show another component.
  }
)

const hoverStart = (player) => {
  hoverPlayer.value = player;
}
const draftPlayer = async (player) => {
  if (!isCurrentDrafter) {
    console.log('It\'s not your turn to draft');
    return
  }
  if (player.isDrafted) {
    console.log(`Player ${player.name} was already drafted`);
    return
  }
  await api.draftPlayer(player.name, props.managerName);
}

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
#playerContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin: 30px;
  justify-content: center;
}
.player {
  background-color: #dddddd;
  width: 110px;
  height: 60px;
  border: 1px solid black;
  border-radius: 15px;
  padding: 5px;
  box-sizing: border-box;
  align-content: center;
  cursor: pointer;
  display: grid;
  grid-template-columns: 16px 1fr 16px;
  grid-template-rows: 16px 1fr 16px;
  justify-content: center;
  align-items: center;
}
.drafted {
  background-color: #666666;
  cursor: not-allowed;
}
#roundInfo {
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-template-rows: 1fr;
}
#h2Container {
  grid-column: 1 / 2;
  justify-self: left;
  justify-items: left;
  padding-left: 30px;
}
#hoveredInfo {
  grid-column: 2 / 3;
  background-color: #ffccee;
  width: 200px;
  position: fixed;
  justify-self: right;
}
.chemistry {
  width: 10px;
  height: 10px;
  background-color: #55cc99;
  color: #222222;
  grid-row: 3 / 4;
  grid-column: 3 / 4;
  margin: 3px;
  padding-bottom: 4px;
  visibility: hidden;
}
.player-name {
  grid-row: 1 / 4;
  grid-column: 1 / 4;
}
.captain {
  width: 10px;
  height: 10px;
  background-color: #eedd33;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  margin: 3px;
  visibility: hidden;
}
.drafted {
  background-color: #555555;
}
.chem-highlight {
  background-color: #999999;
}
.show {
  visibility: visible;
}
</style>
