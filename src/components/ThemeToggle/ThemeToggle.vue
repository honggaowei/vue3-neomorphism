<template>
  <button class="theme-toggle neomorphic" @click="toggleTheme">
    <el-icon v-if="currentTheme === 'light'"><Sunny /></el-icon>
    <el-icon v-else><Moon /></el-icon>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTheme } from '@/composables/useTheme'

export default defineComponent({
  name: 'ThemeToggle',
  setup() {
    const { currentTheme, toggleTheme } = useTheme()
    return {
      currentTheme,
      toggleTheme
    }
  }
})
</script>

<style scoped>
.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  background: var(--primary-bg);
  color: var(--text-primary);
}

.theme-toggle:hover {
  transform: scale(1.05);
}
</style>
