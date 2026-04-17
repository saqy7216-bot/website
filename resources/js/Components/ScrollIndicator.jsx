export default function ScrollIndicator({ activeSection, totalSections, scrollToSection }) {
    return (
        <div className="scroll-indicator">
            {Array.from({ length: totalSections }).map((_, i) => (
                <button
                    key={i}
                    className={`scroll-dot ${activeSection === i ? 'active' : ''}`}
                    onClick={() => scrollToSection(i)}
                    aria-label={`Go to section ${i + 1}`}
                />
            ))}
        </div>
    );
}
