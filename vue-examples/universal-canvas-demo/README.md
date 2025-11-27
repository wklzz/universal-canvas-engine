# Universal Canvas Engine - Vue 示例项目

这是一个使用 Vue 3 和 Vite 构建的示例项目，用于展示 @universal-canvas/engine 的功能。

## 项目结构

```
src/
├── views/              # 视图组件
│   ├── BasicExample.vue   # 基础功能示例
│   ├── LayerExample.vue   # 图层功能示例
│   └── PluginExample.vue  # 插件功能示例
├── router/             # 路由配置
│   └── index.ts
└── App.vue             # 根组件
```

## 功能示例

1. **基础示例** - 展示添加、移动、缩放、着色图形等基本操作
2. **图层示例** - 展示按图层顺序绘制图形的功能
3. **插件示例** - 展示插件系统的使用方法

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看示例

### 构建生产版本

```bash
npm run build
```

## 使用说明

1. 确保已在项目根目录安装了 @universal-canvas/engine
2. 确保已在项目根目录构建了 UMD 版本的引擎
3. 确保 images/sample.png 文件存在以支持图片功能示例

## 注意事项

- 本示例使用了 Fabric.js，需要在浏览器环境中通过 CDN 引入
- 图片功能需要正确的相对路径来访问 sample.png 文件