import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SubscribeToGetDiscount = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setStatus({ type: 'error', message: 'Please enter your email address' });
      return;
    }
    // Here you would typically make an API call to your backend
    setStatus({ type: 'success', message: 'Thank you for subscribing! Check your email for your discount code.' });
    setEmail('');
  };

  return (
    <section className="relative py-20  bg-white">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        animate={{
          x: [0, 30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        animate={{
          x: [0, -30, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12 lg:p-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get 10% Off Your First Order
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Subscribe to our newsletter and receive exclusive offers, early access to new products, and style inspiration straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
              
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center mt-4 ${
                    status.type === 'error' ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
            </form>

            <div className="mt-8 text-sm text-gray-500">
              <p>By subscribing, you agree to receive marketing communications from us.</p>
              <p className="mt-2">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeToGetDiscount;
