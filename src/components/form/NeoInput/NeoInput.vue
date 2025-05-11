<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  error: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const inputClasses = computed(() => ({
  'neo-input': true,
  'error-state': props.error,
  'disabled-state': props.disabled
}))
</script>

<template>
  <div class="neo-input-container">
    <input
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type"
      :placeholder="placeholder"
      :class="inputClasses"
      :disabled="disabled"
    />
    <span v-if="error" class="error-message">!</span>
  </div>
</template>

<style scoped>
.neo-input-container {
  --primary-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
                   -5px -5px 10px rgba(255, 255, 255, 0.5);
  --inset-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
                 inset -2px -2px 5px rgba(255, 255, 255, 0.8);
  --error-color: #ff4757;
  position: relative;
  margin: 1rem 0;
}

.neo-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 12px;
  background: #e0e5ec;
  box-shadow: var(--primary-shadow);
  transition: all 0.2s ease;
  font-family: inherit;
}

.neo-input:focus {
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
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--error-color);
  font-weight: bold;
}

/* 暗色主题适配 */
.dark .neo-input {
  background: #2d3748;
  color: #f7fafc;
  --primary-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3),
                   -5px -5px 10px rgba(74, 85, 104, 0.5);
  --inset-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3),
                 inset -2px -2px 5px rgba(74, 85, 104, 0.5);
  --error-color: #ff6b81;
}
</style>