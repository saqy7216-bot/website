import { useEffect, useState } from 'react';

export default function ContactSection({ isActive }) {
    const [visible, setVisible] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    useEffect(() => {
        if (isActive) {
            const t = setTimeout(() => setVisible(true), 150);
            return () => clearTimeout(t);
        } else {
            setVisible(false);
        }
    }, [isActive]);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <section className={`contact-section ${visible ? 'visible' : ''}`}>
            <div className="section-inner contact-inner">
                <div className="contact-left">
                    <span className="section-label">Get In Touch</span>
                    <h2 className="section-title">
                        Let's Build Something<br />
                        <em>Extraordinary</em>
                    </h2>
                    <p className="contact-desc">
                        Ready to transform your vision into reality? Our team is here to listen,
                        strategize, and deliver. No generic pitches — just real conversations about
                        what matters to your business.
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

                <div className="contact-right">
                    {sent ? (
                        <div className="form-success">
                            <div className="success-icon">✓</div>
                            <h3>Message Sent!</h3>
                            <p>We'll be in touch within 24 hours.</p>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@company.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Project Brief</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell us about your project..."
                                    rows={4}
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary full-width">
                                <span>Send Message</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
                                </svg>
                            </button>
                        </form>
                    )}
                    
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
