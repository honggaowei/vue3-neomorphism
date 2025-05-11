<template>
  <div class="neo-textarea-wrapper">
    <textarea
      class="neo-textarea neomorphic"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      v-bind="$attrs"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NeoTextarea',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue']
})
</script>

<style scoped>
.neo-textarea {
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: none;
  outline: none;
  resize: vertical;
  color: var(--text-primary);
  background: var(--primary-bg);
  transition: all 0.3s ease;
}

.neo-textarea:focus {
  box-shadow: 
    inset 4px 4px 8px var(--shadow-dark),
    inset -4px -4px 8px var(--shadow-light);
}
</style>
