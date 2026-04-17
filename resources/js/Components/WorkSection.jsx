import { useEffect, useState } from 'react';

const projects = [
    {
        id: '01',
        title: 'NexBank Platform',
        category: 'FinTech · Web App',
        desc: 'A real-time banking dashboard with AI-driven fraud detection, serving 2M+ users.',
        color: '#0ea5e9',
        accent: '#0369a1',
        tags: ['React', 'Laravel', 'AI', 'AWS'],
    },
    {
        id: '02',
        title: 'MediFlow EHR',
        category: 'HealthTech · SaaS',
        desc: 'Electronic health records system used by 500+ hospitals across Southeast Asia.',
        color: '#10b981',
        accent: '#047857',
        tags: ['React', 'PostgreSQL', 'HIPAA'],
    },
    {
        id: '03',
        title: 'CargoLink Logistics',
        category: 'Logistics · Mobile + Web',
        desc: 'End-to-end supply chain management platform with real-time GPS tracking.',
        color: '#f59e0b',
        accent: '#b45309',
        tags: ['React Native', 'Node.js', 'Maps API'],
    },
 
];

export default function WorkSection({ isActive }) {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        if (isActive) {
            const t = setTimeout(() => setVisible(true), 150);
            return () => clearTimeout(t);
        } else {
            setVisible(false);
        }
    }, [isActive]);

    return (
        <section className={`work-section ${visible ? 'visible' : ''}`}>
            <div className="section-inner">
                <div className="work-header">
                    <div>
                        <span className="section-label">Featured Work</span>
                        <h2 className="section-title">
                            Projects We're<br />
                            <em>Proud Of</em>
                        </h2>
                    </div>
                    <button className="btn-outline">View All Projects</button>
                </div>

                <div className="work-list">
                    {projects.map((p, i) => (
                        <div
                            key={i}
                            className={`work-item ${hovered === i ? 'hovered' : ''}`}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            style={{ animationDelay: `${0.1 + i * 0.1}s`, '--accent': p.color }}
                        >
                            <div className="work-item-left">
                                <span className="work-num">{p.id}</span>
                                <div className="work-info">
                                    <h3>{p.title}</h3>
                                    <span className="work-category">{p.category}</span>
                                </div>
                            </div>
                            <p className="work-desc">{p.desc}</p>
                            <div className="work-tags">
                                {p.tags.map((t, j) => (
                                    <span key={j} className="tag">{t}</span>
                                ))}
                            </div>
                            <div className="work-arrow">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                                </svg>
                            </div>
                            <div className="work-item-bg" style={{ background: p.color }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
