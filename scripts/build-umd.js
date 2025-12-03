import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  // 确保UMD目录存在
  const umdDir = path.join(process.cwd(), 'dist', 'umd');
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