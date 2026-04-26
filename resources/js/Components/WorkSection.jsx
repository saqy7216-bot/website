import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useLanguage } from "@/Contexts/LanguageContext";


export default function WorkSection({ homes, caseStudies = [], isActive }) {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(null);
    const { language } = useLanguage();

    const route = useRoute();
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
                        <h2 className="section-title">
                            {language == "english" ? homes.title : homes.title_kurdish}

                        </h2>
                    </div>
                    <Link href={route("case-studies")} className="btn-outline">View All Projects</Link>
                </div>

                <div className="work-list">
                    {caseStudies.map((p, i) => (
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
                                    <h3>{language == "english" ? p.title : p.title_kurdish}</h3>
                                    <span className="work-category">{p.category}</span>
                                </div>
                            </div>
                            <p className="work-desc">{language == "english" ? p.description : p.description_kurdish}</p>
                            <div className="work-tags">

                                <a href={p.link} className="tag">View Project</a>

                            </div>

                            <div className="work-item-bg" style={{ background: p.color }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
