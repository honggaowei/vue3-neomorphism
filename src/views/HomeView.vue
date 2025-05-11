<template>
  <div class="neomorphic-container">
    <nav class="neo-nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/form-demo" class="nav-link">Form Demo</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
    </nav>
    
    <h1>Home Page</h1>
    <el-button type="primary" class="neomorphic-btn">Click Me</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
</script>

<style scoped>
.neo-nav {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.nav-link {
  color: #4a5568;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(0,0,0,0.05);
}

.nav-link.router-link-active {
  background: #4ade80;
  color: white;
}

.dark .nav-link {
  color: #f7fafc;
}

.dark .nav-link:hover {
  background: rgba(255,255,255,0.1);
}

.dark .nav-link.router-link-active {
  background: #4ade80;
}
</style>

<style scoped>
.neomorphic-container {
  padding: 2rem;
  background: #e0e5ec;
  border-radius: 20px;
  box-shadow: 
    8px 8px 15px rgba(163, 177, 198, 0.7),
    -8px -8px 15px rgba(255, 255, 255, 0.8);
}

.neomorphic-btn {
  box-shadow:
    3px 3px 6px rgba(163, 177, 198, 0.6),
    -3px -3px 6px rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
}

.neomorphic-btn:hover {
  transform: translateY(-2px);
  box-shadow:
    5px 5px 10px rgba(163, 177, 198, 0.6),
    -5px -5px 10px rgba(255, 255, 255, 0.8);
}
</style>