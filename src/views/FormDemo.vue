<template>
  <div class="form-demo">
    <h2>表单演示</h2>

    <section class="demo-section">
      <h3>基础输入框</h3>
      <div class="demo-row">
        <NeoInput
          v-model="form.name"
          label="用户名"
          placeholder="请输入用户名"
          prefixIcon="User"
        />
        <NeoInput
          v-model="form.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          prefixIcon="Lock"
        />
      </div>
    </section>

    <section class="demo-section">
      <h3>数字输入</h3>
      <div class="demo-row">
        <NeoInput
          v-model="form.age"
          type="number"
          label="年龄"
          placeholder="请输入年龄"
          min="0"
          max="120"
        />
        <NeoInput
          v-model="form.price"
          type="number"
          label="价格"
          placeholder="请输入价格"
          step="0.01"
          prefixIcon="Money"
        />
      </div>
    </section>

    <section class="demo-section">
      <h3>日期和时间</h3>
      <div class="demo-row">
        <NeoInput
          v-model="form.date"
          type="date"
          label="日期"
        />
        <NeoInput
          v-model="form.time"
          type="time"
          label="时间"
        />
      </div>
    </section>

    <section class="demo-section">
      <h3>文本域</h3>
      <NeoInput
        v-model="form.description"
        type="textarea"
        label="描述"
        placeholder="请输入描述信息"
      />
    </section>

    <section class="demo-section">
      <h3>选择器</h3>
      <div class="demo-row">
        <NeoSelect
          v-model="form.city"
          label="城市"
          :options="cityOptions"
        />
        <NeoSelect
          v-model="form.skills"
          label="技能"
          :options="skillOptions"
          multiple
        />
      </div>
    </section>

    <section class="demo-section">
      <h3>开关和复选框</h3>
      <div class="demo-row">
        <NeoSwitch
          v-model="form.notifications"
          label="接收通知"
        />
        <NeoCheckbox
          v-model="form.agreement"
          label="同意用户协议"
        />
      </div>
    </section>

    <section class="demo-section">
      <h3>穿梭框</h3>
      <NeoTransfer
        v-model="form.transfer"
        :data="transferData"
      />
    </section>

    <div class="form-actions">
      <NeoButton @click="resetForm">重置</NeoButton>
      <NeoButton variant="primary" @click="submitForm">提交</NeoButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import NeoInput from '@/components/form/NeoInput/NeoInput.vue'
import NeoSelect from '@/components/form/NeoSelect/NeoSelect.vue'
import NeoSwitch from '@/components/form/NeoSwitch/NeoSwitch.vue'
import NeoCheckbox from '@/components/form/NeoCheckbox/NeoCheckbox.vue'
import NeoButton from '@/components/base/NeoButton/NeoButton.vue'
import NeoTransfer from '@/components/form/NeoTransfer/NeoTransfer.vue'

export default defineComponent({
  components: {
    NeoInput,
    NeoSelect,
    NeoSwitch,
    NeoCheckbox,
    NeoButton,
    NeoTransfer
  },
  setup() {
    const form = reactive({
      name: '',
      password: '',
      age: '',
      price: '',
      date: '',
      time: '',
      description: '',
      city: '',
      skills: [],
      notifications: false,
      agreement: false,
      transfer: []
    })

    const cityOptions = [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
      { label: '深圳', value: 'shenzhen' }
    ]

    const skillOptions = [
      { label: 'Vue', value: 'vue' },
      { label: 'React', value: 'react' },
      { label: 'Angular', value: 'angular' },
      { label: 'Node.js', value: 'nodejs' }
    ]

    const transferData = [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' },
      { label: '选项4', value: '4' },
      { label: '选项5', value: '5' }
    ]

    const resetForm = () => {
      Object.keys(form).forEach(key => {
        form[key] = Array.isArray(form[key]) ? [] : ''
      })
    }

    const submitForm = () => {
      console.log('提交的表单数据:', form)
    }

    return {
      form,
      cityOptions,
      skillOptions,
      transferData,
      resetForm,
      submitForm
    }
  }
})
</script>

<style scoped>
.form-demo {
  padding: var(--spacing-lg);
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: var(--spacing-xl);
}

.demo-section h3 {
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.demo-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
}
</style>