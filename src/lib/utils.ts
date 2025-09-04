// Pagination helper
export const getPagination = (page: number = 1, limit: number = 12) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};


// Price formatting
export const formatPrice = (price: number) => {
  return `₹${price.toLocaleString('en-IN')}`;
};


// Discount calculation
export const calculateDiscountPrice = (price: number, discount?: number) => {
  if (!discount) return price;
  return price - (price * discount) / 100;
};


// Rating stars
export const getStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return {
    full: fullStars,
    half: halfStar,
    empty: emptyStars,
  };
};


// className merge helper
export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}