import React, { Suspense } from "react";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./assets/scss/style.scss";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";

const App: React.FC = () => {
  return (
    <Suspense fallback="loading...">
      <Router>
        <div className="wrapper">
          {/* Left side: Product details (or placeholder) */}
          <div className="wrapper-left">
            <Routes>
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/product" element={<Home />} />
              <Route path="*" element={<Navigate to="/product" replace />} />
            </Routes>
          </div>

          {/* Right side: Product list */}
          <div className="wrapper-right">
            <ProductList />
          </div>
        </div>
      </Router>
    </Suspense>
  );
};

export default App;
