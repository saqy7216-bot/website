import { useEffect, useState } from 'react';

const values = [
    { label: 'Innovation First', desc: 'Pushing boundaries with emerging technology.' },
    { label: 'Client-Centric', desc: 'Your success is the only metric that matters.' },
    { label: 'Quality Code', desc: 'Clean, maintainable, tested at every layer.' },
    { label: 'Agile Delivery', desc: 'Iterative sprints, continuous deployment.' },
];

export default function AboutSection({ isActive }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isActive) {
            const t = setTimeout(() => setVisible(true), 150);
            return () => clearTimeout(t);
        } else {
            setVisible(false);
        }
    }, [isActive]);

    return (
        <section className={`about-section ${visible ? 'visible' : ''}`}>
            <div className="section-inner about-inner">
                <div className="about-left">
                    <span className="section-label">Who We Are</span>
                    <h2 className="section-title">
                        A Team of Builders<br />
                        <em>Obsessed with Craft</em>
                    </h2>
                    <p className="about-text">
                        Founded in 2015, Rizon Technologies has grown from a small consultancy into
                        a full-stack digital product studio serving clients across 30+ countries.
                        We combine deep technical expertise with strategic thinking to deliver
                        software that doesn't just work — it wins.
                    </p>
                    <p className="about-text">
                        Our team of 80+ engineers, designers, and strategists is united by a single
                        belief: technology should empower people, not complicate their lives.
                    </p>
                    <div className="about-values">
                        {values.map((v, i) => (
                            <div key={i} className="value-item" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                                <div className="value-dot" />
                                <div>
                                    <strong>{v.label}</strong>
                                    <span>{v.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            
            </div>
        </section>
    );
}
