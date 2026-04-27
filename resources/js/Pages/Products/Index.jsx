import { useEffect, useRef, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

// ─── Persistent layout ────────────────────────────────────────────────────────
Index.layout = (page) => <AppLayout>{page}</AppLayout>;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function imgUrl(path) {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `/storage/${path}`;
}

// Intersection observer — triggers .visible class for CSS animations
function useOnScreen(ref, threshold = 0.08) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold }
        );
        obs.observe(ref.current);
        return () => obs.disconnect();
    }, [ref]);
    return visible;
}

// ─── Recursive sidebar item ───────────────────────────────────────────────────
function SidebarItem({ cat, activeSlug, onSelect }) {
    const hasChildren = cat.children?.length > 0;

    const isDescendantActive = (children) =>
        children?.some(
            (c) => c.slug === activeSlug || isDescendantActive(c.children)
        );

    const [expanded, setExpanded] = useState(
        cat.slug === activeSlug || isDescendantActive(cat.children)
    );

    const isActive = activeSlug === cat.slug;

    return (
        <li>
            <div className="cat-sidebar-row">
                <button
                    className={`cat-sidebar-btn ${isActive ? "active" : ""}`}
                    onClick={() => {
                        onSelect(cat.slug);
                        if (hasChildren) setExpanded(true);
                    }}
                >
                    {cat.icon && (
                        <span className="cat-sidebar-icon">{cat.icon}</span>
                    )}
                    <span className="cat-sidebar-name">{cat.name}</span>
                    <span className="cat-sidebar-count">{cat.product_count}</span>
                </button>

                {hasChildren && (
                    <button
                        className={`cat-toggle ${expanded ? "open" : ""}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpanded((v) => !v);
                        }}
                        aria-label={expanded ? "Collapse" : "Expand"}
                    >
                        <svg
                            width="10" height="10"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                )}
            </div>

            {hasChildren && expanded && (
                <ul className="cat-sidebar-children">
                    {cat.children.map((child) => (
                        <SidebarItem
                            key={child.id}
                            cat={child}
                            activeSlug={activeSlug}
                            onSelect={onSelect}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

function ProductCard({ product, index }) {
    const thumb = imgUrl(product.image);

    return (
        <article
            className="cat-card"
            style={{ animationDelay: `${0.04 + index * 0.05}s` }}
        >
            {/* Background image */}
            <div className="cat-card-bg">
                {thumb ? (
                    <img
                        src={thumb}
                        alt={product.name}
                        className="cat-card-img"
                        loading="lazy"
                    />
                ) : (
                    <div className="cat-card-placeholder">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                    </div>
                )}

                {/* Dot-grid overlay */}
                <svg className="cat-card-pattern" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id={`dots-${product.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="0.7" fill="rgba(255,255,255,0.07)" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#dots-${product.id})`} />
                </svg>
            </div>

            {/* Gradient overlay */}
            <div className="cat-card-fade" />

            {/* Text */}
            <div className="cat-card-content">
                {product.category && (
                    <span className="cat-card-category">{product.category.name}</span>
                )}
                <h3 className="cat-card-title">{product.name}</h3>

                <div className="cat-card-bottom">
                    <Link
                        href={`/products/${product.slug}`}
                        className="cat-card-btn"
                    >
                        <span className="cat-card-btn-title">View Product</span>
                        <svg
                            width="14" height="14"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round"
                            className="cat-card-btn-icon"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Index({
    products     = { data: [], links: [], current_page: 1, last_page: 1, total: 0 },
    categoryTree = [],
    filters      = {},
}) {
    const gridRef = useRef(null);
    const gridVis = useOnScreen(gridRef);

    const [search, setSearch]   = useState(filters.search || "");
    const activeSlug             = filters.category || null;

    // Debounced search
    const searchTimer = useRef(null);
    const handleSearch = (value) => {
        setSearch(value);
        clearTimeout(searchTimer.current);
        searchTimer.current = setTimeout(() => {
            router.get(
                "/products",
                { search: value || undefined, category: activeSlug || undefined },
                { preserveState: true, preserveScroll: true }
            );
        }, 400);
    };

    // Category sidebar click — toggle off when re-clicking the active one
    const selectCategory = (slug) => {
        const next = slug === activeSlug ? undefined : slug;
        router.get(
            "/products",
            { category: next, search: search || undefined },
            { preserveState: true, preserveScroll: true }
        );
    };

    const productList  = products?.data ?? [];
    const activeCatName = activeSlug
        ? activeSlug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")
        : null;

    return (
        <>
            <Head title="Products — Rizon Technologies" />

            {/* ── Sticky search bar ── */}
            <div className="cat-search-bar">
                <div className="cat-search-inner">
                    <svg className="cat-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        className="cat-search-input"
                        placeholder="Search products by name…"
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
                                <line x1="6"  y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* ── Main: sidebar + grid ── */}
            <section
                ref={gridRef}
                className={`cat-main ${gridVis ? "visible" : ""}`}
            >
                <div className="cat-main-inner">

                    {/* ── Category sidebar ── */}
                    <aside className="cat-sidebar">
                        <h3 className="cat-sidebar-title">Categories</h3>
                        <ul className="cat-sidebar-list">
                            {/* "All Products" clears category filter */}
                            <li>
                                <div className="cat-sidebar-row">
                                    <button
                                        className={`cat-sidebar-btn ${!activeSlug ? "active" : ""}`}
                                        onClick={() => selectCategory(null)}
                                    >
                                        <span className="cat-sidebar-name">All Products</span>
                                    </button>
                                </div>
                            </li>

                            {categoryTree.map((cat) => (
                                <SidebarItem
                                    key={cat.id}
                                    cat={cat}
                                    activeSlug={activeSlug}
                                    onSelect={selectCategory}
                                />
                            ))}
                        </ul>
                    </aside>

                    {/* ── Product grid ── */}
                    <div className="cat-products-area">
                        {/* Header: title + count */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "baseline",
                                justifyContent: "space-between",
                                marginBottom: "24px",
                                flexWrap: "wrap",
                                gap: "8px",
                            }}
                        >
                            <h2
                                style={{
                                    fontFamily: "var(--font-display, inherit)",
                                    fontSize: "clamp(18px, 2.5vw, 26px)",
                                    fontWeight: 700,
                                    color: "var(--text-primary)",
                                    position: "relative",
                                    paddingBottom: "10px",
                                }}
                            >
                                {activeCatName ?? "All Products"}
                                <span
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        width: "40px",
                                        height: "3px",
                                        background: "var(--accent)",
                                        borderRadius: "2px",
                                        display: "block",
                                    }}
                                />
                            </h2>
                            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                                {products.total ?? productList.length} item
                                {(products.total ?? productList.length) !== 1 ? "s" : ""}
                            </span>
                        </div>

                        {productList.length === 0 ? (
                            <div className="cat-empty">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    <line x1="8" y1="11" x2="14" y2="11" />
                                </svg>
                                <p>No products found.</p>
                                <span>Try adjusting your search or selecting a different category.</span>
                            </div>
                        ) : (
                            <div className="cat-grid">
                                {productList.map((product, i) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        index={i}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {products.last_page > 1 && (
                            <div className="cat-pagination">
                                {products.links.map((link, i) => (
                                    <button
                                        key={i}
                                        className={`cat-page-btn ${link.active ? "active" : ""}`}
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url &&
                                            router.get(link.url, {}, {
                                                preserveState: true,
                                                preserveScroll: true,
                                            })
                                        }
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}