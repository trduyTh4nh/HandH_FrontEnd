export default function PaginationControls({ page, setPage }) {
  return (
    <div className="pagination-controls">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        disabled={page === 0}
      >
        Previous
      </button>
      <span>Page {page + 1}</span>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
}
