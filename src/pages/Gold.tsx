
import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Eye, 
  Glasses, 
  Contact, 
  Gift, 
  Shield, 
  Star, 
  Clock, 
  CheckCircle, 
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Users,
  Award
} from 'lucide-react';

import { useQuery } from '@apollo/client';
import { GET_MEMBERSHIPS } from '../graphql/queries';

// TypeScript Interfaces
interface MembershipDetails {
  name: string;
  duration: string;
  price: number;
  originalPrice?: number;
  description: string;
  isLimitedTime?: boolean;
}

interface Benefit {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  verified: boolean;
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Mock Data
const membershipData: MembershipDetails = {
  name: "Lenskart Gold Membership",
  duration: "1 Year",
  price: 600,
  originalPrice: 1200,
  description: "Unlock premium benefits and save more on your eyewear purchases",
  isLimitedTime: true
};

const benefits: Benefit[] = [
  {
    id: "1",
    icon: <Glasses className="w-8 h-8 text-yellow-500" />,
    title: "Buy 1 Get 1 Free",
    description: "On Eyeglasses & Sunglasses worth up to ₹2000",
    highlight: true
  },
  {
    id: "2",
    icon: <Eye className="w-8 h-8 text-blue-500" />,
    title: "Free Eye Test",
    description: "Comprehensive eye checkup at any Lenskart store",
    highlight: true
  },
  {
    id: "3",
    icon: <Contact className="w-8 h-8 text-green-500" />,
    title: "Extra Discounts",
    description: "Up to 25% off on Contact Lenses & Solutions",
    highlight: false
  },
  {
    id: "4",
    icon: <Shield className="w-8 h-8 text-purple-500" />,
    title: "Priority Support",
    description: "24/7 dedicated customer service for Gold members",
    highlight: false
  },
  {
    id: "5",
    icon: <Gift className="w-8 h-8 text-red-500" />,
    title: "Exclusive Offers",
    description: "Early access to sales and member-only deals",
    highlight: false
  },
  {
    id: "6",
    icon: <Award className="w-8 h-8 text-indigo-500" />,
    title: "Extended Warranty",
    description: "1 year extended warranty on all purchases",
    highlight: false
  }
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    rating: 5,
    comment: "Gold membership saved me thousands! The Buy 1 Get 1 offer is amazing.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face",
    verified: true
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    rating: 5,
    comment: "Free eye tests and priority support make it totally worth it!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    verified: true
  },
  {
    id: "3",
    name: "Anita Patel",
    rating: 4,
    comment: "Best investment for anyone who wears glasses regularly.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    verified: true
  }
];

// Countdown Timer Component
const CountdownTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-4 bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg mb-6">
      <Clock className="w-5 h-5" />
      <span className="font-semibold">Limited Time Offer Ends In:</span>
      <div className="flex gap-2">
        <div className="bg-white/20 px-3 py-1 rounded text-center min-w-[60px]">
          <div className="font-bold text-lg">{timeLeft.days}</div>
          <div className="text-xs">Days</div>
        </div>
        <div className="bg-white/20 px-3 py-1 rounded text-center min-w-[60px]">
          <div className="font-bold text-lg">{timeLeft.hours}</div>
          <div className="text-xs">Hours</div>
        </div>
        <div className="bg-white/20 px-3 py-1 rounded text-center min-w-[60px]">
          <div className="font-bold text-lg">{timeLeft.minutes}</div>
          <div className="text-xs">Minutes</div>
        </div>
        <div className="bg-white/20 px-3 py-1 rounded text-center min-w-[60px]">
          <div className="font-bold text-lg">{timeLeft.seconds}</div>
          <div className="text-xs">Seconds</div>
        </div>
      </div>
    </div>
  );
};

// Benefit Card Component
const BenefitCard: React.FC<{ benefit: Benefit }> = ({ benefit }) => (
  <div className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
    benefit.highlight 
      ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50' 
      : 'border-gray-200 bg-white hover:border-gray-300'
  }`}>
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-full ${
        benefit.highlight ? 'bg-yellow-100' : 'bg-gray-100'
      }`}>
        {benefit.icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          {benefit.title}
          {benefit.highlight && <Sparkles className="w-4 h-4 text-yellow-500" />}
        </h3>
        <p className="text-gray-600 text-sm">{benefit.description}</p>
      </div>
    </div>
  </div>
);

// Testimonial Carousel Component
const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          What Our Gold Members Say
        </h3>
        <div className="flex gap-2">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <img
          src={currentTestimonial.avatar}
          alt={currentTestimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-800">{currentTestimonial.name}</span>
            {currentTestimonial.verified && (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
          </div>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < currentTestimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600 text-sm italic">"{currentTestimonial.comment}"</p>
        </div>
      </div>
      
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Modal Component
const JoinModal: React.FC<{ isOpen: boolean; onClose: () => void; membershipData: MembershipDetails }> = ({
  isOpen,
  onClose,
  membershipData
}) => {
  if (!isOpen) return null;

  const handleJoinNow = () => {
    // Simulate payment processing
    alert('Redirecting to payment page...');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Join Gold Membership</h2>
          <p className="text-gray-600">Unlock premium benefits and start saving today!</p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">{membershipData.name}</span>
            <span className="text-sm text-gray-500">{membershipData.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-800">₹{membershipData.price}</span>
            {membershipData.originalPrice && (
              <span className="text-lg text-gray-500 line-through">₹{membershipData.originalPrice}</span>
            )}
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
              50% OFF
            </span>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 text-sm">Buy 1 Get 1 Free on Eyeglasses</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 text-sm">Free Eye Test at any store</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 text-sm">Extra discounts on Contact Lenses</span>
          </div>
        </div>
        
        <button
          onClick={handleJoinNow}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Join Now - Pay ₹{membershipData.price}
        </button>
      </div>
    </div>
  );
};

// Main Gold Component
const Gold: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, data, error } = useQuery(GET_MEMBERSHIPS);
  const membership: MembershipDetails | null = data?.memberships[0] || null;

  // Countdown 7 days from now
  const offerEndDate = new Date();
  offerEndDate.setDate(offerEndDate.getDate() + 7);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Gold Membership...</div>;
  if (error || !membership) return <div className="min-h-screen flex items-center justify-center">Unable to load membership</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {membership.isLimitedTime && <CountdownTimer targetDate={offerEndDate} />}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full mb-6"><Crown className="w-8 h-8"/><span className="font-bold text-lg">GOLD MEMBERSHIP</span><Sparkles className="w-6 h-6"/></div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{membership.name}</h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">{membership.description}</p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center"><div className="text-4xl font-bold text-gray-800">₹{membership.price}</div><div className="text-gray-500">for {membership.duration}</div></div>
            {membership.originalPrice && <><div className="text-gray-400 text-2xl">/</div><div className="text-center"><div className="text-2xl text-gray-500 line-through">₹{membership.originalPrice}</div><div className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-medium">Save ₹{membership.originalPrice - membership.price}</div></div></>}
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">Join Gold Membership Now</button>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Exclusive Gold Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{benefits.map(b => <BenefitCard key={b.id} benefit={b} />)}</div>
        </div>

        <div className="mb-12"><TestimonialCarousel /></div>

        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Go Gold?</h2>
          <p className="text-xl mb-6 opacity-90">Join thousands of satisfied customers and start saving today!</p>
          <button onClick={() => setIsModalOpen(true)} className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">Get Gold Membership - ₹{membership.price}</button>
        </div>
      </div>

      <JoinModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} membershipData={membership}/>
    </div>
  );
};

export default Gold;