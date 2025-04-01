import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductDetailsById } from "../hooks/getProductDetails";

const ProductDetails: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");

  const { data, loading, error } = useProductDetailsById(
    Number(params?.id) || 0
  );

  useEffect(() => {
    if (error) navigate("/");
  }, [error]);

  useEffect(() => {
    if (data && data?.images?.length > 0) {
      setSelectedImage(data?.images[0] || data?.thumbnail);
    }
  }, [data]);

  const actualCostPrice =
    data?.price + data?.price * (data?.discountPercentage / 100) || 0; // cost price before discount

  console.log("data", data, selectedImage);

  return (
    <div className="container productDetails">
      <div className="productDetails-img">
        <ul>
          {data?.images?.map((imgSrc) => (
            <li
              onClick={() => setSelectedImage(imgSrc)}
              className={`${selectedImage === imgSrc ? "active" : ""}`}
            >
              <img src={imgSrc} alt="" width="100px" />
            </li>
          ))}
        </ul>
        <div className="img-wrapper">
          <img src={selectedImage} alt="" loading="lazy" />
        </div>
      </div>
      <div className="productDetails-info">
        <h1>{data?.title}</h1>
        <div className="rating-wrapper">
          <div className="rating">
            <div className="star star-full" />
            <div className="star star-full" />
            <div className="star star-full" />
            <div className="star star-full" />
            <div className="star" />
          </div>
          <span>({data?.reviews?.length} customer reviews)</span>
        </div>
        <span className="price">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(data?.price || 0)}

          {data?.discountPercentage > 0 && (
            <span>({actualCostPrice.toFixed(2)})</span>
          )}
        </span>
        <p className="description">{data?.description}</p>

        <ul>
          <li>
            <b>Brand:</b> {data?.brand}
          </li>
          <li>
            <b>Category:</b> {data?.category}
          </li>
          <li>
            <b>Tags:</b> {data?.tags?.toString()}
          </li>
          <li>
            <b>Minimum Order Quantity:</b> {data?.minimumOrderQuantity}
          </li>
          <li>
            <b>Available Stock:</b> {data?.stock}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
