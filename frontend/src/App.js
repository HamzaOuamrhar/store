import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { Store } from "./Store";

function App() {
  const {state} = useContext(Store)
  const {cart} = state
  return (
    <BrowserRouter>
      <div className="App">
        <Header cart={cart}/>
        <Routes>
          <Route path="/product/:slug" element={<ProductDetail/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
