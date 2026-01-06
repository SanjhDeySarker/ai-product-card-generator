import { useState } from "react";
import ProductForm from "./components/productForm";
import ProductCard from "./components/productCard";
import { generateProductDetails } from "./services/aiService";

export default function App() {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (productName, category) => {
    setLoading(true);
    try {
      const result = await generateProductDetails(productName, category);
      setProductData(result);
    } catch {
      alert("Failed to generate product details");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>AI Product Card Generator</h1>
      <ProductForm onGenerate={handleGenerate} loading={loading} />
      {productData && <ProductCard data={productData} />}
    </div>
  );
}
