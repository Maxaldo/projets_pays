import FlagCard from './FlagCard'

function FlagList({ countries }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
      }}
    >
      {countries.map((country, index) => (
        <FlagCard key={index} country={country} />
      ))}
    </div>
  )
}

export default FlagList
