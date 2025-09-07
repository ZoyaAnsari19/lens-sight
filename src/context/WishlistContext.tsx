import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../models/Product";

type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (p: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (p: Product) => {
    setWishlist((prev) => [...prev, p]);
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter(p => p.id !== id));
  };

  const isInWishlist = (id: string) => {
    return wishlist.some(p => p.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};


// import React, { createContext, useContext, useState, useEffect } from "react";
// import { Product } from "../models/Product";

// interface WishlistContextType {
//   wishlist: Product[];
//   addToWishlist: (product: Product) => void;
//   removeFromWishlist: (productId: string) => void;
// }

// const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [wishlist, setWishlist] = useState<Product[]>(() => {
//     const stored = localStorage.getItem("wishlist");
//     return stored ? JSON.parse(stored) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   }, [wishlist]);

//   const addToWishlist = (product: Product) => {
//     if (!wishlist.find((p) => p.id === product.id)) {
//       setWishlist((prev) => [...prev, product]);
//     }
//   };

//   const removeFromWishlist = (productId: string) => {
//     setWishlist((prev) => prev.filter((p) => p.id !== productId));
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => {
//   const context = useContext(WishlistContext);
//   if (!context) throw new Error("useWishlist must be used inside WishlistProvider");
//   return context;
// };
