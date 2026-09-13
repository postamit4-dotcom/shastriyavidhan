"use client";

import { useState } from "react";
import { Send, CheckCircle2, MessageCircle, PhoneCall } from "lucide-react";
import { contact } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export default function GaneshChaturthiBookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pujaFormat: "Home Ganesh Sthapana",
    preferredDate: "Sep 14, 2026 - Madhyahna Muhurat (11:09 AM – 01:38 PM)",
    locationCity: "",
    samagriAssistance: "I will arrange all samagri as per checklist",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    trackEvent("form_submit", {
      form_id: "ganesh_chaturthi_booking_form",
      form_name: "Ganesh Chaturthi Booking Request",
      puja_format: formData.pujaFormat,
      preferred_slot: formData.preferredDate,
      city: formData.locationCity,
      samagri_pref: formData.samagriAssistance,
    });

    const message = `Namaste Shastriya Vidhan,\n\nI want to request Ganesh Chaturthi Puja 2026 availability:\n• Name: ${formData.fullName}\n• Phone: ${formData.phone}\n• Format: ${formData.pujaFormat}\n• Preferred Slot: ${formData.preferredDate}\n• Locality / City: ${formData.locationCity}\n• Samagri: ${formData.samagriAssistance}\n• Notes / Gotra: ${formData.notes || "None"}\n\nPlease check Pandit Ji availability and share quotation.`;

    const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

    setSubmitted(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="ganesh-form-wrapper" id="booking-section">
      <div className="apple-product-card ganesh-form-card">
        <div className="ganesh-form-header">
          <span className="apple-product-tag">Request-First Flow</span>
          <h2 className="ganesh-form-title">Request Ganesh Chaturthi Puja Availability</h2>
          <p className="ganesh-form-subtitle">
            No payment required today. Submit your requirements and our booking coordinator will verify Pandit availability, route feasibility, and share a clear quotation.
          </p>
        </div>

        {submitted ? (
          <div className="ganesh-form-success">
            <div className="ganesh-success-icon">
              <CheckCircle2 size={36} className="text-emerald-500" />
            </div>
            <h3>Request Initiated via WhatsApp!</h3>
            <p>
              Your booking details have been prepared and WhatsApp opened. If WhatsApp did not open automatically, click the button below to send your request directly to our booking desk.
            </p>
            <div className="ganesh-form-actions">
              <a
                href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
                  `Namaste Shastriya Vidhan, I requested Ganesh Chaturthi Puja 2026 slot for ${formData.fullName} (${formData.locationCity}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-pill apple-btn-whatsapp"
              >
                <MessageCircle size={16} /> Open WhatsApp Desk
              </a>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="apple-btn-pill apple-btn-secondary"
              >
                Modify Request Details
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ganesh-booking-form">
            <div className="ganesh-form-row">
              <div className="ganesh-form-field">
                <label htmlFor="fullName">Your Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="ganesh-input"
                />
              </div>

              <div className="ganesh-form-field">
                <label htmlFor="phone">WhatsApp / Contact Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="ganesh-input"
                />
              </div>
            </div>

            <div className="ganesh-form-row">
              <div className="ganesh-form-field">
                <label htmlFor="pujaFormat">Puja Format *</label>
                <select
                  id="pujaFormat"
                  name="pujaFormat"
                  required
                  value={formData.pujaFormat}
                  onChange={handleChange}
                  className="ganesh-select"
                >
                  <option value="Home Ganesh Sthapana">Home Ganesh Sthapana &amp; Puja</option>
                  <option value="Office / Shop Gaddi Puja">Office / Shop Gaddi Puja</option>
                  <option value="Society / Pandal Puja">Society / Community Pandal</option>
                  <option value="Online Video Puja (NRI/Remote)">Online Video Puja (NRI/Remote)</option>
                </select>
              </div>

              <div className="ganesh-form-field">
                <label htmlFor="preferredDate">Preferred Date &amp; Slot *</label>
                <select
                  id="preferredDate"
                  name="preferredDate"
                  required
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="ganesh-select"
                >
                  <option value="Sep 14, 2026 - Madhyahna Muhurat (11:09 AM – 01:38 PM)">
                    Sep 14: Madhyahna Muhurat (11:09 AM – 01:38 PM)
                  </option>
                  <option value="Sep 14, 2026 - Early Morning (08:00 AM – 10:30 AM)">
                    Sep 14: Early Morning (08:00 AM – 10:30 AM)
                  </option>
                  <option value="Sep 14, 2026 - Afternoon / Evening">
                    Sep 14: Afternoon / Evening
                  </option>
                  <option value="Sep 13, 2026 - Advance Sthapana">
                    Sep 13: Evening Slot
                  </option>
                  <option value="Visarjan Puja Date">
                    Visarjan Puja (Subsequent Day)
                  </option>
                </select>
              </div>
            </div>

            <div className="ganesh-form-row">
              <div className="ganesh-form-field">
                <label htmlFor="locationCity">City &amp; Sector / Locality *</label>
                <input
                  type="text"
                  id="locationCity"
                  name="locationCity"
                  required
                  placeholder="e.g. Noida Sector 78 / South Delhi"
                  value={formData.locationCity}
                  onChange={handleChange}
                  className="ganesh-input"
                />
              </div>

              <div className="ganesh-form-field">
                <label htmlFor="samagriAssistance">Samagri Requirement</label>
                <select
                  id="samagriAssistance"
                  name="samagriAssistance"
                  value={formData.samagriAssistance}
                  onChange={handleChange}
                  className="ganesh-select"
                >
                  <option value="I will arrange all samagri as per checklist">
                    I will arrange all samagri via your checklist
                  </option>
                  <option value="Please quote including Pandit Ji samagri kit">
                    Quote including specialized Pandit Ji samagri kit
                  </option>
                </select>
              </div>
            </div>

            <div className="ganesh-form-field full-width">
              <label htmlFor="notes">Any Specific Family Customs / Gotra / Notes (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                rows={2}
                placeholder="e.g. Hindi explanation preferred, small apartment hawan needed if possible, etc."
                value={formData.notes}
                onChange={handleChange}
                className="ganesh-textarea"
              />
            </div>

            <div className="ganesh-form-submit-wrap">
              <button
                type="submit"
                className="apple-btn-pill apple-btn-primary ganesh-submit-btn"
              >
                <Send size={16} /> Request Puja Availability &amp; Quote
              </button>
              <p className="ganesh-form-privacy">
                🔒 Privacy Protected. We never share your number or send promotional spam.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
