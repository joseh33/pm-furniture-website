import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const form = useRef();
  const currentYear = new Date().getFullYear();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_5kzj318", // replace with your EmailJS service ID
        "template_nzbrkb3", // replace with your EmailJS template ID
        form.current,
        "TZsG4J8LxIUJxxVJX" // previously known as user ID
      )
      .then((result) => {
        console.log("Message sent", result.text);
        alert("Message sent successfully!");
        form.current.reset(); // clear form
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-[#fdf8f5] px-6 py-12 md:px-24">
      <h1 className="text-4xl font-bold text-center mb-12">Let’s Get In Touch</h1>

      {/* Contact Details */}
      <div className="grid md:grid-cols-3 gap-8 mb-12 text-gray-700">
        {/* Phone */}
        <div className="space-y-2">
          <p>📞 +123 45 789 000</p>
          <p>📞 +123 45 789 000</p>
        </div>
        {/* Email */}
        <div className="space-y-2">
          <p>📧 inquiry@extrasui.ai</p>
          <p>📧 help@extrasui.ai</p>
        </div>
        {/* Address */}
        <div className="space-y-2">
          <p>
            📍 221B Elementary Street
            <br />
            New York, NY
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <form
        ref={form}
        onSubmit={sendEmail}
        className="grid md:grid-cols-2 gap-6 bg-white p-6 shadow-lg rounded-lg mb-12"
      >
        <div className="flex flex-col">
          <label>Inquiry Purpose*</label>
          <select name="inquiry_purpose" className="border p-2 rounded" required>
            <option value="">Choose one option...</option>
            <option value="Support">Support</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label>Description that fits you*</label>
          <select name="description" className="border p-2 rounded" required>
            <option value="">Choose one option...</option>
            <option value="Individual">Individual</option>
            <option value="Company">Company</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            placeholder="Enter your full name"
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Organization</label>
          <input
            type="text"
            name="organization"
            placeholder="Enter your organization"
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            className="border p-2 rounded"
          />
        </div>

        <div className="md:col-span-2 flex flex-col">
          <label>Message</label>
          <textarea
            name="message"
            placeholder="Enter your message here..."
            className="border p-2 rounded h-32"
            required
          ></textarea>
        </div>

        <div className="md:col-span-2 text-right">
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            Submit Form
          </button>
        </div>
      </form>

      {/* Footer Section */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-sm flex flex-col md:flex-row justify-between items-center">
        <p>© {currentYear} Copyright by PM Furnitures and Pulpits</p>
        <ul className="flex gap-4 mt-4 md:mt-0 list-none flex-wrap justify-center">
          <li>
            <a
              href="https://www.facebook.com/peter.pm.9216"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-2"
            >
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
          </li>

          <li>
            <a
              href="https://www.tiktok.com/@peterpm22?_t=ZM-8wJViiEDGER&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-2"
            >
              <i className="fab fa-tiktok"></i> TikTok
            </a>
          </li>

          <li>
            <a
              href="https://x.com/m42995?t=nLWjRVXIaQdOE-g1uUdd7Q&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-2"
            >
              <i className="fab fa-twitter"></i> Twitter
            </a>
          </li>

          <li>
            <a
              href="https://x.com/m42995?t=nLWjRVXIaQdOE-g1uUdd7Q&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-2"
            >
              <i className="fab fa-whatsapp"></i> Whatsapp
            </a>
          </li>

          <li>
            <a
              href="https://www.instagram.com/petermuemanzioki?utm_source=qr&igsh=MTB6cmc2bnV3eHZwNA=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-2"
            >
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;
