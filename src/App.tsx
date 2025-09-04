import { Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Index from "@/pages/Index"; 
import NewArrivals from "@/pages/NewArrivals";
import Eyeglasses from "@/pages/Eyeglasses";
import Sunglasses from "@/pages/Sunglasses";
import ScreenGlasses from "@/pages/ScreenGlasses";
import ContactLenses from "@/pages/ContactLenses";
import KidsEyeglasses from "@/pages/KidsEyeglasses";
import NotFound from "@/pages/NotFound";

import Blu from "./pages/Blu";
import Gold from "@/pages/Gold";
import TryOn from "@/pages/TryOn";
import Cart from "@/pages/Cart";
import Profile from "@/pages/Profile";
import TrackOrder from "@/pages/TrackOrder";
import Wishlist from "@/pages/Wishlist"; 

// import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastContainer } from "./components/ToastContainer";

export default function App() {
  return (
    <>
      <WishlistProvider>
      <CartProvider>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      
      <Header />
      <Routes>
        <Route path="/" element={<Index />} /> 

        {/* Product pages */}
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/eyeglasses" element={<Eyeglasses />} />
        <Route path="/sunglasses" element={<Sunglasses />} />
        <Route path="/screen-glasses" element={<ScreenGlasses />} />
        <Route path="/contact-lenses" element={<ContactLenses />} />
        <Route path="/kids-eyeglasses" element={<KidsEyeglasses />} />

        {/* Other pages */}
        <Route path="/blu" element={<Blu />} />
        <Route path="/gold" element={<Gold />} />
        <Route path="/tryon" element={<TryOn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer /> 
      </CartProvider>
      </WishlistProvider>
    </>
  );
}
