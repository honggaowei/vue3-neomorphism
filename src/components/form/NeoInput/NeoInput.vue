<template>
  <div class="neo-input-wrapper">
    <label v-if="label" class="neo-input-label">{{ label }}</label>
    <div class="neo-input-container neomorphic" :class="{ 'is-focused': focused }">
      <el-icon v-if="prefixIcon" class="neo-input-icon prefix">
        <component :is="prefixIcon" />
      </el-icon>
      <input
        v-if="type !== 'textarea'"
        ref="input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="min"
        :max="max"
        :step="step"
        class="neo-input"
        @input="handleInput"
        @focus="focused = true"
        @blur="focused = false"
      />
      <textarea
        v-else
        ref="input"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="neo-textarea"
        @input="handleInput"
        @focus="focused = true"
        @blur="focused = false"
      ></textarea>
      <el-icon v-if="suffixIcon" class="neo-input-icon suffix">
        <component :is="suffixIcon" />
      </el-icon>
    </div>
    <span v-if="error" class="neo-input-error">{{ error }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'

type InputType = 'text' | 'number' | 'password' | 'email' | 'date' | 'time' | 'textarea'

export default defineComponent({
  name: 'NeoInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String as PropType<InputType>,
      default: 'text'
    },
    label: String,
    placeholder: String,
    disabled: Boolean,
    prefixIcon: String,
    suffixIcon: String,
    error: String,
    min: [String, Number],
    max: [String, Number],
    step: [String, Number]
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const focused = ref(false)

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement
      emit('update:modelValue', target.value)
    }

    return {
      focused,
      handleInput
    }
  }
})
</script>

<style scoped>
.neo-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.neo-input-label {
  color: var(--text-primary);
  font-size: 0.9em;
  font-weight: 500;
}

.neo-input-container {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  transition: all 0.3s ease;
}

.neo-input-container.is-focused {
  box-shadow: 
    inset 4px 4px 8px var(--shadow-dark),
    inset -4px -4px 8px var(--shadow-light);
}

.neo-input,
.neo-textarea {
  flex: 1;
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 1em;
  outline: none;
  width: 100%;
}

.neo-textarea {
  min-height: 100px;
  resize: vertical;
}

.neo-input-icon {
  color: var(--text-secondary);
  font-size: 1.1em;
}

.neo-input-icon.prefix {
  margin-right: 8px;
}

.neo-input-icon.suffix {
  margin-left: 8px;
}

.neo-input-error {
  color: var(--button-color, #e74c3c);
  font-size: 0.85em;
}
</style>