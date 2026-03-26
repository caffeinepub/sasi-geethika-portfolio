import { ExternalBlob } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  ArrowRight,
  Award,
  Brain,
  ChevronDown,
  Code2,
  Cpu,
  ExternalLink,
  FileText,
  GraduationCap,
  Linkedin,
  LogIn,
  LogOut,
  Mail,
  Menu,
  Rocket,
  Send,
  Sparkles,
  Upload,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  {
    title: "Technical Skills",
    icon: <Code2 className="w-5 h-5" />,
    items: [
      "C Programming",
      "Basic Python",
      "Problem Solving",
      "Algorithmic Thinking",
      "AI Concept Understanding",
    ],
    colorBg: "oklch(0.75 0.2 210 / 0.15)",
    colorIcon: "oklch(0.75 0.2 210)",
    tagBg: "oklch(0.75 0.2 210 / 0.12)",
    tagColor: "oklch(0.85 0.15 210)",
    tagBorder: "oklch(0.75 0.2 210 / 0.25)",
  },
  {
    title: "AI & Technology",
    icon: <Brain className="w-5 h-5" />,
    items: [
      "Artificial Intelligence",
      "Machine Learning",
      "AI Automation Systems",
      "Prompt Engineering",
    ],
    colorBg: "oklch(0.65 0.25 285 / 0.15)",
    colorIcon: "oklch(0.65 0.25 285)",
    tagBg: "oklch(0.65 0.25 285 / 0.12)",
    tagColor: "oklch(0.8 0.18 285)",
    tagBorder: "oklch(0.65 0.25 285 / 0.25)",
  },
  {
    title: "Soft Skills",
    icon: <Users className="w-5 h-5" />,
    items: ["Communication", "Teamwork", "Creativity", "Presentation Skills"],
    colorBg: "oklch(0.7 0.18 175 / 0.15)",
    colorIcon: "oklch(0.7 0.18 175)",
    tagBg: "oklch(0.7 0.18 175 / 0.12)",
    tagColor: "oklch(0.8 0.14 175)",
    tagBorder: "oklch(0.7 0.18 175 / 0.25)",
  },
];

const ACHIEVEMENTS = [
  {
    icon: <Award className="w-5 h-5" />,
    title: "SIH Internal Hackathon",
    org: "Geethanjali College of Engineering and Technology",
    desc: "Competed in the Smart India Hackathon internal selection round, developing innovative solutions for real-world challenges.",
    ocid: "achievements.item.1",
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: "IITH Hackathon",
    org: "IIT Hyderabad",
    desc: "Participated in a competitive hackathon hosted by IIT Hyderabad, collaborating with peers to build technical prototypes.",
    ocid: "achievements.item.2",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Invenza Ideathon",
    org: "Geethanjali College of Engineering and Technology",
    desc: "Conceived and presented an AI-powered application at the Invenza Ideathon conducted at Geethanjali College of Engineering and Technology.",
    ocid: "achievements.item.3",
  },
];

const EXPLORE_ITEMS = [
  {
    icon: <Brain className="w-4 h-4" />,
    text: "Artificial Intelligence Applications",
  },
  {
    icon: <Rocket className="w-4 h-4" />,
    text: "Hackathon Problem Solving",
  },
  {
    icon: <Code2 className="w-4 h-4" />,
    text: "Programming & Software Development",
  },
  {
    icon: <Sparkles className="w-4 h-4" />,
    text: "Innovative AI Project Ideas for Industry",
  },
];

