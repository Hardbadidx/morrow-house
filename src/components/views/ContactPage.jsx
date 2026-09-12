import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { MapPin, Clock, Phone, Mail, ArrowRight, Check, Send } from 'lucide-react';

export function ContactPage() {
  const { startReservation } = useNavigation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#D6BD98] text-[#1A3636] pt-28 sm:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#40534C] uppercase font-ui">
              Get in Touch
            </span>
          </div>
          <h1 className="hero-title text-[#1A3636] font-normal leading-[0.98]">
            Connect With <br />
            Our Team
          </h1>
          <p className="text-base sm:text-lg text-[#40534C] font-ui leading-relaxed max-w-xl">
            Whether for private celebrations, media inquiries, corporate partnerships, or questions regarding dining reservations.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5 space-y-8 bg-[#FBF8F3] rounded-3xl p-8 sm:p-10 border border-[#1A3636]/10 shadow-lg">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#40534C] font-bold font-ui">
                Sanctuary Address
              </span>
              <div className="flex items-start gap-3 mt-3">
                <MapPin className="w-5 h-5 text-[#1A3636] flex-shrink-0 mt-1" />
                <div className="text-sm sm:text-base text-[#40534C] font-ui leading-relaxed">
                  <strong className="text-[#1A3636] block font-display">Morrow House Singapore</strong>
                  30 Jalan Hang Lekir, Downtown Core<br />
                  Singapore 049712 (Telok Ayer / Raffles Place)
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1A3636]/10">
              <span className="text-xs uppercase tracking-widest text-[#40534C] font-bold font-ui">
                Hours of Service
              </span>
              <div className="flex items-start gap-3 mt-3">
                <Clock className="w-5 h-5 text-[#1A3636] flex-shrink-0 mt-1" />
                <div className="text-sm text-[#40534C] font-ui space-y-1">
                  <div><strong>Monday – Friday:</strong> 8:00 AM – 10:30 PM</div>
                  <div><strong>Saturday – Sunday:</strong> 8:30 AM – 11:30 PM</div>
                  <div className="text-xs text-[#677D6A] font-semibold pt-1">Breakfast, Lunch, Afternoon Coffee, Dinner & Cocktails</div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1A3636]/10 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#40534C] font-bold font-ui">
                Direct Contact
              </span>
              <div className="space-y-2 text-sm text-[#40534C] font-ui">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#1A3636]" />
                  <span>+65 6789 2400 (Concierge)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#1A3636]" />
                  <span>hello@morrowhouse.sg</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A3636]/10">
              <button
                onClick={() => startReservation()}
                className="w-full btn-primary text-xs sm:text-sm py-3.5 flex items-center justify-center gap-2"
              >
                <span>Make a Dining Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Inquiry Form & Interactive Map Visual */}
          <div className="lg:col-span-7 space-y-8">
            {/* Inquiry Form */}
            <div className="bg-[#FBF8F3] rounded-3xl p-8 sm:p-10 border border-[#1A3636]/10 shadow-lg">
              <h3 className="font-display text-2xl font-bold text-[#1A3636] mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-[#40534C] font-ui mb-6">
                Our hospitality concierge responds to all inquiries within 4 business hours.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-[#677D6A]/15 border border-[#677D6A]/30 text-center space-y-2 animate-fade-in font-ui">
                  <Check className="w-8 h-8 text-[#677D6A] mx-auto" />
                  <div className="font-bold text-sm text-[#1A3636]">Message Sent Successfully</div>
                  <div className="text-xs text-[#40534C]">Thank you, {formData.name}. We will be in touch shortly.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-[#E7D7C1]/30 border border-[#1A3636]/20 rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#1A3636] placeholder-[#40534C]/60 focus:outline-none focus:border-[#1A3636] font-ui"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-[#E7D7C1]/30 border border-[#1A3636]/20 rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#1A3636] placeholder-[#40534C]/60 focus:outline-none focus:border-[#1A3636] font-ui"
                    />
                  </div>

                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#E7D7C1]/30 border border-[#1A3636]/20 rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#1A3636] font-ui focus:outline-none focus:border-[#1A3636]"
                  >
                    <option value="General Inquiry">General Dining Inquiry</option>
                    <option value="Private Event">Private Events & Dining Buyouts</option>
                    <option value="Press & Media">Press, Collaborations & Media</option>
                    <option value="Catering">Artisanal Coffee Catering</option>
                  </select>

                  <textarea
                    placeholder="Your message, party specifications, or questions..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full bg-[#E7D7C1]/30 border border-[#1A3636]/20 rounded-2xl p-4 text-xs sm:text-sm text-[#1A3636] placeholder-[#40534C]/60 focus:outline-none focus:border-[#1A3636] font-ui"
                  />

                  <button
                    type="submit"
                    className="btn-primary text-xs sm:text-sm px-7 py-3 flex items-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Stylized Singapore Location Card */}
            <div className="bg-[#1A3636] text-[#FBF8F3] rounded-3xl p-6 sm:p-8 border border-[#677D6A]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#D6BD98] font-bold font-ui">
                  Central Location
                </div>
                <div className="font-display text-lg font-bold text-[#FBF8F3] mt-0.5">
                  5 Minutes from Telok Ayer MRT (Exit B)
                </div>
                <div className="text-xs text-[#D6BD98]/80 font-ui mt-1">
                  Complimentary valet service available on Friday and Saturday evenings.
                </div>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="btn-primary bg-[#D6BD98] text-[#1A3636] hover:bg-[#FBF8F3] whitespace-nowrap text-xs px-5 py-2.5"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
