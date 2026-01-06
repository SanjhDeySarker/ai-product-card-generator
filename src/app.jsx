import { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductCard from "./components/ProductCard";
import { generateProductDetails } from "./services/aiService";

export default function App() {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (productName, category) => {
    setLoading(true);
    try {
      const result = await generateProductDetails(productName, category);
      setProductData(result);
    } catch (error) {
      alert("Failed to generate product details");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>AI Product Card Generator</h1>
      <ProductForm onGenerate={handleGenerate} loading={loading} />
      {productData && <ProductCard data={productData} />}
    </div>
  );
}