const PROJECT_TAGS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Career Tech",
  "Student Tools",
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { actor } = useActor();
  const formRef = useRef<HTMLFormElement>(null);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    try {
      if (actor) {
        await actor.submitContact(
          formData.name,
          formData.email,
          formData.message,
        );
      }
      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── NAV ── */}
      <header className="nav-blur fixed top-0 left-0 right-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="font-display font-bold text-lg gradient-text"
            data-ocid="nav.link"
          >
            Sasi Geethika
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/40 font-body"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md"
            >
              <ul className="px-4 py-3 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.href)}
                      className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/40 transition-colors"
                      data-ocid="nav.link"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-bg.dim_1200x800.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "oklch(0.75 0.2 210)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full opacity-8 blur-3xl"
          style={{ background: "oklch(0.65 0.25 285)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="mb-4">
              <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border border-primary/30 text-primary bg-primary/5">
                <Cpu className="w-3 h-3" />
                AI & ML Engineering Student
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4"
            >
              Hi, I&apos;m <span className="gradient-text">Sasi Geethika</span>
              <br />
              <span className="text-foreground/90">Podila</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto"
            >
              Building intelligent systems that improve efficiency in
              industries, finance, and public services.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-3"
            >
              <Button
                onClick={() => scrollTo("#projects")}
                className="font-display font-semibold px-6 py-2.5 glow-primary transition-all hover:scale-105"
                data-ocid="hero.primary_button"
              >
                View Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollTo("#contact")}
                className="font-display font-semibold px-6 py-2.5 border-primary/40 hover:bg-primary/10 hover:border-primary/60 transition-all"
                data-ocid="hero.secondary_button"
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="text-xs font-mono tracking-widest uppercase">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} className="mb-12">
              <SectionLabel>About Me</SectionLabel>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3">
                Passionate About{" "}
                <span className="gradient-text">AI & Innovation</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              <motion.div
                variants={fadeUp}
                className="space-y-5 text-muted-foreground leading-relaxed"
              >
                <p>
                  I am a passionate technology student who enjoys learning new
                  tools and applying them to real-world problems. I have a
                  strong interest in AI-based systems, automation, and
                  data-driven decision making.
                </p>
                <p>
                  I enjoy working in teams, brainstorming creative solutions,
                  and building impactful projects that make a real difference.
                </p>
                <div className="pt-2 space-y-3">
                  <InfoRow
                    label="College"
                    value="Geethanjali College of Engineering and Technology, Kesara"
                  />
                  <InfoRow
                    label="Course"
                    value="B.Tech in Artificial Intelligence & Machine Learning"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <p className="text-sm font-mono text-primary tracking-widest uppercase mb-4">
                  Actively Explores
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {EXPLORE_ITEMS.map((item) => (
                    <div
                      key={item.text}
                      className="card-glass flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-foreground"
                    >
                      <span className="text-primary flex-shrink-0">
                        {item.icon}
                      </span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-24 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} className="mb-12">
              <SectionLabel>Skills</SectionLabel>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3">
                My <span className="gradient-text">Capabilities</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {SKILLS.map((skill) => (
                <motion.div
                  key={skill.title}
                  variants={fadeUp}
                  className="card-glass rounded-2xl p-6 hover:glow-primary transition-all duration-300 group"
                  data-ocid="skills.card"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: skill.colorBg }}
                    >
                      <span style={{ color: skill.colorIcon }}>
                        {skill.icon}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-base text-foreground">
                      {skill.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1 rounded-full font-body"
                        style={{
                          background: skill.tagBg,
                          color: skill.tagColor,
                          border: `1px solid ${skill.tagBorder}`,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} className="mb-12">
              <SectionLabel>Achievements</SectionLabel>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3">
                Milestones & <span className="gradient-text">Activities</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {ACHIEVEMENTS.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="card-glass rounded-2xl p-6 hover:glow-accent transition-all duration-300 relative overflow-hidden"
                  data-ocid={item.ocid}
                >
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-5"
                    style={{ background: "oklch(0.65 0.25 285)" }}
                  />
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: "oklch(0.65 0.25 285 / 0.15)",
                      color: "oklch(0.75 0.2 285)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-display font-semibold text-base text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-primary mb-3">
                    {item.org}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-24 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} className="mb-12">
              <SectionLabel>Projects</SectionLabel>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3">
                What I&apos;ve <span className="gradient-text">Built</span>
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="max-w-2xl">
              <div
                className="card-glass rounded-2xl overflow-hidden"
                data-ocid="projects.item.1"
              >
                <div
                  className="h-2"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.75 0.2 210), oklch(0.65 0.25 285))",
                  }}
                />
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: "oklch(0.75 0.2 210 / 0.12)",
                        color: "oklch(0.75 0.2 210)",
                      }}
                    >
                      <Brain className="w-6 h-6" />
                    </div>
                    <Badge
                      className="text-xs font-mono"
                      style={{
                        background: "oklch(0.65 0.25 285 / 0.15)",
                        color: "oklch(0.8 0.2 285)",
                        border: "1px solid oklch(0.65 0.25 285 / 0.3)",
                      }}
                    >
                      Ideathon Project
                    </Badge>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-3">
                    AI Career Guidance App
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    Designed an AI-based concept that suggests career paths
                    based on a user&apos;s interests, grades, and skills. The
                    system leverages machine learning to analyze individual
                    profiles and provide personalized, data-driven career
                    recommendations — helping students navigate their
                    professional futures with confidence.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {PROJECT_TAGS.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "oklch(0.75 0.2 210 / 0.08)",
                          color: "oklch(0.75 0.15 210)",
                          border: "1px solid oklch(0.75 0.2 210 / 0.2)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CERTIFICATES ── */}
      <CertificatesSection actor={actor} />

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} className="mb-12">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3">
                Let&apos;s <span className="gradient-text">Connect</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-lg">
                I&apos;m always open to new opportunities, collaborations, and
                interesting conversations. Feel free to reach out!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10">
              <motion.div variants={fadeUp} className="space-y-5">
                <p className="text-sm font-mono text-primary tracking-widest uppercase mb-6">
                  Reach Me At
                </p>
                <a
                  href="mailto:psasigeethika@gmail.com"
                  className="card-glass flex items-center gap-4 px-5 py-4 rounded-xl hover:glow-primary transition-all duration-300 group"
                  data-ocid="contact.link"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: "oklch(0.75 0.2 210 / 0.12)",
                      color: "oklch(0.75 0.2 210)",
                    }}
                  >
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">
                      Email
                    </p>
                    <p className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">
                      psasigeethika@gmail.com
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sasi-geethika-podila-274a0b380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-glass flex items-center gap-4 px-5 py-4 rounded-xl hover:glow-accent transition-all duration-300 group"
                  data-ocid="contact.link"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: "oklch(0.65 0.25 285 / 0.12)",
                      color: "oklch(0.65 0.25 285)",
                    }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">
                      LinkedIn
                    </p>
                    <p className="text-sm text-foreground font-medium group-hover:text-accent transition-colors">
                      Sasi Geethika Podila
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-accent transition-colors" />
                </a>
              </motion.div>

              <motion.div variants={fadeUp}>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="card-glass rounded-2xl p-6 space-y-4"
                  data-ocid="contact.panel"
                >
                  <p className="text-sm font-mono text-primary tracking-widest uppercase mb-5">
                    Send a Message
                  </p>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-name"
                      className="text-xs text-muted-foreground font-mono uppercase tracking-wider"
                    >
                      Name
                    </Label>
                    <Input
                      id="contact-name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      className="bg-muted/30 border-border/50 focus:border-primary/60 focus:ring-primary/20"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-email"
                      className="text-xs text-muted-foreground font-mono uppercase tracking-wider"
                    >
                      Email
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      className="bg-muted/30 border-border/50 focus:border-primary/60 focus:ring-primary/20"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-message"
                      className="text-xs text-muted-foreground font-mono uppercase tracking-wider"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell me about your project or just say hello..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      className="bg-muted/30 border-border/50 focus:border-primary/60 focus:ring-primary/20 resize-none"
                      data-ocid="contact.textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full font-display font-semibold glow-primary hover:scale-[1.02] transition-all"
                    data-ocid="contact.submit_button"
                  >
                    {submitting ? (
                      <>
                        <span className="mr-2 w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin inline-block" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border/40 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-mono">
            © {new Date().getFullYear()} Sasi Geethika Podila
          </p>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-primary">
      <span
        className="w-8 h-px"
        style={{ background: "oklch(0.75 0.2 210)" }}
      />
      {children}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
      <span className="text-xs font-mono text-primary uppercase tracking-wider flex-shrink-0 sm:w-24">
        {label}
      </span>
      <span className="text-sm text-foreground/80">{value}</span>
    </div>
  );
}

