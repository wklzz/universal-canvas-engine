const fs = require('fs');
const path = require('path');

// 读取各个模块文件
const fabricPath = path.join(__dirname, '../dist/adapters/fabric.js');
const skylinePath = path.join(__dirname, '../dist/adapters/skyline.js');
const pluginPath = path.join(__dirname, '../dist/plugins/plugin.js');

const fabricContent = fs.readFileSync(fabricPath, 'utf-8');
const skylineContent = fs.readFileSync(skylinePath, 'utf-8');
const pluginContent = fs.readFileSync(pluginPath, 'utf-8');

// 移除导出语句并提取类定义，同时移除source map引用
const fabricClass = fabricContent
  .replace(/export class FabricAdapter/g, 'class FabricAdapter')
  .replace(/export \{.*\};/g, '')
  .replace(/\/\/# sourceMappingURL=.*/g, '');

const skylineClass = skylineContent
  .replace(/export class SkylineAdapter/g, 'class SkylineAdapter')
  .replace(/export \{.*\};/g, '')
  .replace(/\/\/# sourceMappingURL=.*/g, '');

const pluginClasses = pluginContent
  .replace(/export class BasePlugin/g, 'class BasePlugin')
  .replace(/export class ExamplePlugin/g, 'class ExamplePlugin')
  .replace(/export \{.*\};/g, '')
  .replace(/\/\/# sourceMappingURL=.*/g, '');

// 创建UMD包装器
const umdWrapper = `
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.universalCanvasEngine = {})));
}(this, (function (exports) {
  'use strict';

  // FabricAdapter类定义
  ${fabricClass}
  
  // SkylineAdapter类定义
  ${skylineClass}
  
  // Plugin类定义
  ${pluginClasses}

  // 导出类
  exports.FabricAdapter = FabricAdapter;
  exports.SkylineAdapter = SkylineAdapter;
  exports.BasePlugin = BasePlugin;
  exports.ExamplePlugin = ExamplePlugin;

  // 为了在浏览器环境中使用，将接口和类添加到全局window对象
  if (typeof window !== 'undefined') {
    window.universalCanvasEngine = exports;
    window.FabricAdapter = FabricAdapter;
    window.SkylineAdapter = SkylineAdapter;
    window.BasePlugin = BasePlugin;
    window.ExamplePlugin = ExamplePlugin;
  }

})));
`;

// 写入UMD版本
const umdDir = path.join(__dirname, '../dist/umd');
if (!fs.existsSync(umdDir)) {
  fs.mkdirSync(umdDir, { recursive: true });
}

const umdPath = path.join(umdDir, 'universal-canvas-engine.js');
fs.writeFileSync(umdPath, umdWrapper);

console.log('UMD版本已生成:', umdPath);