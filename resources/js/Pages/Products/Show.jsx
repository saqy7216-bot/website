import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function Show({ product, related = [] }) {
    const [activeTab, setActiveTab] = useState('features');

    const hasFeatures  = product.features?.length > 0;
    const hasBrochure  = !!product.brochure_url;
    const hasSpecs     = product.specs?.length > 0;
    const hasHighlights = product.highlights?.length > 0;

    return (
        <AppLayout>
            <Head title={`${product.name} — Rizon Technologies`} />

            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section className="pd-hero">
                <div className="pd-hero-left">
                    <h1 className="pd-hero-title">{product.name}</h1>
                    {product.category && (
                        <p className="pd-hero-subtitle">
                            {product.category.name}
                            {product.model_number && ` (${product.model_number})`}
                        </p>
                    )}
                    <hr className="pd-hero-divider" />

                    {hasHighlights && (
                        <ul className="pd-hero-bullets">
                            {product.highlights.map((h, i) => (
                                <li key={i} className="pd-hero-bullet">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                        <polyline points="22 4 12 14.01 9 11.01"/>
                                    </svg>
                                    {h}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="pd-hero-right">
                    {product.hero_image_url ? (
                        <img
                            src={product.hero_image_url}
                            alt={product.name}
                            className="pd-hero-img"
                        />
                    ) : product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="pd-hero-img"
                        />
                    ) : (
                        <div className="pd-hero-img-placeholder">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <path d="m21 15-5-5L5 21"/>
                            </svg>
                        </div>
                    )}
                </div>
            </section>

            {/* ── OVERVIEW ──────────────────────────────────────────────────── */}
            {(product.overview || product.overview_image_url) && (
                <section className="pd-overview">
                    <div className="pd-section-header">
                        <h2 className="pd-section-title">Overview</h2>
                        <div className="pd-section-underline" />
                    </div>

                    <div className="pd-overview-body">
                        {product.overview && (
                            <p className="pd-overview-text">{product.overview}</p>
                        )}
                        {product.overview_image_url && (
                            <div className="pd-overview-img-wrap">
                                <img
                                    src={product.overview_image_url}
                                    alt={`${product.name} overview`}
                                />
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ── SPECS BAR ─────────────────────────────────────────────────── */}
            {hasSpecs && (
                <section className="pd-specs-bar">
                    {product.specs.map((spec, i) => (
                        <div key={i} className="pd-spec-item">
                            <span className="pd-spec-label">{spec.label}</span>
                            <span className="pd-spec-value">{spec.value}</span>
                        </div>
                    ))}
                </section>
            )}

            {/* ── TABS ──────────────────────────────────────────────────────── */}
            {(hasFeatures || hasBrochure) && (
                <section className="pd-tabs-section">
                    <div className="pd-tabs-bar">
                        {hasFeatures && (
                            <button
                                className={`pd-tab ${activeTab === 'features' ? 'active' : ''}`}
                                onClick={() => setActiveTab('features')}
                            >
                                Key Features
                            </button>
                        )}
                        {hasBrochure && (
                            <button
                                className={`pd-tab ${activeTab === 'document' ? 'active' : ''}`}
                                onClick={() => setActiveTab('document')}
                            >
                                Document
                            </button>
                        )}
                    </div>

                    <div className="pd-tab-content">
                        {/* Features tab */}
                        {activeTab === 'features' && hasFeatures && (
                            <div className="pd-features">
                                <h3 className="pd-features-title">
                                    Features
                                    <span className="pd-features-underline" />
                                </h3>
                                <ul className="pd-features-list">
                                    {product.features.map((f, i) => (
                                        <li key={i} className="pd-feature-item">
                                            <span className="pd-feature-bullet">◆</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Document tab */}
                        {activeTab === 'document' && hasBrochure && (
                            <div className="pd-document">
                                <div className="pd-doc-line" />
                                <p className="pd-doc-label">Download Brochure</p>
                                <a
                                    href={product.brochure_url}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pd-download-btn"
                                >
                                    <span>Download</span>
                                    <span className="pd-download-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ── RELATED PRODUCTS ──────────────────────────────────────────── */}
            {related.length > 0 && (
                <section className="pd-related">
                    <h2 className="pd-related-title">Related Products</h2>
                    <div className="pd-related-grid">
                        {related.map(p => (
                            <Link key={p.id} href={`/products/${p.slug}`} className="pd-related-card">
                                <div className="pd-related-img">
                                    {p.image_url ? (
                                        <img src={p.image_url} alt={p.name} loading="lazy" />
                                    ) : (
                                        <div className="pd-related-img-placeholder">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                                <path d="m21 15-5-5L5 21"/>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="pd-related-info">
                                    <span className="pd-related-name">{p.name}</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6"/>
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </AppLayout>
    );
}
