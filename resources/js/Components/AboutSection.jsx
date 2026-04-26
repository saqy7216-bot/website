import { useEffect, useState, useRef } from 'react';
import { useLanguage } from "@/Contexts/LanguageContext";

export default function AboutSection({ homes, isActive }) {
    const [visible, setVisible] = useState(false);
    const videoRef = useRef(null);
    const { language } = useLanguage();

    useEffect(() => {
        if (isActive) {
            const t = setTimeout(() => setVisible(true), 150);
            videoRef.current?.play().catch(() => { });
            return () => clearTimeout(t);
        } else {
            setVisible(false);
            videoRef.current?.pause();
        }
    }, [isActive]);

    return (
        <section className={`about-section ${visible ? 'visible' : ''}`}>
            <div className="section-inner about-inner">
                {/* ── LEFT PANEL ─────────────────────────────────────────── */}
                <div className="about-left">
                    <h2 className="section-title">
                        {language == "english" ? homes.title : homes.title_kurdish}
                    </h2>
                    <p className="about-text">
                        {language == "english" ? homes.sub_title : homes.sub_title_kurdish}

                    </p>

                </div>

                {/* ── RIGHT PANEL (video) ─────────────────────────────────── */}
                <div className="about-right">
                    <video
                        ref={videoRef}
                        className="about-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-hidden="true"
                    >
                        <source src="/videos/about.mp4" type="video/mp4" />
                        <source src="/videos/about.webm" type="video/webm" />
                    </video>

                    {/* Dark overlay for readability */}
                    <div className="about-video-overlay" aria-hidden="true" />

                    {/* Optional decorative orb — matches hero */}
                    <div className="orb orb-about" aria-hidden="true" />
                </div>
            </div>
        </section>
    );
}