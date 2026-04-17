import { useEffect, useState, useRef } from "react";
import Navbar from "@/Components/Navbar";
import { Link } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
const caseStudies = [
    {
        id: "01",
        title: "NexBank Digital Platform",
        desc: "A comprehensive digital banking platform serving over 2 million users across the Middle East. We built a real-time transaction engine, AI-powered fraud detection system, and an intuitive dashboard that reduced customer support tickets by 40%. The platform processes over $1.2B in transactions monthly with 99.99% uptime.",
        tags: ["React", "Laravel", "Python", "AWS", "AI/ML"],
        color: "#0ea5e9",
        gradient: "linear-gradient(135deg, #0ea5e9, #0369a1)",
        image: "/images/nexbank-mockup.png",
        link: "https://nexbank.example.com",
    },
    {
        id: "02",
        title: "MediFlow EHR System",
        category: "HealthTech",
        type: "SaaS Platform",
        client: "Southeast Asia Hospital Network",
        year: "2023",
        desc: "An electronic health records system deployed across 500+ hospitals in Southeast Asia. We designed a HIPAA-compliant architecture that handles patient data with zero breaches. The system integrates with 40+ medical devices and reduced patient check-in time from 12 minutes to under 2.",
        tags: ["React", "Node.js", "PostgreSQL", "HIPAA", "Docker"],
        color: "#10b981",
        gradient: "linear-gradient(135deg, #10b981, #047857)",
        icon: (
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),

        link: null,
    },
    {
        id: "03",
        title: "CargoLink Logistics",
        category: "Logistics",
        type: "Mobile + Web Platform",
        client: "CargoLink Corp.",
        year: "2023",
        desc: "An end-to-end supply chain management platform with real-time GPS tracking across 15,000+ vehicles. We built a route optimization engine using machine learning that cut fuel costs by 23% and delivery times by 18%. The mobile app gives drivers turn-by-turn navigation with offline support.",
        tags: ["React Native", "Node.js", "Maps API", "ML", "Redis"],
        color: "#f59e0b",
        gradient: "linear-gradient(135deg, #f59e0b, #b45309)",
        icon: (
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
        ),

        link: null,
    },
    {
        id: "04",
        title: "Aether Commerce",
        category: "E-Commerce",
        type: "Website & Platform",
        client: "Aether Lifestyle",
        year: "2024",
        desc: "A luxury e-commerce platform with a headless architecture serving 200K+ monthly visitors. We crafted a bespoke design language with 3D product viewers, AR try-on features, and a personalization engine that increased average order value by 34%. The checkout flow reduced cart abandonment by 28%.",
        tags: ["Next.js", "Three.js", "Shopify API", "Algolia", "Vercel"],
        color: "#a78bfa",
        gradient: "linear-gradient(135deg, #a78bfa, #7c3aed)",
        icon: (
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
        ),

        link: "https://aether-commerce.example.com",
    },
    {
        id: "05",
        title: "GridSense IoT Platform",
        category: "Energy & IoT",
        type: "Dashboard & Edge System",
        client: "GridSense Energy",
        year: "2022",
        desc: "A smart grid monitoring platform that processes telemetry from 80,000+ IoT sensors across renewable energy installations. We built real-time anomaly detection that predicts equipment failures 72 hours in advance, preventing $4.2M in downtime costs annually. The dashboard renders 2M+ data points with zero lag.",
        tags: ["Vue.js", "Go", "TimescaleDB", "MQTT", "Kubernetes"],
        color: "#f472b6",
        gradient: "linear-gradient(135deg, #f472b6, #db2777)",
        icon: (
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
        ),

        link: null,
    },
    {
        id: "06",
        title: "Vaultix Cybersecurity Portal",
        category: "Cybersecurity",
        type: "Website & Web App",
        client: "Vaultix Security Inc.",
        year: "2024",
        desc: "A threat intelligence portal and corporate website for a leading cybersecurity firm. The public site showcases their capabilities with an interactive threat map, while the authenticated portal gives SOC teams real-time visibility into incidents, automated playbooks, and compliance reporting across 12 regulatory frameworks.",
        tags: ["React", "Python", "Elasticsearch", "D3.js", "Azure"],
        color: "#ef4444",
        gradient: "linear-gradient(135deg, #ef4444, #b91c1c)",
        icon: (
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),

        link: "https://vaultix.example.com",
    },
];

const categories = [
    "All",
    "FinTech",
    "HealthTech",
    "Logistics",
    "E-Commerce",
    "Energy & IoT",
    "Cybersecurity",
];

