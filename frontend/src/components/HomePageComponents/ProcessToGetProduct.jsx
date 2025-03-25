import React from 'react';

const steps = [
  {
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Browse Products",
    description: "Explore our wide range of high-quality products across various categories."
  },
  {
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Add to Cart",
    description: "Select your favorite items and add them to your shopping cart with one click."
  },
  {
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Checkout",
    description: "Securely complete your purchase with our easy checkout process."
  },
  {
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    title: "Fast Delivery",
    description: "Receive your order at your doorstep with our quick and reliable delivery service."
  }
];

const ProcessToGetProduct = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Shopping with us is easy and convenient. Follow these simple steps to get your favorite products.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector lines - Visible on large screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-[calc(100%-1px)] w-[calc(100%+2px)] h-0.5 bg-gray-200 transform -translate-y-1/2 z-0">
                  <div className="absolute top-0 left-0 h-full bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              )}

              {/* Mobile step connector - Visible on small screens */}
              {index < steps.length - 1 && (
                <div className="lg:hidden absolute left-1/2 top-[calc(100%-1px)] h-8 w-0.5 bg-gray-200 transform -translate-x-1/2 sm:hidden">
                  <div className="absolute top-0 left-0 w-full bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                </div>
              )}

              {/* Step content */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative z-10">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="mb-4 sm:mb-6 p-2 sm:p-3 bg-blue-50 rounded-full transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {step.description}
                  </p>
                </div>

                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-base sm:text-lg transform group-hover:rotate-12 transition-transform duration-300 shadow-md">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <button className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
            Start Shopping Now
            <svg className="ml-2 -mr-1 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessToGetProduct;