<template>
  <div class="neo-collapse-item" :class="{ 'is-active': isActive }">
    <div class="neo-collapse-item__header" @click="handleClick">
      <span class="neo-collapse-item__title">{{ title }}</span>
      <el-icon class="neo-collapse-item__arrow" :class="{ 'is-active': isActive }">
        <ArrowDown />
      </el-icon>
    </div>
    <div 
      class="neo-collapse-item__content"
      ref="contentRef"
      :style="contentStyle"
    >
      <div class="neo-collapse-item__wrapper" ref="wrapperRef">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, ref, onMounted } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'NeoCollapseItem',
  components: { ArrowDown },
  props: {
    title: String,
    name: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const { activeNames, handleItemClick } = inject('collapseContext') as any
    const contentRef = ref<HTMLElement | null>(null)
    const wrapperRef = ref<HTMLElement | null>(null)

    const isActive = computed(() => activeNames.value.includes(props.name))

    const contentStyle = computed(() => ({
      height: isActive.value ? `${wrapperRef.value?.offsetHeight || 0}px` : '0px'
    }))

    const handleClick = () => {
      handleItemClick(props.name)
    }

    onMounted(() => {
      if (isActive.value && wrapperRef.value) {
        contentRef.value!.style.height = `${wrapperRef.value.offsetHeight}px`
      }
    })

    return {
      isActive,
      contentRef,
      wrapperRef,
      contentStyle,
      handleClick
    }
  }
})
</script>

<style scoped>
.neo-collapse-item {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: var(--spacing-sm);
  background: var(--primary-bg);
  box-shadow: 
    4px 4px 8px var(--shadow-dark),
    -4px -4px 8px var(--shadow-light);
}

.neo-collapse-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--primary-bg);
  position: relative;
  z-index: 1;
}

.neo-collapse-item__header:hover {
  background: var(--shadow-light);
}

.neo-collapse-item__arrow {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.2em;
  color: var(--text-secondary);
}

.neo-collapse-item__arrow.is-active {
  transform: rotate(180deg);
  color: var(--text-primary);
}

.neo-collapse-item__content {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}

.neo-collapse-item__wrapper {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--shadow-dark);
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.is-active .neo-collapse-item__wrapper {
  opacity: 1;
  transform: translateY(0);
}

.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  height: 0 !important;
  opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  height: var(--content-height);
  opacity: 1;
}
</style>
