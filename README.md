# Vibe Coding 教程 - 动态内容管理系统

## 🎉 系统已完成搭建！

你现在拥有一个完整的**动态内容管理系统**，前端和内容完全分离。

---

## 📁 项目结构

```
vibe_coding/
├── website/
│   ├── index.html              # 主页
│   ├── admin/
│   │   ├── config.yml          # Decap CMS 配置
│   │   └── index.html          # CMS 管理界面
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
│   │   └── content-loader.js   # 🆕 Markdown 动态加载器
│   └── css/
│       └── style.css           # 赛博朋克样式
└── .git/                       # Git 版本控制
```

---

## ✨ 当前功能

### ✅ 已实现
1. **内容分离**：教程内容独立为 Markdown 文件
2. **动态加载**：网页自动加载并渲染 Markdown
3. **Git 管理**：版本控制已配置
4. **赛博朋克风格**：原有前端设计保持不变
5. **代码高亮**：代码块支持语法高亮和复制
6. **响应式设计**：支持各种设备

### 🔄 下一步（需要你操作）

---

## 🚀 接下来的步骤

### **步骤 1：测试本地运行**

```bash
cd website
python -m http.server 8000
```

然后在浏览器打开：`http://localhost:8000`

尝试访问：
- http://localhost:8000/pages/part1.html
- http://localhost:8000/pages/part2.html
- http://localhost:8000/pages/part3.html
- http://localhost:8000/pages/part4.html

**检查**：内容是否正确加载显示？

---

### **步骤 2：推送到 GitHub**

#### 2.1 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名称：`vibe-coding-tutorial`
3. 设为**公开**（Public）或**私有**（Private）
4. **不要**勾选 "Add a README file"
5. 点击 "Create repository"

#### 2.2 推送代码

在项目目录执行：

```bash
# 添加所有文件
git add .

# 首次提交
git commit -m "Initial commit: Dynamic content management system with Decap CMS"

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/vibe-coding-tutorial.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

---

### **步骤 3：部署到 Netlify**

#### 3.1 注册 Netlify
1. 访问 https://www.netlify.com
2. 用 GitHub 账号登录

#### 3.2 导入项目
1. 点击 "Add new site" → "Import an existing project"
2. 选择 GitHub 上的 `vibe-coding-tutorial` 仓库
3. 配置构建设置：
   - **Build command**: 留空（静态网站不需要构建）
   - **Publish directory**: `website`
   - 点击 "Deploy site"

#### 3.3 启用 Decap CMS
1. 在 Netlify 项目中，点击 "Site settings"
2. 找到 "Identity" → "Enable Identity"
3. 找到 "Git Gateway" → "Enable Git Gateway"
4. **重要**：注册第一个管理员账号

#### 3.4 访问 CMS
1. 访问：`https://你的站点.netlify.app/admin/`
2. 用你注册的账号登录
3. **开始可视化编辑内容！**

---

## 📝 如何修改教程内容

### **方式 1：使用 Decap CMS（推荐）**

1. 访问 `https://你的站点.netlify.app/admin/`
2. 登录后看到管理界面
3. 点击要修改的章节
4. 在编辑器中修改内容
5. 点击"保存"
6. 内容自动提交到 GitHub
7. Netlify 自动重新部署
8. ✨ 新内容自动上线！

### **方式 2：直接编辑 Markdown 文件**

直接编辑 `website/content/part*.md` 文件，然后：

```bash
git add .
git commit -m "更新教程内容"
git push
```

Netlify 会自动检测并重新部署。

---

## 🎯 内容编辑示例

### 修改标题和描述

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

## 🔧 技术细节

### Markdown 渲染
- 使用自定义 JavaScript 解析器（`content-loader.js`）
- 支持：标题、列表、代码块、链接、图片等
- 自动解析 frontmatter（元数据）

### Git 工作流
```
修改内容 → Git commit → Push 到 GitHub
                                ↓
                        Netlify 检测更新
                                ↓
                        自动重新部署
                                ↓
                        新内容上线 ✅
```

---

## 📚 常见问题

### Q: 本地编辑后看不到变化？
A: 确保使用了 HTTP 服务器（如 `python -m http.server`），而不是直接打开 HTML 文件。

### Q: CMS 登录失败？
A: 确保在 Netlify 的 Identity 中启用了 Git Gateway。

### Q: 如何备份内容？
A: 内容都在 `website/content/` 目录，Git 会自动版本控制。

---

## 🎁 你现在可以做什么

✅ 随时修改教程内容（Markdown 文件）
✅ 使用可视化 CMS 编辑
✅ 所有修改自动版本控制
✅ 一键部署到线上
✅ 保留原有赛博朋克设计
✅ 内容和前端完全分离

---

## 📞 需要帮助？

- Decap CMS 文档：https://decapcms.org/docs/
- Netlify 文档：https://docs.netlify.com/
- GitHub 文档：https://docs.github.com/

---

**祝你使用愉快！🚀**

现在你可以专注于内容创作，技术问题全部自动化！
