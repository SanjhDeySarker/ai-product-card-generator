import { useState } from "react";

export default function ProductForm({ onGenerate, loading }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (productName && category) {
      onGenerate(productName, category);
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
