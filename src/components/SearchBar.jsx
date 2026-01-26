function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Rechercher un pays..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
      }}
    />
  )
}

export default SearchBar
