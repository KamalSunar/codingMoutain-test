import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StarRating } from "../components/StarRating";
import { useProductDetailsById } from "../hooks/getProductDetails";
import { capitalizeFirstLetter } from "../utils";
import { ProductDetailSkeleton } from "../components/ProductDetailSkeleton";

const tabOptions = [
  {
    label: "Additional information",
    value: "info",
  },
  {
    label: "Reviews",
    value: "review",
  },
];

const ProductDetails: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("info");
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

  return (
    <>
      {loading ? (
        <ProductDetailSkeleton />
      ) : (
        <div className="container productDetail-wrapper">
          <div className="productDetails">
            {/* Product Image Section */}
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

            {/* Product Details Section */}
            <div className="productDetails-info">
              <h1>{data?.title}</h1>
              <div className="rating-wrapper">
                <StarRating rating={data?.rating} />
                <span>({data?.reviews?.length} customers review)</span>
              </div>
              <h5 className="price">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(data?.price || 0)}

                {data?.discountPercentage > 0 && (
                  <span>({actualCostPrice.toFixed(2)})</span>
                )}
              </h5>
              <p className="description">{data?.description}</p>

              <ul className="detail-list">
                <li>
                  <b>Brand:</b> {data?.brand}
                </li>
                <li>
                  <b>Category:</b> {capitalizeFirstLetter(data?.category)}
                </li>
                <li>
                  <b>Tags:</b>{" "}
                  {data?.tags
                    ?.map((item) => capitalizeFirstLetter(item))
                    ?.toString()
                    ?.replaceAll(",", ", ")}
                </li>
                <li>
                  <b>Minimum Order Quantity:</b> {data?.minimumOrderQuantity}
                </li>
                <li>
                  <b>Available Stock:</b> {data?.stock}
                </li>
              </ul>

              <form action="#" className="productDetails-form">
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={data?.stock}
                />
                <button className="btn btn-primary">Add to Cart</button>
              </form>
            </div>
          </div>
          <div className="divider" />

          {/* Product Review and Comment Section */}
          <div className="productAdditionalInfo">
            <ul className="tab">
              {tabOptions.map((item) => (
                <li
                  className={item.value === activeTab ? "active" : ""}
                  onClick={() => setActiveTab(item.value)}
                >
                  {item.label}
                </li>
              ))}
            </ul>

            <div className="tab-content">
              {activeTab === "review" && (
                <div className="review-section">
                  {data?.reviews?.map((review) => (
                    <div className="review">
                      <div className="review-header">
                        <h6>
                          {review?.reviewerName}
                          <span>
                            {new Date(review?.date)?.toLocaleDateString(
                              "sv-SE"
                            )}
                          </span>
                        </h6>
                        <StarRating rating={review?.rating} />
                      </div>
                      <p className="review-description">{review?.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "info" && (
                <div className="additionalInfo">
                  <ul className="detail-list">
                    <li>
                      <span> Weight </span> {data?.weight} kg
                    </li>
                    <li>
                      <span>Dimension</span> {data?.dimensions?.height} x{" "}
                      {data?.dimensions?.width} x {data?.dimensions?.depth} cm
                    </li>
                    <li>
                      <span>Warranty Information</span>{" "}
                      {data?.warrantyInformation}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
