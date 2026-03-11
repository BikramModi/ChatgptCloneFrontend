import React from "react";


import BannerCard from "../common/BannerCard";

const banners = [
  {
    title: "Mega Discounts Live!",
    leftText: "E-COM Flash Sale 1.1.1",
    rightImage: "https://plus.unsplash.com/premium_photo-1681487985079-b299ac8ba1df?q=80&w=1057&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Up to 70% OFF",
    leftText: "Limited Time Offer",
    rightImage: "https://plus.unsplash.com/premium_photo-1681487985079-b299ac8ba1df?q=80&w=1057&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const BannerCardList = () => {
  return (
    <div className="space-y-6">
      {banners.map((banner, index) => (
        <BannerCard
          key={index}
          title={banner.title}
        
          leftText={banner.leftText}
          rightImage={banner.rightImage}
        />
      ))}
    </div>
  );
};

export default BannerCardList;
