import { useEffect, useState, useRef } from "react";

export default function HeroSection({ isActive, scrollToSection }) {
    const [visible, setVisible] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            const t = setTimeout(() => setVisible(true), 100);
            // Resume video when section becomes active
            videoRef.current?.play().catch(() => {});
            return () => clearTimeout(t);
        } else {
            setVisible(false);
            // Pause when hidden to save resources
            videoRef.current?.pause();
        }
    }, [isActive]);

    return (
        <section className={`hero-section ${visible ? "visible" : ""}`}>
            {/* ── LEFT PANEL ─────────────────────────────────────────────── */}
            <div className="hero-left">
                {/* ── MOBILE-ONLY TECH SHAPES (inside hero-left so z-index works) ── */}
                <div className="hero-mobile-shapes" aria-hidden="true">
                    {/* Circuit-node cluster top-right */}
                    <svg className="mobile-shape shape-circuit" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.6"/>
                        <circle cx="60" cy="60" r="16" stroke="currentColor" strokeWidth="0.8" opacity="0.35"/>
                        <line x1="60" y1="44" x2="60" y2="8" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
                        <line x1="76" y1="60" x2="112" y2="60" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
                        <line x1="44" y1="60" x2="8" y2="60" stroke="currentColor" strokeWidth="0.8" opacity="0.2"/>
                        <line x1="60" y1="76" x2="60" y2="112" stroke="currentColor" strokeWidth="0.8" opacity="0.2"/>
                        <circle cx="60" cy="8" r="2.5" fill="currentColor" opacity="0.45"/>
                        <circle cx="112" cy="60" r="2.5" fill="currentColor" opacity="0.45"/>
                        <line x1="70" y1="50" x2="98" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.2"/>
                        <circle cx="98" cy="22" r="2" fill="currentColor" opacity="0.35"/>
                    </svg>

                    {/* Hexagon — bottom left */}
                    <svg className="mobile-shape shape-hex" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="40,5 72,25 72,65 40,85 8,65 8,25" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none"/>
                        <polygon points="40,20 58,32 58,58 40,70 22,58 22,32" stroke="currentColor" strokeWidth="0.6" opacity="0.15" fill="none"/>
                    </svg>

                    {/* Dot grid — bottom right */}
                    <svg className="mobile-shape shape-dots" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {[0,1,2,3].map(row =>
                            [0,1,2,3].map(col => (
                                <circle key={`${row}-${col}`} cx={8 + col * 15} cy={8 + row * 15} r="1.5" fill="currentColor" opacity={0.18 + (row + col) * 0.04}/>
                            ))
                        )}
                    </svg>

                    {/* Angle bracket accent */}
                    <svg className="mobile-shape shape-bracket" viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="30,10 10,40 30,70" stroke="currentColor" strokeWidth="1" opacity="0.18" fill="none" strokeLinecap="round"/>
                    </svg>
                </div>

                {/* Glowing orb */}

                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="line line-1">We Build</span>
                        <span className="line line-2">
                            <em>Digital</em> Futures
                        </span>
                        <span className="line line-3">That Matter</span>
                    </h1>

                    <p className="hero-desc">
                        Rizon Technologies crafts transformative software
                        solutions — from enterprise platforms to cutting-edge AI
                        integrations — that redefine what's possible for
                        businesses worldwide.
                    </p>

                    <div className="hero-ctas">
                        <button
                            className="btn-primary"
                            onClick={() => scrollToSection(1)}
                        >
                            <span>Explore Our Work</span>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                        <button
                            className="btn-ghost"
                            onClick={() => scrollToSection(2)}
                        >
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Scroll hint bottom-left — like Image 2's mouse icon */}
              
            </div>

            {/* ── DIAGONAL DIVIDER ───────────────────────────────────────── */}
            {/* <div className="hero-divider" aria-hidden="true">
                <div className="divider-glow" />
            </div> */}

            {/* ── RIGHT PANEL (video) ────────────────────────────────────── */}
            <div className="hero-right">
                {/*
                 * Place your video file at: public/videos/hero.mp4
                 * Recommended: 1920×1080, H.264, ~5–15s loop, no audio needed.
                 * The poster image shows while the video loads.
                 */}
                <video
                    ref={videoRef}
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                    <source src="/videos/hero.webm" type="video/webm" />
                </video>

                {/* Dark overlay so 10+ badge is legible */}
                <div className="hero-video-overlay" aria-hidden="true" />

                {/* Orb glow behind badge */}
                <div className="orb orb-1" aria-hidden="true" />
            </div>
        </section>
    );
}
