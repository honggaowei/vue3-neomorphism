<template>
  <div class="component-demo">
    <h2>组件演示</h2>

    <section class="demo-section">
      <h3>卡片 Card</h3>
      <div class="demo-row">
        <NeoCard hoverable>
          <template #header>
            <h4>标准卡片</h4>
          </template>
          <p>这是卡片的内容区域</p>
          <template #footer>
            <div class="card-footer">
              <NeoButton size="small">取消</NeoButton>
              <NeoButton size="small" variant="primary">确定</NeoButton>
            </div>
          </template>
        </NeoCard>

        <NeoCard>
          <div class="demo-card-content">
            <el-icon><Picture /></el-icon>
            <h4>简单卡片</h4>
            <p>无边框的简单卡片</p>
          </div>
        </NeoCard>
      </div>
    </section>

    <section class="demo-section">
      <h3>折叠面板 Collapse</h3>
      <p class="section-desc">点击面板标题展开或折叠内容</p>
      
      <div class="demo-group">
        <h4>基础用法</h4>
        <NeoCollapse v-model="activeCollapse">
          <NeoCollapseItem title="什么是新拟态设计？" name="1">
            <div class="collapse-content">
              <p>新拟态（Neumorphism）是一种视觉设计风格，它结合了拟物设计和扁平化设计的特点。这种设计通过巧妙运用阴影，创造出软化的、似乎从背景中浮现出来的界面元素。</p>
              <p>主要特点：</p>
              <ul>
                <li>柔和的阴影效果</li>
                <li>微妙的深度感</li>
                <li>统一的背景色调</li>
                <li>简洁的视觉层次</li>
              </ul>
            </div>
          </NeoCollapseItem>
          <NeoCollapseItem title="新拟态设计的应用场景" name="2">
            <div class="collapse-content">
              <p>新拟态设计特别适合以下场景：</p>
              <ul>
                <li>音乐播放器界面</li>
                <li>仪表盘和控制面板</li>
                <li>移动应用程序</li>
                <li>网页组件</li>
              </ul>
              <p>在这些场景中，新拟态设计能够创造出独特的视觉体验和交互感觉。</p>
            </div>
          </NeoCollapseItem>
          <NeoCollapseItem title="设计注意事项" name="3">
            <div class="collapse-content">
              <p>在使用新拟态设计时，需要注意以下几点：</p>
              <ul>
                <li>确保适当的对比度，以保证可访问性</li>
                <li>谨慎使用阴影效果，避免视觉疲劳</li>
                <li>保持一致的颜色方案</li>
                <li>考虑响应式设计的适配</li>
              </ul>
            </div>
          </NeoCollapseItem>
        </NeoCollapse>
      </div>

      <div class="demo-group">
        <h4>手风琴模式</h4>
        <p class="demo-desc">每次只能展开一个面板</p>
        <NeoCollapse v-model="accordionActive" accordion>
          <NeoCollapseItem title="产品特点" name="1">
            <div class="collapse-content">
              <h5>简约而不简单</h5>
              <p>我们的产品采用新拟态设计，在视觉上给用户带来清爽、现代的感受，同时保持了良好的功能性和可用性。</p>
              <div class="feature-list">
                <div class="feature-item">
                  <el-icon><Sunny /></el-icon>
                  <span>简洁的视觉体验</span>
                </div>
                <div class="feature-item">
                  <el-icon><Mouse /></el-icon>
                  <span>流畅的交互设计</span>
                </div>
                <div class="feature-item">
                  <el-icon><Monitor /></el-icon>
                  <span>响应式布局</span>
                </div>
              </div>
            </div>
          </NeoCollapseItem>
          <NeoCollapseItem title="技术实现" name="2">
            <div class="collapse-content">
              <h5>核心技术栈</h5>
              <div class="tech-stack">
                <p>前端框架：Vue 3 + TypeScript</p>
                <p>UI组件：Element Plus</p>
                <p>路由管理：Vue Router</p>
                <p>状态管理：Pinia</p>
              </div>
              <div class="code-example">
                <pre><code>// 新拟态效果的CSS示例
