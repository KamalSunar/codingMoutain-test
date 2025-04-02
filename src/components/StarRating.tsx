export const StarRating = ({ rating = 0 }: { rating: number }) => (
  <div className="rating">
    {Array.from(Array(Math.floor(5)).keys())?.map((item) => {
      if (item + 1 < rating) {
        return <div className="star star-full" />;
      } else if (
        Math.round((rating - Math.floor(rating)) * 100) > 0 &&
        item < rating
      ) {
        return <div className="star star-half" />;
      } else {
        return <div className="star" />;
      }
    })}
  </div>
);
