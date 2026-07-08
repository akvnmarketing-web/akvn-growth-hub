import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import {
  ArrowRight, Sparkles, TrendingUp, Target, Search, Share2, Code2, Smartphone,
  ShoppingBag, Megaphone, Bot, CheckCircle2, Star, Phone, Mail, MapPin, Clock,
  Instagram, Facebook, Linkedin, Twitter, ChevronRight, BarChart3, Zap, Rocket,
  Users, Award, ShieldCheck, LineChart, PenTool, Globe2, Building2, Utensils,
  Stethoscope, Home as HomeIcon, GraduationCap, Plane, Car, Landmark, ShoppingCart,
  Play, Menu, X, Sun, Moon, MessageCircle,
} from "lucide-react";
import heroImg from "@/assets/hero-dashboard.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import logo from "../assets/akvn-logo.png"
/* ---------- Contact constants ---------- */
export const PHONE = "+971 58 292 6466";
export const PHONE_TEL = "+971582926466";
export const WHATSAPP_URL = "https://wa.me/971582926466";
export const EMAIL = "info@akvndigital.com";
export const ADDRESS = "Dubai, United Arab Emirates";

/* ---------- Theme toggle ---------- */
export function ThemeToggle({ inverse = false }: { inverse?: boolean }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch { }
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`grid h-10 w-10 place-items-center rounded-full border transition ${inverse
        ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
        : "border-border bg-card text-navy hover:bg-secondary"
        }`}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

