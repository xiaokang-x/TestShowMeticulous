const { join } = require('path');

/**
 * Puppeteer 配置文件
 * 用于在 CI 环境中禁用 Chrome sandbox
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  launch: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  }
};
