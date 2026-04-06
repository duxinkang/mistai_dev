export const navItems = [
  { label: "服务", href: "#services" },
  { label: "客户", href: "#customers" },
  { label: "合作流程", href: "#process" },
  { label: "关于我们", href: "#about" },
] as const;

export const hero = {
  titlePrefix: "从",
  titleFocus: "AI 原生",
  titleSuffix: "出发，定义下一代产品",
  description: "我们为初创企业、出海业务加速构建尖端的人工智能解决方案。",
};

export const services = [
  {
    title: "AI/ML 战略&咨询",
    content:
      "若您有 AI 相关项目构想，我们可为您提供专业咨询，分享行业知识与经验，助您避开潜在风险与不必要的弯路。",
    icon: "/brain.png",
  },
  {
    title: "AI 方案的概念验证（POC）",
    content:
      "AI项目从想法到落地，POC是关键第一步。我们的技术专家会验证概念是否具备可行性。",
    icon: "/brain1.png",
  },
  {
    title: "AI 产品的 MVP",
    content:
      "想做突破性 AI 产品？我们能快速推出功能适中的初始版本，契合早期客户需求，同时更好地向投资人展示产品价值。",
    icon: "/robot.png",
  },
  {
    title: "定制模型开发",
    content:
      "我们可以根据您的业务需求构建和训练定制模型，或者重新训练您现有的模型（开源和专有），以调高效率和可拓展性。",
    icon: "/moxingfen.png",
  },
  {
    title: "AI 应用程序开发",
    content:
      "若您需要从0到1构建创新的Web/移动应用，或者为现有应用加AI功能，我们提供专业服务。",
    icon: "/ruanjiandingzhi.png",
  },
  {
    title: "AIGC 内容开发",
    content:
      "若您有内容生成需求，无论是文案、图片、音频、视频或者代码，我们提供高质量的输出结果。",
    icon: "/zhinengsuanfa.png",
  },
] as const;

export const customers = [
  {
    title: "娲灵 AI",
    tags: ["官网/web平台"],
    subtitle: "亮相Inclusion 外滩大会2025",
    description: "组建一支高要求团队，从0-1构建娲灵AI完整的产品体系，快速取得切实的成果",
    image: "/customer/customer1.png",
  },
  {
    title: "植语 AI",
    tags: ["移动应用"],
    subtitle: "种子轮获近千万融资",
    description: "从环境感知、拟人对话、灵活动效维度全面升级，打造丝滑流畅的产品体验。",
    image: "/customer/customer2.png",
  },
] as const;

export const processSteps = [
  {
    title: "沟通需求",
    tags: ["了解基本需求", "客户资源分配", "定期回访"],
    image: "/service/1.png",
  },
  {
    title: "签订合同",
    tags: ["可行性验证方案", "框定服务范围", "敲定项目排期"],
    image: "/service/2.png",
  },
  {
    title: "原型设计",
    tags: ["项目组成立", "头脑风暴", "产品需求原型", "UI 界面设计", "详细实施方案"],
    image: "/service/3.png",
  },
  {
    title: "需求确认",
    tags: ["设计原型交付", "客户反馈修改", "确定需求", "进入开发"],
    image: "/service/4.png",
  },
  {
    title: "开发编码",
    tags: ["前端开发", "交互体验改进", "前端阶段验收", "数据库设计", "后台功能搭建"],
    image: "/service/5.png",
  },
  {
    title: "测试验收",
    tags: ["BUG 修改", "数据测试", "性能测试", "项目评审", "项目总结"],
    image: "/service/6.png",
  },
  {
    title: "售后交付培训",
    tags: ["源代码交付", "部署文档", "使用帮助文档", "功能演示讲解", "部署演示讲解"],
    image: "/service/7.png",
  },
  {
    title: "使用反馈",
    tags: ["售后服务", "BUG 终身维护", "赠送免费运维服务", "定期回访"],
    image: "/service/8.png",
  },
] as const;

export const teamMembers = [
  { name: "Parker", role: "CEO", image: "/about/1.png" },
  { name: "Town", role: "CTO", image: "/about/2.png" },
  { name: "Shaw", role: "项目总监", image: "/about/3.png" },
  { name: "Sam", role: "桌面应用总监", image: "/about/4.png" },
  { name: "Joe", role: "移动应用总监", image: "/about/5.png" },
] as const;

export const techStacks = [
  {
    title: "应用层",
    columns: [
      ["RAG 类应用", "企业知识库"],
      ["Agent 类应用", "多智能体、财务分析", "合同对比、差旅助手"],
      ["OLTP 类应用", "智能客服、企业级文本优化助手"],
      ["OLAP 类应用", "企业级报告生成", "NLP2SQL BI 可视化系统"],
    ],
  },
  {
    title: "能力层",
    columns: [["文字生成"], ["音频生成"], ["图像生成"], ["视频生成"], ["文档生成"], ["策略生成"], ["数字人生"], ["混合生成"]],
  },
  {
    title: "应用技术层",
    columns: [
      ["Agent/智能体"],
      ["RAG/检索增强生成", "Prompt/提示词工程"],
      ["Fine-tuning/微调", "COT/思维链"],
      ["数据抓取", "数据清洗"],
      ["数据向量", "访问控制"],
    ],
  },
  {
    title: "模型层",
    columns: [
      ["大型语言模型(LLM)"],
      ["视觉-语言模型", "语音-语言模型"],
      ["图片识别 OCR 模型", "召回、排序小模型"],
      ["智能文档理解模型", "多模态检测与分割模型"],
    ],
  },
  {
    title: "云原生层",
    columns: [["Docker"], ["K8s"]],
  },
  {
    title: "基础设施层",
    columns: [["GPU/TPU/昇腾"], ["CPU"], ["RAM"], ["HDD"], ["Network"]],
  },
] as const;
