import { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import { useLanguage } from "@/Contexts/LanguageContext";

export default function ContactsPage({  categories = [] }) {
    const { flash } = usePage().props;
    const [toast, setToast] = useState(null);
    const { language } = useLanguage();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        message: "",
    });

    // Show side toast whenever a new flash.success arrives
    useEffect(() => {
        if (flash?.success) {
            setToast(flash.success);
            const t = setTimeout(() => setToast(null), 4000);
            return () => clearTimeout(t);
        }
    }, [flash?.success]);

    const handleChange = (e) => setData(e.target.name, e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("contacts.send"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <section className="contact-section visible">
            <Navbar categories={categories} />
            <div className="section-inner contact-inner">
                <div className="contact-left">
                    <span className="section-label">Get In Touch</span>
                    <h2 className="section-title">
                        Let's Build Something
                        <br />
                        <em>Extraordinary</em>
                    </h2>
                    <p className="contact-desc">
                        Ready to transform your vision into reality? Our team is
                        here to listen, strategize, and deliver. No generic
                        pitches — just real conversations about what matters to
                        your business.
                    </p>

                    <div className="contact-info">
                        <div className="ci-item">
                            <div className="ci-icon">📧</div>
                            <div>
                                <strong>Email Us</strong>
                                <span>hello@rizontechnologies.com</span>
                            </div>
                        </div>
                        <div className="ci-item">
                            <div className="ci-icon">📍</div>
                            <div>
                                <strong>Headquarters</strong>
                                <span>Dubai, UAE · London, UK · NYC, USA</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-page-right">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Your name"
                                value={data.name}
                                onChange={handleChange}
                                required
                            />
                            {errors.name && (
                                <span className="form-error">{errors.name}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@company.com"
                                value={data.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && (
                                <span className="form-error">{errors.email}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Project Brief</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Tell us about your project..."
                                rows={4}
                                value={data.message}
                                onChange={handleChange}
                                required
                            />
                            {errors.message && (
                                <span className="form-error">{errors.message}</span>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="btn-primary full-width"
                            disabled={processing}
                        >
                            <span>{processing ? "Sending…" : "Send Message"}</span>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            {/* Side confirmation toast */}
            <div
                className={`side-toast ${toast ? "is-visible" : ""}`}
                role="status"
                aria-live="polite"
            >
                <div className="side-toast-inner">
                    <div className="side-toast-icon">✓</div>
                    <div className="side-toast-body">
                        <strong>Message Sent!</strong>
                        <span>{toast || "We'll be in touch within 24 hours."}</span>
                    </div>
                </div>
            </div>

            <footer className="site-footer">
                <span>© 2025 Rizon Technologies. All rights reserved.</span>
                <div className="footer-links">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">LinkedIn</a>
                    <a href="#">GitHub</a>
                </div>
            </footer>
        </section>
    );
}