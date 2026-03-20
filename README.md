# Vibe Coding 教程网站

一个关于 Vibe Coding（AI 辅助编程）的教程网站，从原理到实践的完整指南。

## 📁 项目结构

```
vibe_coding/
├── website/
│   ├── index.html              # 主页
│   ├── content/                # 📝 教程内容目录
│   │   ├── part1.md            # 第一部分：技术原理
│   │   ├── part2.md            # 第二部分：工具实践
│   │   ├── part3.md            # 第三部分：方法论
│   │   └── part4.md            # 第四部分：实战项目
│   ├── pages/
│   │   ├── part1.html          # 动态加载页面
│   │   ├── part2.html
│   │   ├── part3.html
│   │   └── part4.html
│   ├── js/
│   │   ├── main.js             # 主交互脚本
│   │   └── content-loader.js   # Markdown 动态加载器
│   ├── css/
│   │   └── style.css           # 赛博朋克样式
│   └── assets/                 # 图片等资源
├── netlify.toml                # Netlify 配置
└── start-website.bat           # 本地启动脚本（Windows）
```

---

## ✨ 功能特点

1. **内容分离**：教程内容独立为 Markdown 文件
2. **动态加载**：网页自动加载并渲染 Markdown
3. **Git 管理**：版本控制已配置
4. **赛博朋克风格**：现代化前端设计
5. **代码高亮**：代码块支持语法高亮和复制
6. **响应式设计**：支持各种设备

---

## 🚀 本地开发

### Windows 用户

双击运行 `start-website.bat` 即可启动本地服务器。

### 手动启动

```bash
cd website
python -m http.server 8000
```

然后在浏览器打开：`http://localhost:8000`

---

## 📝 编辑内容

### 修改教程内容

1. 编辑 `website/content/` 目录下的 Markdown 文件
2. 刷新浏览器即可看到本地变化
3. 提交到 GitHub 部署到线上

### 编辑示例

编辑 `website/content/part1.md`：

```markdown
---
title: "第一部分：Vibe Coding 的技术原理"
description: "理解AI为什么能写代码"
order: 1
tags: ["AI", "LLM", "编程"]
---

# 新的标题内容

这里是正文...
```

### 添加新章节

1. 在 `website/content/` 创建 `part5.md`
2. 在 `website/pages/` 创建 `part5.html`
3. 在导航栏添加链接

---

## 📤 部署到线上

### 自动部署（推荐）

项目已连接到 Netlify，推送代码后自动部署：

```bash
git add .
git commit -m "更新内容"
git push
```

访问：https://vibe-coding-plan.netlify.app

### GitHub Pages

1. 访问 GitHub 仓库设置
2. 启用 GitHub Pages
3. 选择 `website` 目录作为发布源
4. 保存

---

## 🔧 技术细节

### Markdown 渲染

- 使用自定义 JavaScript 解析器（`content-loader.js`）
- 支持：标题、列表、代码块、链接、图片等
- 自动解析 frontmatter（元数据）

### 工作流程

```
编辑 Markdown → Git commit → Push 到 GitHub
                              ↓
                      Netlify 自动部署
                              ↓
                      新内容上线 ✅
```

---

## 📚 常见问题

### Q: 本地编辑后看不到变化？
A: 确保使用了 HTTP 服务器（如 `python -m http.server`），而不是直接打开 HTML 文件。

### Q: 如何备份内容？
A: 内容都在 `website/content/` 目录，Git 会自动版本控制。

### Q: 部署需要多长时间？
A: Netlify 通常在 1-2 分钟内完成部署。

---

## 📞 相关资源

- [OpenAI 文档](https://platform.openai.com/docs)
- [Anthropic 文档](https://docs.anthropic.com)
- [GitHub Copilot](https://docs.github.com/copilot)

---

**祝你使用愉快！🚀**
