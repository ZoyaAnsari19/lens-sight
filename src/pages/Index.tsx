// import HeroSection from "@/components/sections/HeroSection";
// import CategoryIcons from "@/components/sections/CategoryIcons";
// import TrustIndicators from "@/components/sections/TrustIndicators";
// import ProductGrid from "@/components/sections/ProductGrid";
// import FeaturesSection from "@/components/sections/FeaturesSection";
// // 👇 Products component ka sahi path lagao
// import Products from "@/components/Product";  

// export default function Index() {
//   return (
//     <main className="container mx-auto p-6">
//       <HeroSection />
//       <CategoryIcons />
//       <TrustIndicators />
//       <ProductGrid />
//       <FeaturesSection />

//       {/* Featured Products Section */}
//       <h2 className="text-2xl font-bold mt-10 mb-4">Featured Products</h2>
//       <Products />
//     </main>
//   );
// }

import HeroSection from "@/components/sections/HeroSection";
import CategoryIcons from "@/components/sections/CategoryIcons";
import TrustIndicators from "@/components/sections/TrustIndicators";
import ProductGrid from "@/components/sections/ProductGrid";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Products from "@/components/sections/Products"; 

export default function Index() {
  return (
    <main className="container mx-auto p-6">
      <HeroSection />
      <CategoryIcons />
      <TrustIndicators />
      <ProductGrid />
      <FeaturesSection />

      {/* Featured Products Section */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Featured Products</h2>
      <Products />
    </main>
  );
}