box-shadow: 
  8px 8px 15px var(--shadow-dark),
  -8px -8px 15px var(--shadow-light);</code></pre>
              </div>
            </div>
          </NeoCollapseItem>
          <NeoCollapseItem title="用户反馈" name="3">
            <div class="collapse-content">
              <div class="testimonials">
                <div class="testimonial">
                  <q>界面设计非常清爽，使用体验很好</q>
                  <cite>— 设计师小王</cite>
                </div>
                <div class="testimonial">
                  <q>组件封装得很规范，代码复用性高</q>
                  <cite>— 开发者小李</cite>
                </div>
              </div>
            </div>
          </NeoCollapseItem>
        </NeoCollapse>
      </div>
    </section>

    <section class="demo-section">
      <h3>进度条 Progress</h3>
      <div class="demo-progress">
        <NeoProgress :percentage="20" />
        <NeoProgress :percentage="50" color="#3498db" />
        <NeoProgress :percentage="80" color="#2ecc71" />
        <div class="progress-circles">
          <NeoProgress type="circle" :percentage="30" />
          <NeoProgress type="circle" :percentage="70" color="#3498db" />
          <NeoProgress type="circle" :percentage="100" color="#2ecc71" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NeoCard from '@/components/base/NeoCard/NeoCard.vue'
import NeoCollapse from '@/components/base/NeoCollapse/NeoCollapse.vue'
import NeoCollapseItem from '@/components/base/NeoCollapse/NeoCollapseItem.vue'
import NeoProgress from '@/components/base/NeoProgress/NeoProgress.vue'
import NeoButton from '@/components/base/NeoButton/NeoButton.vue'
import NeoSwitch from '@/components/form/NeoSwitch/NeoSwitch.vue'
import { Monitor, Sunny, Mouse } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    NeoCard,
    NeoCollapse,
    NeoCollapseItem,
    NeoProgress,
    NeoButton,
    NeoSwitch,
    Sunny,  // Using Sunny instead of Light
    Mouse,
    Monitor
  },
  setup() {
    const activeCollapse = ref<string[]>(['1'])
    const accordionActive = ref<string[]>(['1'])

    const expandAll = () => {
      activeCollapse.value = ['1', '2', '3']
    }

    const collapseAll = () => {
      activeCollapse.value = []
    }

    return {
      activeCollapse,
      accordionActive,
      expandAll,
      collapseAll
    }
  }
})
</script>

<style scoped>
.component-demo {
  padding: 0;
  background: var(--primary-bg);
  min-height: 100%;
}

.demo-section {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--shadow-dark);
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

.demo-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
}

.demo-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
}

.demo-progress {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.progress-circles {
  display: flex;
  gap: var(--spacing-xl);
  flex-wrap: wrap;
}

.collapse-controls {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  align-items: center;
}

.section-desc {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}

.demo-group {
  margin-bottom: var(--spacing-xl);
}

.demo-group h4 {
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.demo-desc {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  font-size: 0.9em;
}

.collapse-content {
  color: var(--text-primary);
  line-height: 1.6;
}

.collapse-content p {
  margin-bottom: var(--spacing-md);
}

.collapse-content ul {
  padding-left: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: var(--primary-bg);
  border-radius: 8px;
  box-shadow: inset 2px 2px 5px var(--shadow-dark),
              inset -2px -2px 5px var(--shadow-light);
}

.tech-stack {
  display: grid;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.code-example {
  background: var(--secondary-bg);
  padding: var(--spacing-md);
  border-radius: 8px;
  margin-top: var(--spacing-md);
}

.testimonials {
  display: grid;
  gap: var(--spacing-md);
}

.testimonial {
  padding: var(--spacing-md);
  background: var(--primary-bg);
  border-radius: 8px;
  box-shadow: inset 2px 2px 5px var(--shadow-dark),
              inset -2px -2px 5px var(--shadow-light);
}

.testimonial q {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-style: italic;
}

.testimonial cite {
  color: var(--text-secondary);
  font-size: 0.9em;
}
</style>
