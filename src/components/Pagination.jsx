import './Pagination.css'

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Précédent
      </button>
      <span className="pagination-info">
        Page {currentPage} sur {totalPages}
      </span>
      <button
        className="pagination-button"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant →
      </button>
    </div>
  )
}

export default Pagination

