import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Breadcrumbs from '@/Components/Breadcrumbs';

export default function AppLayout({ children }) {
    const { props } = usePage();
    const categories = props.categories ?? [];

    // Ensure body can scroll on every AppLayout page
    // (homepage JS sets overflow:hidden; navigating away must restore it)
    useEffect(() => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, []);

    return (
        <div className="app-layout">
            {/* Fixed navbar */}
            <Navbar categories={categories} />

            {/* Sticky breadcrumb bar — sticks below the fixed navbar */}
            <div className="breadcrumb-bar">
                <div className="breadcrumb-bar-inner">
                    <Breadcrumbs />
                </div>
            </div>

            {/* Scrollable page content */}
            <main className="app-main">
                {children}
            </main>
        </div>
    );
}