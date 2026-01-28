import './App.css'
import { useEffect, useState } from 'react'
import FlagList from './components/FlagList'
import SearchBar from './components/SearchBar'
import ColorFilter from './components/ColorFilter'

function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedColors, setSelectedColors] = useState([])

  const colors = ['red', 'blue', 'green', 'yellow', 'white', 'black', 'orange']

  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region'
        )
        const data = await res.json()
        setCountries(data)
      } catch (error) {
        console.error('Erreur lors du chargement des pays:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCountries()
  }, [])

  const filteredCountries = countries
    .filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      if (!matchesSearch) return false

      if (selectedColors.length === 0) return true

      const alt = (country.flags?.alt ?? '').toLowerCase()
      return selectedColors.some((color) => alt.includes(color))
    })
    .sort((a, b) => a.name.common.localeCompare(b.name.common))

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Chargement des drapeaux...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <header className="app-header">
          <h1 className="app-title">FlagRepository</h1>
          <p className="app-subtitle">
            Explorez les drapeaux du monde entier
          </p>
        </header>

        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{countries.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Affichés:</span>
            <span className="stat-value">{filteredCountries.length}</span>
          </div>
        </div>

        <section className="filters-section">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ColorFilter
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            colors={colors}
          />
        </section>

        {filteredCountries.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <p className="no-results-text">
              Aucun pays ne correspond à votre recherche
            </p>
          </div>
        ) : (
          <FlagList countries={filteredCountries} />
        )}
      </div>
    </div>
  )
}

export default App
