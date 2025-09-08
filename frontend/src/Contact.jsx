import React, { useState } from 'react';
import './Contact.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from 'emailjs-com'; // Import EmailJS

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false); // loading state
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Send email via EmailJS
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,    // Your Service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,   // Your Template ID
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY     // Your Public Key
      )
      .then(() => {
        setLoading(false);
        setShowModal(true);
        setForm({ name: '', email: '', message: '' }); // clear form
      })
      .catch((err) => {
        setLoading(false);
        console.error('EmailJS Error:', err);
        alert('Failed to send message. Please try again.');
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="contact-bg">
      <div className="contact-overlay">
        <div className="contact-container">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-desc">
            Have a question, feedback, or want to join a tournament? Leave us a message below or find us on the map!
          </p>
          <div className="contact-content">
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="contact-map-wrapper">
              <iframe
                title="Classy Tournament Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.010964479836!2d77.0266383150837!3d28.46461498248406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19b6e2e2e2e3%3A0x7e4e2e2e2e2e2e2e!2sGurugram%2C%20Haryana%20122015!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '1rem', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="contact-location-info">
                <FaMapMarkerAlt className="contact-location-icon" />
                <span>Gurugram, Haryana - 122015</span>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="contact-modal-backdrop" onClick={closeModal}>
            <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
              <div className="contact-modal-icon">🎉</div>
              <div className="contact-modal-title">Thank You!</div>
              <div className="contact-modal-message">
                Your message has been sent successfully.<br />
                We appreciate your feedback and will get back to you soon.
              </div>
              <button className="contact-modal-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
