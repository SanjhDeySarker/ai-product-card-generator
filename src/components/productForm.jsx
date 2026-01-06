import { useState } from "react";

export default function ProductForm({ onGenerate, loading }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !category) return;
    onGenerate(productName, category);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? "Generating..." : "Generate Details"}
      </button>
    </form>
  );
}
