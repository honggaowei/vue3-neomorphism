<template>
  <div class="neo-card neomorphic" :class="{ 'is-hoverable': hoverable }">
    <div v-if="$slots.header" class="neo-card__header">
      <slot name="header"></slot>
    </div>
    <div class="neo-card__body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="neo-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NeoCard',
  props: {
    hoverable: Boolean
  }
})
</script>

<style scoped>
.neo-card {
  background: var(--primary-bg);
  border-radius: 12px;
  padding: var(--spacing-md);
}

.neo-card.is-hoverable:hover {
  transform: translateY(-4px);
}

.neo-card__header {
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--shadow-dark);
  margin-bottom: var(--spacing-md);
}

.neo-card__footer {
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--shadow-dark);
  margin-top: var(--spacing-md);
}
</style>
