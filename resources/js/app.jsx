import "./bootstrap";
import "../css/rizon.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { LanguageProvider } from "./Contexts/LanguageContext";
import { ThemeProvider } from "./Contexts/ThemeContext";

const appName = import.meta.env.VITE_APP_NAME || "Rizon Technologies";

createInertiaApp({
    title: (title) => `${title} — ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ThemeProvider>
                <LanguageProvider>
                    <App {...props} />
                </LanguageProvider>
            </ThemeProvider>,
        );
    },

    progress: {
        color: "#00d4ff",
        showSpinner: false,
    },
});
