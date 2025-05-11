<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, Array], default: '' },
  options: { type: Array, default: () => [] },
  multiple: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  error: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const selectClasses = computed(() => ({
  'neo-select': true,
  'disabled-state': props.disabled,
  'error-state': props.error
}))
</script>

<template>
  <div class="neo-select-container">
    <select
      :value="modelValue"
      @change="emit('update:modelValue', $event.target.value)"
      :multiple="multiple"
      :class="selectClasses"
      :disabled="disabled"
    >
      <option 
        v-for="(option, index) in options" 
        :key="index"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    <span v-if="error" class="error-message">!</span>
    <div class="neo-select-arrow">▼</div>
  </div>
</template>

<style scoped>
.neo-select-container {
  --primary-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
                   -5px -5px 10px rgba(255, 255, 255, 0.5);
  --inset-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
                 inset -2px -2px 5px rgba(255, 255, 255, 0.8);
  --error-color: #ff4757;
  position: relative;
  margin: 1rem 0;
}

.neo-select {
  width: 100%;
  padding: 0.8rem 2.5rem 0.8rem 1rem;
  border: none;
  border-radius: 12px;
  background: #e0e5ec;
  box-shadow: var(--primary-shadow);
  transition: all 0.2s ease;
  appearance: none;
  font-family: inherit;
  cursor: pointer;
}

.neo-select:focus {
  box-shadow: var(--inset-shadow);
  outline: none;
}

.error-state {
  box-shadow: 0 0 0 2px var(--error-color), var(--primary-shadow) !important;
}

.disabled-state {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  position: absolute;
  right: 32px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--error-color);
  font-weight: bold;
}

.neo-select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
}

/* 暗色主题适配 */
.dark .neo-select {
  background: #2d3748;
  color: #f7fafc;
  --primary-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3),
                   -5px -5px 10px rgba(74, 85, 104, 0.5);
  --inset-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3),
                 inset -2px -2px 5px rgba(74, 85, 104, 0.5);
  --error-color: #ff6b81;
}

.dark .neo-select-arrow {
  color: #a0aec0;
}
</style>