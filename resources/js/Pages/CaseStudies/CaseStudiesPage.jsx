import { useEffect, useState, useRef } from "react";
import Navbar from "@/Components/Navbar";
import { Link } from "@inertiajs/react";
import { useLanguage } from "@/Contexts/LanguageContext";

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
    const [activeFilter, setActiveFilter] = useState("All");
    const [expandedCard, setExpandedCard] = useState(null);
    const { language } = useLanguage();

    // const filtered =
    //     activeFilter === "All"
    //         ? caseStudies
    //         : caseStudies.filter((cs) => cs.category === activeFilter);

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
                                        alt={`${ cs.title} mockup`}
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
                                        {language=="english" ? cs.title : cs.title_kurdish}
                                    </h3>
                                   
                                    <p className="cs-card-desc">{language=="english" ? cs.description : cs.description_kurdish}</p>
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
                    <Link href="/contacts" className="btn-primary">
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
