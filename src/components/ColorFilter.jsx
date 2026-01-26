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
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {colors.map((color) => (
        <label
          key={color}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <input
            type="checkbox"
            checked={selectedColors.includes(color)}
            onChange={() => toggleColor(color)}
          />
          <span>{color}</span>
        </label>
      ))}
    </div>
  )
}

export default ColorFilter

