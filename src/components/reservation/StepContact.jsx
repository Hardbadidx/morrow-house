import React from 'react';
import { User, Mail, Phone, MessageSquare, AlertCircle } from 'lucide-react';

export function StepContact({ formData, onChange, errors = {} }) {
  const dietaryOptions = ['Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Nut Allergy', 'Halal-Friendly'];
  const occasions = ['Casual Dining', 'Birthday Celebration', 'Anniversary', 'Business Meeting', 'Date Night'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDietary = (tag) => {
    const currentList = formData.dietary || [];
    const nextList = currentList.includes(tag)
      ? currentList.filter((t) => t !== tag)
      : [...currentList, tag];
    onChange((prev) => ({ ...prev, dietary: nextList }));
  };

  const handleOccasionSelect = (occ) => {
    onChange((prev) => ({ ...prev, occasion: occ }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
          <span className="text-xs font-semibold tracking-[0.2em] text-[#40534C] uppercase font-ui">
            Step 4 of 4
          </span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3636]">
          Guest Information
        </h2>
        <p className="text-xs sm:text-sm text-[#40534C] font-ui leading-relaxed">
          Please provide your contact details for your reservation confirmation.
        </p>
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label
            htmlFor="guest-name"
            className="block text-xs font-semibold uppercase tracking-wider text-[#40534C] mb-1.5 font-ui"
          >
            Full Name <span className="text-[#1A3636] font-bold">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#40534C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="guest-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Eleanor Vance"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-full bg-[#FBF8F3] border rounded-xl pl-10 pr-4 py-3 text-sm text-[#1A3636] placeholder-[#40534C]/50 focus:outline-none transition-all font-ui ${
                errors.name
                  ? 'border-rose-500 ring-1 ring-rose-500/50'
                  : 'border-[#1A3636]/20 focus:border-[#1A3636]'
              }`}
            />
          </div>
          {errors.name && (
            <div id="name-error" className="flex items-center gap-1.5 text-xs text-rose-600 mt-1.5 font-ui font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email Address */}
          <div>
            <label
              htmlFor="guest-email"
              className="block text-xs font-semibold uppercase tracking-wider text-[#40534C] mb-1.5 font-ui"
            >
              Email Address <span className="text-[#1A3636] font-bold">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#40534C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="guest-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="eleanor@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full bg-[#FBF8F3] border rounded-xl pl-10 pr-4 py-3 text-sm text-[#1A3636] placeholder-[#40534C]/50 focus:outline-none transition-all font-ui ${
                  errors.email
                    ? 'border-rose-500 ring-1 ring-rose-500/50'
                    : 'border-[#1A3636]/20 focus:border-[#1A3636]'
                }`}
              />
            </div>
            {errors.email && (
              <div id="email-error" className="flex items-center gap-1.5 text-xs text-rose-600 mt-1.5 font-ui font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="guest-phone"
              className="block text-xs font-semibold uppercase tracking-wider text-[#40534C] mb-1.5 font-ui"
            >
              Mobile Number <span className="text-[#1A3636] font-bold">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#40534C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="guest-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+65 9123 4567"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={`w-full bg-[#FBF8F3] border rounded-xl pl-10 pr-4 py-3 text-sm text-[#1A3636] placeholder-[#40534C]/50 focus:outline-none transition-all font-ui ${
                  errors.phone
                    ? 'border-rose-500 ring-1 ring-rose-500/50'
                    : 'border-[#1A3636]/20 focus:border-[#1A3636]'
                }`}
              />
            </div>
            {errors.phone && (
              <div id="phone-error" className="flex items-center gap-1.5 text-xs text-rose-600 mt-1.5 font-ui font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Dietary Preferences Chips */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534C] font-ui">
            Dietary Preferences or Allergies
          </label>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((tag) => {
              const isSelected = (formData.dietary || []).includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleDietary(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer font-ui border ${
                    isSelected
                      ? 'bg-[#1A3636] text-[#D6BD98] border-[#1A3636] shadow-sm'
                      : 'bg-[#FBF8F3] text-[#40534C] border-[#1A3636]/15 hover:border-[#1A3636]/30'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dining Occasion Pills */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#40534C] font-ui">
            Dining Occasion
          </label>
          <div className="flex flex-wrap gap-2">
            {occasions.map((occ) => {
              const isSelected = formData.occasion === occ;
              return (
                <button
                  key={occ}
                  type="button"
                  onClick={() => handleOccasionSelect(occ)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer font-ui border ${
                    isSelected
                      ? 'bg-[#1A3636] text-[#D6BD98] border-[#1A3636] shadow-sm'
                      : 'bg-[#FBF8F3] text-[#40534C] border-[#1A3636]/15 hover:border-[#1A3636]/30'
                  }`}
                >
                  {occ}
                </button>
              );
            })}
          </div>
        </div>

        {/* Special Requests */}
        <div className="space-y-1.5 pt-2">
          <label
            htmlFor="special-requests"
            className="block text-xs font-semibold uppercase tracking-wider text-[#40534C] font-ui"
          >
            Special Requests & Notes
          </label>
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-[#40534C] absolute left-3.5 top-3.5 pointer-events-none" />
            <textarea
              id="special-requests"
              name="specialRequests"
              rows={3}
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="e.g. Quiet corner table preferred, celebration dessert candle..."
              className="w-full bg-[#FBF8F3] border border-[#1A3636]/20 rounded-xl pl-10 pr-4 py-3 text-sm text-[#1A3636] placeholder-[#40534C]/50 focus:outline-none focus:border-[#1A3636] font-ui resize-none"
            />
          </div>
        </div>

        {/* Neutral Hospitality Note */}
        <div className="text-[11px] text-[#40534C]/80 font-ui pt-1">
          Please arrive a few minutes before your reservation.
        </div>
      </div>
    </div>
  );
}
