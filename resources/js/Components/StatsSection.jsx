import { useEffect, useState, useRef } from 'react';

const stats = [
    { value: 250, suffix: '+', label: 'Projects Delivered', desc: 'End-to-end digital products shipped' },
    { value: 98, suffix: '%', label: 'Client Retention', desc: 'Clients who return for more' },
    { value: 30, suffix: '+', label: 'Countries Served', desc: 'Global footprint of impact' },
];

function Counter({ target, suffix, isActive }) {
    const [count, setCount] = useState(0);
    const hasRun = useRef(false);

    useEffect(() => {
        if (!isActive || hasRun.current) return;
        hasRun.current = true;
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [isActive, target]);

    return <span>{count}{suffix}</span>;
}

export default function StatsSection({ isActive }) {
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
        <section className={`stats-section ${visible ? 'visible' : ''}`}>
            <div className="stats-bg-text" aria-hidden="true">IMPACT</div>
            <div className="section-inner">
                <div className="section-header center">
                    <span className="section-label">Our Impact</span>
                    <h2 className="section-title">
                        Numbers That<br />
                        <em>Tell Our Story</em>
                    </h2>
                </div>

                <div className="stats-grid">
                    {stats.map((s, i) => (
                        <div key={i} className="stat-card" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
                            <div className="stat-number">
                                <Counter target={s.value} suffix={s.suffix} isActive={isActive} />
                            </div>
                            <div className="stat-label">{s.label}</div>
                            <div className="stat-desc">{s.desc}</div>
                            <div className="stat-line" />
                        </div>
                    ))}
                </div>

              
            </div>
        </section>
    );
}
