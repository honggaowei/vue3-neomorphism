<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  size: { 
    type: String, 
    default: 'medium', 
    validator: (v: string) => ['small', 'medium', 'large'].includes(v) 
  },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: '' },
  labelPosition: { 
    type: String, 
    default: 'right', 
    validator: (v: string) => ['left', 'right', 'top', 'bottom'].includes(v) 
  },
  colors: {
    type: Object,
    default: () => ({
      active: '#4ade80',
      inactive: '#e0e5ec'
    })
  }
})

const emit = defineEmits(['update:modelValue'])

const switchClasses = computed(() => ({
  'neo-switch': true,
  'is-active': props.modelValue,
  [`size-${props.size}`]: true,
  'disabled-state': props.disabled
}))

const containerClasses = computed(() => [
  'neo-switch-container',
  `label-${props.labelPosition}`,
  { 'has-label': props.label }
])

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <div :class="containerClasses" @click="toggle">
    <span v-if="label && ['left', 'top'].includes(labelPosition)" 
          class="neo-switch-label">
      {{ label }}
    </span>
    
    <div :class="switchClasses" :style="{
      '--active-color': colors.active,
      '--inactive-color': colors.inactive
    }">
      <div class="neo-switch-thumb"></div>
    </div>
    
    <span v-if="label && ['right', 'bottom'].includes(labelPosition)" 
          class="neo-switch-label">
      {{ label }}
    </span>
  </div>
</template>

<style scoped>
.neo-switch-container {
  --thumb-size: 1.2rem;
  --transition-speed: 0.3s;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: 0.8rem;
}

/* 标签位置变体 */
.label-top, .label-bottom {
  flex-direction: column;
}

.neo-switch {
  position: relative;
  width: 3rem;
  height: 1.6rem;
  border-radius: 1rem;
  background: var(--inactive-color);
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
              inset -2px -2px 5px rgba(255, 255, 255, 0.8);
  transition: background var(--transition-speed) ease;
}

.neo-switch-thumb {
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  width: var(--thumb-size);
  height: var(--thumb-size);
  border-radius: 50%;
  background: white;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  transition: all var(--transition-speed) ease;
}

.is-active .neo-switch-thumb {
  transform: translateX(1.4rem);
}

.is-active {
  background: var(--active-color);
}

/* 尺寸变体 */
.size-small {
  width: 2.5rem;
  height: 1.3rem;
}
.size-small .neo-switch-thumb {
  width: 0.9rem;
  height: 0.9rem;
  transform: translateX(calc(1.2rem * var(--active-state, 0)));
}

.size-large {
  width: 3.5rem;
  height: 2rem;
}
.size-large .neo-switch-thumb {
  width: 1.5rem;
  height: 1.5rem;
  transform: translateX(calc(1.5rem * var(--active-state, 0)));
}

/* 禁用状态 */
.disabled-state {
  opacity: 0.6;
  cursor: not-allowed;
}

.neo-switch-label {
  font-size: 0.9rem;
  color: var(--text-color, inherit);
}

/* 暗色主题适配 */
.dark .neo-switch {
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3),
              inset -2px -2px 5px rgba(74, 85, 104, 0.5);
}

.dark .neo-switch-thumb {
  background: #edf2f7;
}

.dark .neo-switch-label {
  --text-color: #f7fafc;
}
</style>