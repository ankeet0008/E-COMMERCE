export default function Spinner() {
  return (
    <div className="spinner" role="status" aria-label="Loading">
      <div className="spinner__ring" />
      <span className="spinner__text">Loading inventory...</span>
    </div>
  );
}
