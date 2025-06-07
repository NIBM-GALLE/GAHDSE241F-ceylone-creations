import React, { useState } from "react";
import "./ContactUs.css";

import PhoneIcon from "../../assets/icons/phone.png";
import LocationIcon from "../../assets/icons/location.jpeg";
import WhatsappIcon from "../../assets/icons/whatsapp.png";
import MessengerIcon from "../../assets/icons/messenger.png";
import FacebookIcon from "../../assets/icons/facebook.jpg";
import TwitterIcon from "../../assets/icons/twitter.png";
import InstagramIcon from "../../assets/icons/instagram.png";
import LinkedInIcon from "../../assets/icons/linkedin.png";
import EmailIcon from "../../assets/icons/email.jpg";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        // Reset form fields
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        alert("Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending the message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      {/* Contact Information Section */}
      <div className="contact-box-wrapper">
        <div className="contact-box">
          <img src={EmailIcon} alt="Email" />
          <p>Email: contact@ceylone.com</p>
        </div>
        <div className="contact-box">
          <img src={PhoneIcon} alt="Phone" />
          <p>Phone: +123 456 789</p>
        </div>
        <div className="contact-box">
          <img src={LocationIcon} alt="Location" />
          <p>Location: Ceylone Street, XYZ</p>
        </div>
        <div className="contact-box">
          <img src={WhatsappIcon} alt="Whatsapp" />
          <p>WhatsApp: +123 456 789</p>
        </div>
        <div className="contact-box">
          <img src={MessengerIcon} alt="Messenger" />
          <p>Messenger: @ceylone</p>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="social-media-box">
        <h2>Follow Us</h2>
        <div className="social-icons">
          <a href="https://facebook.com/ceylone" target="_blank" rel="noopener noreferrer">
            <img src={FacebookIcon} alt="Facebook" />
          </a>
          <a href="https://twitter.com/ceylone" target="_blank" rel="noopener noreferrer">
            <img src={TwitterIcon} alt="Twitter" />
          </a>
          <a href="https://instagram.com/ceylone" target="_blank" rel="noopener noreferrer">
            <img src={InstagramIcon} alt="Instagram" />
          </a>
          <a href="https://linkedin.com/company/ceylone" target="_blank" rel="noopener noreferrer">
            <img src={LinkedInIcon} alt="LinkedIn" />
          </a>
        </div>
      </div>

      {/* Send Us a Message Section */}
      <div className="message-form-box">
        <h2>Send Us a Message</h2>
        <form>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
          />
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            rows="4"
            required
          ></textarea>
          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;