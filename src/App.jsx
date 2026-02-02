import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import FlagList from './components/FlagList'
import SearchBar from './components/SearchBar'
import ColorFilter from './components/ColorFilter'
import SortFilter from './components/SortFilter'
import CountryDetail from './components/CountryDetail'
import Pagination from './components/Pagination'
import ThemeToggle from './components/ThemeToggle'

// Wrapper for animated routes
function AnimatedRoutes({ countries, loading, searchTerm, setSearchTerm, selectedColors, setSelectedColors, colors, sortBy, setSortBy, filteredCountries, paginatedCountries, totalPages, currentPage, setCurrentPage }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
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
                <div className="filters-row">
                  <ColorFilter
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                    colors={colors}
                  />
                  <SortFilter sortBy={sortBy} setSortBy={setSortBy} />
                </div>
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
            </motion.div>
          }
        />
        <Route
          path="/country/:name"
          element={<CountryDetail countries={countries} />}
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedColors, setSelectedColors] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('name')

  const colors = ['red', 'blue', 'green', 'yellow', 'white', 'black', 'orange']
  const ITEMS_PER_PAGE = 20

  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,subregion,languages,currencies,borders,cca3'
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
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.common.localeCompare(b.name.common)
        case 'population-asc':
          return (a.population || 0) - (b.population || 0)
        case 'population-desc':
          return (b.population || 0) - (a.population || 0)
        case 'region':
          if (a.region !== b.region) {
            return (a.region || '').localeCompare(b.region || '')
          }
          return a.name.common.localeCompare(b.name.common)
        default:
          return a.name.common.localeCompare(b.name.common)
      }
    })

  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE)
  const paginatedCountries = filteredCountries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedColors, sortBy])

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
            <div className="header-top">
              <ThemeToggle />
            </div>
            <Link to="/" className="app-logo-link">
              <motion.div
                className="logo-container"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={48} className="app-logo-icon" />
                <h1 className="app-title">FlagRepository</h1>
              </motion.div>
            </Link>
            <p className="app-subtitle">
              Explorez les drapeaux du monde entier
            </p>
          </header>

          <AnimatedRoutes
            countries={countries}
            loading={loading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            colors={colors}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filteredCountries={filteredCountries}
            paginatedCountries={paginatedCountries}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
