<template>
  <aside class="sidebar neomorphic">
    <div class="logo">
      <h2>Neo UI</h2>
    </div>
    <nav>
      <router-link 
        v-for="route in routes" 
        :key="route.path"
        :to="route.path"
        class="nav-item neomorphic"
      >
        <el-icon><component :is="route.icon" /></el-icon>
        <span>{{ route.title }}</span>
      </router-link>
    </nav>
    <div class="theme-toggle-wrapper">
      <ThemeToggle />
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle.vue'

export default defineComponent({
  components: { ThemeToggle },
  setup() {
    const routes = [
      { path: '/icon', title: '图标演示', icon: 'Picture' },
      { path: '/button', title: '按钮演示', icon: 'Pointer' },
      { path: '/form', title: '表单演示', icon: 'Document' },
      { path: '/table', title: '表格演示', icon: 'Grid' },
      { path: '/components', title: '组件演示', icon: 'Menu' },
    ]
    return { routes }
  }
})
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
}

.logo {
  margin-bottom: 30px;
  text-align: center;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  margin: 10px 0;
  color: var(--text-primary);
  text-decoration: none;
  border-radius: 8px;
}

.nav-item .el-icon {
  margin-right: 10px;
}

.theme-toggle-wrapper {
  margin-top: auto;
  display: flex;
  justify-content: center;
}
</style>