/* ---------- Scroll progress bar ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gold-gradient"
    />
  );
}

/* ---------- Nav ---------- */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Home", "/"], ["About", "/about"], ["Services", "/services"],
    ["Process", "/process"], ["Work", "/work"], ["Contact", "/contact"],
  ] as const;

  const linkColor = scrolled ? "text-navy/75 hover:text-navy" : "text-white/85 hover:text-white";
  const brandTextColor = scrolled ? "text-navy" : "text-white";
  const iconColor = scrolled ? "text-navy" : "text-white";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="container-x">
        <div className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${scrolled ? "glass-card shadow-elegant" : "bg-transparent"}`}>
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="AKVN Digital"
              className="h-15 w-auto  object-contain rounded-sm"
            />
            {/* <span className="text-xl font-extrabold tracking-tight text-white">AKVN<span className="text-gold">Digital</span></span> */}

          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map(([l, h]) => (
              <Link key={l} to={h} className={`text-sm font-medium transition ${linkColor}`}>{l}</Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle inverse={!scrolled} />
            <Button asChild className="rounded-full bg-cta-gradient font-semibold text-cta-foreground shadow-glow hover:brightness-110">
              <Link to="/contact">Free Consultation <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle inverse={!scrolled} />
            <button onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className={`h-6 w-6 ${iconColor}`} /> : <Menu className={`h-6 w-6 ${iconColor}`} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="mt-2 rounded-2xl glass-card p-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {links.map(([l, h]) => (
                <Link key={l} to={h} onClick={() => setOpen(false)} className="text-sm font-medium text-navy/80">{l}</Link>
              ))}
              <Button asChild className="mt-2 rounded-full bg-cta-gradient text-cta-foreground">
                <Link to="/contact">Free Consultation</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- Reveal helper ---------- */
export function Reveal({ children, delay = 0, className = "", y = 30 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Page header (for sub-pages) ---------- */
export function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-hero pt-36 pb-20 text-white md:pt-44 md:pb-28">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="container-x relative text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2 text-xs font-semibold tracking-wide">
            <span className="h-2 w-2 rounded-full bg-cta shadow-[0_0_12px_var(--cta)]" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------- Hero ---------- */
export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 100]);
  return (
    <section id="home" className="relative overflow-hidden bg-hero pt-32 pb-24 text-white md:pt-40 md:pb-32">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2 text-xs font-semibold tracking-wide">
              <span className="h-2 w-2 rounded-full bg-cta shadow-[0_0_12px_var(--cta)]" />
              Dubai · UAE&apos;s Growth-Focused Marketing Agency
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Grow Your Business with{" "}
              <span className="text-gold-gradient">Digital Marketing</span>{" "}
              That Delivers Results
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-white/75">
              AKVN Digital helps businesses across Dubai and the UAE generate quality leads, increase sales,
              and build powerful online brands through Google Ads, Meta Ads, SEO, Social Media
              Marketing and high-performance websites.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 rounded-full bg-cta-gradient px-7 text-base font-bold text-cta-foreground shadow-glow hover:brightness-110">
                <Link to="/contact">Get Free Consultation <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-white/30 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur hover:bg-white/10 hover:text-white">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us</a>
              </Button>
            </div>
          </Reveal>
          {/* <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cta" /> Google Certified</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cta" /> Meta Business Partner</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cta" /> ROI-Driven</div>
            </div>
          </Reveal> */}
        </div>

        <motion.div style={{ y }} className="relative">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-3 shadow-elegant backdrop-blur-xl">
            <img src={heroImg} alt="Marketing dashboards showing Google Ads, Meta Ads and SEO analytics" width={1600} height={1200} className="w-full rounded-2xl" />
          </div>
          <motion.div
            className="absolute -left-6 top-10 hidden rounded-2xl glass-card px-4 py-3 shadow-elegant md:flex"
            animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-cta/15 text-cta"><TrendingUp className="h-5 w-5" /></div>
              <div>
                <div className="text-xs text-navy/60">Leads This Month</div>
                <div className="text-lg font-bold text-navy">+248%</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute -right-4 -bottom-6 hidden rounded-2xl glass-card px-4 py-3 shadow-elegant md:flex"
            animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/20 text-gold"><BarChart3 className="h-5 w-5" /></div>
              <div>
                <div className="text-xs text-navy/60">ROAS</div>
                <div className="text-lg font-bold text-navy">6.4x</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Counter ---------- */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState("0");
  useEffect(() => { if (inView) mv.set(value); }, [inView, mv, value]);
  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v).toString())), [spring]);
  return <span ref={ref}>{display}{suffix}</span>;
}

export function Stats() {
  const stats = [
    { v: 100, s: "+", label: "Projects Delivered" },
    { v: 50, s: "+", label: "Happy Clients" },
    { v: 95, s: "%", label: "Client Satisfaction" },
    { v: 24, s: "/7", label: "Dedicated Support" },
  ];
  return (
    <section className="relative -mt-16 pb-8">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-2 gap-4 rounded-3xl glass-card p-6 shadow-elegant md:grid-cols-4 md:p-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-extrabold tracking-tight text-navy md:text-5xl">
                  <Counter value={s.v} suffix={s.s} />
                </div>
                <div className="mt-1 text-sm font-medium text-navy/60">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">About AKVN Digital</span>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight text-navy md:text-5xl">
            Your Digital Growth <span className="text-gold-gradient">Partner in Dubai, UAE</span>
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-navy/70">
            <p>
              AKVN Digital is a Dubai-based digital marketing agency operating under{" "}
              <span className="font-semibold text-navy">AKVN Trading FZ LLC</span> — a UAE-registered
              company. Learn more at{" "}
              <a
                href="https://akvntrading.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-navy decoration-gold decoration-2 underline-offset-4 hover:text-gold"
              >
                akvntrading.com
              </a>
              .
            </p>
            <p>We specialize in helping startups, SMEs and established businesses across the UAE grow through performance marketing and digital transformation.</p>
            <p>We combine creativity, data and technology to build marketing strategies that generate measurable business results — whether that&apos;s more leads, better brand awareness, or higher online sales.</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {["Performance-first", "Data-driven", "ROI-focused", "UAE market experts"].map(t => (
              <div key={t} className="flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 text-cta" />
                <span className="text-sm font-semibold text-navy">{t}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-cta-gradient font-semibold text-cta-foreground shadow-glow hover:brightness-110">
              <Link to="/contact">Book a Free Call <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle className="mr-1 h-4 w-4" /> WhatsApp</a>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gold-gradient opacity-20 blur-3xl" />
            <div className="relative mb-6 overflow-hidden rounded-3xl border border-border shadow-elegant">
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
                alt="Dubai skyline — AKVN Digital operates from Dubai, UAE"
                className="h-56 w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, k: "Avg. ROAS", v: "5.8x" },
                { icon: Users, k: "Leads / Mo", v: "12K+" },
                { icon: Award, k: "Retention", v: "92%" },
                { icon: Rocket, k: "Campaigns", v: "300+" },
              ].map((c, i) => (
                <motion.div
                  key={c.k}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                  className={`glass-card rounded-3xl p-6 shadow-elegant ${i % 2 === 1 ? "mt-8" : ""}`}
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-3xl font-extrabold text-navy">{c.v}</div>
                  <div className="text-sm text-navy/60">{c.k}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
type Service = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  bullets: string[];
  featured?: boolean;
};

const services: Service[] = [
  {
    icon: LineChart, title: "Digital Marketing", featured: true,
    desc: "End-to-end performance marketing engineered to grow revenue.",
    bullets: ["Performance Marketing", "Digital Strategy", "Lead Generation", "Marketing Analytics", "Campaign Optimization", "Conversion Rate Optimization"]
  },
  {
    icon: Target, title: "Google Ads", featured: true,
    desc: "Search, Display, Shopping, YouTube & Remarketing campaigns.",
    bullets: ["Search Ads", "Display Ads", "Shopping Ads", "Remarketing", "YouTube Ads", "Lead Gen Campaigns", "Conversion Tracking"]
  },
  {
    icon: Megaphone, title: "Meta Ads", featured: true,
    desc: "Facebook & Instagram advertising built to convert.",
    bullets: ["Facebook Ads", "Instagram Ads", "Lead Generation", "Retargeting", "Audience Building", "Sales Campaigns", "Creative Optimization"]
  },
  {
    icon: Share2, title: "Social Media Marketing",
    desc: "Content, community and monthly management that grows brands.",
    bullets: ["Content Strategy", "Content Creation", "Community Management", "Instagram Marketing", "Facebook Marketing", "LinkedIn Marketing", "Monthly Management"]
  },
  {
    icon: Search, title: "SEO",
    desc: "Rank for the keywords that bring qualified traffic and sales.",
    bullets: ["Technical SEO", "Local SEO", "Keyword Research", "On-page SEO", "Off-page SEO", "Content Optimization", "SEO Audits"]
  },
  {
    icon: Code2, title: "Website Development",
    desc: "High-performance websites, landing pages and e-commerce.",
    bullets: ["Corporate Websites", "Landing Pages", "Business Websites", "E-Commerce Stores", "Custom Websites", "Website Redesign", "UI/UX Design"]
  },
  {
    icon: Smartphone, title: "Mobile App Development",
    desc: "Native and cross-platform apps for iOS and Android.",
    bullets: ["Android Apps", "iOS Apps", "Cross-platform Apps", "Business Apps"]
  },
  {
    icon: ShoppingBag, title: "Media Buying",
    desc: "Strategic campaign planning across all major ad channels.",
    bullets: ["Digital Campaign Planning", "Audience Targeting", "Campaign Optimization", "ROI Improvement", "Performance Tracking"]
  },
  {
    icon: Bot, title: "AI Marketing Solutions",
    desc: "Chatbots, WhatsApp automation and AI-powered workflows.",
    bullets: ["AI Chatbots", "Lead Qualification Bots", "AI Customer Support", "WhatsApp Automation", "Marketing Automation", "CRM Automation", "Appointment Booking", "AI Content Assistance"]
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-secondary/50 py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Core Services</span>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight text-navy md:text-5xl">
              Everything you need to <span className="text-gold-gradient">win online</span>
            </h2>
            <p className="mt-4 text-navy/70">From strategy to execution, we handle every layer of your digital growth engine.</p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.6 }} viewport={{ once: true, margin: "-60px" }}
              className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 ${s.featured
                ? "bg-navy text-white shadow-elegant"
                : "glass-card shadow-glass hover:shadow-elegant"
                }`}
            >
              {s.featured && (
                <span className="absolute right-5 top-5 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy">Featured</span>
              )}
              <div className={`grid h-14 w-14 place-items-center rounded-2xl ${s.featured ? "bg-gold-gradient text-navy" : "bg-navy text-gold"} shadow-glow`}>
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className={`mt-6 text-2xl font-bold ${s.featured ? "text-white" : "text-navy"}`}>{s.title}</h3>
              <p className={`mt-2 text-sm ${s.featured ? "text-white/70" : "text-navy/60"}`}>{s.desc}</p>
              <ul className="mt-5 space-y-2">
                {s.bullets.map(b => (
                  <li key={b} className={`flex items-center gap-2 text-sm ${s.featured ? "text-white/85" : "text-navy/75"}`}>
                    <CheckCircle2 className={`h-4 w-4 shrink-0 ${s.featured ? "text-gold" : "text-cta"}`} />
                    {b}
                  </li>
                ))}
              </ul>
              <div className={`mt-6 flex items-center gap-1 text-sm font-semibold ${s.featured ? "text-gold" : "text-navy"} opacity-0 transition group-hover:opacity-100`}>
                Learn more <ChevronRight className="h-4 w-4" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why ---------- */
