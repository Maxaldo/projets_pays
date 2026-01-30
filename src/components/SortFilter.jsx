import './SortFilter.css'

function SortFilter({ sortBy, setSortBy }) {
  return (
    <div className="sort-filter-container">
      <label htmlFor="sort-select" className="sort-filter-label">
        Trier par:
      </label>
      <select
        id="sort-select"
        className="sort-filter-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="name">Nom (A-Z)</option>
        <option value="population-asc">Population (croissante)</option>
        <option value="population-desc">Population (décroissante)</option>
        <option value="region">Continent</option>
      </select>
    </div>
  )
}

export default SortFilter

