import './FlagCard.css'

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
    <article className="flag-card">
      <div className="flag-image-container">
        <img
          src={country.flags.png}
          alt={country.flags.alt || `Drapeau de ${country.name.common}`}
          className="flag-image"
          loading="lazy"
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
    </article>
  )
}

export default FlagCard
