  import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("meewyndq");

  // Styled Success State
  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="bg-green-50 p-8 rounded-3xl shadow-lg max-w-md text-center border border-green-100 motion-preset-fade">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 leading-relaxed">
            Your inquiry has been successfully sent. Our admissions team will get back to you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-5 md:px-8 bg-[#FDF8F0] min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-[#1B2A4A]/5">
        
        {/* Header Area */}
        <div className="bg-[#1B2A4A] px-8 py-10 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-3 tracking-tight">
            Admissions Inquiry
          </h2>
          <p className="text-blue-100/80 text-sm max-w-xs mx-auto">
            Have a question about Diamond Kids School? Drop us a message below.
          </p>
        </div>

        {/* Form Area */}
        <div className="p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Added a Name Field for Professionalism */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="e.g. John Doe"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/50 focus:border-[#FF6B4A] transition-all bg-gray-50 focus:bg-white text-sm"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email" 
                name="email"
                placeholder="e.g. john@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/50 focus:border-[#FF6B4A] transition-all bg-gray-50 focus:bg-white text-sm"
              />
              {/* Formspree Validation Errors */}
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
                className="text-red-500 text-xs mt-1.5 font-medium"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="How can we help you?"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/50 focus:border-[#FF6B4A] transition-all bg-gray-50 focus:bg-white resize-none text-sm"
              />
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
                className="text-red-500 text-xs mt-1.5 font-medium"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={state.submitting}
              className="w-full bg-[#1B2A4A] hover:bg-[#17dd45] text-white hover:text-black text-sm font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {state.submitting ? 'Sending...' : 'Send Message'}
            </button>
            
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;