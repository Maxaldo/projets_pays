import './FlagCard.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function FlagCard({ country }) {
  const formatPopulation = (pop) => {
    if (pop >= 1000000) {
      return `${(pop / 1000000).toFixed(1)}M`
    } else if (pop >= 1000) {
      return `${(pop / 1000).toFixed(0)}K`
    }
    return pop.toString()
  }

  return (
    <Link
      to={`/country/${encodeURIComponent(country.name.common)}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <motion.article
        className="flag-card"
        whileHover={{
          y: -10,
          scale: 1.02,
          rotateX: 5,
          rotateY: 5,
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flag-image-container">
          <motion.img
            src={country.flags.png}
            alt={country.flags.alt || `Drapeau de ${country.name.common}`}
            className="flag-image"
            loading="lazy"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="flag-info">
          <h2 className="flag-name">{country.name.common}</h2>
          <div className="flag-details">
            {country.capital && country.capital.length > 0 && (
              <div className="flag-detail">
                <span className="flag-detail-label">Capitale:</span>
                <span className="flag-detail-value">{country.capital[0]}</span>
              </div>
            )}
            {country.region && (
              <div className="flag-detail">
                <span className="flag-detail-label">Région:</span>
                <span className="flag-detail-value">{country.region}</span>
              </div>
            )}
            {country.population && (
              <div className="flag-detail">
                <span className="flag-detail-label">Population:</span>
                <span className="flag-detail-value">
                  {formatPopulation(country.population)}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  )
}

export default FlagCard
