<template>
  <div class="neo-progress neomorphic" :class="{ 'is-circle': type === 'circle' }">
    <template v-if="type === 'line'">
      <div class="neo-progress__bar">
        <div 
          class="neo-progress__inner"
          :style="{ 
            width: `${percentage}%`,
            backgroundColor: color || getStatusColor
          }"
        ></div>
      </div>
      <div v-if="showText" class="neo-progress__text">{{ percentage }}%</div>
    </template>
    <template v-else>
      <svg class="neo-progress__circle" viewBox="0 0 100 100">
        <circle
          class="neo-progress__circle-background"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="var(--shadow-dark)"
          stroke-width="6"
        />
        <circle
          class="neo-progress__circle-path"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          :stroke="color || getStatusColor"
          stroke-width="6"
          :stroke-dasharray="`${percentage * 2.83}, 283`"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div v-if="showText" class="neo-progress__circle-text">
        {{ percentage }}%
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'NeoProgress',
  props: {
    percentage: {
      type: Number,
      required: true,
      validator: (val: number) => val >= 0 && val <= 100
    },
    type: {
      type: String,
      default: 'line',
      validator: (val: string) => ['line', 'circle'].includes(val)
    },
    color: String,
    showText: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const getStatusColor = computed(() => {
      if (props.percentage >= 80) return '#2ecc71'
      if (props.percentage >= 50) return '#3498db'
      if (props.percentage >= 20) return '#f1c40f'
      return '#e74c3c'
    })

    return { getStatusColor }
  }
})
</script>

<style scoped>
.neo-progress {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.neo-progress__bar {
  flex: 1;
  height: 12px;
  border-radius: 6px;
  background: var(--primary-bg);
  box-shadow: inset 2px 2px 5px var(--shadow-dark),
              inset -2px -2px 5px var(--shadow-light);
}

.neo-progress__inner {
  height: 100%;
  border-radius: 6px;
  transition: width 0.3s ease;
}

.neo-progress__text {
  min-width: 40px;
  text-align: right;
}

.neo-progress.is-circle {
  width: 120px;
  height: 120px;
  position: relative;
}

.neo-progress__circle {
  transform: rotate(-90deg);
}

.neo-progress__circle-path {
  transition: stroke-dasharray 0.3s ease;
}

.neo-progress__circle-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