function useOnScreen(ref, threshold = 0.1) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold },
        );
        obs.observe(ref.current);
        return () => obs.disconnect();
    }, [ref, threshold]);
    return visible;
}

export default function CaseStudiesPage({ caseStudies = [], categories: navCategories = [] }) {
    const heroRef = useRef(null);
    const gridRef = useRef(null);
    const heroVis = useOnScreen(heroRef);
    const gridVis = useOnScreen(gridRef);
    const route = useRoute();
    const [activeFilter, setActiveFilter] = useState("All");
    const [expandedCard, setExpandedCard] = useState(null);

    const filtered =
        activeFilter === "All"
            ? caseStudies
            : caseStudies.filter((cs) => cs.category === activeFilter);

    return (
        <div className="cs-page">
            <Navbar categories={navCategories} />

            {/* ── Hero ── */}
            <section
                ref={heroRef}
                className={`cs-hero ${heroVis ? "visible" : ""}`}
            >
                <div className="cs-hero-bg-lines">
                    <div className="diag-line" />
                    <div className="diag-line" />
                    <div className="diag-line" />
                    <div className="diag-line" />
                </div>
                <div className="cs-hero-inner">
                    <span className="section-label">Case Studies</span>
                    <h1 className="cs-hero-title">
                        <span className="ap-line ap-line-1">Work That</span>
                        <span className="ap-line ap-line-2">
                            <em>Speaks</em> for Itself
                        </span>
                    </h1>
                    <p className="cs-hero-desc">
                        From FinTech platforms processing billions to IoT
                        systems monitoring 80,000+ sensors — here's how we turn
                        ambitious ideas into production-grade software.
                    </p>
                  
                </div>
            </section>

      

            {/* ── Case Studies Grid ── */}
            <section
                ref={gridRef}
                className={`cs-grid-section ${gridVis ? "visible" : ""}`}
            >
                <div className="cs-grid-inner">
                    <div className="cs-grid">
                        {caseStudies.map((cs, i) => (
                            <article
                                key={cs.id}
                                className={`cs-card ${expandedCard === cs.id ? "expanded" : ""}`}
                                style={{ animationDelay: `${0.08 + i * 0.1}s` }}
                            >
                                {/* Background visual — blurred gradient with icon */}
                                <div
                                    className="cs-card-bg"
                                    style={{ background: cs.gradient }}
                                >
                                    {/* Dot pattern overlay */}
                                    <img
                                        src={`/images/software.jpg`}    
                                        alt={`${cs.title} mockup`}
                                        className="cs-card-mockup"
                                    />
                                    <svg
                                        className="cs-card-bg-pattern"
                                        width="100%"
                                        height="100%"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <defs>
                                            <pattern
                                                id={`dots-${cs.id}`}
                                                width="24"
                                                height="24"
                                                patternUnits="userSpaceOnUse"
                                            >
                                                <circle
                                                    cx="2"
                                                    cy="2"
                                                    r="0.7"
                                                    fill="rgba(255,255,255,0.12)"
                                                />
                                            </pattern>
                                        </defs>
                                        <rect
                                            width="100%"
                                            height="100%"
                                            fill={`url(#dots-${cs.id})`}
                                        />
                                    </svg>
                                </div>

                                {/* Fade overlay — blurs bottom into content */}
                                <div className="cs-card-fade" />

                                {/* Content layer */}
                                <div className="cs-card-content">
                                    
                                    <h3 className="cs-card-title">
                                        {cs.title}
                                    </h3>
                                   
                                    <p className="cs-card-desc">{cs.description}</p>
                                    <div className="cs-card-bottom">
                                    

                                        {cs.link && (
                                            <a
                                                href={cs.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="cs-card-btn"
                                            >
                                                <span className="cs-card-btn-title">Visit Website</span>
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="cs-card-btn-icon"
                                                >
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                    <polyline points="15 3 21 3 21 9" />
                                                    <line
                                                        x1="10"
                                                        y1="14"
                                                        x2="21"
                                                        y2="3"
                                                    />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="cs-cta">
                <div className="cs-cta-inner">
                    <h2 className="section-title">
                        Ready to Be Our Next <em>Success Story</em>?
                    </h2>
                    <p className="cs-cta-desc">
                        We'd love to learn about your project. Let's talk about
                        how we can build something extraordinary together.
                    </p>
                    <Link href={route("contacts")} className="btn-primary">
                        <span>Start a Conversation</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="site-footer">
                <span>© 2025 Rizon Technologies. All rights reserved.</span>
                <div className="footer-links">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">LinkedIn</a>
                    <a href="#">GitHub</a>
                </div>
            </footer>
        </div>
    );
}
