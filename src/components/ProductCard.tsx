import { type Product } from "../types/types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="productCard">
      <img
        alt={product?.title}
        title={product?.title}
        src={product?.thumbnail}
      />
      <div className="productCard-details">
        <p>{product?.category}</p>
        <h4>{product?.title}</h4>
        <h5>$ {product?.price}</h5>
      </div>
    </div>
  );
};

export default ProductCard;
