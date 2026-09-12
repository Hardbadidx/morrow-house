import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { SPACES_DATA } from '../../data/ambianceData';
import {
  Calendar,
  Clock,
  Users,
  Utensils,
  CheckCircle,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

export function ReservationPage() {
  const { reservationPrefill } = useNavigation();

  // Reservation Form State
  const [partySize, setPartySize] = useState('2');
  const [selectedZone, setSelectedZone] = useState('dining-room');
  const [selectedDate, setSelectedDate] = useState('2026-09-15');
  const [selectedTime, setSelectedTime] = useState('19:30');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: reservationPrefill ? `Interested in: ${reservationPrefill}` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [copied, setCopied] = useState(false);

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury API booking response
    setTimeout(() => {
      const code = 'CP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setBookingRef(code);
      setIsSubmitting(false);
      setIsConfirmed(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 600);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(bookingRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#D6BD98] text-[#1A3636] pt-28 sm:pt-36 pb-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#40534C] uppercase font-ui">
            Hospitality Booking
          </span>
          <h1 className="hero-title text-[#1A3636] font-normal leading-[0.98]">
            Your Table <br />
            Awaits
          </h1>
          <p className="text-sm sm:text-base text-[#40534C] font-ui leading-relaxed">
            Reserve your experience at Morrow House Singapore. For private dining or special requests exceeding 8 guests, please specify below.
          </p>
        </div>

        {/* Confirmation Card View */}
        {isConfirmed ? (
          <div className="bg-[#1A3636] text-[#FBF8F3] rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 animate-fade-in border border-[#677D6A]/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#D6BD98] text-[#1A3636] flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D6BD98] font-semibold font-ui">
                  Reservation Confirmed
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FBF8F3]">
                  We Look Forward to Welcoming You
                </h2>
              </div>
            </div>

            {/* Receipt Details Box */}
            <div className="bg-[#243E38] rounded-2xl p-6 border border-[#677D6A]/40 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#677D6A]/30">
                <div className="text-xs text-[#D6BD98] font-ui">
                  Booking Reference
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-[#FBF8F3]">{bookingRef}</span>
                  <button
                    onClick={handleCopyCode}
                    className="text-xs text-[#D6BD98] hover:text-white flex items-center gap-1 cursor-pointer bg-black/20 px-2 py-1 rounded"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-ui">
                <div>
                  <div className="text-[#D6BD98]/70">Guest</div>
                  <div className="font-bold text-[#FBF8F3] mt-0.5">{formData.name}</div>
                </div>
                <div>
                  <div className="text-[#D6BD98]/70">Party Size</div>
                  <div className="font-bold text-[#FBF8F3] mt-0.5">{partySize} Guests</div>
                </div>
                <div>
                  <div className="text-[#D6BD98]/70">Date & Time</div>
                  <div className="font-bold text-[#FBF8F3] mt-0.5">{selectedDate} at {selectedTime}</div>
                </div>
                <div>
                  <div className="text-[#D6BD98]/70">Experience Zone</div>
                  <div className="font-bold text-[#FBF8F3] mt-0.5 capitalize">
                    {selectedZone.replace('-', ' ')}
                  </div>
                </div>
              </div>

              {formData.specialRequests && (
                <div className="pt-3 border-t border-[#677D6A]/30 text-xs font-ui">
                  <span className="text-[#D6BD98]/70">Special Requests: </span>
                  <span className="text-[#FBF8F3]">{formData.specialRequests}</span>
                </div>
              )}
            </div>

            <div className="space-y-3 text-xs text-[#D6BD98]/80 font-ui">
              <p>• A confirmation email with calendar invite has been dispatched to {formData.email}.</p>
              <p>• Valet parking is available at 30 Jalan Hang Lekir. Tables are held for 15 minutes past reservation time.</p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  setIsConfirmed(false);
                  setFormData({ name: '', email: '', phone: '', specialRequests: '' });
                }}
                className="btn-secondary text-xs px-6 py-3"
              >
                Make Another Reservation
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Booking Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#FBF8F3] rounded-3xl p-6 sm:p-10 shadow-xl border border-[#1A3636]/10 space-y-8"
          >
            {/* Step 1: Experience Zone Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui">
                1. Select Atmosphere & Zone
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {SPACES_DATA.map((space) => {
                  const isSelected = selectedZone === space.id;
                  return (
                    <button
                      type="button"
                      key={space.id}
                      onClick={() => setSelectedZone(space.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer font-ui flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1A3636] text-[#D6BD98] border-[#1A3636] shadow-md'
                          : 'bg-[#E7D7C1]/30 text-[#1A3636] border-[#1A3636]/15 hover:bg-[#E7D7C1]/70'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{space.title}</div>
                        <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-[#D6BD98]/80' : 'text-[#40534C]'}`}>
                          {space.subtitle}
                        </div>
                      </div>
                      <div className={`text-[10px] mt-3 font-semibold uppercase tracking-wider ${isSelected ? 'text-[#D6BD98]' : 'text-[#677D6A]'}`}>
                        {space.capacity}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Party Size, Date, Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#1A3636]/10">
              {/* Party Size */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui">
                  <Users className="w-4 h-4 text-[#40534C]" />
                  <span>Guests</span>
                </label>
                <select
                  value={partySize}
                  onChange={(e) => setPartySize(e.target.value)}
                  className="w-full bg-[#E7D7C1]/30 border border-[#1A3636]/20 rounded-2xl px-4 py-3 text-sm text-[#1A3636] font-ui font-semibold focus:outline-none focus:border-[#1A3636]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Picker */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui">
                  <Calendar className="w-4 h-4 text-[#40534C]" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full bg-[#E7D7C1]/30 border border-[#1A3636]/20 rounded-2xl px-4 py-2.5 text-sm text-[#1A3636] font-ui font-semibold focus:outline-none focus:border-[#1A3636]"
                />
              </div>

              {/* Time Slot */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui">
                  <Clock className="w-4 h-4 text-[#40534C]" />
                  <span>Time</span>
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-[#E7D7C1]/30 border border-[#1A3636]/20 rounded-2xl px-4 py-3 text-sm text-[#1A3636] font-ui font-semibold focus:outline-none focus:border-[#1A3636]"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Contact Info */}
            <div className="space-y-4 pt-4 border-t border-[#1A3636]/10">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui">
                2. Contact Information
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
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
                <input
                  type="tel"
                  placeholder="Mobile Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full bg-[#E7D7C1]/30 border border-[#1A3636]/20 rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#1A3636] placeholder-[#40534C]/60 focus:outline-none focus:border-[#1A3636] font-ui"
                />
              </div>

              <textarea
                placeholder="Dietary preferences, allergies, celebrations, or special seating requests..."
                rows={3}
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full bg-[#E7D7C1]/30 border border-[#1A3636]/20 rounded-2xl p-4 text-xs sm:text-sm text-[#1A3636] placeholder-[#40534C]/60 focus:outline-none focus:border-[#1A3636] font-ui"
              />
            </div>

            {/* Step 4: Submission CTA */}
            <div className="pt-4 border-t border-[#1A3636]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#40534C] font-ui">
                No deposit required for standard tables · Free cancellation up to 2 hours prior
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto btn-primary text-sm px-8 py-4 shadow-lg flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Confirming Table...' : 'Request Reservation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
