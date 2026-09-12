import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionReveal } from '../components/ui/SectionReveal';
import { MagneticButton } from '../components/ui/MagneticButton';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  Check,
  Send,
  Compass,
  AlertCircle,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';

export function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Dining Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name || formData.name.trim().length < 2) {
      errs.name = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message || formData.message.trim().length < 8) {
      errs.message = 'Please provide a brief message regarding your inquiry.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setFormSubmitted(true);
  };

  const handleReset = () => {
    setFormSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Dining Inquiry',
      message: '',
    });
    setErrors({});
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#D6BD98] text-[#1A3636] pt-28 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          {/* Header */}
          <SectionReveal distance={20}>
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#40534C] uppercase font-ui">
                  Hospitality & Concierge
                </span>
              </div>
              <h1 className="hero-title text-[#1A3636] font-normal leading-[0.96]">
                Connect with <br className="hidden sm:inline" />
                Our Concierge
              </h1>
              <p className="text-base sm:text-lg text-[#40534C] font-ui leading-relaxed max-w-xl">
                Whether arranging an intimate dinner, planning a private salon celebration, or coordinating bespoke tasting menus, our team is at your service.
              </p>
            </div>
          </SectionReveal>

          {/* Main 12-Column Concierge Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Sanctuary Desk & Direct Information (5 cols) */}
            <div className="lg:col-span-5 space-y-8 bg-[#FBF8F3] rounded-3xl p-8 sm:p-10 border border-[#1A3636]/12 shadow-xl">
              {/* Address */}
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#40534C] font-bold font-ui">
                  Sanctuary Address
                </span>
                <div className="flex items-start gap-3 mt-3">
                  <MapPin className="w-5 h-5 text-[#1A3636] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#40534C] font-ui leading-relaxed">
                    <strong className="text-[#1A3636] block font-display text-base">
                      Morrow House Singapore
                    </strong>
                    30 Jalan Hang Lekir, Downtown Core<br />
                    Singapore 049712
                  </div>
                </div>
              </div>

              {/* Transit & Arrival */}
              <div className="pt-6 border-t border-[#1A3636]/10">
                <span className="text-xs uppercase tracking-[0.2em] text-[#40534C] font-bold font-ui">
                  Transit & Arrival
                </span>
                <div className="flex items-start gap-3 mt-3">
                  <Compass className="w-5 h-5 text-[#1A3636] flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-[#40534C] font-ui leading-relaxed space-y-1">
                    <div><strong>Telok Ayer MRT:</strong> DT18, Exit A (2-min walk)</div>
                    <div><strong>Raffles Place MRT:</strong> NS26/EW14 (5-min walk)</div>
                    <div className="text-[11px] text-[#40534C]/80 pt-0.5">
                      Designated valet drop-off and street parking available along Jalan Hang Lekir.
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Hours Breakdown */}
              <div className="pt-6 border-t border-[#1A3636]/10">
                <span className="text-xs uppercase tracking-[0.2em] text-[#40534C] font-bold font-ui">
                  Service Hours
                </span>
                <div className="flex items-start gap-3 mt-3">
                  <Clock className="w-5 h-5 text-[#1A3636] flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-[#40534C] font-ui space-y-2 w-full">
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#1A3636]">Morning Coffee & Pastry</span>
                      <span className="font-mono">8:00 AM – 11:30 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#1A3636]">All-Day Dining & Hearth</span>
                      <span className="font-mono">12:00 PM – 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#1A3636]">Dinner & Evening Service</span>
                      <span className="font-mono">6:00 PM – 11:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Concierge Contact Channels */}
              <div className="pt-6 border-t border-[#1A3636]/10 space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#40534C] font-bold font-ui">
                  Direct Concierge Desk
                </span>
                <div className="space-y-2.5 text-xs sm:text-sm text-[#40534C] font-ui">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#1A3636]" />
                    <span className="font-medium text-[#1A3636]">+65 6789 2400</span>
                    <span className="text-[11px] text-[#40534C]/75">(Dining Reservations)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#1A3636]" />
                    <span className="font-medium text-[#1A3636]">concierge@morrowhouse.sg</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-[#1A3636]" />
                    <span>Private Events: events@morrowhouse.sg</span>
                  </div>
                </div>
              </div>

              {/* Immediate Reservation CTA */}
              <div className="pt-4 border-t border-[#1A3636]/10">
                <MagneticButton
                  onClick={() => navigate('/reservations')}
                  data-cursor="reserve"
                  className="w-full btn-primary text-xs sm:text-sm py-3.5 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Dining Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            </div>

            {/* Right Column: Bespoke Guest & Event Inquiry Desk (7 cols) */}
            <div className="lg:col-span-7 bg-[#FBF8F3] rounded-3xl p-8 sm:p-10 border border-[#1A3636]/12 shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3636]">
                  Guest Inquiries & Buyouts
                </h3>
                <p className="text-xs sm:text-sm text-[#40534C] font-ui leading-relaxed">
                  For private dining celebrations, full restaurant buyouts, press inquiries, or bespoke culinary requests.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-[#1A3636] text-[#FBF8F3] rounded-2xl p-6 sm:p-8 space-y-4 shadow-md animate-fade-in border border-[#677D6A]/30">
                  <div className="w-12 h-12 rounded-full bg-[#D6BD98] text-[#1A3636] flex items-center justify-center">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-widest text-[#D6BD98] font-ui">
                      Inquiry Received
                    </div>
                    <h4 className="font-display text-xl font-bold text-[#FBF8F3]">
                      Thank You, {formData.name || 'Guest'}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#D6BD98]/80 font-ui leading-relaxed">
                      Our guest concierge has received your note regarding "{formData.subject}". We will review and connect with you within 2 business hours.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs text-[#D6BD98] hover:text-white underline cursor-pointer font-ui transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                    <span className="text-[#D6BD98]/40">·</span>
                    <Link
                      to="/reservations"
                      className="text-xs font-bold text-[#FBF8F3] hover:text-[#D6BD98] cursor-pointer font-ui transition-colors flex items-center gap-1"
                    >
                      <span>Book Instant Table</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="inquiry-name"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#40534C] mb-1.5 font-ui"
                      >
                        Your Name *
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Julian Montgomery"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#1A3636] placeholder-[#40534C]/50 focus:outline-none transition-all font-ui ${
                          errors.name
                            ? 'border-rose-500 ring-1 ring-rose-500/50'
                            : 'border-[#1A3636]/20 focus:border-[#1A3636]'
                        }`}
                      />
                      {errors.name && (
                        <div id="contact-name-error" className="flex items-center gap-1.5 text-xs text-rose-600 mt-1 font-ui">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#40534C] mb-1.5 font-ui"
                      >
                        Email Address *
                      </label>
                      <input
                        id="inquiry-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="julian@example.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#1A3636] placeholder-[#40534C]/50 focus:outline-none transition-all font-ui ${
                          errors.email
                            ? 'border-rose-500 ring-1 ring-rose-500/50'
                            : 'border-[#1A3636]/20 focus:border-[#1A3636]'
                        }`}
                      />
                      {errors.email && (
                        <div id="contact-email-error" className="flex items-center gap-1.5 text-xs text-rose-600 mt-1 font-ui">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Phone & Inquiry Nature */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="inquiry-phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#40534C] mb-1.5 font-ui"
                      >
                        Phone Number (Optional)
                      </label>
                      <input
                        id="inquiry-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+65 9123 4567"
                        className="w-full bg-white border border-[#1A3636]/20 rounded-xl px-4 py-3 text-sm text-[#1A3636] placeholder-[#40534C]/50 focus:outline-none focus:border-[#1A3636] font-ui"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-subject"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#40534C] mb-1.5 font-ui"
                      >
                        Inquiry Nature
                      </label>
                      <select
                        id="inquiry-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-white border border-[#1A3636]/20 rounded-xl px-4 py-3 text-sm text-[#1A3636] focus:outline-none focus:border-[#1A3636] font-ui cursor-pointer"
                      >
                        <option value="General Dining Inquiry">General Dining Inquiry</option>
                        <option value="Private Dining Room Celebration (Seats 8-16)">Private Dining Room (8-16 Guests)</option>
                        <option value="Full Restaurant Buyout (Up to 80 Guests)">Full Restaurant Buyout (Up to 80 Guests)</option>
                        <option value="Press, Media & Partnerships">Press & Brand Collaboration</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#40534C] mb-1.5 font-ui"
                    >
                      Message *
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share details about your desired date, guest count, dietary preferences, or specific occasion..."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#1A3636] placeholder-[#40534C]/50 focus:outline-none transition-all font-ui resize-none ${
                        errors.message
                          ? 'border-rose-500 ring-1 ring-rose-500/50'
                          : 'border-[#1A3636]/20 focus:border-[#1A3636]'
                      }`}
                    />
                    {errors.message && (
                      <div id="contact-message-error" className="flex items-center gap-1.5 text-xs text-rose-600 mt-1 font-ui">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <MagneticButton
                      type="submit"
                      className="btn-primary text-xs sm:text-sm px-8 py-3.5 flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Send Inquiry to Concierge</span>
                      <Send className="w-3.5 h-3.5" />
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Fictional Brand Demonstration Disclaimer */}
          <div className="pt-8 border-t border-[#1A3636]/15 text-center max-w-xl mx-auto space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#40534C] font-ui">
              <Info className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Demonstration preview · Morrow House is a hospitality portfolio concept.</span>
            </div>
            <p className="text-[11px] text-[#40534C]/70 font-ui leading-relaxed">
              All addresses, service hours, capacities, and phone numbers are intentional demo content.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
