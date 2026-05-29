# AI 工具导航站

一个现代化的 AI 工具聚合导航网站，收录 70+ 优质 AI 工具，支持分类筛选和实时搜索。

## 在线预览

[https://WadePan1017.github.io/ai-tools-site/](https://WadePan1017.github.io/ai-tools-site/)

## 技术栈

- **框架：** Vue 3 + Composition API
- **构建工具：** Vite
- **样式：** Tailwind CSS
- **状态管理：** Pinia
- **路由：** Vue Router
- **部署：** GitHub Pages

## 功能特性

- 8 大分类覆盖：聊天对话、图像生成、视频生成、编程开发、设计工具、办公效率、音频处理、其他工具
- 实时搜索，输入即过滤
- 分类标签筛选
- 响应式布局，适配移动端
- 工具卡片展示：图标、名称、简介、分类标签

## 项目亮点

- 使用 Claude Code 辅助开发，提升组件搭建与样式调试效率
- 组件化架构：Card、SearchBar、CategoryTabs 等独立组件
- 数据驱动：工具数据与展示逻辑分离，便于扩展
- 响应式适配：Tailwind 断点覆盖手机、平板、桌面

## 本地运行

```bash
# 克隆项目
git clone https://github.com/WadePan1017/ai-tools-site.git
cd ai-tools-site

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 组件
│   ├── ToolCard.vue
│   ├── SearchBar.vue
│   └── CategoryTabs.vue
├── data/            # 工具数据
├── stores/          # Pinia 状态管理
├── views/           # 页面视图
├── App.vue
└── main.js
```

## 联系方式

- GitHub: [WadePan1017](https://github.com/WadePan1017)
- 邮箱: 2455177610@qq.com
