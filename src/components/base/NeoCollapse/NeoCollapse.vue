<template>
  <div class="neo-collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, provide } from 'vue'

export default defineComponent({
  name: 'NeoCollapse',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    accordion: Boolean
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const activeNames = ref<(string | number)[]>(props.modelValue)

    const handleItemClick = (name: string | number) => {
      let newActiveNames = [...activeNames.value]
      
      if (props.accordion) {
        newActiveNames = activeNames.value[0] === name ? [] : [name]
      } else {
        const index = activeNames.value.indexOf(name)
        if (index > -1) {
          newActiveNames.splice(index, 1)
        } else {
          newActiveNames.push(name)
        }
      }
      
      activeNames.value = newActiveNames
      emit('update:modelValue', newActiveNames)
    }

    watch(() => props.modelValue, (val) => {
      activeNames.value = val
    })

    provide('collapseContext', {
      activeNames,
      handleItemClick
    })

    return { activeNames }
  }
})
</script>

<style scoped>
.neo-collapse {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
</style>
