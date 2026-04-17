import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "english"
    );

    const rtlLanguages = ["kurdish"];

    useEffect(() => {
        const direction = rtlLanguages.includes(language) ? "rtl" : "ltr";

        document.documentElement.setAttribute("dir", direction);
        document.documentElement.setAttribute("lang", language);

        localStorage.setItem("language", language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
