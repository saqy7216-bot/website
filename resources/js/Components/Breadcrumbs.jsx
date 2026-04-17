import { Link } from '@inertiajs/react';
import { useBreadcrumbs } from '@/Hooks/useBreadcrumbs';

/**
 * Breadcrumbs component.
 *
 * Renders automatically on every page EXCEPT the homepage (single crumb = Home).
 * Supports both auto-generated and controller-supplied breadcrumbs.
 *
 * Usage (auto):
 *   <Breadcrumbs />                  ← place inside AppLayout, below Navbar
 *
 * Usage (explicit, from controller):
 *   return Inertia::render('Products/Show', [
 *       'breadcrumbs' => [
 *           ['label' => 'Home',     'href' => '/'],
 *           ['label' => 'Products', 'href' => '/products'],
 *           ['label' => $product->name, 'href' => null],
 *       ],
 *       ...
 *   ]);
 */
export default function Breadcrumbs({ className = '' }) {
    const crumbs = useBreadcrumbs();

    // Don't render on homepage (only one crumb = Home with no href)
    if (crumbs.length <= 1) return null;

    return (
        <nav className={`breadcrumbs ${className}`} aria-label="Breadcrumb">
            <ol className="breadcrumbs-list">
                {crumbs.map((crumb, i) => {
                    const isLast = i === crumbs.length - 1;
                    return (
                        <li key={i} className="breadcrumbs-item">
                            {/* Separator — not shown before first item */}
                            {i > 0 && (
                                <span className="breadcrumbs-sep" aria-hidden="true">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </span>
                            )}

                            {isLast ? (
                                // Current page — plain text, no link
                                <span className="breadcrumbs-current" aria-current="page">
                                    {crumb.label}
                                </span>
                            ) : (
                                <Link href={crumb.href} className="breadcrumbs-link">
                                    {i === 0 && (
                                        // Home icon on first crumb
                                        <svg
                                            className="breadcrumbs-home-icon"
                                            width="13" height="13"
                                            viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="2"
                                        >
                                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                            <polyline points="9 22 9 12 15 12 15 22" />
                                        </svg>
                                    )}
                                    {crumb.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
