<template>
  <button
    class="neo-button neomorphic"
    :class="[
      `neo-button--${size}`,
      `neo-button--${variant}`,
      { 'neo-button--block': block }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <el-icon v-if="$slots.icon || icon" class="neo-button__icon">
      <component :is="icon" v-if="icon" />
      <slot name="icon" v-else />
    </el-icon>
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type ButtonSize = 'small' | 'medium' | 'large'
type ButtonVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export default defineComponent({
  name: 'NeoButton',
  props: {
    size: {
      type: String as PropType<ButtonSize>,
      default: 'medium'
    },
    variant: {
      type: String as PropType<ButtonVariant>,
      default: 'primary'
    },
    icon: {
      type: String,
      default: ''
    },
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
})
</script>

<style scoped>
.neo-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.3s ease;
  gap: 8px;
}

/* Sizes */
.neo-button--small {
  padding: 6px 12px;
  font-size: 0.875rem;
  border-radius: 6px;
}

.neo-button--medium {
  padding: 8px 16px;
  font-size: 1rem;
  border-radius: 8px;
}

.neo-button--large {
  padding: 12px 24px;
  font-size: 1.125rem;
  border-radius: 10px;
}

/* Variants */
.neo-button--primary {
  --button-color: #3498db;
  color: var(--button-color);
}

.neo-button--success {
  --button-color: #2ecc71;
  color: var(--button-color);
}

.neo-button--warning {
  --button-color: #f1c40f;
  color: var(--button-color);
}

.neo-button--danger {
  --button-color: #e74c3c;
  color: var(--button-color);
}

.neo-button--info {
  --button-color: #95a5a6;
  color: var(--button-color);
}

/* Block */
.neo-button--block {
  display: flex;
  width: 100%;
}

/* Hover & Active states */
.neo-button:hover {
  transform: translateY(-2px);
  box-shadow: 
    12px 12px 20px var(--shadow-dark),
    -12px -12px 20px var(--shadow-light);
}

.neo-button:active {
  transform: translateY(0);
  box-shadow: 
    inset 4px 4px 8px var(--shadow-dark),
    inset -4px -4px 8px var(--shadow-light);
}

/* Disabled state */
.neo-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Icon */
.neo-button__icon {
  font-size: 1.1em;
}
</style>
