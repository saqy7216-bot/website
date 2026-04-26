import { useEffect, useState } from 'react';
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { Link } from '@inertiajs/react';
import { useLanguage } from "@/Contexts/LanguageContext";


export default function ServicesSection({ homes, capabilities = [], isActive }) {
    const [visible, setVisible] = useState(false);
    const route = useRoute();
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
        <section className={`services-section ${visible ? 'visible' : ''}`}>
            <div className="section-inner">
                <div className="section-header">
                    <div>
                     
                        <h2 className="section-title">
                            {language == "english" ? homes.title : homes.title_kurdish}
                        </h2>
                    </div>
                    <Link href={route("about")} className="btn-outline">View All Services</Link>

                </div>

                <div className="services-grid">
                    {capabilities.map((s, i) => (
                        <div
                            key={i}
                            className="service-card"
                            style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                        >

                            <h3 className="card-title">{language == "english" ? s.title : s.title_kurdish}</h3>
                            <p className="card-desc">{language == "english" ? s.description : s.description_kurdish}</p>


                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
