import { useMemo } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Users, Globe2, Languages, Coins, Info } from 'lucide-react'
import './CountryDetail.css'

function CountryDetail({ countries }) {
  const navigate = useNavigate()
  const { name } = useParams()

  const country = useMemo(() => {
    if (!name || !countries?.length) return null
    return (
      countries.find(
        (c) => c.name?.common?.toLowerCase() === name.toLowerCase()
      ) ?? null
    )
  }, [countries, name])

  if (!country) {
    return (
      <div className="detail-page-container">
        <div className="detail-card">
          <button
            className="back-button"
            type="button"
            onClick={() => navigate(-1)}
          >
            ← Retour
          </button>
          <div className="detail-content">
            <p className="detail-not-found">
              Le pays demandé est introuvable.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const populationFormatted = country.population
    ? country.population.toLocaleString('fr-FR')
    : 'N/A'

  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'Non spécifiées'

  const currencies = country.currencies
    ? Object.values(country.currencies)
      .map((curr) =>
        curr.symbol ? `${curr.name} (${curr.symbol})` : curr.name
      )
      .join(', ')
    : 'Non spécifiées'

  const neighbors = useMemo(() => {
    if (!country.borders || country.borders.length === 0) {
      return []
    }
    return country.borders
      .map((borderCode) =>
        countries.find((c) => c.cca3 === borderCode)
      )
      .filter(Boolean)
  }, [country.borders, countries])

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      className="detail-page-container"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      variants={containerVariants}
    >
      <motion.div className="detail-card" variants={itemVariants}>
        <motion.button
          className="back-button"
          type="button"
          onClick={() => navigate(-1)}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={18} /> Retour
        </motion.button>

        <div className="detail-layout">
          <motion.div
            className="detail-flag-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src={country.flags?.png}
              alt={
                country.flags?.alt ||
                `Drapeau de ${country.name?.common ?? 'pays'}`
              }
              className="detail-flag-image"
            />
          </motion.div>

          <div className="detail-info">
            <motion.div variants={itemVariants} className="detail-header">
              <h2 className="detail-name-common">{country.name?.common}</h2>
              {country.name?.official && (
                <p className="detail-name-official">
                  {country.name.official}
                </p>
              )}
            </motion.div>

            <div className="detail-grid">
              <motion.div className="detail-item" variants={itemVariants}>
                <div className="detail-icon-label">
                  <MapPin size={16} /> <span className="detail-label">Capitale</span>
                </div>
                <span className="detail-value">{country.capital?.[0] || 'N/A'}</span>
              </motion.div>

              <motion.div className="detail-item" variants={itemVariants}>
                <div className="detail-icon-label">
                  <Users size={16} /> <span className="detail-label">Population</span>
                </div>
                <span className="detail-value">{populationFormatted}</span>
              </motion.div>

              <motion.div className="detail-item" variants={itemVariants}>
                <div className="detail-icon-label">
                  <Globe2 size={16} /> <span className="detail-label">Région</span>
                </div>
                <span className="detail-value">{country.region}</span>
              </motion.div>

              <motion.div className="detail-item" variants={itemVariants}>
                <div className="detail-icon-label">
                  <Info size={16} /> <span className="detail-label">Sous-région</span>
                </div>
                <span className="detail-value">{country.subregion || 'N/A'}</span>
              </motion.div>

              <motion.div className="detail-item detail-item-full" variants={itemVariants}>
                <div className="detail-icon-label">
                  <Languages size={16} /> <span className="detail-label">Langues</span>
                </div>
                <span className="detail-value">{languages}</span>
              </motion.div>

              <motion.div className="detail-item detail-item-full" variants={itemVariants}>
                <div className="detail-icon-label">
                  <Coins size={16} /> <span className="detail-label">Monnaies</span>
                </div>
                <span className="detail-value">{currencies}</span>
              </motion.div>

              <motion.div className="detail-item detail-item-full" variants={itemVariants}>
                <div className="detail-icon-label">
                  <Globe2 size={16} /> <span className="detail-label">Pays voisins</span>
                </div>
                {neighbors.length === 0 ? (
                  <span className="detail-value detail-value-muted">
                    Aucun pays frontalier (île)
                  </span>
                ) : (
                  <div className="neighbors-container">
                    {neighbors.map((neighbor) => (
                      <Link
                        key={neighbor.cca3}
                        to={`/country/${encodeURIComponent(
                          neighbor.name.common
                        )}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <motion.div
                          className="neighbor-item"
                          whileHover={{ y: -3, scale: 1.05, backgroundColor: 'var(--primary)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img
                            src={neighbor.flags?.png}
                            alt={`Drapeau de ${neighbor.name.common}`}
                            className="neighbor-flag"
                          />
                          <span className="neighbor-name">
                            {neighbor.name.common}
                          </span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CountryDetail


