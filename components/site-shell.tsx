"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { customers, hero, navItems, processSteps, services, teamMembers, techStacks } from "@/lib/site-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onPointerDown = (event: PointerEvent) => {
      isDown = true;
      startX = event.pageX;
      scrollLeft = node.scrollLeft;
      node.setPointerCapture(event.pointerId);
      node.classList.add("dragging");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDown) return;
      const distance = event.pageX - startX;
      node.scrollLeft = scrollLeft - distance * 1.1;
    };

    const onPointerUp = (event: PointerEvent) => {
      isDown = false;
      if (node.hasPointerCapture(event.pointerId)) node.releasePointerCapture(event.pointerId);
      node.classList.remove("dragging");
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        node.scrollLeft += event.deltaY;
      }
    };

    node.addEventListener("pointerdown", onPointerDown);
    node.addEventListener("pointermove", onPointerMove);
    node.addEventListener("pointerup", onPointerUp);
    node.addEventListener("pointerleave", onPointerUp);
    node.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      node.removeEventListener("pointerdown", onPointerDown);
      node.removeEventListener("pointermove", onPointerMove);
      node.removeEventListener("pointerup", onPointerUp);
      node.removeEventListener("pointerleave", onPointerUp);
      node.removeEventListener("wheel", onWheel);
    };
  }, []);

  return ref;
}

