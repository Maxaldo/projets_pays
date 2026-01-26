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

  if (loading) return <div>Chargement...</div>

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ColorFilter
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        colors={colors}
      />
      <FlagList countries={filteredCountries} />
    </>
  )
}

export default App
