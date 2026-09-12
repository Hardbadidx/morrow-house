import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Copy, Check, Calendar, ArrowRight, Download, Home, Utensils } from 'lucide-react';

export function ReservationReceipt({ bookingData, onReset }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (bookingData?.ref) {
      navigator.clipboard.writeText(bookingData.ref);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Helper to construct Google Calendar URL
  const getGoogleCalendarUrl = () => {
    if (!bookingData?.date || !bookingData?.time) return '#';
    const dateClean = bookingData.date.replace(/-/g, '');
    // Parse time to approximate hour
    const isPM = bookingData.time.includes('PM');
    const [hStr, mStr] = bookingData.time.replace(/ (AM|PM)/, '').split(':');
    let hour = parseInt(hStr, 10);
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    const startHour = String(hour).padStart(2, '0');
    const endHour = String(hour + 2).padStart(2, '0');
    const startMinutes = mStr || '00';

    const startIso = `${dateClean}T${startHour}${startMinutes}00Z`;
    const endIso = `${dateClean}T${endHour}${startMinutes}00Z`;

    const title = encodeURIComponent(`Reservation at Morrow House (${bookingData.experienceTitle || 'Dining'})`);
    const details = encodeURIComponent(
      `Table Reservation Code: ${bookingData.ref}\nParty Size: ${bookingData.partySize}\nAtmosphere: ${bookingData.experienceTitle}\nGuest: ${bookingData.name}\nSpecial Requests: ${bookingData.specialRequests || 'None'}`
    );
    const location = encodeURIComponent('Morrow House, Singapore');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  // Helper to generate and download standard .ics calendar invite
  const handleDownloadIcs = () => {
    if (!bookingData?.date || !bookingData?.time) return;
    const dateClean = bookingData.date.replace(/-/g, '');
    const isPM = bookingData.time.includes('PM');
    const [hStr, mStr] = bookingData.time.replace(/ (AM|PM)/, '').split(':');
    let hour = parseInt(hStr, 10);
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    const startHour = String(hour).padStart(2, '0');
    const endHour = String(hour + 2).padStart(2, '0');
    const startMinutes = mStr || '00';

    const dtStart = `${dateClean}T${startHour}${startMinutes}00`;
    const dtEnd = `${dateClean}T${endHour}${startMinutes}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Morrow House//Reservation System//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:Table Reservation — Morrow House`,
      `DESCRIPTION:Booking Reference: ${bookingData.ref}\\nParty: ${bookingData.partySize}\\nAtmosphere: ${bookingData.experienceTitle || 'Dining'}\\nGuest: ${bookingData.name}`,
      'LOCATION:Morrow House, Singapore',
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `morrow-house-reservation-${bookingData.ref}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#1A3636] text-[#FBF8F3] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#677D6A]/30 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start sm:items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#D6BD98] text-[#1A3636] flex items-center justify-center flex-shrink-0 shadow-md">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div className="space-y-0.5">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D6BD98] font-bold font-ui">
            Reservation Confirmed
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FBF8F3] leading-tight">
            We Look Forward to Welcoming You
          </h2>
        </div>
      </div>

      {/* Booking Reference Hero Box */}
      <div className="bg-[#243E38] rounded-2xl p-5 sm:p-6 border border-[#677D6A]/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#677D6A]/30">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#D6BD98] font-ui">
              Booking Reference
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-[#FBF8F3] tracking-wider mt-0.5">
              {bookingData?.ref}
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="text-xs text-[#1A3636] bg-[#D6BD98] hover:bg-[#D6BD98]/90 font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-sm font-ui"
          >
            {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Code Copied' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Detailed Reservation Recap */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-ui">
          <div>
            <div className="text-[#D6BD98]/75">Primary Guest</div>
            <div className="font-bold text-[#FBF8F3] text-sm mt-0.5">{bookingData?.name || 'Guest'}</div>
            <div className="text-[#D6BD98]/60 text-[11px] mt-0.5">{bookingData?.email}</div>
          </div>

          <div>
            <div className="text-[#D6BD98]/75">Atmosphere</div>
            <div className="font-bold text-[#FBF8F3] text-sm mt-0.5">
              {bookingData?.experienceTitle || bookingData?.experience?.replace('-', ' ')}
            </div>
          </div>

          <div>
            <div className="text-[#D6BD98]/75">Date & Service</div>
            <div className="font-bold text-[#FBF8F3] text-sm mt-0.5">{bookingData?.formattedDate || bookingData?.date}</div>
            <div className="text-[#D6BD98]/80 text-[11px] mt-0.5 font-mono">{bookingData?.time}</div>
          </div>

          <div>
            <div className="text-[#D6BD98]/75">Party Size</div>
            <div className="font-bold text-[#FBF8F3] text-sm mt-0.5">{bookingData?.partySize}</div>
          </div>
        </div>

        {/* Extra Notes */}
        {(bookingData?.dietary?.length > 0 || bookingData?.occasion || bookingData?.specialRequests) && (
          <div className="pt-4 border-t border-[#677D6A]/30 space-y-2 text-xs font-ui">
            {bookingData.occasion && (
              <div>
                <span className="text-[#D6BD98]/75">Occasion: </span>
                <span className="font-semibold text-[#FBF8F3]">{bookingData.occasion}</span>
              </div>
            )}
            {bookingData.dietary?.length > 0 && (
              <div>
                <span className="text-[#D6BD98]/75">Dietary Notes: </span>
                <span className="text-[#FBF8F3]">{bookingData.dietary.join(', ')}</span>
              </div>
            )}
            {bookingData.specialRequests && (
              <div>
                <span className="text-[#D6BD98]/75">Special Requests: </span>
                <span className="text-[#FBF8F3] italic">{bookingData.specialRequests}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Calendar Actions */}
      <div className="space-y-2 pt-1">
        <div className="text-xs uppercase tracking-wider font-semibold text-[#D6BD98] font-ui">
          Calendar Integration
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-[#243E38] hover:bg-[#2e4c45] border border-[#677D6A]/40 text-[#FBF8F3] flex items-center gap-2 transition-colors cursor-pointer font-ui"
          >
            <Calendar className="w-3.5 h-3.5 text-[#D6BD98]" />
            <span>Add to Google Calendar</span>
          </a>

          <button
            type="button"
            onClick={handleDownloadIcs}
            className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-[#243E38] hover:bg-[#2e4c45] border border-[#677D6A]/40 text-[#FBF8F3] flex items-center gap-2 transition-colors cursor-pointer font-ui"
          >
            <Download className="w-3.5 h-3.5 text-[#D6BD98]" />
            <span>Download .ics Invite</span>
          </button>
        </div>
      </div>

      {/* Neutral Hospitality Note */}
      <div className="text-xs text-[#D6BD98]/80 font-ui leading-relaxed bg-[#243E38]/50 p-4 rounded-xl border border-[#677D6A]/20">
        Please arrive a few minutes before your reservation. If your plans change, please contact our concierge at +65 6789 2400.
      </div>

      {/* Navigation Actions */}
      <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#677D6A]/30">
        <Link
          to="/menu"
          className="btn-primary text-xs sm:text-sm px-6 py-3 flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Utensils className="w-4 h-4" />
          <span>Explore Culinary Menu</span>
        </Link>

        <button
          type="button"
          onClick={onReset}
          className="text-xs sm:text-sm text-[#D6BD98] hover:text-white px-4 py-3 cursor-pointer transition-colors font-ui"
        >
          Modify or Book Another Table
        </button>

        <Link
          to="/"
          className="text-xs sm:text-sm text-[#D6BD98]/80 hover:text-white px-4 py-3 cursor-pointer transition-colors font-ui flex items-center gap-1.5"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
