import { useEffect, useState } from 'react';

const testimonials = [
    {
        quote: "Rizon delivered our entire platform in 4 months — on time, on budget, and far beyond expectations. Their engineering quality is simply world-class.",
        name: "Sarah Chen",
        role: "CTO, NexBank",
        initials: "SC",
        color: "#0ea5e9",
    },
    {
        quote: "The team didn't just build software — they understood our medical workflow deeply and designed a system our staff actually wants to use. Remarkable.",
        name: "Dr. Amir Hassan",
        role: "Medical Director, MediFlow",
        initials: "AH",
        color: "#10b981",
    },
    {
        quote: "We've worked with 5 agencies before Rizon. None came close in terms of communication, technical depth, and delivering results that move the needle.",
        name: "James Okafor",
        role: "VP Engineering, CargoLink",
        initials: "JO",
        color: "#f59e0b",
    },
];

export default function TestimonialsSection({ isActive }) {
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (isActive) {
            const t = setTimeout(() => setVisible(true), 150);
            return () => clearTimeout(t);
        } else {
            setVisible(false);
        }
    }, [isActive]);

    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(() => {
            setActive(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isActive]);

    return (
        <section className={`testimonials-section ${visible ? 'visible' : ''}`}>
            <div className="section-inner">
                <div className="section-header center">
                    <span className="section-label">Client Love</span>
                    <h2 className="section-title">
                        Trusted by Teams<br />
                        <em>Around the World</em>
                    </h2>
                </div>

                <div className="testimonials-container">
                    <div className="testimonial-display">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className={`testimonial-card ${i === active ? 'active' : i === (active - 1 + testimonials.length) % testimonials.length ? 'prev' : 'next'}`}
                            >
                                <div className="quote-mark">"</div>
                                <p className="testimonial-quote">{t.quote}</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar" style={{ background: t.color }}>
                                        {t.initials}
                                    </div>
                                    <div>
                                        <strong>{t.name}</strong>
                                        <span>{t.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="testimonial-dots">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                className={`t-dot ${i === active ? 'active' : ''}`}
                                onClick={() => setActive(i)}
                            />
                        ))}
                    </div>
                </div>

                <div className="trust-logos">
                    {['NexBank', 'MediFlow', 'CargoLink', 'EduVerse', 'DataPulse', 'Synthex'].map((logo, i) => (
                        <div key={i} className="trust-logo">{logo}</div>
                    ))}
                </div>
            </div>
        </section>
    );
}
