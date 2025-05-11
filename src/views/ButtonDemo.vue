<template>
  <div class="button-demo">
    <h2>按钮演示</h2>
    
    <section class="demo-section">
      <h3>基础按钮</h3>
      <div class="demo-row">
        <NeoButton>默认按钮</NeoButton>
        <NeoButton variant="primary">主要按钮</NeoButton>
        <NeoButton variant="success">成功按钮</NeoButton>
        <NeoButton variant="warning">警告按钮</NeoButton>
        <NeoButton variant="danger">危险按钮</NeoButton>
        <NeoButton variant="info">信息按钮</NeoButton>
      </div>
    </section>

    <section class="demo-section">
      <h3>按钮尺寸</h3>
      <div class="demo-row">
        <NeoButton size="small">小型按钮</NeoButton>
        <NeoButton>默认按钮</NeoButton>
        <NeoButton size="large">大型按钮</NeoButton>
      </div>
    </section>

    <section class="demo-section">
      <h3>图标按钮</h3>
      <div class="demo-row">
        <NeoButton icon="Plus">添加</NeoButton>
        <NeoButton icon="Edit">编辑</NeoButton>
        <NeoButton icon="Delete">删除</NeoButton>
      </div>
    </section>

    <section class="demo-section">
      <h3>禁用状态</h3>
      <div class="demo-row">
        <NeoButton disabled>禁用按钮</NeoButton>
        <NeoButton variant="primary" disabled>禁用主要按钮</NeoButton>
      </div>
    </section>

    <section class="demo-section">
      <h3>块级按钮</h3>
      <div class="demo-block">
        <NeoButton block>块级按钮</NeoButton>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NeoButton from '@/components/base/NeoButton/NeoButton.vue'

export default defineComponent({
  components: { NeoButton }
})
</script>

<style scoped>
.button-demo {
  padding: var(--spacing-lg);
}

.demo-section {
  margin-bottom: var(--spacing-xl);
}

.demo-section h3 {
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.demo-row {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.demo-block {
  max-width: 400px;
}
</style>
