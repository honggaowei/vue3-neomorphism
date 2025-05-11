<script setup lang="ts">
import { ref } from 'vue'
import NeoInput from '@/components/form/NeoInput/NeoInput.vue'
import NeoSelect from '@/components/form/NeoSelect/NeoSelect.vue'
import NeoSwitch from '@/components/form/NeoSwitch/NeoSwitch.vue'

const formData = ref({
  username: '',
  gender: '',
  newsletter: false,
  theme: 'light'
})

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
]

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark')
  formData.value.theme = formData.value.theme === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div class="form-demo-container">
    <h1>Neomorphism Form Demo</h1>
    
    <div class="theme-control">
      <NeoSwitch 
        v-model="formData.theme" 
        true-value="dark"
        false-value="light"
        label="Dark Mode"
        @change="toggleTheme"
      />
    </div>

    <div class="form-preview">
      <div class="form-group">
        <NeoInput 
          v-model="formData.username"
          placeholder="Enter your username"
          label="Username"
        />
      </div>

      <div class="form-group">
        <NeoSelect
          v-model="formData.gender"
          :options="genderOptions"
          label="Gender"
        />
      </div>

      <div class="form-group">
        <NeoSwitch
          v-model="formData.newsletter"
          label="Subscribe to newsletter"
          label-position="right"
        />
      </div>
    </div>

    <div class="output-panel">
      <h3>Form Data:</h3>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.form-demo-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 20px;
  background: #e0e5ec;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1),
              -10px -10px 20px rgba(255, 255, 255, 0.8);
}

.dark .form-demo-container {
  background: #2d3748;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3),
              -10px -10px 20px rgba(74, 85, 104, 0.5);
}

h1 {
  text-align: center;
  color: #4a5568;
  margin-bottom: 2rem;
}

.dark h1 {
  color: #f7fafc;
}

.theme-control {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.output-panel {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.dark .output-panel {
  background: rgba(45, 55, 72, 0.7);
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3);
}

pre {
  background: rgba(0, 0, 0, 0.05);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.dark pre {
  background: rgba(0, 0, 0, 0.2);
}
</style>