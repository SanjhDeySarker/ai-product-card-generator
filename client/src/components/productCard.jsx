export default function ProductCard({ data }) {
  return (
    <div className="card">
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <div>
        {data.tags.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
