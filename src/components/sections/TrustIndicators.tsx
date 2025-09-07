import React from 'react';

const TrustIndicators = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          <div className="text-center">
            <div className="mb-3">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-600">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">10 Million+</div>
            <div className="text-sm text-gray-600">Glasses Sold</div>
          </div>

          <div className="text-center">
            <div className="mb-3">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-600">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="9,12 11,14 15,10" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">100% Accurate Lenses</div>
            <div className="text-sm text-gray-600">Made By Robots</div>
          </div>

          <div className="text-center">
            <div className="mb-3">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-purple-600">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">Virtual Try On</div>
            <div className="text-sm text-gray-600">With AR Technology</div>
          </div>

          <div className="text-center">
            <div className="mb-3">
              <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-orange-600">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">30 Days</div>
            <div className="text-sm text-gray-600">Return & Exchange</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;