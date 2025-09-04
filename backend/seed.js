import mongoose from "mongoose";
import Product from "./models/Product.js"; 

const MONGO_URI = "mongodb+srv://Zoya:zoya123@cluster0.sktolrf.mongodb.net/lenskart?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const seedProducts = async () => {
  try {
    // ✅ Delete all existing products
    await Product.deleteMany({});
    console.log("All old products deleted ✅");

    const products = [
      
      // ✅ New Arrivals (can be from any category)
      {
        brand: "Lenskart Air Special",
        category: "Eyeglasses",
        price: 1799,
        image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gray-full-rim-rectangle-lenskart-air-signia-la-e14573-c3-eyeglasses_g_2478_09-july.jpg",
        isNewArrival: true,
        discount: 5,
      },
      {
        brand: "Vincent Chase Trendy",
        category: "Sunglasses",
        price: 3499,
        image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s15407-c1-sunglasses_g_2710_07_02_2023.jpg",
        isNewArrival: true,
        discount: 0,
      },
      {
        brand: "BlueLight Plus",
        category: "ScreenGlasses",
        price: 1499,
        image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/black-full-rim-square-lenskart-studio-ls-e15666-c2-eyeglasses_csvfile-1705966162422-akaran33.png",
        isNewArrival: true,
        discount: 10,
      },
      // ✅ Eyeglasses
      {
        brand: "Lenskart Air",
        category: "Eyeglasses",
        price: 1599,
        image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gray-full-rim-rectangle-lenskart-air-signia-la-e14573-c3-eyeglasses_g_2477_09-july.jpg",
        isNewArrival: true,
        discount: 10,
      },
      {
        brand: "John Jacobs",
        category: "Eyeglasses",
        price: 2999,
        image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-e15349-c3-eyeglasses_csvfile-1682509990345-g_1842.jpg",
        isNewArrival: false,
        discount: 5,
      },
      {
        brand: "Ray-Ban Classic",
        category: "Eyeglasses",
        price: 1999,
        image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//j/i/black-gold-black-full-rim-round-john-jacobs-tr-flex-jj-e14410-c6-eyeglasses__dsc7005_20_06_2024.jpg",
        isNewArrival: true,
        discount: 0,
      },

      // ✅ ScreenGlasses
      {
        brand: "Lenskart BlueLight",
        category: "ScreenGlasses",
        price: 1299,
        image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses:-matte-black-full-rim-square-lenskart-blu-lb-e13526-c1_vincent-chase-vc-e13526-c1-eyeglasses_g_8388_28july23.jpg",
        isNewArrival: true,
        discount: 10,
      },
      {
        brand: "Vincent Chase BlueLight",
        category: "ScreenGlasses",
        price: 1599,
        image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/peyush-bansal-shark-tank-navy-full-rim-square-lenskart-hustlr-lb-e14058-h-c34-eyeglasses_g_1237_09_11_2023.jpg",
        isNewArrival: false,
        discount: 5,
      },
      {
        brand: "John Jacobs Screen",
        category: "ScreenGlasses",
        price: 1999,
        image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-computer-glasses:-dusty-rose-full-rim-square-lenskart-hustlr-lb-e14058-xw-c4_dsc_0485_10apr24.jpg",
        isNewArrival: true,
        discount: 0,
      },

      // Sunglasses 
      {
        brand: "Vincent Chase Trendy",
        category: "Sunglasses",
        price: 3499,
        image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/gold-blue-gradient-full-rim-aviator-vincent-chase-polarized-vintage-vc-s11075-c12-sunglasses_g_3383_6_02_22.jpg",
        isNewArrival: true,
        discount: 0,
      },
      {
        brand: "Vincent Chase Trendy",
        category: "Sunglasses",
        price: 6499,
        image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-grey-full-rim-round-vincent-chase-polarized-met-effect-vc-s15398-c2-sunglasses_g_0998_02_02_23.jpg",
        isNewArrival: true,
        discount: 0,
      },
      {
        brand: "Vincent Chase Trendy",
        category: "Sunglasses",
        price: 3499,
        image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/black-grey-full-rim-wayfarer-vincent-chase-polarized-athleisure-vc-s14459-c7-sunglasses_g_2628_9_29_22.jpg",
        isNewArrival: true,
        discount: 0,
      },
      {
        brand: "Vincent Chase Trendy",
        category: "Sunglasses",
        price: 4000,
        image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//j/i/grey-gunmetal-full-rim-hexagonal-john-jacobs-jj-tints-jj-s12472--c2-sunglasses_john-jacobs-jj-s12472-c2-sunglasses_sunglasses_g_1972_1_1_05_july23.jpg",
        isNewArrival: true,
        discount: 0,
      },
      {
        brand: "Vincent Chase Trendy",
        category: "Sunglasses",
        price: 3000,
        image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/black-full-rim-aviator-vincent-chase-the-metal-edit-vc-s13110-c6-polarized-sunglasses_vincent-chase-vc-s13110-c6-c6-sunglasses_sunglasses_g_8950_5july23.jpg",
        isNewArrival: true,
        discount: 0,
      },

      // Kids Glasses 
      {
    brand: "Lenskart Kids",
    category: "KidGlasses",
    price: 1599,
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses:-black-blue-transparent-black-full-rim-rectangle-kids--8-12-yrs--hooper-astra-hooper-hp-e10014l-c4_hooper-hp-e10014l-c4-eyeglasses_g_0981_22_march23.jpg.jpg",
    isNewArrival: true,
    discount: 5,
  },
  {
    brand: "John Jacobs Kids",
    category: "KidGlasses",
    price: 999,
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses:-matte-black-full-rim-rectangle-kids--8-12-yrs--hooper-flexi-hooper-hp-e10004l-c2_hooper-hp-e10004l-c2-eyeglasses_g_4296_22_march23.jpg.jpg",
    isNewArrival: false,
    discount: 0,
  },
  {
    brand: "Vincent Chase Kids",
    category: "KidGlasses",
    price: 2199,
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/peyush-bansal-shark-tank-navy-full-rim-lenskart-hustlr-eyeglasses_csvfile-1708330079773-216583_1.jpg",
    isNewArrival: true,
    discount: 10,
  },
  {
    brand: "Vincent Chase Kids",
    category: "KidGlasses",
    price: 1299,
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses:-blue-blue-yellow-full-rim-wayfarer-kids-8-12-yrs-hooper-flexi-hooper-hp-e10082l-c4_g_5463_07_20_23.jpg",
    isNewArrival: true,
    discount: 10,
  },

  // Contact Lenses
  
];

    await Product.insertMany(products);
    console.log("New Products Seeded Successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.log("Seeding Error:", error);
    mongoose.connection.close();
  }
};

seedProducts();
