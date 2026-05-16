import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, Code2, Database, BrainCircuit, LineChart, 
  Briefcase, GraduationCap, Mail, User,
  ExternalLink, Menu, X, ChevronRight,
  CheckCircle2,LayoutTemplate, PenTool, Bug, Layers, Smartphone, FileCheck,
  Sun, Moon
} from "lucide-react";

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 3.6 2.9 5.5 5.9 5.5-.3.3-.6.8-.6 1.5V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const greetings = ["Hello", "Bonjour", "Hola", "नमस्ते", "こんにちは", "Welcome"];

const WelcomeScreen = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 350);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => onComplete(), 1000);
      return () => clearTimeout(timer);
    }
  }, [index, onComplete]);

  return (
    <motion.div 
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-page text-ink selection-theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="text-4xl md:text-7xl font-bold flex items-center gap-4 tracking-tighter"
        >
          <span className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-accent animate-pulse" />
          {greetings[index]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState("fullstack");
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    try {
      const stored = localStorage.getItem("portfolio-theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch {
      /* ignore */
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#020617" : "#eef2f7");
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    // Disable scrolling while loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Expertise", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Contact", id: "contact" }
  ];

  const skillTabs = [
    { id: "fullstack", label: "Full Stack", icon: Code2 },
    { id: "uiux", label: "UI / UX", icon: PenTool },
    { id: "qa", label: "QA / Testing", icon: Bug },
  ];

  const skillData = {
    fullstack: [
      { name: "Next.js / React", icon: LayoutTemplate, level: 90 },
      { name: "Node.js / Express", icon: Terminal, level: 85 },
      { name: "MongoDB / MySQL", icon: Database, level: 80 },
      { name: "Python / ML", icon: BrainCircuit, level: 75 },
    ],
    uiux: [
      { name: "Figma Prototyping", icon: PenTool, level: 90 },
      { name: "User Research", icon: User, level: 80 },
      { name: "Responsive Design", icon: Smartphone, level: 95 },
      { name: "Tailwind / CSS Animations", icon: Layers, level: 90 },
    ],
    qa: [
      { name: "Automated Testing", icon: CheckCircle2, level: 85 },
      { name: "Manual Edge Testing", icon: FileCheck, level: 90 },
      { name: "Performance Audits", icon: LineChart, level: 80 },
      { name: "Jest / Cypress", icon: Bug, level: 75 },
    ]
  };

  const projects = [
    {
      title: "Library Management System",
      period: "Jun 2025 - Oct 2025",
      desc: "A robust, enterprise-grade library platform with an intuitive UI. Features include real-time notifications, a highly secure admin panel, and an advanced fines handling system. Rigorously QA tested for edge cases.",
      link: "https://next-lms-cyan.vercel.app",
      tags: ["Next.js", "MongoDB", "UI/UX", "System Testing"],
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "Insurance Fraud Detection (ML)",
      period: "Jan 2026 - Apr 2026",
      desc: "Engineered a machine learning pipeline to detect fraudulent claims. Designed intuitive data visualization dashboards and implemented exhaustive test cases to validate model accuracy against false positives.",
      link: "https://ml-project-bice.vercel.app",
      tags: ["Python", "Scikit-Learn", "Data Visualization"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "Premium E-Commerce UX",
      period: "Nov 2024 - Mar 2025",
      desc: "Developed a modern, conversion-driven shopping platform. Focused heavily on micro-interactions, accessibility, and a seamless checkout flow. Implemented extensive QA protocols to ensure transaction reliability.",
      link: "https://angular-ecommerce-rho-blond.vercel.app",
      tags: ["Angular", "Tailwind CSS", "E2E Testing", "UX Research"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000",
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {loading && <WelcomeScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-page text-ink selection:bg-accent-strong/30 font-sans overflow-x-hidden">
        {/* Dynamic Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-600/10 blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[150px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        </div>

        {/* Navbar */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-nav backdrop-blur-xl border-b border-glass-border py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold tracking-tighter flex items-center gap-3 cursor-pointer group"
              onClick={() => scrollToSection('home')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-white font-black group-hover:scale-105 transition-transform shadow-lg shadow-teal-500/20">
                CB
              </div>
              <span>Charmi Bhalodiya<span className="text-accent"></span></span>
            </motion.div>

            <div className="hidden md:flex gap-8 items-center bg-glass px-8 py-3 rounded-full border border-glass-border backdrop-blur-md">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-semibold transition-all hover:text-accent ${activeSection === link.id ? 'text-accent scale-105' : 'text-muted'}`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={toggleTheme} 
                className="p-3 rounded-full bg-glass border border-glass-border hover:bg-glass hover:text-accent transition-all text-ink"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a href="/Bhalodiya_Charmi_Resume.pdf" download className="px-6 py-3 rounded-full bg-glass border border-glass-border hover:bg-glass hover:border-teal-400/50 transition-all text-sm font-semibold flex items-center gap-2 text-ink">
                Resume <ChevronRight size={16} />
              </a>
            </div>

            <div className="flex items-center gap-4 md:hidden">
              <button onClick={toggleTheme} className="text-ink p-2 rounded-full bg-glass border border-glass-border">
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="text-ink p-2 rounded-full bg-glass border border-glass-border" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              className="fixed inset-0 z-40 bg-nav backdrop-blur-2xl pt-32 px-8 md:hidden flex flex-col gap-6"
            >
              {navLinks.map((link, i) => (
                <motion.button 
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(link.id)}
                  className="text-3xl font-bold text-left text-muted hover:text-accent border-b border-glass-border pb-4"
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.a 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                href="/charmi_resume.pdf" 
                download 
                className="mt-8 px-6 py-4 text-center rounded-2xl bg-accent-strong text-on-accent font-bold"
              >
                Download Resume
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-24 space-y-40">
          
          {/* HERO SECTION */}
          <section id="home" className="min-h-[85vh] flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: loading ? 1.2 : 0.1 }} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-glass border border-glass-border backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-strong"></span>
                </span>
                <span className="text-sm font-semibold tracking-wide text-muted">Available for new opportunities</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: loading ? 1.4 : 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]"
              >
                Engineer. <br/>
                <span className="text-gradient-hero">
                  Designer.
                </span> <br/>
                Tester.
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: loading ? 1.6 : 0.3 }}
                className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed"
              >
                I am a multidisciplinary digital creator bridging the gap between <strong className="text-ink">Full-Stack Development</strong>, intuitive <strong className="text-ink">UI/UX Design</strong>, and rigorous <strong className="text-ink">Quality Assurance</strong>. I build software that not only looks beautiful but performs flawlessly.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: loading ? 1.8 : 0.4 }}
                className="flex flex-wrap items-center gap-5"
              >
                <button onClick={() => scrollToSection('projects')} className="btn-primary">
                  Explore My Work
                </button>
                <div className="flex gap-4">
                  <a href="https://github.com/charmi1909" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-glass border border-glass-border text-ink hover:bg-accent-soft hover:text-accent hover:scale-110 transition-all">
                    <GithubIcon size={22} />
                  </a>
                  <a href="https://www.linkedin.com/in/charmi-bhalodiya-537947310/" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-glass border border-glass-border text-ink hover:bg-accent-soft hover:text-accent hover:scale-110 transition-all">
                    <LinkedinIcon size={22} />
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: loading ? 1.5 : 0.4, duration: 1 }}
              className="flex-1 relative w-full aspect-square max-w-[600px] hidden md:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 via-transparent to-purple-500/20 rounded-full blur-3xl animate-pulse" />
              
              <div className="absolute inset-8 rounded-full border border-glass-border flex items-center justify-center bg-surface/60 dark:bg-white/[0.04] backdrop-blur-sm">
                <div className="absolute inset-4 rounded-full border border-glass-border border-dashed animate-[spin_30s_linear_infinite]" />
                <div className="absolute inset-16 rounded-full border border-teal-500/20 animate-[spin_40s_linear_infinite_reverse]" />
                
                {/* Core Center */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-indigo-600 shadow-[0_0_60px_-10px_rgba(20,184,166,0.8)] flex items-center justify-center text-5xl font-black text-ink relative z-10">
                  CB
                </div>

                {/* Orbiting Elements */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 z-20">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-page p-3 rounded-xl border border-glass-border text-accent shadow-lg">
                    <Code2 size={24} />
                  </div>
                </motion.div>
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-10 z-20">
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-page p-3 rounded-xl border border-glass-border text-purple-700 dark:text-purple-300 shadow-lg">
                    <PenTool size={24} />
                  </div>
                </motion.div>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-20 z-20">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-page p-3 rounded-xl border border-glass-border text-rose-600 dark:text-rose-400 shadow-lg">
                    <Bug size={24} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* BENTO BOX ABOUT SECTION */}
          <section id="about" className="scroll-mt-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <div className="flex items-center gap-6 mb-12">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight"> <span className="text-gradient-teal">About me</span></h2>
                <div className="h-px flex-1 section-divider"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Main Bio Card */}
                <div className="md:col-span-2 bg-glass backdrop-blur-xl border border-glass-border p-8 md:p-12 rounded-[2rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent-strong/10 blur-[80px] rounded-full group-hover:bg-accent-strong/20 transition-all duration-700" />
                  <h3 className="text-2xl font-bold mb-6 text-ink flex items-center gap-3">
                    <User className="text-accent" /> My Story
                  </h3>
                  {/* <div className="space-y-6 text-subtle text-lg leading-relaxed">
                    <p>
                      I don't just write code; I craft comprehensive digital products. My journey began with a deep curiosity for how things work, leading me to master the entire software development lifecycle. 
                    </p>
                    <p>
                      By combining my skills as a <strong className="text-ink">Full Stack Developer</strong>, <strong className="text-ink">UI/UX Designer</strong>, and <strong className="text-ink">QA Engineer</strong>, I ensure that every project I touch is not only technically sound and visually stunning, but also entirely bulletproof and user-friendly. I believe a great product is one that doesn't compromise on any of these three pillars.
                    </p>
                    <p>
                      Beyond the screen, I apply my analytical mindset to data-driven Machine Learning problems, and I previously guided aspiring developers as a Web Designing Teaching Assistant.
                    </p>
                  </div> */}

                  <div className="space-y-6 text-muted text-lg leading-relaxed">
  <p>
    Hi! I'm <strong className="text-ink">Charmi Bhalodiya</strong> from Rajkot, Gujarat, currently pursuing my B.Tech in Computer Engineering at <strong className="text-ink">Darshan University</strong> with an expected graduation in 2027. I don't just write code; I craft complete digital products that combine creativity, functionality, and performance. My journey in technology began with a deep curiosity about how modern applications work, which inspired me to explore the entire software development lifecycle.
  </p>

  <p>
    By combining my skills as a <strong className="text-ink">Full Stack Developer</strong>, <strong className="text-ink">UI/UX Designer</strong>, and problem solver, I build applications that are not only technically strong but also visually engaging and user-friendly. I enjoy working with technologies like React, Next.js, Angular, Node.js, MongoDB, JavaScript, and TypeScript to create responsive and scalable web experiences. I believe great products are built through the perfect balance of clean design, efficient development, and seamless user experience.
  </p>

  <p>
    Beyond web development, I have a growing interest in <strong className="text-ink">Machine Learning</strong> and data-driven applications, where I enjoy exploring how intelligent systems can solve real-world problems. I continuously improve my skills through personal projects, problem-solving, and learning new technologies. When I’m not coding, I enjoy exploring modern design trends, experimenting with creative ideas, and building projects that challenge both my technical and creative abilities.
  </p>
</div>
                </div>

                {/* Role Cards */}
                <div className="flex flex-col gap-6">
                  <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-glass-border p-8 rounded-[2rem] flex-1 backdrop-blur-xl hover:-translate-y-2 transition-transform duration-300">
                    <LayoutTemplate className="text-indigo-600 dark:text-indigo-400 w-10 h-10 mb-4" />
                    <h4 className="text-xl font-bold text-ink mb-2">Development</h4>
                    <p className="text-sm text-muted">Architecting scalable, clean, and maintainable full-stack systems using modern frameworks.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-rose-500/10 to-orange-500/10 border border-glass-border p-8 rounded-[2rem] flex-1 backdrop-blur-xl hover:-translate-y-2 transition-transform duration-300">
                    <PenTool className="text-rose-600 dark:text-rose-400 w-10 h-10 mb-4" />
                    <h4 className="text-xl font-bold text-ink mb-2">UI / UX Design</h4>
                    <p className="text-sm text-muted">Creating wireframes, interactive prototypes, and designing highly engaging user interfaces.</p>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-glass-border p-8 rounded-[2rem] flex-1 backdrop-blur-xl hover:-translate-y-2 transition-transform duration-300">
                    <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 w-10 h-10 mb-4" />
                    <h4 className="text-xl font-bold text-ink mb-2">QA & Testing</h4>
                    <p className="text-sm text-muted">Implementing strict E2E, unit, and manual testing to deliver entirely bug-free software.</p>
                  </div>
                </div>

              </div>
            </motion.div>
          </section>

          {/* EXPERTISE SECTION */}
          <section id="skills" className="scroll-mt-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <div className="flex items-center gap-6 mb-12">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Core <span className="text-gradient-purple">Expertise</span></h2>
                <div className="h-px flex-1 section-divider"></div>
              </div>

              <div className="flex flex-wrap gap-4 mb-10">
                {skillTabs.map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveSkillTab(tab.id)}
                    className={`px-8 py-4 rounded-full text-sm md:text-base font-bold transition-all flex items-center gap-3 ${activeSkillTab === tab.id ? 'bg-accent-strong text-on-accent shadow-xl scale-105' : 'bg-glass border border-glass-border text-muted hover:bg-accent-soft hover:text-ink'}`}
                  >
                    <tab.icon size={18} /> {tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeSkillTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {skillData[activeSkillTab].map((skill, i) => (
                    <div key={skill.name} className="bg-glass border border-glass-border p-8 rounded-3xl backdrop-blur-xl group hover:border-teal-500/50 transition-colors">
                      <div className="w-14 h-14 rounded-2xl bg-glass flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent-strong/20 transition-all">
                        <skill.icon className="w-7 h-7 text-ink group-hover:text-accent" />
                      </div>
                      <h4 className="text-lg font-bold text-ink mb-4">{skill.name}</h4>
                      <div className="w-full bg-track rounded-full h-2 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="bg-gradient-to-r from-teal-400 to-indigo-500 h-full rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </section>

          {/* PROFESSIONAL SKILLS SECTION */}
          <section id="professional-skills" className="scroll-mt-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <div className="flex items-center gap-6 mb-12">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Professional <span className="text-gradient-orange">Skills</span></h2>
                <div className="h-px flex-1 section-divider"></div>
              </div>

              <div className="flex flex-wrap gap-4">
                {[
                  "Problem Solving", "Teamwork", "Communication", "Leadership", 
                  "Analytical Thinking", "Creativity", "Adaptability", 
                  "Project Management", "Decision Making", "Continuous Learning"
                ].map((skill, i) => (
                  <motion.div 
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-glass border border-glass-border px-6 py-3 rounded-full backdrop-blur-md flex items-center gap-3 hover:bg-glass hover:border-orange-500/50 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <span className="font-semibold text-ink">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* FEATURED PROJECTS */}
          <section id="projects" className="scroll-mt-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <div className="flex items-center gap-6 mb-16">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Featured <span className="text-gradient-teal">Work</span></h2>
                <div className="h-px flex-1 section-divider"></div>
              </div>

              <div className="space-y-16 md:space-y-32">
                {projects.map((project, i) => (
                  <motion.div 
                    key={project.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-16 items-center`}
                  >
                    {/* Project Image */}
                    <div className="w-full md:w-1/2 aspect-video rounded-[2rem] overflow-hidden relative group shadow-2xl shadow-teal-500/10">
                      <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      
                      {/* Floating UI Elements over image */}
                      <div className="absolute top-6 left-6 z-20 flex gap-2">
                        <div className="px-3 py-1 bg-ink/85 dark:bg-black/55 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/20">
                          {project.period}
                        </div>
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="w-full md:w-1/2 space-y-6">
                      <h3 className="text-3xl md:text-4xl font-bold text-ink">{project.title}</h3>
                      <p className="text-muted text-lg leading-relaxed">{project.desc}</p>
                      
                      <div className="flex flex-wrap gap-3 pt-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 rounded-full bg-glass border border-glass-border text-sm font-medium text-ink">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-6">
                        <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-strong hover:bg-accent text-on-accent font-bold transition-all hover:scale-105 shadow-lg shadow-teal-500/20">
                          View Live Project <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* EXPERIENCE & EDUCATION SECTION */}
          <section id="experience" className="scroll-mt-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="grid lg:grid-cols-2 gap-16">
              
              {/* Experience Timeline */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-full bg-accent-strong/20 flex items-center justify-center text-accent">
                    <Briefcase size={24} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
                </div>
                
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-teal-500 before:via-line before:to-transparent">
                  
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-page bg-accent-strong text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10" />
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-glass border border-glass-border p-6 rounded-2xl backdrop-blur-md shadow-xl hover:border-teal-500/30 transition-colors ml-4 md:ml-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                        <h3 className="font-bold text-xl text-ink">Data Analysis Intern</h3>
                        <time className="text-accent text-sm font-semibold">Mar 2026</time>
                      </div>
                      <p className="text-muted font-medium text-sm mb-4">CodeVeda Technologies</p>
                      <p className="text-muted text-sm leading-relaxed">Conducted deep data analysis, uncovering trends and anomalies. Assured data quality and performed comprehensive reporting.</p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-page bg-slate-700 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10" />
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-glass border border-glass-border p-6 rounded-2xl backdrop-blur-md shadow-xl hover:border-slate-500/30 transition-colors ml-4 md:ml-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                        <h3 className="font-bold text-xl text-ink">Teaching Assistant</h3>
                        <time className="text-muted text-sm font-semibold">Jul 2025</time>
                      </div>
                      <p className="text-muted font-medium text-sm mb-4">Web Designing Course</p>
                      <p className="text-muted text-sm leading-relaxed">Mentored students in modern web design principles, HTML/CSS semantics, and JavaScript fundamentals.</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Education Timeline */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-700 dark:text-purple-400">
                    <GraduationCap size={24} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
                </div>
                
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-line before:to-transparent">
                  
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-page bg-purple-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10" />
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-glass border border-glass-border p-6 rounded-2xl backdrop-blur-md shadow-xl hover:border-purple-500/30 transition-colors ml-4 md:ml-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                        <h3 className="font-bold text-xl text-ink">B.Tech Computer Science</h3>
                        <time className="text-purple-700 dark:text-purple-400 text-sm font-semibold">Expected 2027</time>
                      </div>
                      <p className="text-muted font-medium text-sm mb-4">Darshan University</p>
                      <div className="inline-block px-4 py-1.5 rounded-full bg-glass border border-glass-border text-sm font-bold text-ink">
                        CGPA: 7.08
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-page bg-slate-700 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10" />
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-glass border border-glass-border p-6 rounded-2xl backdrop-blur-md shadow-xl hover:border-slate-500/30 transition-colors ml-4 md:ml-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                        <h3 className="font-bold text-xl text-ink">HSC (PCM)</h3>
                        <time className="text-muted text-sm font-semibold">2023</time>
                      </div>
                      <p className="text-muted font-medium text-sm mb-4">Shree K.G. Dholakiya School</p>
                      <div className="inline-block px-4 py-1.5 rounded-full bg-glass border border-glass-border text-sm font-bold text-ink">
                        Score: 67%
                      </div>
                    </div>
                  </div>

                   <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-page bg-slate-700 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10" />
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-glass border border-glass-border p-6 rounded-2xl backdrop-blur-md shadow-xl hover:border-slate-500/30 transition-colors ml-4 md:ml-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                        <h3 className="font-bold text-xl text-ink">SSC</h3>
                        <time className="text-muted text-sm font-semibold">2021</time>
                      </div>
                      <p className="text-muted font-medium text-sm mb-4">Shree K.G. Dholakiya School</p>
                      <div className="inline-block px-4 py-1.5 rounded-full bg-glass border border-glass-border text-sm font-bold text-ink">
                        Score: 93%
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact" className="scroll-mt-32 pb-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <div className="bg-glass border border-glass-border rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent-strong/10 blur-[120px] rounded-full pointer-events-none" />
                
                <h2 className="text-5xl md:text-7xl font-black mb-8 relative z-10 tracking-tight">Let's Build <br/><span className="text-gradient-teal">Excellence.</span></h2>
                <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10">
                  Whether you need a full-stack architect, a meticulous QA engineer, or a creative UI/UX designer—I'm ready to bring immense value to your team.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                  <a href="mailto:charmibhalodiya19@gmail.com" className="btn-primary text-lg px-10 py-5 flex items-center gap-3 w-full sm:w-auto justify-center">
                    <Mail size={24} /> Say Hello
                  </a>
                  <a href="tel:+917770044411" className="btn-secondary text-lg px-10 py-5 flex items-center gap-3 w-full sm:w-auto justify-center">
                    +91 7770044411
                  </a>
                </div>

                <div className="flex items-center justify-center gap-8 mt-20 pt-10 border-t border-glass-border relative z-10">
                  <a href="https://github.com/charmi1909" target="_blank" rel="noreferrer" className="text-muted hover:text-ink hover:scale-110 transition-all">
                    <GithubIcon size={32} />
                  </a>
                  <a href="https://www.linkedin.com/in/charmi-bhalodiya-537947310/" target="_blank" rel="noreferrer" className="text-muted hover:text-ink hover:scale-110 transition-all">
                    <LinkedinIcon size={32} />
                  </a>
                </div>
              </div>
            </motion.div>
          </section>

        </main>
        
        {/* Footer */}
        <footer className="py-10 text-center text-muted border-t border-glass-border bg-page relative z-20">
          <p className="font-medium text-muted">© {new Date().getFullYear()} Charmi Bhalodiya. All rights reserved.</p>
          {/* <p className="text-sm mt-3 flex items-center justify-center gap-2">
            Engineered with React & <span className="px-2 py-1 rounded bg-accent-strong/10 text-accent font-semibold border border-teal-500/20">Tailwind CSS</span>
          </p> */}
        </footer>
      </div>
    </>
  );
}
