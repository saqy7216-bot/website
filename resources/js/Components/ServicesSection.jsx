import { useEffect, useState } from 'react';

const services = [
    {
        icon: '⬡',
        num: '01',
        title: 'Web Development',
        desc: 'High-performance web applications built with React, Laravel, and modern frameworks that scale with your business.',
        tags: ['React', 'Laravel', 'Next.js'],
    },
    {
        icon: '◈',
        num: '02',
        title: 'Mobile Applications',
        desc: 'Native and cross-platform mobile experiences that deliver seamless performance on iOS and Android.',
        tags: ['React Native', 'Flutter', 'Swift'],
    },
    {
        icon: '◉',
        num: '03',
        title: 'AI & Machine Learning',
        desc: 'Intelligent solutions that automate processes, uncover insights, and drive smarter decision-making.',
        tags: ['Python', 'TensorFlow', 'GPT-4'],
    },

];

export default function ServicesSection({ isActive }) {
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
        <section className={`services-section ${visible ? 'visible' : ''}`}>
            <div className="section-inner">
                <div className="section-header">
                    <span className="section-label">What We Do</span>
                    <h2 className="section-title">
                        Services Built for<br />
                        <em>Modern Businesses</em>
                    </h2>
                </div>

                <div className="services-grid">
                    {services.map((s, i) => (
                        <div
                            key={i}
                            className="service-card"
                            style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                        >
                            <div className="card-top">
                                <span className="card-icon">{s.icon}</span>
                                <span className="card-num">{s.num}</span>
                            </div>
                            <h3 className="card-title">{s.title}</h3>
                            <p className="card-desc">{s.desc}</p>
                            <div className="card-tags">
                                {s.tags.map((tag, j) => (
                                    <span key={j} className="tag">{tag}</span>
                                ))}
                            </div>
                            <div className="card-arrow">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
