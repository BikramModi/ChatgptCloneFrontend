import { Sparkles, ArrowRight } from "lucide-react";

const BannerCard = ({ title, leftText, rightImage }) => {
  return (
    <div className="w-[95%] max-w-6xl mx-auto my-6">

      <div className="
        relative overflow-hidden
        rounded-3xl
        bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600
        p-0.5
        shadow-xl
      ">
        {/* Inner Glass */}
        <div className="
          bg-white/80 backdrop-blur
          rounded-3xl
          flex items-center justify-between
          px-6 md:px-10 py-5
          gap-4
        ">

          {/* 🔥 Left Badge */}
          <div className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold text-sm md:text-base shadow-sm">
            <Sparkles size={18} />
            {leftText}
          </div>

          {/* 🎯 Center Title */}
          <div className="flex-1 text-center">
            <h2 className="
              text-xl md:text-3xl lg:text-4xl
              font-extrabold
              bg-linear-to-r from-indigo-600 to-pink-600
              bg-clip-text text-transparent
              animate-pulse
            ">
              {title}
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              Limited time offer — don’t miss out!
            </p>
          </div>

          {/* 🖼️ Right Image */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-pink-500 blur-xl opacity-30 rounded-full"></div>
            <img
              src={rightImage}
              alt="banner"
              className="
                relative
                w-20 h-20 md:w-24 md:h-24
                object-cover
                rounded-full
                border-4 border-white
                shadow-lg
                hover:scale-110
                transition
              "
            />
          </div>
        </div>

        {/* ✨ Moving Shine Effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shine_3s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
      </div>

      {/* Local animation */}
      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>

    </div>
  );
};

export default BannerCard;
