import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

/**
 * Derives breadcrumb items from the current Inertia page URL + optional
 * explicit crumbs passed by the controller via the `breadcrumbs` prop.
 *
 * Priority:
 *   1. If the page passes `breadcrumbs` prop from the controller → use those directly.
 *   2. Otherwise auto-build from the URL segments.
 *
 * Each crumb: { label: string, href: string|null }
 * The last crumb always has href = null (current page, not a link).
 */
export function useBreadcrumbs() {
    const { url, props } = usePage();

    return useMemo(() => {
        // ── 1. Explicit breadcrumbs from controller ───────────────────────────
        if (props.breadcrumbs?.length) {
            return props.breadcrumbs.map((crumb, i, arr) => ({
                label: crumb.label,
                href: i < arr.length - 1 ? crumb.href : null,
            }));
        }

        // ── 2. Auto-build from URL ────────────────────────────────────────────
        const crumbs = [{ label: 'Home', href: '/' }];

        // Strip query string
        const pathname = url.split('?')[0];
        const segments = pathname.split('/').filter(Boolean);

        if (!segments.length) {
            // We are on home — return just Home with no href (current page)
            return [{ label: 'Home', href: null }];
        }

        const SEGMENT_LABELS = {
            products:   'Products',
            about:      'About',
            'case-study': 'Case Study',
            contact:    'Contact',
            admin:      'Admin',
            categories: 'Categories',
            create:     'Create',
            edit:       'Edit',
        };

        let built = '/';

        segments.forEach((seg, i) => {
            built = built.endsWith('/') ? built + seg : built + '/' + seg;
            const isLast = i === segments.length - 1;

            // Try a human-readable label
            const label = SEGMENT_LABELS[seg]
                // Fall back to title-casing the slug (replace hyphens with spaces)
                ?? seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

            crumbs.push({
                label,
                href: isLast ? null : built,
            });
        });

        return crumbs;
    }, [url, props.breadcrumbs]);
}
