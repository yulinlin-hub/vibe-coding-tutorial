# 🚀 部署指南 - 从本地到线上

## 📋 当前状态

✅ **已完成**
- Git 仓库已初始化
- 首次提交已完成（包含所有文件）
- 动态内容管理系统已搭建
- Markdown 内容文件已创建
- CMS 配置已完成

---

## 🎯 下一步操作（3 步搞定线上网站）

### **第 1 步：推送到 GitHub**

#### 1.1 创建 GitHub 仓库

1. 打开浏览器，访问：https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `vibe-coding-tutorial`
   - **Description**: `Vibe Coding 教程 - 动态内容管理系统`
   - **Public** ✅ 或 **Private** ✅（都可以）
   - ❌ **不要**勾选 "Add a README file"
   - ❌ **不要**勾选 "Add .gitignore"
3. 点击 "Create repository"

#### 1.2 推送代码到 GitHub

打开命令行（CMD 或 PowerShell），在项目目录执行：

```bash
# 替换 YOUR_USERNAME 为你的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/vibe-coding-tutorial.git

# 推送代码
git branch -M main
git push -u origin main
```

**如果提示输入密码**：
- 使用 GitHub Personal Access Token（不是账号密码）
- 获取方式：GitHub → Settings → Developer settings → Personal access tokens

---

### **第 2 步：部署到 Netlify**

#### 2.1 注册 Netlify

1. 访问：https://app.netlify.com/start
2. 点击 "Sign up" 或 "Login with GitHub"
3. 授权 Netlify 访问你的 GitHub

#### 2.2 导入项目

1. 在 Netlify 点击 **"Add new site"** → **"Import an existing project"**
2. 选择 **"Deploy with GitHub"**
3. 找到并选择 `vibe-coding-tutorial` 仓库
4. 点击 **"Import"**

#### 2.3 配置构建设置

在配置页面填写：

| 设置项 | 值 |
|--------|-----|
| **Branch to deploy** | `main` |
| **Build command** | 留空（不填） |
| **Publish directory** | `website` |

其他选项保持默认，点击 **"Deploy site"**

#### 2.4 等待部署

- Netlify 会自动构建和部署
- 大约需要 30 秒 - 1 分钟
- 完成后会显示：**"Published"**

#### 2.5 记录你的网站地址

部署成功后，Netlify 会给你一个随机地址，例如：
- `https://amazing-pudding-123456.netlify.app`

稍后可以修改为自定义域名。

---

### **第 3 步：启用 Decap CMS 管理后台**

#### 3.1 启用 Identity

1. 在 Netlify 项目页面，点击 **"Site settings"**
2. 左侧菜单找到 **"Identity"**
3. 点击 **"Enable Identity"**
4. 选择注册方式：
   - **Recommended**: "Invite only"（仅邀请）
   - 或 "Email"（邮箱注册）
5. 点击 **"Save"**

#### 3.2 启用 Git Gateway

1. 还是在 **"Identity"** 页面
2. 点击 **"Git Gateway"** 选项卡
3. 点击 **"Enable Git Gateway"**
4. **这一步很重要**：它允许 CMS 通过 Git 修改内容

#### 3.3 注册管理员账号

1. 访问：`https://你的站点.netlify.app/admin/`
   - 例如：`https://amazing-pudding-123456.netlify.app/admin/`
2. 点击 **"Sign up"**
3. 填写邮箱和密码
4. 完成注册

**恭喜！你现在可以使用可视化编辑器了！**

---

## 🎨 使用 CMS 编辑内容

### 访问管理后台

```
https://你的站点.netlify.app/admin/
```

### 编辑流程

1. **登录** → 用你注册的账号
2. **选择章节** → 点击要编辑的部分
3. **编辑内容** → 在富文本编辑器中修改
4. **保存** → 点击 "Save"
5. **发布** → 点击 "Publish"

### 自动部署流程

```
你在 CMS 保存
    ↓
自动提交到 GitHub
    ↓
Netlify 检测到更新
    ↓
自动重新构建
    ↓
新内容上线 ✅
```

通常需要 30-60 秒。

---

## 📝 编辑技巧

### 修改标题和描述

在 CMS 编辑器中修改 frontmatter：

```yaml
---
title: "新标题"
description: "新描述"
tags: ["标签1", "标签2"]
---
```

### 编辑正文

使用 Markdown 语法：

```markdown
## 二级标题

这是段落内容。

- 列表项 1
- 列表项 2

**粗体** 和 *斜体*

`inline code`

代码块：

```python
print("Hello World")
```
```

---

## 🔧 常见问题

### Q1: GitHub 推送失败？

**A**: 检查以下几点：
1. 是否创建了 GitHub 仓库？
2. 是否替换了 `YOUR_USERNAME`？
3. 是否需要 Personal Access Token？

```bash
# 检查远程仓库
git remote -v

# 重新设置
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/vibe-coding-tutorial.git
```

### Q2: Netlify 部署失败？

**A**: 检查：
1. **Publish directory** 是否设置为 `website`？
2. **Build command** 是否留空？
3. 仓库是否包含 `website/` 目录？

### Q3: CMS 登录失败？

**A**: 确保：
1. Netlify Identity 已启用
2. Git Gateway 已启用
3. 访问正确的 URL：`/admin/`

### Q4: 内容修改后不显示？

**A**：
1. 在 CMS 检查状态是否为 "Published"
2. 等待 Netlify 重新部署（30-60秒）
3. 清除浏览器缓存并刷新

### Q5: 本地编辑如何同步？

**A**:
```bash
# 编辑 website/content/*.md 文件
git add .
git commit -m "更新内容"
git push
```

Netlify 会自动部署。

---

## 🎁 完成后你将拥有

✅ 一个在线的教程网站
✅ 可视化内容编辑器（无需写代码）
✅ 自动版本控制（所有修改都有记录）
✅ 自动部署（保存即上线）
✅ 免费 HTTPS 域名
✅ 赛博朋克风格设计

---

## 📚 下一步

1. **自定义域名**（可选）
   - 在 Netlify → Domain settings
   - 添加自定义域名或购买域名

2. **邀请协作者**（可选）
   - Netlify Identity → "Invite users"
   - 让朋友一起编辑内容

3. **添加更多内容**
   - 直接在 CMS 中创建新章节
   - 或手动添加 `part5.md` 等

---

## 🆘 需要帮助？

- **GitHub 支持**: https://docs.github.com/
- **Netlify 支持**: https://docs.netlify.com/
- **Decap CMS 文档**: https://decapcms.org/docs/

---

**现在就开始吧！30 分钟后你就能拥有自己的在线教程网站！** 🚀
