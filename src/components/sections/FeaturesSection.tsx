import React from 'react';
import { Truck, RotateCcw, Shield, Headphones, Eye, Home } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders above ₹2000 across India"
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Easy returns and exchanges within 30 days"
  },
  {
    icon: Shield,
    title: "1 Year Warranty",
    description: "Comprehensive warranty on all our products"
  },
  {
    icon: Eye,
    title: "Free Eye Test",
    description: "Professional eye checkup at our stores"
  },
  {
    icon: Home,
    title: "Home Trial",
    description: "Try up to 4 frames at home before buying"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer assistance"
  }
];

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose LensSight?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're committed to providing the best eyewear experience with premium quality and exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-background rounded-xl shadow-elegant hover:shadow-product transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;