function SectionHeading({ id, title, description }: { id: string; title: string; description?: string }) {
  return (
    <Reveal>
      <div id={id} className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">{title}</h2>
        {description ? <p className="max-w-3xl text-base leading-8 text-slate-500 md:text-lg">{description}</p> : null}
      </div>
    </Reveal>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 transition-all duration-300 md:px-10 ${
          scrolled ? "mt-3 rounded-2xl bg-white/92 text-slate-900 shadow-[0_12px_40px_rgba(15,23,42,0.12)] backdrop-blur" : "text-white"
        }`}
      >
        <a href="#" className="flex items-center gap-3 text-2xl font-medium md:gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-[0_8px_28px_rgba(15,23,42,0.16)] ring-1 ring-black/5 md:h-16 md:w-16">
            <img src={asset("/mistlogo.png")} alt="MIST Ai" className="h-full w-full object-contain" />
          </span>
          <span className="hidden text-[1.15rem] font-semibold tracking-[-0.02em] md:inline">MIST Ai</span>
        </a>
        <nav className="hidden items-center gap-10 text-sm md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-[#1e88e5]">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className={`hidden rounded-md px-5 py-2 text-sm font-medium transition md:inline-flex ${
            scrolled
              ? "bg-[#1e88e5] text-white hover:bg-[#29b6f6]"
              : "border border-white hover:border-[#1de9b6] hover:bg-[#1de9b6] hover:text-black"
          }`}
        >
          联系我们
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const chars = useMemo(() => hero.titleFocus.split(""), []);

  return (
    <section className="relative mb-20 h-screen overflow-hidden">
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
        <source src={asset("/background.mp4")} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/28" />
      <div className="hero-gradient absolute inset-0" />
      <div className="relative z-10 mx-auto grid h-full max-w-[1440px] grid-cols-1 px-6 pt-28 pb-16 md:grid-cols-[1.1fr_1.4fr_0.8fr_0.7fr] md:px-16 md:pt-36">
        <div />
        <div className="flex flex-col justify-center gap-7 md:gap-9">
          <h1 className="font-display animate-rise text-[clamp(2.7rem,8vw,4.65rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
            {hero.titlePrefix}
            <span className="inline-block text-[#1de9b6]">
              {" "}
              {chars.map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="hero-char inline-block"
                  style={{ animationDelay: `${0.2 + index * 0.06}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>{" "}
            {hero.titleSuffix}
          </h1>
          <p className="animate-rise animation-delay-200 max-w-xl text-[1.06rem] leading-8 text-white/88 md:text-[1.15rem]">
            {hero.description}
          </p>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section-shell">
      <SectionHeading
        id="services"
        title="我们的服务"
        description="我们期待与各类团队携手，攻克不同复杂程度的项目。通过合作，我们会打造全新系统、解决方案与产品，助您在竞争中脱颖而出。"
      />
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 70}>
            <article className="h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-8 flex items-center gap-6">
                <div className="rounded-2xl border-2 border-[#26c6da] p-2">
                  <img src={asset(service.icon)} alt="" className="h-12 w-12 object-contain" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
              </div>
              <p className="leading-8 text-slate-500">{service.content}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Customers() {
  return (
    <section className="section-shell">
      <SectionHeading id="customers" title="真实客户，真实影响" />
      <div className="grid gap-10 md:grid-cols-2">
        {customers.map((customer, index) => (
          <Reveal key={customer.title} delay={index * 90}>
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="flex flex-col gap-6">
                <div className="overflow-hidden rounded-2xl">
                  <img src={asset(customer.image)} alt={customer.title} className="aspect-video w-full object-cover transition duration-500 hover:scale-[1.02]" />
                </div>
                <div>
                  <h3 className="mb-3 text-3xl font-bold text-slate-950">{customer.title}</h3>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {customer.tags.map((tag) => (
                      <span key={tag} className="rounded bg-[#1de9b6]/15 px-2 py-1 text-xs font-medium text-[#1e88e5]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mb-2 text-lg font-semibold text-slate-900">{customer.subtitle}</p>
                  <p className="leading-8 text-slate-500">{customer.description}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const scrollerRef = useDragScroll<HTMLDivElement>();

  return (
    <section className="section-shell">
      <SectionHeading
        id="process"
        title="了解我们的服务流程"
        description="丰富的互联网服务经验，让我们对项目实施的标准化有更多的理解。"
      />
      <Reveal>
        <div ref={scrollerRef} className="carousel-track hide-scrollbar flex gap-14 overflow-x-auto pb-8">
          {processSteps.map((step, index) => (
            <article key={step.title} className="min-w-[260px] max-w-[260px] flex-none">
              <img src={asset(step.image)} alt={step.title} className="mb-4 aspect-square h-[260px] w-[260px] object-contain" />
              <h3 className="mb-3 flex items-center gap-4 text-[1.7rem] font-semibold text-slate-950">
                <span className="text-sm text-[#1e88e5]">{String(index + 1).padStart(2, "0")}</span>
                {step.title}
              </h3>
              <p className="text-sm leading-8 text-slate-500">{step.tags.join("，")}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function About() {
  const dragRef = useDragScroll<HTMLDivElement>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = dragRef.current;
    if (!node) return;

    const update = () => {
      const max = node.scrollWidth - node.clientWidth;
      setProgress(max <= 0 ? 0 : node.scrollLeft / max);
    };

    update();
    node.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      node.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="section-shell">
      <SectionHeading
        id="about"
        title="关于我们"
        description="我们是AI Native的倡导者、远程协作的执行者以及友好人机互动的践行者。"
      />
      <Reveal>
        <div ref={dragRef} className="carousel-track hide-scrollbar flex gap-4 overflow-x-auto rounded-2xl pb-6">
          {teamMembers.map((member) => (
            <figure key={member.name} className="relative h-[480px] w-[360px] flex-none overflow-hidden rounded-2xl bg-slate-100 md:h-[520px] md:w-[390px]">
              <img src={asset(member.image)} alt={member.name} className="h-full w-full object-cover" />
              <figcaption className="absolute left-4 bottom-4 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)]">
                <h4 className="font-display text-2xl font-semibold">{member.name}</h4>
                <p className="text-lg font-semibold">{member.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
      <div className="mx-auto h-1 w-[60%] overflow-hidden rounded-full bg-[#26c6da]/20">
        <div
          className="h-full rounded-full bg-[#1e88e5] transition-transform duration-200"
          style={{ width: "100%", transform: `translateX(${(progress - 1) * 100}%)` }}
        />
      </div>
    </section>
  );
}

function TechStacks() {
  return (
    <section className="section-shell">
      <SectionHeading id="tech" title="我们的AI技术栈" />
      <Reveal>
        <div className="hide-scrollbar flex flex-col gap-5 overflow-x-auto">
          {techStacks.map((stack) => (
            <div key={stack.title} className="grid min-w-[960px] grid-cols-[84px_1fr] gap-4">
              <div className="rounded-md bg-[#1e88e5] px-2 py-4 text-center text-sm font-medium tracking-[0.25em] text-white [writing-mode:vertical-rl]">
                {stack.title}
              </div>
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${stack.columns.length}, minmax(0, 1fr))` }}>
                {stack.columns.map((column, index) => (
                  <div key={`${stack.title}-${index}`} className="flex flex-col gap-4">
                    {column.map((item) => (
                      <div key={item} className="soft-radial rounded-md px-4 py-3 text-center text-sm font-medium text-white">
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

type FormState = {
  name: string;
  phone: string;
  email: string;
  companyName: string;
};

const initialFormState: FormState = {
  name: "",
  phone: "",
  email: "",
  companyName: "",
};

function ContactForm() {
  const [values, setValues] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const validate = (data: FormState) => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (data.name.trim().length < 2) nextErrors.name = "姓名至少为2个字符";
    if (!/^1\d{10}$/.test(data.phone.trim())) nextErrors.phone = "请输入有效的手机号";
    if (data.companyName.trim().length < 2) nextErrors.companyName = "公司名称至少为2个字符";
    if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) nextErrors.email = "请输入有效的邮箱";
    return nextErrors;
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setMessage("");
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const historyKey = "mist-ai-contact-submissions";
      const stored = window.localStorage.getItem(historyKey);
      const history = stored ? JSON.parse(stored) : [];
      history.push({
        ...values,
        submittedAt: new Date().toISOString(),
      });
      window.localStorage.setItem(historyKey, JSON.stringify(history));

      setStatus("success");
      setMessage("提交成功，内容已保存在当前浏览器中。若要正式收集线索，请接入真实表单服务。");
      setValues(initialFormState);
    } catch {
      setStatus("error");
      setMessage("提交失败，请稍后重试");
    }
  }

  const fields: Array<{ key: keyof FormState; label: string; placeholder: string; type: string }> = [
    { key: "name", label: "姓名", placeholder: "请输入姓名", type: "text" },
    { key: "phone", label: "电话", placeholder: "请输入电话", type: "tel" },
    { key: "email", label: "邮箱", placeholder: "请输入邮箱", type: "email" },
    { key: "companyName", label: "公司名称", placeholder: "请输入公司名称", type: "text" },
  ];

  return (
    <form className="space-y-4" noValidate onSubmit={handleSubmit}>
      {fields.map((field) => (
        <label key={field.key} className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">{field.label}</span>
          <input
            type={field.type}
            value={values[field.key]}
            onChange={(event) => {
              const nextValue = event.target.value;
              setValues((current) => ({ ...current, [field.key]: nextValue }));
              setErrors((current) => ({ ...current, [field.key]: undefined }));
            }}
            placeholder={field.placeholder}
            aria-invalid={Boolean(errors[field.key])}
            className="h-12 w-full rounded-md border border-slate-200 px-4 outline-none transition focus:border-[#1e88e5] focus:ring-4 focus:ring-[#29b6f6]/18 aria-[invalid=true]:border-[#ef4444] aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-[#ef4444]/10"
          />
          {errors[field.key] ? <span className="mt-2 block text-sm text-[#ef4444]">{errors[field.key]}</span> : null}
        </label>
      ))}
      <button
        className="inline-flex h-12 items-center rounded-md bg-[#1e88e5] px-6 font-medium text-white transition hover:bg-[#29b6f6] disabled:cursor-not-allowed disabled:bg-slate-400"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "提交中..." : "提交"}
      </button>
      {message ? <p className={`text-sm ${status === "success" ? "text-[#1e88e5]" : "text-[#ef4444]"}`}>{message}</p> : null}
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative mt-8 overflow-hidden contact-surface">
      <div className="absolute inset-0 bg-white/84" />
      <div className="section-shell relative z-10 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_minmax(360px,560px)]">
          <Reveal className="space-y-6">
            <h2 className="font-display text-4xl font-semibold text-slate-950 md:text-5xl">开始合作</h2>
            <p className="max-w-xl text-lg leading-8 text-slate-500">欢迎直接通过电话、地址或微信二维码联系我们。</p>
            <div className="space-y-4 rounded-3xl border border-white/70 bg-white/70 px-5 py-5 shadow-sm backdrop-blur">
              <div>
                <p className="text-sm font-medium text-slate-500">电话</p>
                <p className="mt-1 text-lg font-semibold text-slate-950">15622153144</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">地址</p>
                <p className="mt-1 text-lg font-semibold text-slate-950">杭州滨江山科智能大厦10楼迷雾智能</p>
              </div>
              <div className="flex items-center gap-4 pt-1">
                <img src={asset("/weixin.png")} alt="微信" className="h-12 w-12" />
                <div>
                  <p className="text-sm font-medium text-slate-500">扫码添加</p>
                  <img src={asset("/qrcode.png")} alt="二维码" className="mt-2 h-24 w-24 rounded-md border border-slate-200" />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-[28px] bg-white px-8 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.12)] md:px-10 md:py-12">
              <h3 className="mb-3 text-2xl font-semibold text-slate-950">获取方案</h3>
              <p className="mb-8 text-slate-500">完善您的信息，方便我们为您提供专业的业务方案</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 md:flex-row md:px-10">
        <p>© MIST Ai</p>
        <div className="flex gap-6">
          <a href="#">隐私政策</a>
          <a href="#">服务协议</a>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell() {
  return (
    <main className="bg-white text-slate-950">
      <Header />
      <Hero />
      <Services />
      <Customers />
      <Process />
      <About />
      <TechStacks />
      <Contact />
      <Footer />
    </main>
  );
}
