import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

        <div className="detail-layout">
          <div className="detail-flag-wrapper">
            <img
              src={country.flags?.png}
              alt={
                country.flags?.alt ||
                `Drapeau de ${country.name?.common ?? 'pays'}`
              }
              className="detail-flag-image"
            />
          </div>

          <div className="detail-info">
            <h2 className="detail-name-common">{country.name?.common}</h2>
            {country.name?.official && (
              <p className="detail-name-official">
                Nom officiel : {country.name.official}
              </p>
            )}

            <div className="detail-grid">
              {country.capital && country.capital.length > 0 && (
                <div className="detail-item">
                  <span className="detail-label">Capitale</span>
                  <span className="detail-value">{country.capital[0]}</span>
                </div>
              )}

              <div className="detail-item">
                <span className="detail-label">Population</span>
                <span className="detail-value">{populationFormatted}</span>
              </div>

              {country.region && (
                <div className="detail-item">
                  <span className="detail-label">Région</span>
                  <span className="detail-value">{country.region}</span>
                </div>
              )}

              {country.subregion && (
                <div className="detail-item">
                  <span className="detail-label">Sous-région</span>
                  <span className="detail-value">{country.subregion}</span>
                </div>
              )}

              <div className="detail-item detail-item-full">
                <span className="detail-label">Langues</span>
                <span className="detail-value">{languages}</span>
              </div>

              <div className="detail-item detail-item-full">
                <span className="detail-label">Monnaies</span>
                <span className="detail-value">{currencies}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryDetail


