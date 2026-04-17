import { useEffect, useState, useRef } from "react";
import Navbar from "@/Components/Navbar";
import { useLanguage } from "@/Contexts/LanguageContext";

function useOnScreen(ref, threshold = 0.15) {
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

export default function AboutPage({
    stories = [],
    capabilities = [],
    milestones = [],
    categories = [],
}) {
    const heroRef = useRef(null);
    const storyRef = useRef(null);
    const capsRef = useRef(null);
    const timelineRef = useRef(null);
    const teamRef = useRef(null);
    const valuesRef = useRef(null);

    const heroVis = useOnScreen(heroRef, 0.1);
    const storyVis = useOnScreen(storyRef);
    const capsVis = useOnScreen(capsRef);
    const timelineVis = useOnScreen(timelineRef);
    const { language } = useLanguage();

    return (
        <div className="about-page">
            <Navbar categories={categories} />

            {/* ── Hero ── */}
            <section
                ref={heroRef}
                className={`ap-hero ${heroVis ? "visible" : ""}`}
            >
                <div className="ap-hero-bg-lines">
                    <div className="diag-line" />
                    <div className="diag-line" />
                    <div className="diag-line" />
                    <div className="diag-line" />
                </div>
                <div className="ap-hero-inner">
                    <span className="section-label">About Rizon</span>
                    <h1 className="ap-hero-title">
                        <span className="ap-line ap-line-1">We Engineer</span>
                        <span className="ap-line ap-line-2">
                            the <em>Future</em>
                        </span>
                    </h1>
                    <p className="ap-hero-desc">
                        A full-stack digital product studio combining deep
                        engineering expertise with strategic design — building
                        software that doesn't just work, it wins.
                    </p>
                </div>
            </section>

            {/* ── Story ── */}
            <section
                ref={storyRef}
                className={`ap-story ${storyVis ? "visible" : ""}`}
            >
                <div className="ap-story-inner">
                    <div className="ap-story-left">
                        <span className="section-label">Our Story</span>
                        <h2 className="section-title">
                            {language == "english"
                                ? stories[0]?.title
                                : stories[0]?.title_kurdish
                                }
                            <br />
                        </h2>
                    </div>
                    <div className="ap-story-right">
                        <p>{language == "english"
                                ? stories[0]?.description
                                : stories[0]?.description_kurdish
                                }</p>
                    </div>
                </div>
            </section>

            {/* ── Capabilities ── */}
            <section
                ref={capsRef}
                className={`ap-capabilities ${capsVis ? "visible" : ""}`}
            >
                <div className="ap-caps-inner">
                    <div className="section-header center">
                        <span className="section-label">What We Do</span>
                        <h2 className="section-title">
                            Full-Spectrum <em>Capabilities</em>
                        </h2>
                    </div>
                    <div className="ap-caps-grid">
                        {capabilities.map((cap, i) => (
                            <div
                                key={i}
                                className="ap-cap-card"
                                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                            >
                                <i className={cap.icon}></i>
                                <h3 className="ap-cap-title">
                                    {language == "english"
                                        ? cap.title
                                        : cap.title_kurdish
                                    }
                                </h3>
                                <p className="ap-cap-desc">
                                    {language == "english"
                                        ? cap.description
                                        : cap.description_kurdish
                                    }
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Timeline ── */}
            <section
                ref={timelineRef}
                className={`ap-timeline ${timelineVis ? "visible" : ""}`}
            >
                <div className="ap-timeline-inner">
                    <div className="section-header center">
                        <span className="section-label">Our Journey</span>
                        <h2 className="section-title">
                            Key <em>Milestones</em>
                        </h2>
                    </div>
                    <div className="ap-timeline-track">
                        <div className="ap-timeline-line" />
                        {milestones.map((m, i) => (
                            <div
                                key={i}
                                className={`ap-milestone ${i % 2 === 0 ? "left" : "right"}`}
                                style={{
                                    animationDelay: `${0.15 + i * 0.12}s`,
                                }}
                            >
                                <div className="ap-milestone-dot" />
                                <div className="ap-milestone-card">
                                    <span className="ap-milestone-year">
                                        {m.year}
                                    </span>
                                    <h4 className="ap-milestone-title">
                                        {language == "english"
                                            ? m.title
                                            : m.title_kurdish
                                        }
                                    </h4>
                                    <p className="ap-milestone-desc">
                                        {language == "english"
                                            ? m.description
                                            : m.description_kurdish
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
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
