import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-eyewear.jpg';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              New Collection Available
            </div>
            
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Find Your
                <span className="text-transparent bg-gradient-primary bg-clip-text block">
                  Perfect Vision
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mt-6 max-w-lg">
                Discover premium eyewear that combines style, comfort, and clarity. 
                From classic frames to the latest trends - find glasses that reflect your personality.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group" onClick={() => alert('Redirecting to eyeglasses collection!')}>
                Shop Eyeglasses
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => alert('Booking eye test appointment!')}>
                Take Eye Test
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                30-Day Returns
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                1 Year Warranty
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10 animate-float">
              <img
                src={heroImage}
                alt="Premium eyewear collection"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-primary opacity-20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10"></div>
            <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-primary-light/30 rounded-full blur-xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;