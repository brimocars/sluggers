<template>
  <div class="stat">
    {{ statName }}: {{ statValue }}
  </div>
  <div class="stat-graphic">
    <span 
      v-for="(isFilled, index) in statGraphicArray"
      :key=index
      :class="{ 'filled': isFilled, 'big': statValue > 6 && isFilled }"
      class="stat-graphic-box"
      >
    </span>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
const statGraphicArray = ref([]);

const props = defineProps({
  statName: {
    type: String,
    required: true,
  },
  statValue: {
    type: Number,
    required: true,
  }
});

watch(
  () => props.statValue,
  (newValue, oldValue) => {
    statGraphicArray.value = [];
    for (let i = 0; i < 10; i++) {
      if (i < newValue) {
        statGraphicArray.value.push(true)
      } else {
        statGraphicArray.value.push(false)
      }
    }
  }
)

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    if (i < props.statValue) {
      statGraphicArray.value.push(true)
    } else {
      statGraphicArray.value.push(false)
    }
  }
});
</script>

<style scoped>
.stat {
  display: inline-block;
}
span {
  background-color: transparent;
  display: inline-block;
}
.stat-graphic-box {
  width: 20px;
  height: 20px;
}
.stat-graphic {
  display: flex;
  justify-content: start;
  border: 1px solid black;
}
.filled {
  background-color: #ffdd00;
}
.big {
  background-color: #ff6600;
}
</style>
