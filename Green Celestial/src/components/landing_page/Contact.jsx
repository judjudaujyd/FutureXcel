import React, { useState } from 'react';
import API_BASE_URL from "../../config/api";
import "./contact.css";
import { contact_info } from '../../../static_data/contact.js';
import Contact_item from '../sub_components/Contact_item';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Network error. Please check your connection.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact">
            <div className="contact_inner">
                <div className="contact_left">
                    <div className="left_inner">
                        <h2 className="contact_title">Get In Touch</h2>
                        <p className="contact_subtitle">Have a question or want to work together? We'd love to hear from you!</p>

                        <div className="contact_info_cards">
                            {contact_info.map((val, index) => <Contact_item val_in={val} key={index} />)}
                        </div>

                        <div className="business_hours">
                            <svg className="clock_icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span>Available: Monday - Friday, 10AM - 6PM</span>
                        </div>

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d423495.18721683935!2d72.911766!3d33.978246!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfb3a06171cdf9%3A0x69125029615bf533!2sBusiness%20incubation%20Center!5e0!3m2!1sen!2sus!4v1726166993997!5m2!1sen!2sus"
                            loading='lazy'
                            title="Office Location"
                        />
                    </div>
                </div>

                <div className="contact_right">
                    <form className="contact_form" onSubmit={handleSubmit}>
                        <h3>Send Us a Message</h3>

                        <div className="form_group">
                            <label htmlFor="name">Your Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="form_group">
                            <label htmlFor="email">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="form_group">
                            <label htmlFor="subject">Subject *</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="How can we help?"
                            />
                        </div>

                        <div className="form_group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="Tell us more about your inquiry..."
                            />
                        </div>

                        {status.message && (
                            <div className={`form_status ${status.type}`}>
                                {status.message}
                            </div>
                        )}

                        <button type="submit" className="submit_btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;