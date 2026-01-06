export default function ProductCard({ data }) {
  return (
    <div className="card">
      <h2>{data.title}</h2>
      <p>{data.description}</p>

      <div className="tags">
        {data.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