export function Why() {
  const items = [
    { icon: Target, t: "Results-Oriented Strategies" },
    { icon: Award, t: "Certified Marketing Experts" },
    { icon: Megaphone, t: "Google & Meta Ads Specialists" },
    { icon: BarChart3, t: "Transparent Reporting" },
    { icon: TrendingUp, t: "ROI-Focused Campaigns" },
    { icon: PenTool, t: "Creative Team" },
    { icon: Zap, t: "Fast Website Development" },
    { icon: ShieldCheck, t: "Dedicated UAE Support" },
    { icon: Bot, t: "Latest AI Marketing Tools" },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Why AKVN Digital</span>
            <h2 className="mt-3 text-4xl font-extrabold text-navy md:text-5xl">Built to make you the <span className="text-gold-gradient">market leader</span></h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 3) * 0.08 }} viewport={{ once: true }}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-gold hover:shadow-elegant"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-gold transition group-hover:scale-110">
                <it.icon className="h-5 w-5" />
              </div>
              <div className="font-semibold text-navy">{it.t}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
export function Process() {
  const steps = [
    { t: "Discovery", d: "Understand goals, audience & market." },
    { t: "Marketing Strategy", d: "Craft the winning playbook." },
    { t: "Creative Design", d: "Design that captivates." },
    { t: "Campaign Setup", d: "Precision-built ad campaigns." },
    { t: "Launch", d: "Go live with confidence." },
    { t: "Optimization", d: "Refine, test, iterate weekly." },
    { t: "Scale & Grow", d: "Compound results, month over month." },
  ];
  return (
    <section id="process" className="relative overflow-hidden bg-navy py-28 text-white md:py-36">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-cta/10 blur-3xl" />
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Our Process</span>
            <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">A proven 7-step <span className="text-gold-gradient">growth system</span></h2>
            <p className="mt-5 text-white/70">Each engagement follows the same disciplined path — from strategy to scale.</p>
          </div>
        </Reveal>
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }} viewport={{ once: true }}
              className="relative rounded-3xl glass-dark p-8"
            >
              <div className="text-5xl font-black text-gold-gradient leading-none">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-5 text-xl font-bold">{s.t}</div>
              <div className="mt-3 text-sm leading-relaxed text-white/65">{s.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
export function Projects() {
  const items = [
    {
      t: "Google Ads Campaign", c: "SaaS · Dubai", tag: "PPC",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
      t: "Real Estate Website", c: "Property · UAE", tag: "Web",
      img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"
    },
    {
      t: "Corporate Business Site", c: "B2B · Abu Dhabi", tag: "Web",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
    },
    {
      t: "Restaurant Marketing", c: "F&B · Dubai", tag: "Social",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
    },
    {
      t: "Medical Clinic SEO", c: "Healthcare", tag: "SEO",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
    },
    {
      t: "E-Commerce Store", c: "Retail", tag: "Shopify",
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
    },
    {
      t: "Meta Ads Campaign", c: "DTC Brand", tag: "Meta",
      img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=800&q=80"
    },
    {
      t: "Landing Page Design", c: "Lead Gen", tag: "CRO",
      img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <section id="work" className="bg-secondary/50 py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Featured Projects</span>
              <h2 className="mt-3 text-4xl font-extrabold text-navy md:text-5xl">Work that moved the <span className="text-gold-gradient">needle</span></h2>
            </div>
            <Link to="/contact" className="text-sm font-semibold text-navy underline-offset-4 hover:underline">Discuss your project →</Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 4) * 0.06 }} viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-glass transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <Link to="/contact" className="block">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.img} alt={p.t} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 dark:bg-navy/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy backdrop-blur">{p.tag}</span>
                  <ArrowRight className="absolute right-4 top-4 h-5 w-5 -translate-x-2 text-white opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-navy/60">{p.c}</div>
                  <div className="mt-1 text-lg font-bold text-navy">{p.t}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Industries ---------- */
