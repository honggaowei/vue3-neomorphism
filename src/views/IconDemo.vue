<template>
  <div class="icon-demo">
    <h2>图标演示</h2>

    <section class="demo-section">
      <h3>使用示例</h3>
      <div class="example-grid">
        <div class="example-item neomorphic">
          <h4>Element Plus Icons</h4>
          <pre class="code-block">
import { Edit } from '@element-plus/icons-vue'

&lt;el-icon :size="24" color="#3498db"&gt;
  &lt;Edit /&gt;
&lt;/el-icon&gt;</pre>
        </div>
        <div class="example-item neomorphic">
          <h4>Tabler Icons</h4>
          <pre class="code-block">
import { IconHome } from '@tabler/icons-vue'

&lt;IconHome :size="24" :color="#3498db" /&gt;</pre>
        </div>
        <div class="example-item neomorphic">
          <h4>Iconify</h4>
          <pre class="code-block">
import { Icon } from '@iconify/vue'

&lt;Icon icon="mdi:home" :width="24" color="#3498db" /&gt;</pre>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h3>主题设置</h3>
      <div class="theme-controls">
        <div class="control-group">
          <span>图标大小：</span>
          <NeoButton 
            v-for="size in iconSizes" 
            :key="size"
            :variant="currentSize === size ? 'primary' : 'info'"
            @click="currentSize = size"
          >
            {{ size }}px
          </NeoButton>
        </div>
        <div class="control-group">
          <span>图标颜色：</span>
          <div 
            v-for="color in iconColors" 
            :key="color.value"
            class="color-block neomorphic"
            :style="{ '--icon-color': color.value }"
            :class="{ active: currentColor === color.value }"
            @click="currentColor = color.value"
          >
            {{ color.label }}
          </div>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h3>Element Plus 图标</h3>
      <div class="icon-grid">
        <div 
          v-for="icon in elementIcons" 
          :key="icon"
          class="icon-item neomorphic"
          @click="copyIconName(icon, 'element')"
        >
          <el-icon :style="iconStyle">
            <component :is="icon" />
          </el-icon>
          <span class="icon-name">{{ icon }}</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h3>Tabler 图标</h3>
      <div class="icon-grid">
        <div 
          v-for="icon in tablerIcons" 
          :key="icon"
          class="icon-item neomorphic"
          @click="copyIconName(icon, 'tabler')"
        >
          <component 
            :is="icon" 
            :size="currentSize" 
            :stroke="currentColor"
          />
          <span class="icon-name">{{ icon }}</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h3>Iconify 图标</h3>
      <div class="icon-grid">
        <div 
          v-for="icon in iconifyIcons" 
          :key="icon"
          class="icon-item neomorphic"
          @click="copyIconName(icon, 'iconify')"
        >
          <Icon 
            :icon="icon" 
            :width="currentSize" 
            :height="currentSize"
            :style="iconStyle"
          />
          <span class="icon-name">{{ icon }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { Icon } from '@iconify/vue'
import * as TablerIcons from '@tabler/icons-vue'
import NeoButton from '@/components/base/NeoButton/NeoButton.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  components: { Icon, NeoButton, ...TablerIcons },
  setup() {
    const currentSize = ref(24)
    const currentColor = ref('currentColor')

    const iconSizes = [16, 24, 32, 48]
    const iconColors = [
      { label: '默认', value: 'currentColor' },
      { label: '主色', value: '#3498db' },
      { label: '成功', value: '#2ecc71' },
      { label: '警告', value: '#f1c40f' },
      { label: '危险', value: '#e74c3c' },
      { label: '信息', value: '#95a5a6' }
    ]

    const iconStyle = computed(() => ({
      fontSize: `${currentSize.value}px`,
      color: currentColor.value
    }))

    const elementIcons = Object.keys(ElementPlusIconsVue)
    const tablerIcons = Object.keys(TablerIcons)
      .filter(key => key.startsWith('Icon'))
      .slice(0, 50)

    const iconifyIcons = [
      'mdi:home',
      'mdi:account',
      'mdi:cog',
      'mdi:bell',
      'mdi:heart',
      'mdi:star',
      'ri:admin-line',
      'ri:database-2-line',
      'ri:shield-check-line',
      'fa6-solid:user',
      'fa6-solid:gear',
      'fa6-solid:bell'
    ]

    const copyIconName = (name: string, type: 'element' | 'tabler' | 'iconify') => {
      let code = ''
      switch (type) {
        case 'element':
          code = `<el-icon><${name} /></el-icon>`
          break
        case 'tabler':
          code = `<${name} />`
          break
        case 'iconify':
          code = `<Icon icon="${name}" />`
          break
      }
      navigator.clipboard.writeText(code)
      ElMessage.success(`已复制代码: ${code}`)
    }

    return {
      currentSize,
      currentColor,
      iconSizes,
      iconColors,
      elementIcons,
      tablerIcons,
      iconifyIcons,
      iconStyle,
      copyIconName
    }
  }
})
</script>

<style scoped>
.icon-demo {
  padding: 0;
  background: var(--primary-bg);
  min-height: 100%;
}

.demo-section {
  padding: var(--spacing-lg);
}

h2 {
  padding: var(--spacing-lg);
  margin: 0;
  border-bottom: 1px solid var(--shadow-dark);
}

h3 {
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.theme-controls {
  display: flex;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.color-block {
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  color: var(--icon-color);
  transition: all 0.3s ease;
}

.color-block.active {
  transform: scale(1.05);
  color: var(--icon-color);
  font-weight: bold;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
  gap: var(--spacing-sm);
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 100px;
}

.icon-item:hover {
  transform: translateY(-2px);
}

.icon-name {
  font-size: 12px;
  color: var(--text-secondary);
  text-align: center;
  word-break: break-all;
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.example-item {
  padding: var(--spacing-md);
}

.example-item h4 {
  margin: 0 0 var(--spacing-md);
  color: var(--text-primary);
}

.code-block {
  background: var(--secondary-bg);
  padding: var(--spacing-md);
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
  color: var(--text-primary);
}
</style>
