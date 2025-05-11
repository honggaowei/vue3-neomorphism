<template>
  <div class="neomorphic-container">
    <h1>Home Page</h1>
    <el-button type="primary" class="neomorphic-btn">Click Me</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
</script>

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