// ── CERTIFICATES SECTION COMPONENT ──
function CertificatesSection({
  actor,
}: { actor: import("@/backend").backendInterface | null }) {
  const {
    identity,
    login,
    clear: logout,
    isInitializing,
  } = useInternetIdentity();
  const [isAdmin, setIsAdmin] = useState(false);
  const [certificates, setCertificates] = useState<
    import("@/backend").CertificateRecord[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [certTitle, setCertTitle] = useState("");
  const [certFile, setCertFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!actor) return;
    const principal = identity?.getPrincipal().toString();
    const load = async () => {
      setLoading(true);
      try {
        const [certs, admin] = await Promise.all([
          actor.getAllCertificates(),
          actor.isCallerAdmin(),
        ]);
        setCertificates(certs);
        setIsAdmin(admin);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    void principal;
    load();
  }, [actor, identity]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !certFile || !certTitle.trim()) {
      toast.error("Please provide a title and select a file.");
      return;
    }
    setUploading(true);
    setUploadProgress(0);
    try {
      const bytes = new Uint8Array(await certFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setUploadProgress(pct),
      );
      await actor.uploadCertificate(certTitle.trim(), blob);
      toast.success("Certificate uploaded!");
      setCertTitle("");
      setCertFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      const certs = await actor.getAllCertificates();
      setCertificates(certs);
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const isPdf = (url: string) =>
    url.toLowerCase().includes(".pdf") ||
    url.toLowerCase().includes("application/pdf");

  return (
    <section id="certificates" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={fadeUp}
            className="mb-12 flex flex-col sm:flex-row sm:items-end gap-4 justify-between"
          >
            <div>
              <SectionLabel>Certificates</SectionLabel>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3">
                My <span className="gradient-text">Certifications</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-lg">
                Academic and professional certificates earned through
                competitions, workshops, and training programs.
              </p>
            </div>
            {!isInitializing && (
              <div>
                {identity ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="gap-2 border-border/50 text-muted-foreground hover:text-foreground"
                    data-ocid="certificates.toggle"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={login}
                    className="gap-2 border-primary/40 text-primary hover:bg-primary/10"
                    data-ocid="certificates.toggle"
                  >
                    <LogIn className="w-4 h-4" />
                    Admin Login
                  </Button>
                )}
              </div>
            )}
          </motion.div>

          {/* Upload form — admin only */}
          {isAdmin && identity && (
            <motion.div variants={fadeUp} className="mb-10">
              <form
                onSubmit={handleUpload}
                className="card-glass rounded-2xl p-6"
                data-ocid="certificates.panel"
              >
                <p className="text-sm font-mono text-primary tracking-widest uppercase mb-5">
                  Upload Certificate
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="cert-title"
                      className="text-xs text-muted-foreground font-mono uppercase tracking-wider"
                    >
                      Certificate Title
                    </Label>
                    <Input
                      id="cert-title"
                      placeholder="e.g. Python Fundamentals"
                      value={certTitle}
                      onChange={(e) => setCertTitle(e.target.value)}
                      className="bg-muted/30 border-border/50 focus:border-primary/60"
                      data-ocid="certificates.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="cert-file"
                      className="text-xs text-muted-foreground font-mono uppercase tracking-wider"
                    >
                      File (Image or PDF)
                    </Label>
                    <input
                      ref={fileInputRef}
                      id="cert-file"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setCertFile(e.target.files?.[0] ?? null)}
                      className="w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-primary/15 file:text-primary hover:file:bg-primary/25 cursor-pointer"
                      data-ocid="certificates.upload_button"
                    />
                  </div>
                </div>
                {uploading && (
                  <div
                    className="mb-4 space-y-1.5"
                    data-ocid="certificates.loading_state"
                  >
                    <div className="flex justify-between text-xs text-muted-foreground font-mono">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted/40 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${uploadProgress}%`,
                          background:
                            "linear-gradient(90deg, oklch(0.75 0.2 210), oklch(0.65 0.25 285))",
                        }}
                      />
                    </div>
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={uploading}
                  className="font-display font-semibold glow-primary"
                  data-ocid="certificates.submit_button"
                >
                  {uploading ? (
                    <>
                      <span className="mr-2 w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin inline-block" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 w-4 h-4" />
                      Upload
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          )}

          {/* Certificate grid */}
          {loading ? (
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center py-16"
              data-ocid="certificates.loading_state"
            >
              <span className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </motion.div>
          ) : certificates.length === 0 ? (
            <motion.div
              variants={fadeUp}
              className="text-center py-16 text-muted-foreground"
              data-ocid="certificates.empty_state"
            >
              <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-mono text-sm">No certificates uploaded yet.</p>
            </motion.div>
          ) : (
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {certificates.map((cert, idx) => {
                const url = cert.blob.getDirectURL();
                const pdf = isPdf(url);
                return (
                  <a
                    key={cert.name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-glass rounded-2xl overflow-hidden hover:glow-primary transition-all duration-300 group flex flex-col"
                    data-ocid={`certificates.item.${idx + 1}`}
                  >
                    <div
                      className="h-1.5"
                      style={{
                        background:
                          "linear-gradient(90deg, oklch(0.75 0.2 210), oklch(0.65 0.25 285))",
                      }}
                    />
                    {pdf ? (
                      <div className="flex-1 flex flex-col items-center justify-center py-10 gap-3">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{
                            background: "oklch(0.65 0.25 285 / 0.12)",
                            color: "oklch(0.65 0.25 285)",
                          }}
                        >
                          <FileText className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                          PDF Document
                        </span>
                      </div>
                    ) : (
                      <div className="relative h-44 overflow-hidden bg-muted/20">
                        <img
                          src={url}
                          alt={cert.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4 flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate">
                        {cert.name}
                      </p>
                      <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
                    </div>
                  </a>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
