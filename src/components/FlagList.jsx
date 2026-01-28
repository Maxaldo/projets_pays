import './FlagList.css'
import FlagCard from './FlagCard'

function FlagList({ countries }) {
  return (
    <div className="flag-list-container">
      {countries.map((country) => (
        <FlagCard key={country.name.common} country={country} />
      ))}
    </div>
  )
}

export default FlagList
