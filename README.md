# MIST Ai

MIST Ai 的品牌官网源码，基于 Next.js 16、React 19、Tailwind CSS 4 构建。

## 本地开发

```bash
npm install
npm run dev
```

默认访问地址：

`http://127.0.0.1:4173/`

## 生产构建

```bash
npm run build
```

当前项目使用 `output: "export"`，构建产物会输出到 `out/`，适合部署到 GitHub Pages 这类静态托管平台。

## GitHub Pages 部署

仓库已包含 GitHub Actions 工作流：

`/.github/workflows/deploy-pages.yml`

工作流会在 `main` 分支更新后自动执行，构建静态站并发布到 GitHub Pages。

建议在 GitHub 仓库设置中确认：

1. `Settings -> Pages`
2. `Build and deployment -> Source`
3. 选择 `GitHub Actions`

部署地址通常为：

`https://duxinkang.github.io/mistai_dev/`

## 表单说明

由于 GitHub Pages 是静态托管，项目中的联系表单采用纯前端提交逻辑：

- 先进行字段校验
- 提交成功后把数据保存到当前浏览器的 `localStorage`
- 不会自动写入服务器数据库

如果要接入真实线索收集，建议后续对接：

- Formspree
- Basin
- 自建 API
- 飞书 / 企业微信 webhook

## 项目结构

```text
app/                  Next App Router 页面与样式
components/           页面组件
lib/                  站点数据
public/               图片、视频等静态资源
.github/workflows/    GitHub Pages 自动部署工作流
```
