<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { ArrowDown, Check, Close } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: { type: [String, Number, Array], default: '' },
  options: { type: Array, default: () => [] },
  multiple: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  label: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

const selectClasses = computed(() => ({
  'neo-select': true,
  'disabled-state': props.disabled,
  'error-state': props.error
}))

const isOpen = ref(false)
const selectRef = ref<HTMLElement | null>(null)
const dropdownStyle = ref({
  position: 'fixed',
  width: '0px',
  left: '0px',
  top: '0px',
  zIndex: 9999
})

const selectedItems = computed(() => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue.map(value => props.options.find(option => option.value === value))
  }
  return []
})
const selectedLabel = computed(() => {
  if (!props.multiple) {
    const selectedOption = props.options.find(option => option.value === props.modelValue)
    return selectedOption ? selectedOption.label : ''
  }
  return ''
})

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const selectOption = option => {
  if (props.multiple) {
    const newValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = newValue.indexOf(option.value)
    if (index === -1) {
      newValue.push(option.value)
    } else {
      newValue.splice(index, 1)
    }
    emit('update:modelValue', newValue)
  } else {
    emit('update:modelValue', option.value)
    isOpen.value = false
  }
}

const isSelected = option => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(option.value)
  }
  return props.modelValue === option.value
}

const removeItem = item => {
  if (props.multiple) {
    const newValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = newValue.indexOf(item.value)
    if (index !== -1) {
      newValue.splice(index, 1)
    }
    emit('update:modelValue', newValue)
  }
}

const updateDropdownPosition = () => {
  const el = selectRef.value
  if (el) {
    const rect = el.getBoundingClientRect()
    dropdownStyle.value = {
      position: 'fixed',
      width: rect.width + 'px',
      left: rect.left + 'px',
      top: (rect.bottom + 8) + 'px',
      zIndex: 9999
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateDropdownPosition)
  window.addEventListener('resize', updateDropdownPosition)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateDropdownPosition)
  window.removeEventListener('resize', updateDropdownPosition)
})

watch(isOpen, (val) => {
  if (val) {
    nextTick(updateDropdownPosition)
  }
})
</script>

<template>
  <div class="neo-select-wrapper">
    <label v-if="label" class="neo-select-label">{{ label }}</label>
    <div ref="selectRef" class="neo-select-container neomorphic" :class="{ 'is-active': isOpen }">
      <div class="neo-select-value" @click="toggleDropdown">
        <div class="selected-items" v-if="multiple">
          <span v-for="item in selectedItems" :key="item.value" class="selected-tag">
            {{ item.label }}
            <el-icon class="remove-icon" @click.stop="removeItem(item)">
              <Close />
            </el-icon>
          </span>
        </div>
        <span v-else>{{ selectedLabel }}</span>
        <el-icon class="arrow-icon" :class="{ 'is-reverse': isOpen }">
          <ArrowDown />
        </el-icon>
      </div>
      <teleport to="body">
        <div 
          v-if="isOpen" 
          class="neo-select-dropdown neomorphic"
          :style="dropdownStyle"
        >
          <div
            v-for="option in options"
            :key="option.value"
            class="neo-select-option"
            :class="{ 'is-selected': isSelected(option) }"
            @click="selectOption(option)"
          >
            <span class="checkbox" v-if="multiple">
              <el-icon v-if="isSelected(option)"><Check /></el-icon>
            </span>
            {{ option.label }}
          </div>
        </div>
      </teleport>
    </div>
  </div>
</template>

<style scoped>
.neo-select-wrapper {
  position: relative;
  width: 100%;
}

.neo-select-label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-size: 0.9em;
  font-weight: 500;
}

.neo-select-container {
  position: relative;
  width: 100%;
  min-height: 40px;
  cursor: pointer;
}

.neo-select-value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  min-height: 40px;
}

.selected-items {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.selected-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  background: var(--primary-bg);
  border-radius: 4px;
  font-size: 0.9em;
  box-shadow: inset 2px 2px 5px var(--shadow-dark),
              inset -2px -2px 5px var(--shadow-light);
}

.remove-icon {
  margin-left: 4px;
  font-size: 0.8em;
}

.arrow-icon {
  transition: transform 0.3s;
}

.arrow-icon.is-reverse {
  transform: rotate(180deg);
}

.neo-select-dropdown {
  position: fixed;
  background: var(--primary-bg);
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 
    8px 8px 15px var(--shadow-dark),
    -8px -8px 15px var(--shadow-light);
}

.neo-select-option {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.neo-select-option:hover {
  background: var(--shadow-light);
}

.neo-select-option.is-selected {
  color: var(--button-color, #3498db);
}

.checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: 4px;
  box-shadow: inset 2px 2px 5px var(--shadow-dark),
              inset -2px -2px 5px var(--shadow-light);
}
</style>