import "./style.css";
import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Signin from "./pages/Signin";
import { Store } from "./Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Shipping from "./pages/Shipping";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import FooterFooter from "./components/FooterFooter";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" limit={1} />
        <Header cart={cart} />
        <Routes>
          <Route path="/products/slug/:slug" element={<ProductDetail />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderhistory"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer/>
        <FooterFooter/>
      </div>
    </BrowserRouter>
  );
}

export default App;
