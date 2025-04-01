import { type Product } from "../types/types";

interface ProductCardProps {
  product: Product;
  handleProduct: (id: number) => void;
}

const ProductCard = ({ product, handleProduct }: ProductCardProps) => {
  const actualCostPrice =
    product?.price + product?.price * (product?.discountPercentage / 100) || 0; // cost price before discount

  return (
    <div className="productCard" onClick={() => handleProduct(product.id)}>
      <div className="productCard-img">
        <img
          alt={product?.title}
          title={product?.title}
          src={product?.thumbnail}
        />
      </div>
      <div className="productCard-details">
        <p>{product?.category}</p>
        <h5>{product?.title}</h5>
        <div>
          <h4>
            {/* converts product price to dollar format */}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product?.price)}

            {product?.discountPercentage > 0 && (
              <span>({actualCostPrice.toFixed(2)})</span>
            )}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
