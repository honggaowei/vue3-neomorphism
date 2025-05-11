<template>
  <label class="neo-radio neomorphic">
    <input
      type="radio"
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
    />
    <span class="radio-mark"></span>
    <span class="label"><slot></slot></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NeoRadio',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    }
  },
  emits: ['update:modelValue']
})
</script>

<style scoped>
.neo-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 16px;
  position: relative;
}

.neo-radio input {
  position: absolute;
  opacity: 0;
}

.radio-mark {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  background: var(--primary-bg);
  box-shadow: inset 2px 2px 5px var(--shadow-dark),
              inset -2px -2px 5px var(--shadow-light);
}

input:checked + .radio-mark::after {
  content: '';
  position: absolute;
  left: 7px;
  top: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--text-primary);
}
</style>
