import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/Components/Navbar';
import HeroSection from '@/Components/HeroSection';
import ServicesSection from '@/Components/ServicesSection';
import AboutSection from '@/Components/AboutSection';
import StatsSection from '@/Components/StatsSection';
import WorkSection from '@/Components/WorkSection';
import TestimonialsSection from '@/Components/TestimonialsSection';
import ContactSection from '@/Components/ContactSection';
import ScrollIndicator from '@/Components/ScrollIndicator';

export default function Index({ categories = [] }) {
    const [activeSection, setActiveSection] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const containerRef = useRef(null);
    const sectionsRef = useRef([]);
    const totalSections = 6;

    const scrollToSection = (index) => {
        if (index < 0 || index >= totalSections || isScrolling) return;
        setIsScrolling(true);
        setActiveSection(index);
        sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => setIsScrolling(false), 900);
    };

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
            if (isScrolling) return;
            if (e.deltaY > 0) scrollToSection(activeSection + 1);
            else scrollToSection(activeSection - 1);
        };

        let touchStartY = 0;
        const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
        const handleTouchEnd = (e) => {
            const diff = touchStartY - e.changedTouches[0].clientY;
            if (Math.abs(diff) > 50) {
                if (diff > 0) scrollToSection(activeSection + 1);
                else scrollToSection(activeSection - 1);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') scrollToSection(activeSection + 1);
            if (e.key === 'ArrowUp' || e.key === 'PageUp') scrollToSection(activeSection - 1);
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeSection, isScrolling]);

    const setRef = (index) => (el) => { sectionsRef.current[index] = el; };

    // Lock body scroll — homepage controls scrolling via JS
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, []);

    return (
        <>
            <Head title="Rizon Technologies — Innovating the Future" />
            <div className="rizon-app" ref={containerRef}>
                <Navbar activeSection={activeSection} scrollToSection={scrollToSection} categories={categories} />
                <ScrollIndicator activeSection={activeSection} totalSections={totalSections} scrollToSection={scrollToSection} />

                <div className="sections-container">
                    <div ref={setRef(0)} className="section"><HeroSection isActive={activeSection === 0} scrollToSection={scrollToSection} /></div>
                    <div ref={setRef(1)} className="section"><ServicesSection isActive={activeSection === 1} /></div>
                    <div ref={setRef(2)} className="section"><AboutSection isActive={activeSection === 2} /></div>
                    <div ref={setRef(3)} className="section"><StatsSection isActive={activeSection === 3} /></div>
                    <div ref={setRef(4)} className="section"><WorkSection isActive={activeSection === 4} /></div>
                    <div ref={setRef(5)} className="section"><TestimonialsSection isActive={activeSection === 5} /></div>
                </div>
            </div>
        </>
    );
}