import './App.css';
import { Route, Routes, Navigate, useNavigate, BrowserRouter as Router, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home"
import ProductDetails from "./components/ProductDetail/ProductDetail"
import Success from "./components/Success/Success"
import Cart from "./components/Cart/Cart"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
