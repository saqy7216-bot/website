import { useEffect, useState, useRef } from "react";
import { Head, Link, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

/* ── Intersection-observer hook ── */
function useOnScreen(ref, threshold = 0.1) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold }
        );
        obs.observe(ref.current);
        return () => obs.disconnect();
    }, [ref, threshold]);
    return visible;
}

export default function CategoriesPage({
    categories = [],
    rootCategories = [],
    products = { data: [], links: [], current_page: 1, last_page: 1 },
    filters = {},
}) {
    const heroRef = useRef(null);
    const gridRef = useRef(null);
    const videoRef = useRef(null);
    const heroVis = useOnScreen(heroRef);
    const gridVis = useOnScreen(gridRef);

    const [search, setSearch] = useState(filters.search || "");
    const activeCategory = filters.category || null;

    /* debounced search */
    const searchTimeout = useRef(null);
    const handleSearch = (value) => {
        setSearch(value);
        clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            router.get(
                "/categories",
                { search: value || undefined, category: activeCategory || undefined },
                { preserveState: true, preserveScroll: true }
            );
        }, 400);
    };

    /* category filter */
    const selectCategory = (slug) => {
        const newCat = slug === activeCategory ? undefined : slug;
        router.get(
            "/categories",
            { category: newCat, search: search || undefined },
            { preserveState: true, preserveScroll: true }
        );
    };

    /* play/pause video on visibility */
    useEffect(() => {
        if (heroVis) videoRef.current?.play().catch(() => {});
    }, [heroVis]);

    /* Restore body scroll */
    useEffect(() => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
    }, []);

    const productList = products?.data ?? [];

    return (
        <div className="cat-page">
            <Head title="All Products — Rizon Technologies" />
            <Navbar categories={categories} />

            {/* ═══════════════════════════════════════════════════════════════
                HERO — split layout: text left, video right with gradient
               ═══════════════════════════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className={`cat-hero ${heroVis ? "visible" : ""}`}
            >
                {/* Left panel — text */}
                <div className="cat-hero-left">
                    <div className="cat-hero-content">
                        <span className="section-label">Products</span>
                        <h1 className="cat-hero-title">
                            <span className="cat-line cat-line-1">All</span>
                            <span className="cat-line cat-line-2">
                                <em>Products</em>
                            </span>
                        </h1>
                        <p className="cat-hero-desc">
                            Explore our full range of cutting-edge solutions —
                            from energy systems to smart infrastructure — built
                            to power the future.
                        </p>
                    </div>
                </div>

                {/* Right panel — video */}
                <div className="cat-hero-right">
                    <video
                        ref={videoRef}
                        className="cat-hero-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-hidden="true"
                    >
                        <source src="/videos/hero.mp4" type="video/mp4" />
                        <source src="/videos/hero.webm" type="video/webm" />
                    </video>
                    <div className="cat-hero-video-overlay" aria-hidden="true" />
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SEARCH BAR
               ═══════════════════════════════════════════════════════════════ */}
            <div className="cat-search-bar">
                <div className="cat-search-inner">
                    <svg
                        className="cat-search-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        className="cat-search-input"
                        placeholder="Search products by name..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {search && (
                        <button
                            className="cat-search-clear"
                            onClick={() => handleSearch("")}
                            aria-label="Clear search"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                MAIN CONTENT — sidebar + product grid
               ═══════════════════════════════════════════════════════════════ */}
            <section
                ref={gridRef}
                className={`cat-main ${gridVis ? "visible" : ""}`}
            >
                <div className="cat-main-inner">
                    {/* ── Sidebar: root categories ── */}
                    <aside className="cat-sidebar">
                        <h3 className="cat-sidebar-title">Categories</h3>
                        <ul className="cat-sidebar-list">
                            <li>
                                <button
                                    className={`cat-sidebar-btn ${!activeCategory ? "active" : ""}`}
                                    onClick={() => selectCategory(null)}
                                >
                                    <span className="cat-sidebar-name">All Products</span>
                                </button>
                            </li>
                            {rootCategories.map((cat) => (
                                <li key={cat.id}>
                                    <button
                                        className={`cat-sidebar-btn ${activeCategory === cat.slug ? "active" : ""}`}
                                        onClick={() => selectCategory(cat.slug)}
                                    >
                                        {cat.icon && (
                                            <span className="cat-sidebar-icon">{cat.icon}</span>
                                        )}
                                        <span className="cat-sidebar-name">{cat.name}</span>
                                        <span className="cat-sidebar-count">{cat.product_count}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* ── Product grid ── */}
                    <div className="cat-products-area">
                        {productList.length === 0 ? (
                            <div className="cat-empty">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    <line x1="8" y1="11" x2="14" y2="11" />
                                </svg>
                                <p>No products found.</p>
                                <span>Try adjusting your search or category filter.</span>
                            </div>
                        ) : (
                            <div className="cat-grid">
                                {productList.map((product, i) => (
                                    <article
                                        key={product.id}
                                        className="cat-card"
                                        style={{ animationDelay: `${0.05 + i * 0.06}s` }}
                                    >
                                        {/* Card background image */}
                                        <div className="cat-card-bg">
                                            {product.image_url ? (
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    className="cat-card-img"
                                                />
                                            ) : (
                                                <div className="cat-card-placeholder">
                                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                                        <polyline points="21 15 16 10 5 21" />
                                                    </svg>
                                                </div>
                                            )}
                                            {/* Dot pattern overlay */}
                                            <svg
                                                className="cat-card-pattern"
                                                width="100%"
                                                height="100%"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <defs>
                                                    <pattern
                                                        id={`pdots-${product.id}`}
                                                        width="24"
                                                        height="24"
                                                        patternUnits="userSpaceOnUse"
                                                    >
                                                        <circle cx="2" cy="2" r="0.7" fill="rgba(255,255,255,0.08)" />
                                                    </pattern>
                                                </defs>
                                                <rect width="100%" height="100%" fill={`url(#pdots-${product.id})`} />
                                            </svg>
                                        </div>

                                        {/* Fade overlay */}
                                        <div className="cat-card-fade" />

                                        {/* Content */}
                                        <div className="cat-card-content">
                                            {product.category && (
                                                <span className="cat-card-category">
                                                    {product.category.name}
                                                </span>
                                            )}
                                            <h3 className="cat-card-title">{product.name}</h3>
                                            <div className="cat-card-bottom">
                                                <Link
                                                    href={`/products/${product.slug}`}
                                                    className="cat-card-btn"
                                                >
                                                    <span className="cat-card-btn-title">View Product</span>
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="cat-card-btn-icon"
                                                    >
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}

                        {/* ── Pagination ── */}
                        {products.last_page > 1 && (
                            <div className="cat-pagination">
                                {products.links.map((link, i) => (
                                    <button
                                        key={i}
                                        className={`cat-page-btn ${link.active ? "active" : ""}`}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true, preserveScroll: true })}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="site-footer">
                <span>© 2025 Rizon Technologies. All rights reserved.</span>
                <div className="footer-links">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">LinkedIn</a>
                    <a href="#">GitHub</a>
                </div>
            </footer>
        </div>
    );
}