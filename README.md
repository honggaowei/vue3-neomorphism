# Vue3 Neomorphism UI Library

一个基于 Vue 3 的新拟态风格 UI 组件库，结合了优雅的设计和现代的技术栈。

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Vue](https://img.shields.io/badge/vue-v3.5.13-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-v5.8.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 特性

- 🎨 新拟态设计风格
- 💪 TypeScript 支持
- 🔥 Vue 3 Composition API
- 📦 高度可定制的组件
- 🌗 亮色/暗色主题切换
- 📱 响应式设计

## 组件列表

- Button - 按钮组件
- Input - 输入框组件
- Select - 选择器组件
- Checkbox - 复选框组件
- Radio - 单选框组件
- Switch - 开关组件
- Progress - 进度条组件
- Card - 卡片组件
- Table - 表格组件
- Transfer - 穿梭框组件
- Collapse - 折叠面板组件

## 快速开始

### 安装

```bash
# npm
npm install vue3-neomorphism

# yarn
yarn add vue3-neomorphism

# pnpm
pnpm add vue3-neomorphism
```

### 基础使用

```vue
<template>
  <NeoButton variant="primary">点击我</NeoButton>
</template>

<script setup lang="ts">
import { NeoButton } from 'vue3-neomorphism'
</script>
```

## 开发

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 项目结构

```
src/
  ├── components/       # UI组件
  │   ├── base/        # 基础组件
  │   ├── form/        # 表单组件
  │   ├── layout/      # 布局组件
  │   └── table/       # 表格组件
  ├── composables/     # 组合式函数
  ├── router/          # 路由配置
  ├── views/           # 示例页面
  └── assets/          # 静态资源
```

## 主题配置

项目使用 CSS 变量实现主题定制，你可以通过修改这些变量来自定义主题：

```css
:root {
  --primary-bg: #e0e5ec;
  --secondary-bg: #f0f3f7;
  --shadow-light: rgba(255, 255, 255, 0.8);
  --shadow-dark: rgba(163, 177, 198, 0.7);
  --text-primary: #2d3436;
  --text-secondary: #636e72;
}
```

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 贡献

欢迎提交 Issue 和 Pull Request。

## 许可

[MIT License](LICENSE)