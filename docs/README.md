# universal-canvas-engine 文档

欢迎使用 universal-canvas-engine 文档中心！本文档将帮助您了解和使用这个强大的 Canvas 引擎。

## 目录

- [快速开始指南](./getting-started.md) - 适合初学者的入门教程
- [API 参考文档](./api-reference.md) - 详细的 API 说明和使用示例
- [高级使用指南](./advanced-guide.md) - 高级特性和最佳实践

## 项目概述

universal-canvas-engine 是一个统一的 Canvas API 引擎，旨在为不同的 Canvas 实现提供一致的接口。无论您使用的是 Fabric.js、Skyline.js 还是其他 Canvas 库，都可以通过相同的 API 进行操作。

### 主要特性

1. **统一接口** - 为不同的 Canvas 实现提供一致的操作接口
2. **适配器模式** - 支持多种 Canvas 库的适配器
3. **插件系统** - 可扩展的插件架构，方便功能扩展
4. **类型安全** - 使用 TypeScript 编写，提供完整的类型定义
5. **序列化支持** - 支持画布状态的序列化和反序列化

### 支持的适配器

- Fabric.js 适配器
- Skyline.js 适配器
- 可扩展的自定义适配器

## 开始使用

如果您是第一次使用 universal-canvas-engine，建议从[快速开始指南](./getting-started.md)开始。该指南将带领您完成安装、基本配置和简单使用的全过程。

对于需要深入了解 API 的开发者，请查阅[API 参考文档](./api-reference.md)，其中包含了所有接口的详细说明和使用示例。

如果您希望充分利用 universal-canvas-engine 的高级特性，如自定义适配器、高级插件开发等，请阅读[高级使用指南](./advanced-guide.md)。

## 运行示例

项目包含了多个可以直接运行的 HTML 示例文件，位于 `examples/` 目录下：

1. **basic-example.html** - 基础使用示例，展示图形的增删改查操作
2. **plugin-example.html** - 插件系统示例，演示如何创建和使用自定义插件
3. **layer-example.html** - 图层操作示例，展示按图层顺序绘制功能

要运行这些示例，请确保已经构建了项目（运行 `npm run build`），然后直接在浏览器中打开对应的 HTML 文件即可。

## 贡献文档

我们欢迎社区贡献文档改进和补充。如果您发现文档中有不准确或遗漏的地方，请提交 Issue 或 Pull Request。

## 获取帮助

如果您在使用过程中遇到问题，可以通过以下方式获取帮助：

1. 查阅相关文档
2. 在 GitHub 上提交 Issue
3. 参考示例代码