import { useEffect, useState, useRef } from 'react';
import { useLanguage } from "@/Contexts/LanguageContext";

const stats = [
    { value: 250, suffix: '+', label: 'Projects Delivered', desc: 'End-to-end digital products shipped' },
    { value: 98, suffix: '%', label: 'Client Retention', desc: 'Clients who return for more' },
    { value: 30, suffix: '+', label: 'Cities Served', desc: 'footprint of impact' },
];

function Counter({ target, suffix, isActive }) {
    const [count, setCount] = useState(0);
    const hasRun = useRef(false);

    useEffect(() => {
        if (!isActive || hasRun.current) return;
        hasRun.current = true;
        const duration = 900;
        const steps = 40;
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

export default function StatsSection({ homes, isActive }) {
    const [visible, setVisible] = useState(false);
    const { language } = useLanguage();

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
                    <h2 className="section-title">
                        {language == "english" ? homes.title : homes.title_kurdish}

                    </h2>
                </div>

                <div className="stats-grid">
                        <div  className="stat-card" >
                            <div className="stat-number">
                                <Counter target={homes.number_1} suffix="+" isActive={isActive} />
                            </div>
                            <div className="stat-label">Projects Delivered</div>
                            <div className="stat-desc">End-to-end digital products shipped</div>
                            <div className="stat-line" />
                        </div>
                        <div  className="stat-card" >
                            <div className="stat-number">
                                <Counter target={homes.number_2} suffix="+" isActive={isActive} />
                            </div>
                            <div className="stat-label">Client Retention</div>
                            <div className="stat-desc">Clients who return for more</div>
                            <div className="stat-line" />
                        </div>
                        <div  className="stat-card">
                            <div className="stat-number">
                                <Counter target={homes.number_3} suffix="+" isActive={isActive} />
                            </div>
                            <div className="stat-label">Cities Served</div>
                            <div className="stat-desc">footprint of impact</div>
                            <div className="stat-line" />
                        </div>
                </div>


            </div>
        </section>
    );
}
