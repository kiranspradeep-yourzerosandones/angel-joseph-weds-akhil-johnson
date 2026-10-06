'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from 'framer-motion';

interface FormState {
  name: string;
  guests: string;
  attending: 'yes' | 'no';
  message: string;
}

export default function RSVP() {
  const ref = useScrollReveal<HTMLElement>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    name: '',
    guests: '1',
    attending: 'yes',
    message: '',
  });

  const handleChange =
    (field: keyof FormState) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const attendingText = form.attending === 'yes' ? 'Joyfully Accept' : 'Regretfully Decline';
    const whatsappMessage = `Hello! I would like to RSVP for the wedding.

Name: ${form.name}
Attending: ${attendingText}
Number of Guests: ${form.guests}
Message: ${form.message || 'No message'}

Looking forward to celebrating with you!`;

    // WhatsApp API URL (replace with actual phone number)
    // Format: https://wa.me/{phone_number}?text={message}
    const phoneNumber = '919876543210'; // Replace with actual WhatsApp number (country code + number, no + or spaces)
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({
      name: '',
      guests: '1',
      attending: 'yes',
      message: '',
    });
  };

  return (
    <section
      ref={ref}
      className="py-32 md:py-44 px-6 bg-[#6b1f2e] text-[#fdf8f0] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#c9a86a] blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#e8c4b8] blur-[100px]" />
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        <motion.p
          className="reveal font-display text-xs tracking-[0.5em] text-[#c9a86a] uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          Will you join us?
        </motion.p>

        <motion.h2
          className="reveal reveal-delay-1 font-display text-3xl md:text-5xl tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          Kindly RSVP
        </motion.h2>

        <motion.p
          className="reveal reveal-delay-2 text-[#fdf8f0]/70 italic mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          Your presence would mean the world to us
        </motion.p>

        {submitted ? (
          <motion.div
            className="reveal bg-[#fdf8f0]/10 border border-[#c9a86a]/40 rounded-2xl p-12 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.svg
              className="w-16 h-16 text-[#c9a86a] mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
            <h3 className="font-display text-2xl md:text-3xl tracking-[0.3em] uppercase mb-4">
              Thank You!
            </h3>
            <p className="text-[#fdf8f0]/80 mb-6">
              Your response has been sent via WhatsApp. We cannot wait to celebrate with you!
            </p>
            <button
              onClick={resetForm}
              className="text-[#c9a86a] hover:text-[#d4b57a] font-display text-xs tracking-[0.2em] uppercase transition-colors"
            >
              Submit Another Response
            </button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="reveal reveal-delay-3 space-y-6 text-left"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <label className="block font-display text-xs tracking-[0.3em] text-[#c9a86a] uppercase mb-3">
                Your Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={handleChange('name')}
                className="w-full bg-transparent border-b border-[#c9a86a]/40 focus:border-[#c9a86a] outline-none py-3 text-[#fdf8f0] placeholder-[#fdf8f0]/30 transition-colors"
                placeholder="Full name"
              />
            </motion.div>

            {/* Attending & Guests */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: false, amount: 0.2 }}
              >
                <label className="block font-display text-xs tracking-[0.3em] text-[#c9a86a] uppercase mb-3">
                  Attending
                </label>
                <select
                  value={form.attending}
                  onChange={handleChange('attending')}
                  className="w-full bg-transparent border-b border-[#c9a86a]/40 focus:border-[#c9a86a] outline-none py-3 text-[#fdf8f0] transition-colors cursor-pointer"
                >
                  <option value="yes" className="text-[#3a2a1f]">
                    Joyfully Accept
                  </option>
                  <option value="no" className="text-[#3a2a1f]">
                    Regretfully Decline
                  </option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: false, amount: 0.2 }}
              >
                <label className="block font-display text-xs tracking-[0.3em] text-[#c9a86a] uppercase mb-3">
                  Number of Guests
                </label>
                <select
                  value={form.guests}
                  onChange={handleChange('guests')}
                  className="w-full bg-transparent border-b border-[#c9a86a]/40 focus:border-[#c9a86a] outline-none py-3 text-[#fdf8f0] transition-colors cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n} className="text-[#3a2a1f]">
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <label className="block font-display text-xs tracking-[0.3em] text-[#c9a86a] uppercase mb-3">
                A Blessing for the Couple
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={handleChange('message')}
                className="w-full bg-transparent border-b border-[#c9a86a]/40 focus:border-[#c9a86a] outline-none py-3 text-[#fdf8f0] placeholder-[#fdf8f0]/30 resize-none transition-colors"
                placeholder="Write your wishes... (optional)"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full mt-8 py-4 bg-[#c9a86a] hover:bg-[#d4b57a] text-[#6b1f2e] font-display text-sm tracking-[0.3em] uppercase rounded-full transition-all duration-500 hover:shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send via WhatsApp
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
}