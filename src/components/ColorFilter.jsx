import './ColorFilter.css'

function ColorFilter({ selectedColors, setSelectedColors, colors }) {
  function toggleColor(color) {
    setSelectedColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter((c) => c !== color)
      }
      return [...prev, color]
    })
  }

  return (
    <div className="color-filter-container">
      <h3 className="color-filter-title">Filtrer par couleur:</h3>
      <div className="color-filter-options">
        {colors.map((color) => (
          <label
            key={color}
            className={`color-filter-label ${
              selectedColors.includes(color) ? 'active' : ''
            }`}
          >
            <input
              type="checkbox"
              className="color-filter-checkbox"
              checked={selectedColors.includes(color)}
              onChange={() => toggleColor(color)}
            />
            <span className="color-filter-text">{color}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default ColorFilter
