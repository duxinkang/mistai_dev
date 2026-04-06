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

## 邮箱表单配置

当前项目已接入 `Web3Forms`，适合 GitHub Pages 这类纯静态站点。

官方文档：

- https://docs.web3forms.com/
- https://docs.web3forms.com/getting-started/installation
- https://docs.web3forms.com/how-to-guides/js-frameworks/react-js/simple-react-contact-form

配置步骤：

1. 打开 `https://web3forms.com/`
2. 用你的邮箱 `d541449473@gmail.com` 创建 Access Key
3. 在 GitHub 仓库里进入 `Settings -> Secrets and variables -> Actions`
4. 新建一个 Repository Secret：
   `WEB3FORMS_ACCESS_KEY=你的_access_key`
5. 重新运行 GitHub Pages 部署工作流，或重新 push 一次

本地开发可使用：

```bash
cp .env.example .env.local
```

然后把 `.env.local` 里的 `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` 改成你的真实 key。

## 项目结构

```text
app/                  Next App Router 页面与样式
components/           页面组件
lib/                  站点数据
public/               图片、视频等静态资源
.github/workflows/    GitHub Pages 自动部署工作流
```
