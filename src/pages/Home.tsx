import { ReactComponent as EmptyProduct } from "../assets/svg/empty.svg";

const Home = () => {
  return (
    <div className="home">
      <EmptyProduct />
      <div className="home-details">
        <h2>Product Not Found!</h2>
        <p>Please select a product from the product list.</p>
      </div>
    </div>
  );
};

export default Home;
