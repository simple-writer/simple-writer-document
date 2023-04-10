# Welcome to Simple Writer，一个简洁、强大、美观的Markdown写作软件！

## 前言

我是陈思全，是Simple Writer的开发者，也是一个博客站长。

我时常需要写一些博客文章，由于我使用Hexo搭建我的博客，所有文章自然是Markdown格式，但在VSCode中写代码可以，但写文章，我总感觉少了点什么。

于是，我按照我自己的喜好，使用我擅长的网页技术制作了这款Markdown写作软件——**Simple Writer**

> 海内存知己，天涯若比邻。

## Simple Writer 的特点

现在的Simple Writer还是开发版本，许多我准备做的特性还没有，但截至v0.5.5，已经实现了以下特点：

- 全自动保存，网页每隔三分钟自动保存文档内容，切换文档时自动保存文档内容，关闭网页时自动保存文档内容，你当然可以`Ctrl+S`手动保存
- 个性化丰富，内置柔和/暗黑/亮白/酷黑四种主题，和11种主题色，更有护眼模式，在深夜里保护你的眼睛。
- 支持开启/关闭行号。
- 高亮当前段落。
- 内容全部在本地缓存，完全隐私保护。（该缓存为浏览器内部缓存，一般不删浏览器，数据永远不会丢失，限制大小为5M）
  ~5M=5000000字，一般人写不完~
- 对Markdown解析专业度高，支持TOC目录、FlowChart流程图、Sequence Diagrams、Katex数学公式
- 界面精心布局，每一个按钮和控件都精心打磨

## 使用技巧

- 点击左上角的`Simple Writer`字样，即可打开主菜单
- 将鼠标放在标题栏下方一点会显示工具栏，点一下`📌`工具栏锁定
- `Ctrl+S`保存

## Simple Writer的制作需要以下这些

- CodeMirror 一个开源的网页代码编辑器
- github-markdown-css Github的Markdown渲染样式
- marked.js Markdown解析核心库
- katex.js 数学公式
- flowchart.js 流程图
- js-sequence-diagram
- Font Awesome 矢量图标库
- HighLight.js 代码高亮
- [Clear Writer](https://clearwriter.gitee.io/) 灵感来源