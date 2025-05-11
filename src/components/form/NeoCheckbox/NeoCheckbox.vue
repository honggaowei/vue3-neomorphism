<template>
  <label class="neo-checkbox neomorphic">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="checkmark"></span>
    <span class="label"><slot></slot></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NeoCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue']
})
</script>

<style scoped>
.neo-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 16px;
  position: relative;
}

.neo-checkbox input {
  position: absolute;
  opacity: 0;
}

.checkmark {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 8px;
  background: var(--primary-bg);
  box-shadow: inset 2px 2px 5px var(--shadow-dark),
              inset -2px -2px 5px var(--shadow-light);
}

input:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 12px;
  border: solid var(--text-primary);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
