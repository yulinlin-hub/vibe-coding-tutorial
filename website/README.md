# Vibe Coding 教程网站

一个完整的 Vibe Coding 教程网站，包含从原理到实践的全部内容。

## 📁 项目结构

```
website/
├── index.html          # 首页
├── css/
│   └── style.css      # 主样式文件
├── js/
│   └── main.js        # JavaScript 文件
├── pages/
│   ├── part1.html     # 第一部分：技术原理
│   ├── part2.html     # 第二部分：工具实践
│   ├── part3.html     # 第三部分：方法论
│   └── part4.html     # 第四部分：实战项目
└── assets/            # 静态资源（可选）
```

## 🚀 快速开始

### 方法 1：直接打开

1. 双击 `index.html` 文件在浏览器中打开

### 方法 2：本地服务器（推荐）

```bash
cd website
python -m http.server 8080
```

然后在浏览器中访问：http://localhost:8080

### 方法 3：使用 Live Server（VS Code）

1. 安装 "Live Server" 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

## ✨ 特性

- 🎨 **现代化设计**：渐变色彩，流畅动画
- 📱 **响应式布局**：支持各种屏幕尺寸
- 🗂️ **完整导航**：顶部导航栏 + 页面内导航
- 🔍 **搜索功能**：快速查找内容
- 📊 **进度条**：显示阅读进度
- ⬆️ **返回顶部**：便捷的返回顶部按钮
- 🎯 **代码高亮**：美观的代码块展示
- 💡 **信息提示**：Tip、Warning、Info、Success 信息框

## 📚 内容结构

### 首页
- 英雄区介绍
- 特色功能展示
- 课程大纲
- 学习路径

### 第一部分：技术原理
- LLM 基础
- 代码补全 vs 代码生成
- Agent 技术
- RAG 应用

### 第二部分：工具实践
- 工具分类体系
- 核心功能解析
- 多工具协同工作流

### 第三部分：方法论
- 提示词工程
- 五步核心工作流
- 进阶技巧

### 第四部分：实战项目
- 项目选择建议
- 分阶段实现
- 完整项目总结

## 🎨 自定义

### 修改颜色主题

在 `css/style.css` 中修改 CSS 变量：

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* ... 其他颜色 */
}
```

### 添加新页面

1. 在 `pages/` 目录创建新的 HTML 文件
2. 复制现有页面的结构
3. 在导航栏中添加链接
4. 更新内容

## 📱 浏览器支持

- Chrome（推荐）
- Firefox
- Safari
- Edge

## 🛠️ 技术栈

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome（图标）

## 📄 许可证

MIT License

## 👥 贡献

欢迎提交问题和改进建议！

---

**祝你学习愉快！🚀**
