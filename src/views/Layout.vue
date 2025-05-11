<template>
  <div class="layout">
    <Sidebar />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from '@/components/layout/Sidebar/Sidebar.vue'

export default defineComponent({
  components: { Sidebar }
})
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: var(--primary-bg);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  background: var(--primary-bg);
  height: 100vh;
  overflow-y: auto;
}
</style>
