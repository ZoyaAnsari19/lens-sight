import mongoose from "mongoose";
import Product from "./models/Product.js";

const MONGO_URI =
  "mongodb+srv://Zoya:zoya123@cluster0.sktolrf.mongodb.net/lenskart?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    console.log("All old products deleted ✅");

    const products = [
      // Eyeglasses
      {
        id: "1",
        name: "Lenskart Air Special Eyeglasses",
        brand: "Lenskart Air",
        category: "eyeglasses",
        price: 1799,
        discount: 5,
        frameColor: "Grey",
        description:
          "Premium full-rim rectangular eyeglasses with lightweight frame.",
        stock: 50,
        isNewArrival: true,
        isActive: true,
        images: [
          {
            url: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gray-full-rim-rectangle-lenskart-air-signia-la-e14573-c3-eyeglasses_g_2478_09-july.jpg",
            alt: "Lenskart Air Special Eyeglasses",
            isPrimary: true,
          },
        ],
      },

      // Sunglasses
      {
        id: "2",
        name: "Vincent Chase Trendy Sunglasses",
        brand: "Vincent Chase",
        category: "sunglasses",
        price: 3499,
        discount: 0,
        frameColor: "Black",
        description: "Stylish polarized sunglasses for all-day outdoor wear.",
        stock: 30,
        isNewArrival: true,
        isActive: true,
        images: [
          {
            url: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s15407-c1-sunglasses_g_2710_07_02_2023.jpg",
            alt: "Vincent Chase Sunglasses",
            isPrimary: true,
          },
        ],
      },
      {
        id: "3",
        name: "Ray-Ban Classic Aviator Sunglasses",
        brand: "Ray-Ban",
        category: "sunglasses",
        price: 5999,
        discount: 10,
        frameColor: "Gold",
        description: "Iconic aviator sunglasses with UV protection lenses.",
        stock: 20,
        isNewArrival: false,
        isActive: true,
        images: [
          {
            url: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gray-full-rim-rectangle-lenskart-air-signia-la-e14573-c3-eyeglasses_g_2478_09-july.jpg",
            alt: "Ray-Ban Classic Aviator",
            isPrimary: true,
          },
        ],
      },
      {
        id: "4",
        name: "Oakley Sports Sunglasses",
        brand: "Oakley",
        category: "sunglasses",
        price: 4999,
        discount: 5,
        frameColor: "Blue",
        description: "Durable sports sunglasses with polarized lenses.",
        stock: 25,
        isNewArrival: true,
        isActive: true,
        images: [
          {
            url: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gray-full-rim-rectangle-lenskart-air-signia-la-e14573-c3-eyeglasses_g_2478_09-july.jpg",
            alt: "Oakley Sports Sunglasses",
            isPrimary: true,
          },
        ],
      },

      // Kids Eyeglasses
      {
        id: "1001",
        name: "Kids Playful Round Eyeglasses",
        brand: "KidSafe",
        category: "kids-eyeglasses",
        price: 1299,
        discount: 10,
        frameColor: "Blue",
        description: "Fun and durable round eyeglasses for active kids.",
        stock: 40,
        isNewArrival: false,
        isActive: true,
        images: [
          {
            url: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gray-full-rim-rectangle-lenskart-air-signia-la-e14573-c3-eyeglasses_g_2478_09-july.jpg",
            alt: "Kids Sporty Rectangle Eyeglasses",
            alt: "Kids Round Eyeglasses",
            isPrimary: true,
          },
        ],
      },
      {
        id: "1002",
        name: "Kids Sporty Rectangle Eyeglasses",
        brand: "KidSafe",
        category: "kids-eyeglasses",
        price: 1499,
        discount: 0,
        frameColor: "Red",
        description: "Comfortable rectangular frame ideal for sporty kids.",
        stock: 25,
        isNewArrival: true,
        isActive: true,
        images: [
          {
            url: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gray-full-rim-rectangle-lenskart-air-signia-la-e14573-c3-eyeglasses_g_2478_09-july.jpg",
            alt: "Kids Sporty Rectangle Eyeglasses",
            isPrimary: true,
          },
        ],
      },

      // Screen Glasses
      {
        id: "3001",
        name: "BluGuard Anti-Glare Computer Glasses",
        brand: "BluGuard",
        category: "screen-glasses",
        price: 1999,
        discount: 10,
        frameColor: "Black",
        description:
          "Protects eyes from blue light and reduces digital eye strain.",
        stock: 40,
        isNewArrival: true,
        isActive: true,
        images: [
          {
            url: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gray-full-rim-rectangle-lenskart-air-signia-la-e14573-c3-eyeglasses_g_2478_09-july.jpg",
            alt: "BluGuard Anti-Glare Glasses",
            isPrimary: true,
          },
        ],
      },
      {
        id: "3002",
        name: "Lenskart Blu Zero Power Glasses",
        brand: "Lenskart Blu",
        category: "screen-glasses",
        price: 1499,
        discount: 5,
        frameColor: "Transparent",
        description: "Zero power glasses with advanced blue light protection.",
        stock: 50,
        isNewArrival: false,
        isActive: true,
        images: [
          {
            url: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gray-full-rim-rectangle-lenskart-air-signia-la-e14573-c3-eyeglasses_g_2478_09-july.jpg",
            alt: "Lenskart Blu Glasses",
            isPrimary: true,
          },
        ],
      },

      // Contact Lenses
      {
        id: "2001",
        name: "Bausch & Lomb Daily Contact Lenses",
        brand: "Bausch & Lomb",
        category: "contact-lenses",
        price: 999,
        discount: 5,
        frameColor: "Transparent",
        description: "Daily wear contact lenses for clear and comfortable vision.",
        stock: 100,
        isNewArrival: true,
        isActive: true,
        images: [
          {
            url: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gray-full-rim-rectangle-lenskart-air-signia-la-e14573-c3-eyeglasses_g_2478_09-july.jpg",
            alt: "Bausch & Lomb Daily Lenses",
            isPrimary: true,
          },
        ],
      },
      {
        id: "2002",
        name: "Acuvue Moist Contact Lenses",
        brand: "Acuvue",
        category: "contact-lenses",
        price: 1199,
        discount: 10,
        frameColor: "Transparent",
        description: "Hydrating contact lenses for all-day comfort.",
        stock: 120,
        isNewArrival: false,
        isActive: true,
        images: [
          {
            url: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gray-full-rim-rectangle-lenskart-air-signia-la-e14573-c3-eyeglasses_g_2478_09-july.jpg",
            alt: "Acuvue Moist Contact Lenses",
            isPrimary: true,
          },
        ],
      },
    ];

    await Product.insertMany(products);
    console.log("✅ New Products Seeded Successfully");
    mongoose.connection.close();
  } catch (error) {
    console.log("❌ Seeding Error:", error);
    mongoose.connection.close();
  }
};

seedProducts();
