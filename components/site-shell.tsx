"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { detectLocale, localeLabels, type Locale, siteCopy } from "@/lib/site-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const web3FormsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";
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

function LanguageSwitch({
  locale,
  setLocale,
  mobile = false,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  mobile?: boolean;
}) {
  return (
    <div className={`flex items-center gap-1 ${mobile ? "justify-start" : "rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur"}`}>
      {(Object.keys(localeLabels) as Locale[]).map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => setLocale(key)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            locale === key ? "bg-white text-slate-950 shadow-sm" : "text-current/80 hover:text-current"
          } ${mobile ? "border border-slate-200" : ""}`}
        >
          {localeLabels[key]}
        </button>
      ))}
    </div>
  );
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

function Header({ locale, setLocale, navItems, contactLabel }: { locale: Locale; setLocale: (locale: Locale) => void; navItems: Array<{ label: string; href: string }>; contactLabel: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const labels = siteCopy[locale].header;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 transition-all duration-300 md:px-10 md:py-4 ${
          scrolled || menuOpen ? "mt-2 rounded-2xl bg-white/92 text-slate-900 shadow-[0_12px_40px_rgba(15,23,42,0.12)] backdrop-blur md:mt-3" : "text-white"
        }`}
      >
        <a href="#" className="flex items-center gap-3 text-2xl font-medium md:gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-2 shadow-[0_8px_28px_rgba(15,23,42,0.16)] ring-1 ring-black/5 md:h-16 md:w-16">
            <img src={asset("/mistlogo.png")} alt="MIST Ai" className="h-full w-full object-contain" />
          </span>
          <span className="text-base font-semibold tracking-[-0.02em] md:text-[1.15rem]">MIST Ai</span>
        </a>
        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitch locale={locale} setLocale={setLocale} />
          <nav className="flex items-center gap-10 text-sm">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-[#1e88e5]">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className={`rounded-md px-5 py-2 text-sm font-medium transition ${
              scrolled ? "bg-[#1e88e5] text-white hover:bg-[#29b6f6]" : "border border-white hover:border-[#1de9b6] hover:bg-[#1de9b6] hover:text-black"
            }`}
          >
            {contactLabel}
          </a>
        </div>
        <button
          type="button"
          aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-current backdrop-blur md:hidden"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="sr-only">{menuOpen ? labels.closeMenu : labels.openMenu}</span>
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>
      {menuOpen ? (
        <div className="mx-auto mt-2 max-w-[calc(100%-24px)] rounded-2xl bg-white px-4 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.14)] md:hidden">
          <div className="mb-4">
            <LanguageSwitch locale={locale} setLocale={setLocale} mobile />
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-[#1e88e5] px-4 py-3 text-sm font-medium text-white"
              onClick={() => setMenuOpen(false)}
            >
              {contactLabel}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].hero;
  const chars = useMemo(() => content.titleFocus.split(""), [content.titleFocus]);

  return (
    <section className="relative mb-14 min-h-screen overflow-hidden md:mb-20">
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
        <source src={asset("/background.mp4")} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/28" />
      <div className="hero-gradient absolute inset-0" />
      <div className="relative z-10 mx-auto grid h-full max-w-[1440px] grid-cols-1 px-5 pt-28 pb-14 md:grid-cols-[1.1fr_1.4fr_0.8fr_0.7fr] md:px-16 md:pt-36 md:pb-16">
        <div className="hidden md:block" />
        <div className="flex min-h-[100svh] flex-col justify-center gap-6 md:min-h-0 md:gap-9">
          <h1 className="font-display animate-rise text-[clamp(2.35rem,10vw,4.65rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
            {content.titlePrefix} <span className="inline-block text-[#1de9b6]">{chars.map((char, index) => <span key={`${char}-${index}`} className="hero-char inline-block" style={{ animationDelay: `${0.2 + index * 0.06}s` }}>{char === " " ? "\u00A0" : char}</span>)}</span> {content.titleSuffix}
          </h1>
          <p className="animate-rise animation-delay-200 max-w-xl text-[0.98rem] leading-7 text-white/88 md:text-[1.15rem] md:leading-8">{content.description}</p>
          <div className="animate-rise animation-delay-200 flex flex-wrap gap-3 pt-2 md:hidden">
            <a href="#services" className="rounded-full bg-[#1de9b6] px-4 py-2 text-sm font-semibold text-slate-950">{content.viewServices}</a>
            <a href="#contact" className="rounded-full border border-white/60 px-4 py-2 text-sm font-semibold text-white">{content.contactUs}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].services;
  return (
    <section className="section-shell">
      <SectionHeading id="services" title={content.title} description={content.description} />
      <div className="grid gap-5 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
        {content.items.map((service, index) => (
          <Reveal key={service.title} delay={index * 70}>
            <article className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:p-8">
              <div className="mb-6 flex items-center gap-4 md:mb-8 md:gap-6">
                <div className="rounded-2xl border-2 border-[#26c6da] p-2">
                  <img src={asset(service.icon)} alt="" className="h-12 w-12 object-contain" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 md:text-xl">{service.title}</h3>
              </div>
              <p className="text-sm leading-7 text-slate-500 md:text-base md:leading-8">{service.content}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Customers({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].customers;
  return (
    <section className="section-shell">
      <SectionHeading id="customers" title={content.title} />
      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        {content.items.map((customer, index) => (
          <Reveal key={customer.title} delay={index * 90}>
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="flex flex-col gap-6">
                <div className="overflow-hidden rounded-2xl">
                  <img src={asset(customer.image)} alt={customer.title} className="aspect-video w-full object-cover transition duration-500 hover:scale-[1.02]" />
                </div>
                <div>
                  <h3 className="mb-3 text-2xl font-bold text-slate-950 md:text-3xl">{customer.title}</h3>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {customer.tags.map((tag) => (
                      <span key={tag} className="rounded bg-[#1de9b6]/15 px-2 py-1 text-xs font-medium text-[#1e88e5]">{tag}</span>
                    ))}
                  </div>
                  <p className="mb-2 text-base font-semibold text-slate-900 md:text-lg">{customer.subtitle}</p>
                  <p className="text-sm leading-7 text-slate-500 md:text-base md:leading-8">{customer.description}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Process({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].process;
  const scrollerRef = useDragScroll<HTMLDivElement>();
  return (
    <section className="section-shell">
      <SectionHeading id="process" title={content.title} description={content.description} />
      <Reveal>
        <div ref={scrollerRef} className="carousel-track hide-scrollbar flex gap-6 overflow-x-auto pb-8 md:gap-14">
          {content.items.map((step, index) => (
            <article key={step.title} className="min-w-[220px] max-w-[220px] flex-none md:min-w-[260px] md:max-w-[260px]">
              <img src={asset(step.image)} alt={step.title} className="mb-4 aspect-square h-[220px] w-[220px] object-contain md:h-[260px] md:w-[260px]" />
              <h3 className="mb-3 flex items-center gap-3 text-[1.35rem] font-semibold text-slate-950 md:gap-4 md:text-[1.7rem]">
                <span className="text-sm text-[#1e88e5]">{String(index + 1).padStart(2, "0")}</span>
                {step.title}
              </h3>
              <p className="text-sm leading-7 text-slate-500 md:leading-8">{step.tags.join(locale === "zh" ? "，" : ", ")}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function About({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].about;
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
      <SectionHeading id="about" title={content.title} description={content.description} />
      <Reveal>
        <div ref={dragRef} className="carousel-track hide-scrollbar flex gap-3 overflow-x-auto rounded-2xl pb-6 md:gap-4">
          {content.members.map((member) => (
            <figure key={member.name} className="relative h-[340px] w-[240px] flex-none overflow-hidden rounded-2xl bg-slate-100 sm:h-[420px] sm:w-[300px] md:h-[520px] md:w-[390px]">
              <img src={asset(member.image)} alt={member.name} className="h-full w-full object-cover" />
              <figcaption className="absolute left-4 bottom-4 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)]">
                <h4 className="font-display text-xl font-semibold md:text-2xl">{member.name}</h4>
                <p className="text-sm font-semibold md:text-lg">{member.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
      <div className="mx-auto h-1 w-[60%] overflow-hidden rounded-full bg-[#26c6da]/20">
        <div className="h-full rounded-full bg-[#1e88e5] transition-transform duration-200" style={{ width: "100%", transform: `translateX(${(progress - 1) * 100}%)` }} />
      </div>
    </section>
  );
}

function TechStacks({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].tech;
  return (
    <section className="section-shell">
      <SectionHeading id="tech" title={content.title} />
      <Reveal className="hidden md:block">
        <div className="hide-scrollbar flex flex-col gap-5 overflow-x-auto">
          {content.stacks.map((stack) => (
            <div key={stack.title} className="grid min-w-[960px] grid-cols-[84px_1fr] gap-4">
              <div className="rounded-md bg-[#1e88e5] px-2 py-4 text-center text-sm font-medium tracking-[0.25em] text-white [writing-mode:vertical-rl]">{stack.title}</div>
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${stack.columns.length}, minmax(0, 1fr))` }}>
                {stack.columns.map((column, index) => (
                  <div key={`${stack.title}-${index}`} className="flex flex-col gap-4">
                    {column.map((item) => (
                      <div key={item} className="soft-radial rounded-md px-4 py-3 text-center text-sm font-medium text-white">{item}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
      <div className="grid gap-4 md:hidden">
        {content.stacks.map((stack, stackIndex) => (
          <Reveal key={stack.title} delay={stackIndex * 60}>
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 inline-flex rounded-full bg-[#1e88e5] px-3 py-1 text-sm font-semibold text-white">{stack.title}</h3>
              <div className="flex flex-wrap gap-2">
                {stack.columns.flat().map((item) => (
                  <span key={`${stack.title}-${item}`} className="rounded-full bg-[#1de9b6]/14 px-3 py-2 text-sm font-medium text-[#1e88e5]">{item}</span>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>
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

function ContactForm({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].contact;
  const [values, setValues] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const validate = (data: FormState) => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (data.name.trim().length < 2) nextErrors.name = content.messages.nameMin;
    if (!/^1\d{10}$/.test(data.phone.trim())) nextErrors.phone = content.messages.invalidPhone;
    if (data.companyName.trim().length < 2) nextErrors.companyName = content.messages.companyMin;
    if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) nextErrors.email = content.messages.invalidEmail;
    return nextErrors;
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setMessage("");
    if (Object.keys(nextErrors).length > 0) return;
    if (!web3FormsAccessKey) {
      setStatus("error");
      setMessage(locale === "zh" ? "表单尚未完成邮箱配置，请先填写 Web3Forms Access Key。" : "The form is not configured yet. Please add the Web3Forms access key first.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3FormsAccessKey,
          subject: locale === "zh" ? "MIST Ai 官网新表单提交" : "New submission from MIST Ai website",
          from_name: "MIST Ai Website",
          name: values.name,
          phone: values.phone,
          email: values.email,
          companyName: values.companyName,
          locale,
          replyto: values.email || undefined,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed");
      }

      setStatus("success");
      setMessage(content.messages.success);
      setValues(initialFormState);
    } catch {
      setStatus("error");
      setMessage(content.messages.failed);
    }
  }

  const fields: Array<{ key: keyof FormState; label: string; placeholder: string; type: string }> = [
    { key: "name", label: content.fields.name, placeholder: content.placeholders.name, type: "text" },
    { key: "phone", label: content.fields.phone, placeholder: content.placeholders.phone, type: "tel" },
    { key: "email", label: content.fields.email, placeholder: content.placeholders.email, type: "email" },
    { key: "companyName", label: content.fields.companyName, placeholder: content.placeholders.companyName, type: "text" },
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
      <button className="inline-flex h-12 items-center rounded-md bg-[#1e88e5] px-6 font-medium text-white transition hover:bg-[#29b6f6] disabled:cursor-not-allowed disabled:bg-slate-400" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? content.messages.submitting : content.messages.submit}
      </button>
      {message ? <p className={`text-sm ${status === "success" ? "text-[#1e88e5]" : "text-[#ef4444]"}`}>{message}</p> : null}
    </form>
  );
}

function Contact({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].contact;
  return (
    <section id="contact" className="relative mt-8 overflow-hidden contact-surface">
      <div className="absolute inset-0 bg-white/84" />
      <div className="section-shell relative z-10 py-16 md:py-24">
        <div className="grid items-start gap-8 md:grid-cols-[1fr_minmax(360px,560px)] md:gap-10">
          <Reveal className="space-y-6">
            <h2 className="font-display text-3xl font-semibold text-slate-950 md:text-5xl">{content.title}</h2>
            <p className="max-w-xl text-base leading-7 text-slate-500 md:text-lg md:leading-8">{content.description}</p>
            <div className="space-y-4 rounded-3xl border border-white/70 bg-white/70 px-5 py-5 shadow-sm backdrop-blur">
              <div>
                <p className="text-sm font-medium text-slate-500">{content.phoneLabel}</p>
                <p className="mt-1 break-all text-base font-semibold text-slate-950 md:text-lg">15622153144</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{content.addressLabel}</p>
                <p className="mt-1 text-base font-semibold leading-7 text-slate-950 md:text-lg">{content.address}</p>
              </div>
              <div className="flex items-center gap-4 pt-1">
                <img src={asset("/weixin.png")} alt="WeChat" className="h-12 w-12" />
                <div>
                  <p className="text-sm font-medium text-slate-500">{content.qrLabel}</p>
                  <img src={asset("/qrcode.png")} alt="QR code" className="mt-2 h-24 w-24 rounded-md border border-slate-200" />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-[28px] bg-white px-5 py-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] md:px-10 md:py-12">
              <h3 className="mb-3 text-2xl font-semibold text-slate-950">{content.formTitle}</h3>
              <p className="mb-8 text-slate-500">{content.formDescription}</p>
              <ContactForm locale={locale} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].footer;
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 md:flex-row md:px-10">
        <p>© MIST Ai</p>
        <div className="flex gap-6">
          <a href="#">{content.privacy}</a>
          <a href="#">{content.terms}</a>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell() {
  const [locale, setLocaleState] = useState<Locale>("zh");

  useEffect(() => {
    const nextLocale = detectLocale();
    setLocaleState(nextLocale);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("mist-ai-locale", locale);
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const setLocale = (nextLocale: Locale) => setLocaleState(nextLocale);
  const content = siteCopy[locale];

  return (
    <main className="bg-white text-slate-950">
      <Header locale={locale} setLocale={setLocale} navItems={content.navItems} contactLabel={content.header.contact} />
      <Hero locale={locale} />
      <Services locale={locale} />
      <Customers locale={locale} />
      <Process locale={locale} />
      <About locale={locale} />
      <TechStacks locale={locale} />
      <Contact locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
