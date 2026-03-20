// ==================== CONTENT LOADER - DYNAMIC MARKDOWN RENDERING ====================

// 配置：内容文件路径
const CONTENT_PATH = '../content/';
const CONTENT_FILES = [
    { id: 'part1', file: 'part1.md', title: '技术原理' },
    { id: 'part2', file: 'part2.md', title: '工具实践' },
    { id: 'part3', file: 'part3.md', title: '方法论' },
    { id: 'part4', file: 'part4.md', title: '实战项目' }
];

// 当前加载的内容
let currentContent = null;

/**
 * 从 URL 获取当前页面部分
 */
function getCurrentPartFromURL() {
    const path = window.location.pathname;
    const match = path.match(/part(\d)\.html/);
    return match ? `part${match[1]}` : null;
}

/**
 * 加载 Markdown 文件
 */
async function loadMarkdownFile(filename) {
    try {
        // 添加时间戳防止缓存
        const timestamp = new Date().getTime();
        const url = `${CONTENT_PATH}${filename}?v=${timestamp}`;
        console.log('正在加载文件:', url);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        console.log('✅ 文件加载成功，长度:', text.length);
        return text;
    } catch (error) {
        console.error('❌ 加载 Markdown 文件失败:', error);
        console.error('请求路径:', CONTENT_PATH + filename);
        console.error('当前页面路径:', window.location.pathname);
        return null;
    }
}

/**
 * 解析 frontmatter (YAML 格式)
 */
function parseFrontmatter(markdown) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    if (match) {
        const metadata = {};
        const lines = match[1].split('\n');

        lines.forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();

                // 处理数组和字符串
                if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.slice(1, -1).split(',').map(v => v.trim().replace(/"/g, ''));
                } else {
                    value = value.replace(/["']/g, '');
                }

                metadata[key] = value;
            }
        });

        return {
            metadata,
            content: match[2]
        };
    }

    return {
        metadata: {},
        content: markdown
    };
}

/**
 * 将 Markdown 转换为 HTML
 */
function renderMarkdown(markdown) {
    // 解析 frontmatter
    const { metadata, content } = parseFrontmatter(markdown);

    // 简单的 Markdown 解析器
    let html = content
        // 转义 HTML
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

        // 代码块 (```language\ncode\n```)
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            return `<div class="code-block">
                <div class="code-header">
                    <span class="code-language">${lang || 'code'}</span>
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                </div>
                <pre class="code-content"><code class="language-${lang || 'text'}">${code.trim()}</code></pre>
            </div>`;
        })

        // 行内代码 (`code`)
        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')

        // 标题 (# ## ### #### ##### ######)
        .replace(/^######\s+(.+)$/gm, '<h6>$1</h6>')
        .replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>')
        .replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
        .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
        .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
        .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')

        // 粗体和斜体
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/___(.+?)___/g, '<strong><em>$1</em></strong>')
        .replace(/__(.+?)__/g, '<strong>$1</strong>')
        .replace(/_(.+?)_/g, '<em>$1</em>')

        // 无序列表
        .replace(/^\s*[-*+]\s+(.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')

        // 有序列表
        .replace(/^\s*\d+\.\s+(.+)$/gm, '<oli>$1</oli>')
        .replace(/(<oli>.*<\/oli>\n?)+/g, (match) => {
            let index = 1;
            return '<ol>' + match.replace(/<oli>(.*?)<\/oli>/g, () => `<li>${index++}</li>`) + '</ol>';
        })

        // 引用块
        .replace(/^&gt;\s+(.+)$/gm, '<blockquote>$1</blockquote>')

        // 水平线
        .replace(/^---$/gm, '<hr>')

        // 链接
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')

        // 图片
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')

        // 段落
        .replace(/^([^<\n].+)$/gm, '<p>$1</p>')

        // 清理空段落
        .replace(/<p>\s*<\/p>/g, '')

        // 清理嵌套
        .replace(/<\/p><(h[1-6]|ul|ol|blockquote|hr)/g, '</p><$1')
        .replace(/<(\/h[1-6]|\/ul|\/ol|\/blockquote)><p>/g, '<$1><p>');

    return { metadata, html };
}

/**
 * 渲染内容到页面
 */
function renderContentToPage(metadata, html) {
    const contentContainer = document.getElementById('content-container');
    if (!contentContainer) {
        console.error('Content container not found');
        return;
    }

    // 更新页面标题
    if (metadata.title) {
        document.title = metadata.title + ' - Vibe Coding 教程';
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = metadata.title;
        }
    }

    // 更新描述
    if (metadata.description) {
        const pageDescription = document.getElementById('page-description');
        if (pageDescription) {
            pageDescription.textContent = metadata.description;
        }
    }

    // 渲染内容
    contentContainer.innerHTML = html;

    // 添加标签
    if (metadata.tags && metadata.tags.length > 0) {
        const tagsContainer = document.getElementById('tags-container');
        if (tagsContainer) {
            tagsContainer.innerHTML = metadata.tags.map(tag =>
                `<span class="tag">#${tag}</span>`
            ).join('');
        }
    }

    // 重新初始化交互功能
    if (typeof initCodeInteractions === 'function') {
        initCodeInteractions();
    }

    // 添加滚动动画
    document.querySelectorAll('#content-container h1, #content-container h2, #content-container h3').forEach(el => {
        el.classList.add('fade-in-up');
    });

    if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
    }
}

/**
 * 加载并渲染内容
 */
async function loadContent(partId) {
    const contentInfo = CONTENT_FILES.find(c => c.id === partId);
    if (!contentInfo) {
        console.error('Content part not found:', partId);
        return;
    }

    // 显示加载状态
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) {
        contentContainer.innerHTML = '<div class="loading">正在加载内容...</div>';
    }

    // 加载 Markdown
    const markdown = await loadMarkdownFile(contentInfo.file);
    if (!markdown) {
        contentContainer.innerHTML = `
            <div class="error" style="padding: 20px; background: rgba(255, 0, 0, 0.1); border: 1px solid #ff0055; border-radius: 8px; color: #ff0055;">
                <h3>❌ 内容加载失败</h3>
                <p><strong>尝试加载的文件：</strong>${CONTENT_PATH}${contentInfo.file}</p>
                <p><strong>当前页面：</strong>${window.location.pathname}</p>
                <p><strong>请确保：</strong></p>
                <ul>
                    <li>使用 HTTP 服务器运行（如 python -m http.server）</li>
                    <li>不是直接双击 HTML 文件打开</li>
                    <li>Markdown 文件存在于 website/content/ 目录</li>
                </ul>
                <p><strong>按 F12 打开控制台查看详细错误信息</strong></p>
            </div>
        `;
        return;
    }

    // 渲染内容
    const { metadata, html } = renderMarkdown(markdown);
    renderContentToPage(metadata, html);
    currentContent = { id: partId, metadata };
}

/**
 * 复制代码块
 */
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('.code-content');
    const text = code.textContent;

    navigator.clipboard.writeText(text).then(() => {
        button.textContent = '已复制!';
        setTimeout(() => {
            button.textContent = '复制';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code:', err);
    });
}

/**
 * 初始化内容加载器
 */
function initContentLoader() {
    const currentPart = getCurrentPartFromURL();

    if (currentPart) {
        loadContent(currentPart);
    }
}

// 页面加载时初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContentLoader);
} else {
    initContentLoader();
}

// 导出到全局
window.loadContent = loadContent;
window.copyCode = copyCode;
