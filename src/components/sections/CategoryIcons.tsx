import React from 'react';

const categories = [
  {
    id: 1,
    name: 'Eyeglasses',
    icon: (
      <svg viewBox="0 0 100 60" className="w-16 h-12">
        <circle cx="25" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="75" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="43" y1="30" x2="57" y2="30" stroke="currentColor" strokeWidth="2"/>
        <line x1="7" y1="30" x2="2" y2="25" stroke="currentColor" strokeWidth="2"/>
        <line x1="93" y1="30" x2="98" y2="25" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  {
    id: 2,
    name: 'Sunglasses',
    icon: (
      <svg viewBox="0 0 100 60" className="w-16 h-12">
        <circle cx="25" cy="30" r="18" fill="rgba(34, 197, 94, 0.3)" stroke="currentColor" strokeWidth="2"/>
        <circle cx="75" cy="30" r="18" fill="rgba(34, 197, 94, 0.3)" stroke="currentColor" strokeWidth="2"/>
        <line x1="43" y1="30" x2="57" y2="30" stroke="currentColor" strokeWidth="2"/>
        <line x1="7" y1="30" x2="2" y2="25" stroke="currentColor" strokeWidth="2"/>
        <line x1="93" y1="30" x2="98" y2="25" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  {
    id: 3,
    name: 'Power Sunglasses',
    icon: (
      <svg viewBox="0 0 100 60" className="w-16 h-12">
        <circle cx="25" cy="30" r="18" fill="rgba(34, 197, 94, 0.3)" stroke="currentColor" strokeWidth="2"/>
        <circle cx="75" cy="30" r="18" fill="rgba(34, 197, 94, 0.3)" stroke="currentColor" strokeWidth="2"/>
        <line x1="43" y1="30" x2="57" y2="30" stroke="currentColor" strokeWidth="2"/>
        <text x="25" y="35" fontSize="12" textAnchor="middle" fill="currentColor">+</text>
        <text x="75" y="35" fontSize="12" textAnchor="middle" fill="currentColor">-</text>
        <line x1="7" y1="30" x2="2" y2="25" stroke="currentColor" strokeWidth="2"/>
        <line x1="93" y1="30" x2="98" y2="25" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  {
    id: 4,
    name: 'Kids Glasses',
    icon: (
      <svg viewBox="0 0 100 80" className="w-16 h-12">
        <circle cx="25" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="75" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="40" y1="40" x2="60" y2="40" stroke="currentColor" strokeWidth="2"/>
        <circle cx="50" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
        <line x1="10" y1="40" x2="5" y2="35" stroke="currentColor" strokeWidth="2"/>
        <line x1="90" y1="40" x2="95" y2="35" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  {
    id: 5,
    name: 'Computer Glasses',
    icon: (
      <svg viewBox="0 0 100 60" className="w-16 h-12">
        <circle cx="25" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="75" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="43" y1="30" x2="57" y2="30" stroke="currentColor" strokeWidth="2"/>
        <rect x="20" y="25" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1"/>
        <rect x="70" y="25" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1"/>
        <line x1="7" y1="30" x2="2" y2="25" stroke="currentColor" strokeWidth="2"/>
        <line x1="93" y1="30" x2="98" y2="25" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  {
    id: 6,
    name: 'Reading Glasses',
    icon: (
      <svg viewBox="0 0 100 60" className="w-16 h-12">
        <circle cx="25" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="75" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="43" y1="30" x2="57" y2="30" stroke="currentColor" strokeWidth="2"/>
        <rect x="15" y="20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1" rx="2"/>
        <rect x="65" y="20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1" rx="2"/>
        <line x1="7" y1="30" x2="2" y2="25" stroke="currentColor" strokeWidth="2"/>
        <line x1="93" y1="30" x2="98" y2="25" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  }
];

const CategoryIcons = () => {
  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center text-center cursor-pointer group"
              onClick={() => alert(`${category.name} category clicked!`)}
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow border border-gray-200">
                <div className="text-gray-600 group-hover:text-primary transition-colors">
                  {category.icon}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryIcons;