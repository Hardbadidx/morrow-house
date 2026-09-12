import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionReveal } from '../components/ui/SectionReveal';
import { StepExperience } from '../components/reservation/StepExperience';
import { StepDateTime } from '../components/reservation/StepDateTime';
import { StepParty } from '../components/reservation/StepParty';
import { StepContact } from '../components/reservation/StepContact';
import { ReservationReceipt } from '../components/reservation/ReservationReceipt';
import { MagneticButton } from '../components/ui/MagneticButton';
import { SPACES_DATA } from '../data/ambianceData';
import { ArrowLeft, ArrowRight, Check, Calendar, Clock, Users, Utensils, Sparkles, ShieldCheck } from 'lucide-react';

export function Reservations() {
  const [searchParams] = useSearchParams();
  const prefillExperience = searchParams.get('experience');

  // Guided step progression (1 to 4, then receipt)
  const [step, setStep] = useState(1);
  const [highestStepReached, setHighestStepReached] = useState(1);

  // Booking details state
  const [experience, setExperience] = useState('dining-room');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('7:30 PM');
  const [partySize, setPartySize] = useState('2 Guests');
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    dietary: [],
    occasion: 'Casual Dining',
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  // Pre-fill experience from query parameters if present
  useEffect(() => {
    if (prefillExperience && SPACES_DATA.some((s) => s.id === prefillExperience)) {
      setExperience(prefillExperience);
    }
  }, [prefillExperience]);

  // Selected space metadata
  const selectedSpace = SPACES_DATA.find((s) => s.id === experience) || SPACES_DATA[0];

  const stepsList = [
    { number: 1, label: 'Atmosphere' },
    { number: 2, label: 'Date & Time' },
    { number: 3, label: 'Party Size' },
    { number: 4, label: 'Guest Details' },
  ];

  const handleStepJump = (targetStep) => {
    if (targetStep <= highestStepReached) {
      setStep(targetStep);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (step < 4) {
      const nextStep = step + 1;
      setStep(nextStep);
      if (nextStep > highestStepReached) {
        setHighestStepReached(nextStep);
      }
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const validateContact = () => {
    const errs = {};
    if (!contactData.name || contactData.name.trim().length < 2) {
      errs.name = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactData.email || !emailRegex.test(contactData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    const phoneClean = contactData.phone.replace(/[^0-9+]/g, '');
    if (!contactData.phone || phoneClean.length < 7) {
      errs.phone = 'Please provide a valid contact number.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateContact()) {
      return;
    }

    const ref = 'CP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const confirmedData = {
      ref,
      name: contactData.name.trim(),
      email: contactData.email.trim(),
      phone: contactData.phone.trim(),
      experience,
      experienceTitle: selectedSpace.title,
      date,
      formattedDate: new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      }),
      time,
      partySize,
      dietary: contactData.dietary,
      occasion: contactData.occasion,
      specialRequests: contactData.specialRequests.trim(),
    };

    setBookingConfirmation(confirmedData);
    setIsSubmitted(true);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setBookingConfirmation(null);
    setStep(1);
    setHighestStepReached(1);
    setContactData({
      name: '',
      email: '',
      phone: '',
      dietary: [],
      occasion: 'Casual Dining',
      specialRequests: '',
    });
    setErrors({});
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#D6BD98] text-[#1A3636] pt-28 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          {/* Header */}
          <SectionReveal distance={20}>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#40534C] uppercase font-ui">
                  Hospitality Booking
                </span>
              </div>
              <h1 className="hero-title text-[#1A3636] font-normal leading-[0.96]">
                Your Table <br className="hidden sm:inline" />
                Awaits
              </h1>
              <p className="text-sm sm:text-base text-[#40534C] font-ui leading-relaxed max-w-xl mx-auto">
                Select your preferred dining space, date, and party size. We prepare every table with bespoke care.
              </p>
            </div>
          </SectionReveal>

          {/* Form or Receipt View */}
          {isSubmitted && bookingConfirmation ? (
            <div className="max-w-3xl mx-auto">
              <ReservationReceipt bookingData={bookingConfirmation} onReset={handleReset} />
            </div>
          ) : (
            <div className="space-y-8 max-w-6xl mx-auto">
              {/* Stepper Progression Navigation Bar */}
              <div className="bg-[#FBF8F3] border border-[#1A3636]/15 rounded-2xl p-3 sm:p-4 shadow-sm">
                <div className="grid grid-cols-4 gap-2">
                  {stepsList.map((s) => {
                    const isCurrent = step === s.number;
                    const isCompleted = step > s.number;
                    const isClickable = s.number <= highestStepReached;

                    return (
                      <button
                        key={s.number}
                        type="button"
                        onClick={() => handleStepJump(s.number)}
                        disabled={!isClickable}
                        className={`py-2 px-1 sm:px-3 rounded-xl text-center transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs font-ui ${
                          isCurrent
                            ? 'bg-[#1A3636] text-[#D6BD98] font-bold shadow-sm'
                            : isCompleted
                            ? 'text-[#1A3636] hover:bg-[#E7D7C1]/50 cursor-pointer'
                            : 'text-[#40534C]/50 cursor-not-allowed'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isCurrent
                              ? 'bg-[#D6BD98] text-[#1A3636]'
                              : isCompleted
                              ? 'bg-[#1A3636] text-[#D6BD98]'
                              : 'bg-[#1A3636]/10 text-[#40534C]'
                          }`}
                        >
                          {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : s.number}
                        </div>
                        <span className="hidden sm:inline font-semibold">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main 2-Column Booking Journey Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Active Step Panel (Left / Main) */}
                <div className="lg:col-span-8 bg-[#FBF8F3] rounded-3xl p-6 sm:p-10 border border-[#1A3636]/15 shadow-xl flex flex-col justify-between min-h-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -14 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1"
                    >
                      {step === 1 && (
                        <StepExperience
                          selectedExperience={experience}
                          onSelect={(id) => setExperience(id)}
                        />
                      )}

                      {step === 2 && (
                        <StepDateTime
                          selectedDate={date}
                          onSelectDate={(d) => setDate(d)}
                          selectedTime={time}
                          onSelectTime={(t) => setTime(t)}
                        />
                      )}

                      {step === 3 && (
                        <StepParty
                          partySize={partySize}
                          onSelectPartySize={(size) => setPartySize(size)}
                        />
                      )}

                      {step === 4 && (
                        <StepContact
                          formData={contactData}
                          onChange={setContactData}
                          errors={errors}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Step Navigation Controls Footer */}
                  <div className="pt-8 mt-8 border-t border-[#1A3636]/10 flex items-center justify-between gap-4">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="text-xs sm:text-sm font-semibold text-[#1A3636] hover:text-[#40534C] transition-colors font-ui flex items-center gap-2 cursor-pointer px-4 py-3"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous Step</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 4 ? (
                      <MagneticButton
                        type="button"
                        onClick={handleNext}
                        className="btn-primary text-xs sm:text-sm px-7 py-3 flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </MagneticButton>
                    ) : (
                      <MagneticButton
                        type="button"
                        onClick={handleSubmit}
                        data-cursor="reserve"
                        className="btn-primary text-xs sm:text-sm px-8 py-3.5 flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>Confirm Reservation</span>
                        <ArrowRight className="w-4 h-4" />
                      </MagneticButton>
                    )}
                  </div>
                </div>

                {/* Live Reservation Summary Rail (Right Sidebar) */}
                <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
                  <div className="bg-[#FBF8F3] border border-[#1A3636]/15 rounded-3xl p-6 shadow-md space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-[#1A3636]/10">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#40534C]" />
                        <span>Reservation Summary</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono font-bold text-[#40534C] bg-[#E7D7C1]/50 px-2 py-0.5 rounded-full">
                        Step {step} of 4
                      </span>
                    </div>

                    <div className="space-y-4 text-xs font-ui">
                      {/* Atmosphere Summary */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2 text-[#40534C]">
                          <Utensils className="w-4 h-4 text-[#1A3636]" />
                          <span>Atmosphere</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#1A3636]">{selectedSpace.title}</div>
                          <div className="text-[10px] text-[#40534C]">{selectedSpace.tag}</div>
                        </div>
                      </div>

                      {/* Date & Time Summary */}
                      <div className="flex items-start justify-between gap-3 pt-3 border-t border-[#1A3636]/10">
                        <div className="flex items-center gap-2 text-[#40534C]">
                          <Calendar className="w-4 h-4 text-[#1A3636]" />
                          <span>Date</span>
                        </div>
                        <div className="text-right font-bold text-[#1A3636]">
                          {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-3 pt-3 border-t border-[#1A3636]/10">
                        <div className="flex items-center gap-2 text-[#40534C]">
                          <Clock className="w-4 h-4 text-[#1A3636]" />
                          <span>Service Time</span>
                        </div>
                        <div className="text-right font-mono font-bold text-[#1A3636]">
                          {time}
                        </div>
                      </div>

                      {/* Party Size */}
                      <div className="flex items-start justify-between gap-3 pt-3 border-t border-[#1A3636]/10">
                        <div className="flex items-center gap-2 text-[#40534C]">
                          <Users className="w-4 h-4 text-[#1A3636]" />
                          <span>Party Size</span>
                        </div>
                        <div className="text-right font-bold text-[#1A3636]">
                          {partySize}
                        </div>
                      </div>

                      {/* Primary Guest (if entered) */}
                      {contactData.name && (
                        <div className="flex items-start justify-between gap-3 pt-3 border-t border-[#1A3636]/10">
                          <span className="text-[#40534C]">Guest</span>
                          <span className="font-bold text-[#1A3636] truncate max-w-[140px]">
                            {contactData.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Neutral Hospitality Policy & Demo Note */}
                    <div className="pt-4 border-t border-[#1A3636]/10 space-y-2">
                      <div className="flex items-start gap-2 text-[11px] text-[#40534C] font-ui leading-relaxed">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#1A3636] mt-0.5 flex-shrink-0" />
                        <span>Please arrive a few minutes before your reservation.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
