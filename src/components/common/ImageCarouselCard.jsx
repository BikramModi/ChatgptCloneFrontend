const ImageCarouselCard = ({ src, index }) => {
  return (
    <img
      src={src}
      alt={`slide-${index}`}
      className="w-full shrink-0 object-cover h-64 md:h-96"
    />
  );
};

export default ImageCarouselCard;
