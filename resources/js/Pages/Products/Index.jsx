import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function Index({
    products = { data: [], total: 0, last_page: 1, links: [] },
    ratedOutputs = [],
    filters = {},
}) {
    const [selectedOutputs, setSelectedOutputs] = useState(
        Array.isArray(filters.output) ? filters.output : filters.output ? [filters.output] : []
    );

    function toggleOutput(val) {
        setSelectedOutputs(prev =>
            prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
        );
    }

    function applyFilters() {
        router.get('/products', {
            ...(filters.category ? { category: filters.category } : {}),
            ...(selectedOutputs.length ? { output: selectedOutputs } : {}),
        }, { preserveScroll: true, replace: true });
    }

    function clearFilters() {
        setSelectedOutputs([]);
        router.get('/products', filters.category ? { category: filters.category } : {},
            { preserveScroll: true, replace: true });
    }

    const hasFilters = selectedOutputs.length > 0;

    return (
        <AppLayout>
            <Head title="Products — Rizon Technologies" />

            <div className="pl-page">
                {/* ── Sidebar ── */}
                <aside className="pl-sidebar">
                    <div className="pl-sidebar-header">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="4" y1="6"  x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/>
                            <line x1="4" y1="18" x2="20" y2="18"/>
                        </svg>
                        Filter By
                    </div>

                    {ratedOutputs.length > 0 && (
                        <div className="pl-filter-group">
                            <span className="pl-filter-label">By Rated Output</span>
                            {ratedOutputs.map(output => (
                                <label key={output} className="pl-checkbox-row">
                                    <input
                                        type="checkbox"
                                        checked={selectedOutputs.includes(output)}
                                        onChange={() => toggleOutput(output)}
                                    />
                                    <span className="pl-checkbox-box">
                                        {selectedOutputs.includes(output) && (
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <path d="M20 6L9 17l-5-5"/>
                                            </svg>
                                        )}
                                    </span>
                                    <span className="pl-checkbox-label">{output}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    <div className="pl-sidebar-actions">
                        <button className="pl-search-btn" onClick={applyFilters}>
                            SEARCH
                        </button>
                        {hasFilters && (
                            <button className="pl-clear-btn" onClick={clearFilters}>
                                CLEAR
                            </button>
                        )}
                    </div>
                </aside>

                {/* ── Main ── */}
                <main className="pl-main">
                    <div className="pl-main-header">
                        <h1 className="pl-title">
                            Products
                            <span className="pl-title-underline" />
                        </h1>
                        <span className="pl-count">{products.total} item{products.total !== 1 ? 's' : ''}</span>
                    </div>

                    {products.data.length === 0 ? (
                        <div className="pl-empty">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                            </svg>
                            <p>No products found.</p>
                            <Link href="/products" className="pl-empty-link">View all products</Link>
                        </div>
                    ) : (
                        <div className="pl-grid">
                            {products.data.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {products.last_page > 1 && (
                        <div className="pl-pagination">
                            {products.links.map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`pl-page-btn ${link.active ? 'active' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className="pl-page-btn disabled"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </AppLayout>
    );
}

function ProductCard({ product }) {
    return (
        <Link href={`/products/${product.slug}`} className="pl-card">
            <div className="pl-card-img">
                {product.image_url ? (
                    <img src={product.image_url} alt={product.name} loading="lazy" />
                ) : (
                    <div className="pl-card-img-placeholder">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <path d="m21 15-5-5L5 21"/>
                        </svg>
                    </div>
                )}
            </div>

            <div className="pl-card-body">
                <h3 className="pl-card-name">{product.name}</h3>
                <hr className="pl-card-divider" />
                {product.short_description && (
                    <p className="pl-card-desc">{product.short_description}</p>
                )}
            </div>

            <div className="pl-card-footer">
                <span className="pl-card-btn">
                    CHECK
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </span>
            </div>
        </Link>
    );
}
