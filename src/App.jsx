import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FlagList from './components/FlagList'
import SearchBar from './components/SearchBar'
import ColorFilter from './components/ColorFilter'
import CountryDetail from './components/CountryDetail'
import Pagination from './components/Pagination'

function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedColors, setSelectedColors] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const colors = ['red', 'blue', 'green', 'yellow', 'white', 'black', 'orange']
  const ITEMS_PER_PAGE = 20

  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,subregion,languages,currencies'
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

  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE)
  const paginatedCountries = filteredCountries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedColors])

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
    <BrowserRouter>
      <div className="app-container">
        <div className="app-wrapper">
          <header className="app-header">
            <h1 className="app-title">FlagRepository</h1>
            <p className="app-subtitle">
              Explorez les drapeaux du monde entier
            </p>
          </header>

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="stats-bar">
                    <div className="stat-item">
                      <span className="stat-label">Total:</span>
                      <span className="stat-value">{countries.length}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Affichés:</span>
                      <span className="stat-value">
                        {filteredCountries.length}
                      </span>
                    </div>
                  </div>

                  <section className="filters-section">
                    <SearchBar
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
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
                    <>
                      <FlagList countries={paginatedCountries} />
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                      />
                    </>
                  )}
                </>
              }
            />
            <Route
              path="/country/:name"
              element={<CountryDetail countries={countries} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
