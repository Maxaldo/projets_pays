import './SearchBar.css'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <motion.div
      className="search-bar-container"
      initial={{ width: "80%" }}
      whileFocus={{ width: "100%" }}
      viewport={{ once: true }}
    >
      <div className="search-icon-wrapper">
        <Search className="search-icon" size={20} />
      </div>
      <input
        type="text"
        className="search-bar-input"
        placeholder="Rechercher un pays..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </motion.div>
  )
}

export default SearchBar
