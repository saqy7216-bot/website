import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from '@inertiajs/react';
import { useLanguage } from '@/Contexts/LanguageContext';
import { useTheme } from '@/Contexts/ThemeContext';
import { useRoute } from "../../../vendor/tightenco/ziggy";

// ── Theme Toggle ─────────────────────────────────────────────────────────────
function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? (
                /* Sun icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
            ) : (
                /* Moon icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            )}
        </button>
    );
}

const LANGUAGES = [
    { key: 'english', label: 'English',  short: 'EN' },
    { key: 'kurdish',  label: 'کوردی',  short: 'KU' },
];

// ── Language Switcher ─────────────────────────────────────────────────────────
function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const current = LANGUAGES.find(l => l.key === language) || LANGUAGES[0];

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className="lang-switcher" ref={ref}>
            <button
                className={`lang-trigger ${open ? 'open' : ''}`}
                onClick={() => setOpen(o => !o)}
                aria-label="Switch language"
                aria-expanded={open}
            >
                <span className="lang-flag">{current.flag}</span>
                <span className="lang-short">{current.short}</span>
                <svg className={`lang-chevron ${open ? 'rotated' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>
            {open && (
                <div className="lang-dropdown" role="listbox">
                    {LANGUAGES.map(lang => (
                        <button
                            key={lang.key}
                            role="option"
                            aria-selected={language === lang.key}
                            className={`lang-option ${language === lang.key ? 'active' : ''}`}
                            onClick={() => { setLanguage(lang.key); setOpen(false); }}
                        >
                            <span className="lang-flag">{lang.flag}</span>
                            <span className="lang-option-label">{lang.label}</span>
                            {language === lang.key && (
                                <svg className="lang-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Mega menu column — 2 levels: root → subcategory → products ───────────────
function CategoryColumn({ node, onClose }) {
    return (
        <div className="mega-col">
            {/* Root category heading */}
            <Link
                href={`/products?category=${node.slug}`}
                className="mega-col-title"
                onClick={onClose}
            >
                {node.name}
            </Link>

            {/* Products sitting directly on the root (e.g. Batteries, PV Module) */}
            {node.products?.map(p => (
                <Link key={p.id} href={`/products/${p.slug}`}
                    className="mega-product-link" onClick={onClose}>
                    <span className="mega-arrow">▶</span>{p.name}
                </Link>
            ))}

            {/* Sub-categories with their products */}
            {node.subcategories?.map(sub => (
                <div key={sub.id} className="mega-subgroup">
                    <Link
                        href={`/products?category=${sub.slug}`}
                        className="mega-sub-title"
                        onClick={onClose}
                    >
                        {sub.name}
                    </Link>
                    {sub.products?.map(p => (
                        <Link key={p.id} href={`/products/${p.slug}`}
                            className="mega-product-link" onClick={onClose}>
                            <span className="mega-arrow">▶</span>{p.name}
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );
}

// ── Mega Menu ─────────────────────────────────────────────────────────────────
// FIX: uses a "bridge" element between the nav button and the panel so the
// cursor never leaves a hoverable area when moving diagonally downward.
function MegaMenu({ categories, isOpen, onMouseEnter, onMouseLeave, onClose }) {
    if (!isOpen || !categories?.length) return null;

    return (
        <>
            {/* Invisible bridge: fills the gap between nav bar bottom and menu top */}
            <div className="mega-bridge" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />

            <div
                className="mega-menu"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div className="mega-menu-inner">
                    {categories.map(cat => (
                        <CategoryColumn key={cat.id} node={cat} onClose={onClose} />
                    ))}
                </div>
            </div>
        </>
    );
}

// ── Mobile category accordion — 2 levels ─────────────────────────────────────
function MobileCategoryTree({ node, onClose }) {
    const [open, setOpen] = useState(false);
    const hasSubs     = node.subcategories?.length > 0;
    const hasProducts = node.products?.length > 0;
    const isExpandable = hasSubs || hasProducts;

    return (
        <div className="mob-tree-node">
            {/* Root row */}
            <button
                className={`mob-tree-row mob-tree-depth-0 ${open ? 'open' : ''}`}
                onClick={() => isExpandable && setOpen(o => !o)}
            >
                <span className="mob-tree-label">{node.name}</span>
                {isExpandable && (
                    <svg className={`mob-tree-chevron ${open ? 'rotated' : ''}`}
                        width="13" height="13" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                )}
            </button>

            {open && (
                <div className="mob-tree-children">
                    {/* Direct products on root (Batteries, PV Module) */}
                    {node.products?.map(p => (
                        <Link key={p.id} href={`/products/${p.slug}`}
                            className="mob-product-link" onClick={onClose}>
                            <span className="mega-arrow">▶</span>{p.name}
                        </Link>
                    ))}

                    {/* Sub-categories */}
                    {node.subcategories?.map(sub => (
                        <MobileSubCategory key={sub.id} sub={sub} onClose={onClose} />
                    ))}
                </div>
            )}
        </div>
    );
}

function MobileSubCategory({ sub, onClose }) {
    const [open, setOpen] = useState(false);
    const hasProducts = sub.products?.length > 0;

    return (
        <div className="mob-tree-node">
            <button
                className={`mob-tree-row mob-tree-depth-1 ${open ? 'open' : ''}`}
                onClick={() => hasProducts && setOpen(o => !o)}
            >
                <span className="mob-tree-label">{sub.name}</span>
                {hasProducts && (
                    <svg className={`mob-tree-chevron ${open ? 'rotated' : ''}`}
                        width="13" height="13" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                )}
            </button>
            {open && (
                <div className="mob-tree-children">
                    {sub.products?.map(p => (
                        <Link key={p.id} href={`/products/${p.slug}`}
                            className="mob-product-link indented" onClick={onClose}>
                            <span className="mega-arrow">▶</span>{p.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Mobile drawer ─────────────────────────────────────────────────────────────
function MobileDrawer({ isOpen, categories, activeSection, scrollToSection, onClose, route }) {
    // Lock body scroll when drawer open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            {isOpen && <div className="mob-backdrop" onClick={onClose} />}

            <div className={`mob-drawer ${isOpen ? 'open' : ''}`}>
                <nav className="mob-drawer-nav">
                    <Link className="mob-nav-item" href={route("home")} onClick={() => {  onClose(); }}>
                        Home
                    </Link>

                    {/* Products accordion — each root category gets its own tree */}
                    <div className="mob-products-section">
                        <Link href={route("categories")} className="mob-products-label">Products</Link>
                        {/* <div className="mob-products-tree">
                            {categories.map(cat => (
                                <MobileCategoryTree
                                    key={cat.id}
                                    node={cat}
                                    depth={0}
                                    onClose={onClose}
                                />
                            ))}
                        </div> */}
                    </div>

                    <Link className="mob-nav-item" href={route("about")} onClick={onClose}>About</Link>
                    <Link className="mob-nav-item" href={route("case-studies")} onClick={onClose}>Case Study</Link>
                    <Link className="mob-nav-item" href={route('contacts')} onClick={onClose}>
                        Contact
                    </Link>
                </nav>

              
            </div>
        </>
    );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar({ activeSection, scrollToSection, categories = [] }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [megaOpen, setMegaOpen]     = useState(false);
    const [scrolled, setScrolled]     = useState(false);
    const route = useRoute();

    // Delayed close so cursor can travel from button → menu
    const closeTimer = useRef(null);

    const openMega  = useCallback(() => {
        clearTimeout(closeTimer.current);
        setMegaOpen(true);
    }, []);

    const closeMega = useCallback(() => {
        closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
    }, []);

    useEffect(() => () => clearTimeout(closeTimer.current), []);
    useEffect(() => { setScrolled(activeSection > 0); }, [activeSection]);

    return (
        <>
            <nav className={`rizon-nav ${scrolled ? 'scrolled' : ''} ${activeSection === 0 ? 'on-hero' : ''}`}>
                <div className="nav-inner">
                    {/* Logo */}
                    <a className="nav-logo" onClick={() => scrollToSection?.(0)} href="/">
                        <span className="logo-mark">R</span>
                        <span className="logo-text">RIZON<em>TECH</em></span>
                    </a>

                    {/* Desktop links */}
                    <ul className="nav-links desktop-only">
                        <li>
                            <Link
                                className={`nav-link`}
                                href={route("home")}
                                onClick={() => scrollToSection?.(0)}
                            >
                                Home
                            </Link>
                        </li>

                        {/* Products trigger */}
                        <li
                            className="has-mega"
                            // onMouseEnter={openMega}
                            // onMouseLeave={closeMega}
                        >
                            <Link href={route("categories")} className={`nav-link ${megaOpen ? 'active' : ''}`}>
                                Products
                                <svg
                                    width="0" height="0" viewBox="0 0 0 0"
                                    fill="none" stroke="currentColor" strokeWidth="2.5"
                                    style={{ marginLeft: 4, transition: 'transform .25s', transform: megaOpen ? 'rotate(180deg)' : 'none' }}
                                >
                                    {/* <path d="M6 9l6 6 6-6" /> */}
                                </svg>
                            </Link>
                        </li>

                        <li><Link className="nav-link" href={route("about")}>About</Link></li>
                        <li><Link className="nav-link" href={route("case-studies")}>Case Study</Link></li>
                        <li>
                            <Link className="nav-link" href={route("contacts")}>
                                Contact
                            </Link>
                        </li>
                    </ul>

                    {/* Desktop right */}
                    <div className="nav-actions desktop-only">
                        <ThemeToggle />
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile right */}
                    <div className="mobile-right mobile-only">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        <button
                            className={`hamburger ${mobileOpen ? 'is-open' : ''}`}
                            onClick={() => setMobileOpen(o => !o)}
                            aria-label="Menu"
                        >
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                </div>

                {/* Mega menu lives here so it inherits the hover zone */}
                <MegaMenu
                    categories={categories}
                    isOpen={megaOpen}
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                    onClose={() => setMegaOpen(false)}
                />
            </nav>

            {/* Mobile full-screen drawer */}
            <MobileDrawer
                isOpen={mobileOpen}
                categories={categories}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                onClose={() => setMobileOpen(false)}
                route={route}
            />
        </>
    );
}