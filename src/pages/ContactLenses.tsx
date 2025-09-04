// import React from "react";
// import { Link } from "react-router-dom";

// const sections = [
//   {
//     title: "DISPOSABILITY",
//     items: [
//       "Monthly",
//       "Monthly Day and Night",
//       "Daily",
//       "Color Lenses",
//       "Yearly",
//       "2-weekly",
//     ],
//   },
//   {
//     title: "BRANDS",
//     items: [
//       "Aqualens",
//       "Bausch & Lomb",
//       "Soflens",
//       "Johnson & Johnson",
//       "Iconnect",
//       "Alcon",
//       "Acuvue",
//       "Optix",
//       "Focus",
//       "Purevision",
//       "Freshlook",
//       "Dailies",
//     ],
//   },
//   {
//     title: "POWER",
//     items: [
//       "[-] SPH Power (CYL <0.5)",
//       "[+] SPH Power (CYL <0.5)",
//       "CYL Power (CYL >0.75)",
//       "Toric Power",
//     ],
//   },
//   {
//     title: "COLOR",
//     items: [
//       "Aquacolor Premium",
//       "Aquacolor",
//       "Freshlook",
//       "Clalen",
//       "Color with no Power",
//       "Color without CYL Power",
//     ],
//   },
//   {
//     title: "LENS SOLUTION",
//     items: ["Aqualens Comfort", "Bio True", "Renu Fresh", "Opti-Free Replenish"],
//   },
//   {
//     title: "LENS CASE",
//     items: ["Lens Case"],
//   },
// ];

// export default function ContactLenses() {
//   return (
//     <div className="p-10 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-10">
//         Contact Lenses
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
//         {sections.map((section) => (
//           <div
//             key={section.title}
//             className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
//           >
//             <h2 className="font-semibold text-lg mb-3 border-b pb-2">
//               {section.title}
//             </h2>
//             <ul className="space-y-2">
//               {section.items.map((item) => (
//                 <li key={item}>
//                   <Link
//                     to="#"
//                     className="text-blue-600 hover:text-blue-800 text-sm"
//                   >
//                     {item}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/models/Product";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { showToast } from "@/utils/toast";

export default function ContactLenses() {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { page: 1, limit: 24, filter: { category: "ContactLenses" } },
    fetchPolicy: "network-only",
  });

   const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.brand} added to cart! ✅`);
  };

  const handleAddToWishlist = (product: Product) => {
    console.log("Added to wishlist:", product);
    // agar context ya backend use kar rahe ho to yaha add kar do
  };


  if (loading) return <div className="p-10 text-lg">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">Error loading products</div>;

  // ✅ API se data safe extract karo
  const products: Product[] =
    data?.products?.map((p: any) => ({
      id: p.id, 
      name: p.name,
      brand: p.brand,
      price: p.price,
      image: p.image,
    })) || [];

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
         
        />

      ))}
    </div>
  );
}
