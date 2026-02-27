import React from "react";


import FlashSaleCard from "../common/FlashSaleCard";

const products = [
  {
    id: 1,
    image: "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Wireless Headphones",
    price: 1999,
    originalPrice: 3999,
    discount: "50%",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1660844817855-3ecc7ef21f12?q=80&w=786&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Smart Watch",
    price: 2999,
    originalPrice: 4999,
    discount: "40%",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Bluetooth Speaker",
    price: 1499,
    originalPrice: 2499,
    discount: "40%",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1707592691247-5c3a1c7ba0e3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Wireless Mouse",
    price: 799,
    originalPrice: 1599,
    discount: "50%",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1626958390943-a70309376444?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Gaming Keyboard",
    price: 1999,
    originalPrice: 2999,
    discount: "33%",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1575399545768-5f1840c1312d?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Laptop Stand",
    price: 999,
    originalPrice: 1999,
    discount: "50%",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1575399545768-5f1840c1312d?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Laptop Stand",
    price: 999,
    originalPrice: 1999,
    discount: "50%",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1626958390943-a70309376444?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Gaming Keyboard",
    price: 1999,
    originalPrice: 2999,
    discount: "33%",
  },
];

const FlashSaleList = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Flash Sale</h2>
      
      {/* Grid: 6 Columns on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {products.map((product) => (
          <FlashSaleCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default FlashSaleList;
