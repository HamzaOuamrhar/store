import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Signin from "./pages/Signin";
import { Store } from "./Store";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const {state} = useContext(Store)
  const {cart} = state
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" limit={1} />
        <Header cart={cart}/>
        <Routes>
          <Route path="/products/slug/:slug" element={<ProductDetail/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<Signin/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
