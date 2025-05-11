<template>
  <div class="neomorphic-container animate__animated animate__fadeIn">
    <h1>About Page</h1>
    <el-card class="neomorphic-card">
      <template #header>
        <div class="card-header">
          <span>Neomorphic Card</span>
        </div>
      </template>
      <p>This is a card with neomorphic styling and animations</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus'
import 'animate.css'
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

.neomorphic-card {
  background: #e0e5ec;
  border: none;
  box-shadow:
    5px 5px 10px rgba(163, 177, 198, 0.6),
    -5px -5px 10px rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.neomorphic-card:hover {
  transform: translateY(-5px);
  box-shadow:
    8px 8px 15px rgba(163, 177, 198, 0.6),
    -8px -8px 15px rgba(255, 255, 255, 0.8);
}
</style>