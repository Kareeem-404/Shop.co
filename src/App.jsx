import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import Home from "./Pages/Home.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}