export function Industries() {
  const list = [
    { icon: HomeIcon, t: "Real Estate" }, { icon: Stethoscope, t: "Healthcare" },
    { icon: Building2, t: "Construction" }, { icon: Utensils, t: "Restaurants" },
    { icon: ShoppingCart, t: "Retail" }, { icon: GraduationCap, t: "Education" },
    { icon: Globe2, t: "Corporate" }, { icon: ShoppingBag, t: "E-Commerce" },
    { icon: Plane, t: "Travel" }, { icon: Car, t: "Automotive" },
    { icon: Landmark, t: "Finance" }, { icon: Sparkles, t: "& More" },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Industries We Serve</span>
            <h2 className="mt-3 text-4xl font-extrabold text-navy md:text-5xl">Trusted across <span className="text-gold-gradient">every sector</span></h2>
          </div>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {list.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i % 6) * 0.05 }} viewport={{ once: true }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 transition hover:border-gold hover:shadow-elegant"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-navy transition group-hover:bg-gold-gradient">
                <it.icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold text-navy">{it.t}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
export function Testimonials() {
  const list = [
    { n: "Ahmed Al Mansoori", r: "CEO, Prime Realty Dubai", q: "AKVN Digital tripled our qualified leads within 90 days. Their Google Ads team is exceptional — every dirham spent is measured.", i: "https://i.pravatar.cc/120?img=12" },
    { n: "Sarah Khan", r: "Marketing Head, Bloom Clinic", q: "SEO rankings jumped from page 5 to top 3 in Dubai. Bookings are up 4x. The team is transparent and truly cares about ROI.", i: "https://i.pravatar.cc/120?img=45" },
    { n: "Rohan Sharma", r: "Founder, Urban Bites F&B", q: "Our Meta Ads finally became profitable. Creative, targeting, tracking — everything was handled end to end. Highly recommended.", i: "https://i.pravatar.cc/120?img=32" },
  ];
  return (
    <section className="bg-secondary/50 py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Client Testimonials</span>
            <h2 className="mt-3 text-4xl font-extrabold text-navy md:text-5xl">Real businesses. <span className="text-gold-gradient">Real growth.</span></h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {list.map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }} viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 shadow-glass"
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-navy/80">&ldquo;{t.q}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={t.i} alt={t.n} className="h-11 w-11 rounded-full object-cover" loading="lazy" />
                <div>
                  <div className="font-bold text-navy">{t.n}</div>
                  <div className="text-xs text-navy/60">{t.r}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA banner ---------- */
export function CTABanner() {
  return (
    <section className="py-16">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-navy p-10 text-white shadow-elegant md:p-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-cta/15 blur-3xl" />
            <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
                  Ready to <span className="text-gold-gradient">Generate More Leads?</span>
                </h2>
                <p className="mt-4 max-w-xl text-white/70">
                  Let&apos;s create a digital marketing strategy that helps your business attract more
                  customers, increase revenue and stay ahead of the competition.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Button asChild size="lg" className="h-14 w-full rounded-full bg-cta-gradient px-7 text-base font-bold text-cta-foreground shadow-glow hover:brightness-110 md:w-auto">
                  <Link to="/contact">Book Free Consultation <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 w-full rounded-full border-white/30 bg-transparent px-7 text-base font-semibold text-white hover:bg-white/10 hover:text-white md:w-auto">
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Now</a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Get In Touch</span>
          <h2 className="mt-3 text-4xl font-extrabold text-navy md:text-5xl">Let&apos;s build your <span className="text-gold-gradient">growth engine</span></h2>
          <p className="mt-4 text-navy/70">Tell us about your business. We&apos;ll respond within 24 hours with a tailored proposal.</p>

          <div className="mt-8 space-y-4">
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-gold hover:shadow-elegant">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold"><Phone className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-navy/50">Phone</div>
                <div className="font-semibold text-navy">{PHONE}</div>
              </div>
            </a>
            {/* <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-gold hover:shadow-elegant">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-cta text-white"><MessageCircle className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-navy/50">WhatsApp</div>
                <div className="font-semibold text-navy">{PHONE}</div>
              </div>
            </a> */}
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-gold hover:shadow-elegant">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold"><Mail className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-navy/50">Email</div>
                <div className="font-semibold text-navy">{EMAIL}</div>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold"><MapPin className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-navy/50">Office</div>
                <div className="font-semibold text-navy">{ADDRESS}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold"><Clock className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-navy/50">Business Hours</div>
                <div className="font-semibold text-navy">Sun–Thu · 9:00 – 18:00 GST</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Linkedin, Twitter].map((Ic, i) => (
              <a key={i} href="#" aria-label="Social" className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card text-navy transition hover:bg-navy hover:text-gold">
                <Ic className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={(e) => e.preventDefault()} className="glass-card rounded-3xl p-6 shadow-elegant md:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name"><Input placeholder="Your full name" className="h-12" /></Field>
              <Field label="Company"><Input placeholder="Company name" className="h-12" /></Field>
              <Field label="Phone / WhatsApp"><Input type="tel" placeholder={PHONE} className="h-12" /></Field>
              <Field label="Email"><Input type="email" placeholder="you@company.com" className="h-12" /></Field>
              <Field label="Services Interested" className="sm:col-span-2">
                <select className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-navy">
                  <option>Digital Marketing</option>
                  <option>Google Ads</option>
                  <option>Meta Ads</option>
                  <option>SEO</option>
                  <option>Social Media Marketing</option>
                  <option>Website Development</option>
                  <option>Mobile App Development</option>
                  <option>AI Marketing Solutions</option>
                </select>
              </Field>
              <Field label="Message" className="sm:col-span-2">
                <Textarea rows={4} placeholder="Tell us about your goals" />
              </Field>
            </div>
            <Button size="lg" className="mt-6 h-14 w-full rounded-full bg-cta-gradient text-base font-bold text-cta-foreground shadow-glow hover:brightness-110">
              Request Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-3 text-center text-xs text-navy/50">We reply within 24 hours. Prefer chat? <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="font-semibold text-navy underline">WhatsApp us</a>.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy/60">{label}</span>
      {children}
    </label>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  const linkGroups: Array<{ title: string; items: Array<{ label: string; to: string }> }> = [
    {
      title: "Company", items: [
        { label: "Home", to: "/" }, { label: "About Us", to: "/about" },
        { label: "Projects", to: "/work" }, { label: "Contact", to: "/contact" },
      ]
    },
    {
      title: "Services", items: [
        { label: "Digital Marketing", to: "/services" }, { label: "Google Ads", to: "/services" },
        { label: "Meta Ads", to: "/services" }, { label: "SEO", to: "/services" },
        { label: "Social Media", to: "/services" }, { label: "Website Development", to: "/services" },
        { label: "AI Solutions", to: "/services" },
      ]
    },
  ];
  return (
    <footer className="bg-navy-deep pt-20 pb-10 text-white/80">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="AKVN Digital"
              className="h-15 w-auto  object-contain rounded-sm"
            />
            <span className="text-xl font-extrabold tracking-tight text-white">AKVN<span className="text-gold">Digital</span></span>

          </Link>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              Driving business growth through digital marketing. Dubai&apos;s trusted partner for Google Ads, Meta Ads, SEO and web development. A division of AKVN Trading FZ LLC.
            </p>
            <div className="mt-5 space-y-2 text-sm text-white/70">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> {ADDRESS}</div>
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 hover:text-gold"><Phone className="h-4 w-4 text-gold" /> {PHONE}</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold"><MessageCircle className="h-4 w-4 text-gold" /> WhatsApp</a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-gold"><Mail className="h-4 w-4 text-gold" /> {EMAIL}</a>
            </div>
            {/* <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Linkedin, Twitter].map((Ic, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-white/70 transition hover:bg-gold-gradient hover:text-navy">
                  <Ic className="h-4 w-4" />
                </a>
              ))}
            </div> */}
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {linkGroups.map((g) => (
              <div key={g.title}>
                <div className="text-sm font-bold uppercase tracking-wider text-white">{g.title}</div>
                <ul className="mt-4 space-y-2">
                  {g.items.map(l => <li key={l.label}><Link to={l.to} className="text-sm text-white/60 transition hover:text-gold">{l.label}</Link></li>)}
                </ul>
              </div>
            ))}
            <div>
              <div className="text-sm font-bold uppercase tracking-wider text-white">Group</div>
              <ul className="mt-4 space-y-2">
                <li><a href="https://akvntrading.com" target="_blank" rel="noreferrer" className="text-sm text-white/60 transition hover:text-gold">akvntrading.com</a></li>
                <li><span className="text-sm text-white/60">AKVN Trading FZ LLC</span></li>
                <li><span className="text-sm text-white/60">UAE Registered</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
          <div>© {new Date().getFullYear()} AKVN Digital · AKVN Trading FZ LLC. All rights reserved.</div>
          <div>Made with intent in Dubai, UAE.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- WhatsApp Floating Button ---------- */
export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-cta text-white shadow-glow transition hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

/* ---------- Shell wrapper ---------- */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Nav />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
