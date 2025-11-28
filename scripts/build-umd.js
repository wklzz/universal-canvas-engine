const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // 确保UMD目录存在
  const umdDir = path.join(__dirname, '..', 'dist', 'umd');
  if (!fs.existsSync(umdDir)) {
    fs.mkdirSync(umdDir, { recursive: true });
  }
  
  // 使用Rollup配置文件构建UMD版本
  execSync('npx rollup -c', { stdio: 'inherit' });
  
  console.log('UMD build completed successfully');
} catch (error) {
  console.error('UMD build failed:', error.message);
  process.exit(1);
}