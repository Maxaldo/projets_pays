import './SortFilter.css'
import { motion } from 'framer-motion'

function SortFilter({ sortBy, setSortBy }) {
  return (
    <motion.div
      className="sort-filter-container"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <label htmlFor="sort-select" className="sort-filter-label">
        Trier par:
      </label>
      <motion.select
        id="sort-select"
        className="sort-filter-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        whileFocus={{ scale: 1.02 }}
      >
        <option value="name">Nom (A-Z)</option>
        <option value="population-asc">Population (croissante)</option>
        <option value="population-desc">Population (décroissante)</option>
        <option value="region">Continent</option>
      </motion.select>
    </motion.div>
  )
}

export default SortFilter

