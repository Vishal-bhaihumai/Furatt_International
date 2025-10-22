import React, { useState, useEffect, useRef } from 'react';
import { CORE_CONFIG, SITE_CONFIG } from '../config/constants';
import { CalendarDays, Users, Bed, MessageSquare } from 'lucide-react';

type FormData = {
  name: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
  specialRequests: string;
};

type DateInputProps = {
  id: string;
  value: string; // ISO yyyy-mm-dd
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  required?: boolean;
  className?: string;
  label: string;
};

const DateInput: React.FC<DateInputProps> = ({
  id,
  value,
  onChange,
  min,
  required,
  className,
  label,
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(() =>
    value ? new Date(value) : new Date()
  );
  const calendarRef = useRef<HTMLDivElement>(null);

  const formatForDisplay = (iso: string) => {
    if (!iso) return '';
    const date = new Date(iso);
    if (isNaN(date.getTime())) return '';
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const formatForInput = (disp: string) => {
    if (!disp || !/^\d{2}\/\d{2}\/\d{4}$/.test(disp)) return '';
    const [d, m, y] = disp.split('/');
    return `${y}-${m}-${d}`;
  };

  useEffect(() => {
    setDisplayValue(formatForDisplay(value));
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDisplayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDisplayValue(val);
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
      const iso = formatForInput(val);
      const date = new Date(iso);
      const isValid = !isNaN(date.getTime());
      if (isValid) {
        const syntheticEvent = {
          target: { id, value: iso },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
        setCalendarDate(date);
      }
    }
  };

  const handleDateClick = (date: Date) => {
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    const iso = `${y}-${m}-${d}`;
    const syntheticEvent = {
      target: { id, value: iso },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
    setShowCalendar(false);
  };

  const renderCalendar = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const today = new Date();
    const minDate = min ? new Date(min) : null;

    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1).getDay();
    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Generate week rows
    const calendar: JSX.Element[][] = [[]];
    let currentWeek = 0;

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      calendar[currentWeek].push(
        <td key={`empty-${i}`} className="py-1 px-2"></td>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const isSelected = value === dateString;
      const isPast = minDate && date < minDate;
      const isToday = date.toDateString() === today.toDateString();

      calendar[currentWeek].push(
        <td key={day} className="p-1 text-center">
          <button
            type="button"
            onClick={() => !isPast && handleDateClick(date)}
            disabled={isPast}
            className={`w-9 h-9 rounded-full text-sm 
              ${
                isPast
                  ? 'text-gray-300 cursor-not-allowed'
                  : isSelected
                  ? 'bg-amber-600 text-white font-bold'
                  : isToday
                  ? 'bg-amber-200 font-bold'
                  : 'hover:bg-amber-100'
              }`}
          >
            {day}
          </button>
        </td>
      );

      // Move to next week if it's the end of the week (Saturday)
      if ((firstDay + day) % 7 === 0) {
        calendar.push([]);
        currentWeek++;
      }
    }

    // Add empty cells for remaining days in the last week
    const lastWeekLength = calendar[currentWeek].length;
    if (lastWeekLength < 7) {
      for (let i = 0; i < 7 - lastWeekLength; i++) {
        calendar[currentWeek].push(
          <td key={`empty-end-${i}`} className="py-1 px-2"></td>
        );
      }
    }

    return (
      <div
        ref={calendarRef}
        className="absolute bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-50"
      >
        <div className="flex justify-between items-center px-3 py-2 border-b">
          <button
            type="button"
            onClick={() => setCalendarDate(new Date(year, month - 1, 1))}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600"
          >
            ‹
          </button>
          <span className="font-medium">
            {calendarDate.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <button
            type="button"
            onClick={() => setCalendarDate(new Date(year, month + 1, 1))}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600"
          >
            ›
          </button>
        </div>
        <table className="w-full table-fixed text-sm border-collapse">
          <thead>
            <tr className="text-gray-500">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <th key={d} className="py-2 font-medium">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendar.map((week, i) => (
              <tr key={`week-${i}`}>{week}</tr>
            ))}
          </tbody>
        </table>
        <div className="p-2 border-t text-xs text-gray-500 text-center">
          Click outside to close
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <label
        htmlFor={`disp-${id}`}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          id={`disp-${id}`}
          value={displayValue}
          onChange={handleDisplayChange}
          onClick={() => setShowCalendar(true)}
          placeholder="DD/MM/YYYY"
          inputMode="numeric"
          maxLength={10}
          className={
            className ||
            'mt-1 w-full block rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500'
          }
        />
        <button
          type="button"
          onClick={() => setShowCalendar((prev) => !prev)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <CalendarDays className="h-5 w-5" />
        </button>
      </div>
      {showCalendar && renderCalendar()}
    </div>
  );
};

const Reservation: React.FC = () => {
  const formConfig = SITE_CONFIG.features.forms.reservation;
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    rooms: 1,
    guests: 2,
    specialRequests: '',
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: string;
    content: string;
  } | null>(null);

  const validateField = (name: string, value: string | number) => {
    if (
      name === 'email' &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))
    ) {
      return 'Please enter a valid email address';
    }
    if (name === 'phone' && !/^\d{10}$/.test(String(value))) {
      return 'Please enter a 10‑digit phone number without country code';
    }
    return '';
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    const newVal = id === 'rooms' || id === 'guests' ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [id]: newVal }));
    const err = validateField(id, newVal);
    setErrors((prev) => ({ ...prev, [id]: err }));
  };

  const formatDate = (iso: string) => {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  };
  const calculateNights = (inStr: string, outStr: string) => {
    if (!inStr || !outStr) return 0;
    const diff = new Date(outStr).getTime() - new Date(inStr).getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newErrors: { [k: string]: string } = {};
    ['email', 'phone'].forEach((k) => {
      const val = (formData as any)[k];
      const err = validateField(k, val);
      if (err) newErrors[k] = err;
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    try {
      if (
        !formData.name ||
        !formData.phone ||
        !formData.checkIn ||
        !formData.checkOut
      ) {
        throw new Error('Please fill in all required fields.');
      }
      const nights = calculateNights(formData.checkIn, formData.checkOut);
      let text = `Hello ${CORE_CONFIG.business.basic.name} Team,\n\nI'd like to inquire about staying at your property.\n\n`;
      text += `*Contact Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\n`;
      if (formData.email) text += `Email: ${formData.email}\n`;
      text += `\n*Room Booking Request:*\nCheck-in: ${formatDate(
        formData.checkIn
      )}\nCheck-out: ${formatDate(
        formData.checkOut
      )}\nStay Duration: ${nights} ${
        nights === 1 ? 'night' : 'nights'
      }\nRooms: ${formData.rooms}\nGuests: ${formData.guests}\n`;
      if (formData.specialRequests)
        text += `\n*Special Requests:*\n${formData.specialRequests}\n`;
      text += `\nPlease let me know availability and best rates. Thank you!`;
      const num = CORE_CONFIG.contact.primary.whatsapp.replace(/\D/g, '');
      const url = `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
      setMessage({
        type: 'success',
        content: formConfig.messages.success.content,
      });
      setTimeout(() => {
        setMessage(null);
        window.open(url, '_blank');
      }, SITE_CONFIG.features.forms.common.timing.redirectDelay);
      setFormData({
        name: '',
        phone: '',
        email: '',
        checkIn: '',
        checkOut: '',
        rooms: 1,
        guests: 2,
        specialRequests: '',
      });
      setErrors({});
    } catch (err: any) {
      setMessage({
        type: 'error',
        content: err.message || 'An error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservations" className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Book a Room</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience comfort and hospitality at its best. All rooms include
            complimentary breakfast and access to our pure vegetarian
            restaurant.
          </p>
        </div>
        {message && (
          <div
            className={`mb-6 p-4 rounded-md whitespace-pre-line ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.content}
          </div>
        )}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-amber-600" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10‑digit number"
                    required
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-amber-500 ${
                      errors.phone
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-300 focus:border-amber-500'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-amber-500 ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-300 focus:border-amber-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Bed className="mr-2 h-5 w-5 text-amber-600" />
                Stay Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <DateInput
                  id="checkIn"
                  label="Check-in Date"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                <DateInput
                  id="checkOut"
                  label="Check-out Date"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={
                    formData.checkIn || new Date().toISOString().split('T')[0]
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="rooms"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of Rooms <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="rooms"
                    value={formData.rooms}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Room' : 'Rooms'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Guests <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <label
                htmlFor="specialRequests"
                className="block text-sm font-medium text-gray-700"
              >
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={3}
                placeholder="Any specific room preferences, early check‑in requests, or other requirements?"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
              <h4 className="font-medium text-amber-800 mb-2">
                Room Perks & Policies
              </h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  <span className="text-green-600 mr-2">✓</span>Complimentary
                  breakfast included
                </li>
                <li>
                  <span className="text-green-600 mr-2">✓</span>Free Wi‑Fi in
                  all rooms
                </li>
                <li>
                  <span className="text-green-600 mr-2">✓</span>24/7 room
                  service available
                </li>
                <li>
                  <span className="text-green-600 mr-2">✓</span>Check-in:{' '}
                  {CORE_CONFIG.accommodation?.policies?.checkIn || '12:00 PM'} |
                  Check‑out:{' '}
                  {CORE_CONFIG.accommodation?.policies?.checkOut || '11:00 AM'}
                </li>
              </ul>
            </div>
            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={loading || Object.keys(errors).some((k) => errors[k])}
                className={`bg-amber-600 text-white px-8 py-3 rounded-full font-semibold ${
                  loading || Object.keys(errors).some((k) => errors[k])
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-amber-700'
                } transition-colors shadow-md hover:shadow-lg`}
              >
                {loading
                  ? 'Submitting Inquiry...'
                  : 'Check Availability & Rates'}
              </button>
            </div>
            <div className="text-xs text-gray-500 italic text-center mt-2">
              <p>
                All reservations are subject to availability. We will contact
                you to confirm your reservataion and provide other details.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
