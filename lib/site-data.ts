export type Locale = "zh" | "en";

export const navHrefs = {
  services: "#services",
  customers: "#customers",
  process: "#process",
  about: "#about",
  contact: "#contact",
} as const;

export const localeLabels: Record<Locale, string> = {
  zh: "中文",
  en: "EN",
};

export const siteCopy = {
  zh: {
    metaDescription: "从 AI 原生出发，定义下一代产品。",
    navItems: [
      { label: "服务", href: navHrefs.services },
      { label: "客户", href: navHrefs.customers },
      { label: "合作流程", href: navHrefs.process },
      { label: "关于我们", href: navHrefs.about },
    ],
    header: {
      contact: "联系我们",
      openMenu: "打开菜单",
      closeMenu: "关闭菜单",
    },
    hero: {
      titlePrefix: "从",
      titleFocus: "AI 原生",
      titleSuffix: "出发，定义下一代产品",
      description: "我们为初创企业、出海业务加速构建尖端的人工智能解决方案。",
      viewServices: "查看服务",
      contactUs: "联系我们",
    },
    services: {
      title: "我们的服务",
      description: "我们期待与各类团队携手，攻克不同复杂程度的项目。通过合作，我们会打造全新系统、解决方案与产品，助您在竞争中脱颖而出。",
      items: [
        {
          title: "AI/ML 战略&咨询",
          content: "若您有 AI 相关项目构想，我们可为您提供专业咨询，分享行业知识与经验，助您避开潜在风险与不必要的弯路。",
          icon: "/brain.png",
        },
        {
          title: "AI 方案的概念验证（POC）",
          content: "AI项目从想法到落地，POC是关键第一步。我们的技术专家会验证概念是否具备可行性。",
          icon: "/brain1.png",
        },
        {
          title: "AI 产品的 MVP",
          content: "想做突破性 AI 产品？我们能快速推出功能适中的初始版本，契合早期客户需求，同时更好地向投资人展示产品价值。",
          icon: "/robot.png",
        },
        {
          title: "定制模型开发",
          content: "我们可以根据您的业务需求构建和训练定制模型，或者重新训练您现有的模型（开源和专有），以调高效率和可拓展性。",
          icon: "/moxingfen.png",
        },
        {
          title: "AI 应用程序开发",
          content: "若您需要从0到1构建创新的Web/移动应用，或者为现有应用加AI功能，我们提供专业服务。",
          icon: "/ruanjiandingzhi.png",
        },
        {
          title: "AIGC 内容开发",
          content: "若您有内容生成需求，无论是文案、图片、音频、视频或者代码，我们提供高质量的输出结果。",
          icon: "/zhinengsuanfa.png",
        },
      ],
    },
    customers: {
      title: "真实客户，真实影响",
      items: [
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
      ],
    },
    process: {
      title: "了解我们的服务流程",
      description: "丰富的互联网服务经验，让我们对项目实施的标准化有更多的理解。",
      items: [
        { title: "沟通需求", tags: ["了解基本需求", "客户资源分配", "定期回访"], image: "/service/1.png" },
        { title: "签订合同", tags: ["可行性验证方案", "框定服务范围", "敲定项目排期"], image: "/service/2.png" },
        { title: "原型设计", tags: ["项目组成立", "头脑风暴", "产品需求原型", "UI 界面设计", "详细实施方案"], image: "/service/3.png" },
        { title: "需求确认", tags: ["设计原型交付", "客户反馈修改", "确定需求", "进入开发"], image: "/service/4.png" },
        { title: "开发编码", tags: ["前端开发", "交互体验改进", "前端阶段验收", "数据库设计", "后台功能搭建"], image: "/service/5.png" },
        { title: "测试验收", tags: ["BUG 修改", "数据测试", "性能测试", "项目评审", "项目总结"], image: "/service/6.png" },
        { title: "售后交付培训", tags: ["源代码交付", "部署文档", "使用帮助文档", "功能演示讲解", "部署演示讲解"], image: "/service/7.png" },
        { title: "使用反馈", tags: ["售后服务", "BUG 终身维护", "赠送免费运维服务", "定期回访"], image: "/service/8.png" },
      ],
    },
    about: {
      title: "关于我们",
      description: "我们是AI Native的倡导者、远程协作的执行者以及友好人机互动的践行者。",
      members: [
        { name: "Parker", role: "CEO", image: "/about/1.png" },
        { name: "Town", role: "CTO", image: "/about/2.png" },
        { name: "Shaw", role: "项目总监", image: "/about/3.png" },
        { name: "Sam", role: "桌面应用总监", image: "/about/4.png" },
        { name: "Joe", role: "移动应用总监", image: "/about/5.png" },
      ],
    },
    tech: {
      title: "我们的AI技术栈",
      stacks: [
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
          columns: [["Agent/智能体"], ["RAG/检索增强生成", "Prompt/提示词工程"], ["Fine-tuning/微调", "COT/思维链"], ["数据抓取", "数据清洗"], ["数据向量", "访问控制"]],
        },
        {
          title: "模型层",
          columns: [["大型语言模型(LLM)"], ["视觉-语言模型", "语音-语言模型"], ["图片识别 OCR 模型", "召回、排序小模型"], ["智能文档理解模型", "多模态检测与分割模型"]],
        },
        {
          title: "云原生层",
          columns: [["Docker"], ["K8s"]],
        },
        {
          title: "基础设施层",
          columns: [["GPU/TPU/昇腾"], ["CPU"], ["RAM"], ["HDD"], ["Network"]],
        },
      ],
    },
    contact: {
      title: "开始合作",
      description: "欢迎直接通过电话、地址或微信二维码联系我们。",
      phoneLabel: "电话",
      addressLabel: "地址",
      qrLabel: "扫码添加",
      address: "杭州滨江山科智能大厦10楼迷雾智能",
      formTitle: "获取方案",
      formDescription: "完善您的信息，方便我们为您提供专业的业务方案",
      fields: {
        name: "姓名",
        phone: "电话",
        email: "邮箱",
        companyName: "公司名称",
      },
      placeholders: {
        name: "请输入姓名",
        phone: "请输入电话",
        email: "请输入邮箱",
        companyName: "请输入公司名称",
      },
      messages: {
        nameMin: "姓名至少为2个字符",
        invalidPhone: "请输入有效的手机号",
        companyMin: "公司名称至少为2个字符",
        invalidEmail: "请输入有效的邮箱",
        submitting: "提交中...",
        submit: "提交",
        success: "提交成功，我们会尽快通过邮件联系您。",
        failed: "提交失败，请稍后重试",
      },
    },
    footer: {
      privacy: "隐私政策",
      terms: "服务协议",
    },
  },
  en: {
    metaDescription: "Start from AI-native thinking and define the next generation of products.",
    navItems: [
      { label: "Services", href: navHrefs.services },
      { label: "Clients", href: navHrefs.customers },
      { label: "Process", href: navHrefs.process },
      { label: "About", href: navHrefs.about },
    ],
    header: {
      contact: "Contact",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      titlePrefix: "Build",
      titleFocus: "AI-native",
      titleSuffix: "products for the next generation",
      description: "We help startups and global teams build cutting-edge AI solutions faster and with stronger product execution.",
      viewServices: "View Services",
      contactUs: "Contact Us",
    },
    services: {
      title: "What We Do",
      description: "We work with ambitious teams across different levels of complexity. Together, we build new systems, solutions, and products that help you stand out in competitive markets.",
      items: [
        {
          title: "AI/ML Strategy & Advisory",
          content: "If you have an AI product idea, we provide strategic guidance, practical experience, and industry insight to help you avoid costly mistakes early.",
          icon: "/brain.png",
        },
        {
          title: "AI Proof of Concept (POC)",
          content: "A strong POC is the first critical step from idea to execution. Our technical team validates whether your concept is feasible and worth scaling.",
          icon: "/brain1.png",
        },
        {
          title: "AI MVP Development",
          content: "Want to launch a breakthrough AI product? We help you ship an early version quickly so you can validate demand and demonstrate value to investors.",
          icon: "/robot.png",
        },
        {
          title: "Custom Model Development",
          content: "We build or fine-tune custom models based on your business needs, whether you are using open-source or proprietary foundations.",
          icon: "/moxingfen.png",
        },
        {
          title: "AI Application Development",
          content: "From zero-to-one web and mobile products to AI capabilities inside existing software, we provide full-stack implementation support.",
          icon: "/ruanjiandingzhi.png",
        },
        {
          title: "AIGC Content Production",
          content: "If you need generated content for copy, images, audio, video, or code, we deliver practical and high-quality outputs.",
          icon: "/zhinengsuanfa.png",
        },
      ],
    },
    customers: {
      title: "Real Clients, Real Impact",
      items: [
        {
          title: "Waling AI",
          tags: ["Website / Web Platform"],
          subtitle: "Featured at Inclusion Bund Summit 2025",
          description: "We built a high-standard team and helped launch Waling AI from zero to one with a complete product system and measurable progress.",
          image: "/customer/customer1_en.png",
        },
        {
          title: "Zhiyu AI",
          tags: ["Mobile App"],
          subtitle: "Raised nearly RMB 10 million in seed funding",
          description: "We upgraded sensing, conversational interaction, and motion design to create a smoother and more human product experience.",
          image: "/customer/customer2_en.png",
        },
      ],
    },
    process: {
      title: "How We Work",
      description: "Years of internet product delivery experience have shaped a more standardized and execution-focused workflow.",
      items: [
        { title: "Discovery", tags: ["Understand core needs", "Allocate client resources", "Regular follow-up"], image: "/service/1.png" },
        { title: "Contracting", tags: ["Feasibility proposal", "Scope definition", "Timeline alignment"], image: "/service/2.png" },
        { title: "Prototype Design", tags: ["Project team setup", "Brainstorming", "Product prototype", "UI design", "Execution plan"], image: "/service/3.png" },
        { title: "Requirement Review", tags: ["Prototype delivery", "Client feedback", "Requirement sign-off", "Development kickoff"], image: "/service/4.png" },
        { title: "Development", tags: ["Frontend development", "Interaction refinement", "Frontend milestone review", "Database design", "Backend build"], image: "/service/5.png" },
        { title: "QA & Acceptance", tags: ["Bug fixes", "Data testing", "Performance testing", "Project review", "Project summary"], image: "/service/6.png" },
        { title: "Delivery & Training", tags: ["Source code handoff", "Deployment docs", "Usage docs", "Feature walkthrough", "Deployment walkthrough"], image: "/service/7.png" },
        { title: "Feedback Loop", tags: ["After-sales support", "Lifetime bug maintenance", "Free ops support", "Regular follow-up"], image: "/service/8.png" },
      ],
    },
    about: {
      title: "About Us",
      description: "We advocate AI-native thinking, execute well in remote collaboration, and build friendly human-machine experiences.",
      members: [
        { name: "Parker", role: "CEO", image: "/about/1.png" },
        { name: "Town", role: "CTO", image: "/about/2.png" },
        { name: "Shaw", role: "Program Director", image: "/about/3.png" },
        { name: "Sam", role: "Desktop Product Director", image: "/about/4.png" },
        { name: "Joe", role: "Mobile Product Director", image: "/about/5.png" },
      ],
    },
    tech: {
      title: "Our AI Technology Stack",
      stacks: [
        {
          title: "Application Layer",
          columns: [
            ["RAG Applications", "Enterprise Knowledge Base"],
            ["Agent Applications", "Multi-agent Systems, Financial Analysis", "Contract Comparison, Travel Assistant"],
            ["OLTP Applications", "AI Customer Support, Enterprise Writing Assistant"],
            ["OLAP Applications", "Enterprise Report Generation", "NLP2SQL BI Visualization"],
          ],
        },
        {
          title: "Capability Layer",
          columns: [["Text Generation"], ["Audio Generation"], ["Image Generation"], ["Video Generation"], ["Document Generation"], ["Strategy Generation"], ["Digital Humans"], ["Hybrid Generation"]],
        },
        {
          title: "Application Tech Layer",
          columns: [["Agents"], ["RAG", "Prompt Engineering"], ["Fine-tuning", "Chain of Thought"], ["Data Crawling", "Data Cleaning"], ["Vector Data", "Access Control"]],
        },
        {
          title: "Model Layer",
          columns: [["Large Language Models"], ["Vision-Language Models", "Speech-Language Models"], ["OCR Models", "Recall / Ranking Models"], ["Document Understanding Models", "Multimodal Detection & Segmentation"]],
        },
        {
          title: "Cloud-native Layer",
          columns: [["Docker"], ["K8s"]],
        },
        {
          title: "Infrastructure Layer",
          columns: [["GPU / TPU / Ascend"], ["CPU"], ["RAM"], ["HDD"], ["Network"]],
        },
      ],
    },
    contact: {
      title: "Start a Conversation",
      description: "Reach out directly by phone, address, or WeChat QR code.",
      phoneLabel: "Phone",
      addressLabel: "Address",
      qrLabel: "Scan to Add",
      address: "10F, Shanke Intelligent Tower, Binjiang, Hangzhou, MIST Intelligence",
      formTitle: "Request a Proposal",
      formDescription: "Share your details so we can provide a relevant solution for your business.",
      fields: {
        name: "Name",
        phone: "Phone",
        email: "Email",
        companyName: "Company",
      },
      placeholders: {
        name: "Enter your name",
        phone: "Enter your phone number",
        email: "Enter your email",
        companyName: "Enter your company name",
      },
      messages: {
        nameMin: "Name must be at least 2 characters",
        invalidPhone: "Please enter a valid phone number",
        companyMin: "Company name must be at least 2 characters",
        invalidEmail: "Please enter a valid email address",
        submitting: "Submitting...",
        submit: "Submit",
        success: "Submitted successfully. We will reach out to you by email soon.",
        failed: "Submission failed. Please try again later.",
      },
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },
} satisfies Record<Locale, unknown>;

export function detectLocale(): Locale {
  if (typeof window === "undefined") return "zh";

  const stored = window.localStorage.getItem("mist-ai-locale");
  if (stored === "zh" || stored === "en") return stored;

  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  const normalized = langs.map((item) => item.toLowerCase());

  const zhLocale = normalized.find((item) => item.startsWith("zh"));
  if (zhLocale) return "zh";

  const regionLocale = normalized.find((item) => /-(cn|hk|tw|mo|sg)\b/.test(item));
  if (regionLocale) return "zh";

  return "en";
}
