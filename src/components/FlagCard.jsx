function FlagCard({ country }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        textAlign: 'center',
      }}
    >
      <img
        src={country.flags.png}
        alt={`Drapeau de ${country.name.common}`}
        style={{ width: '100%', height: 'auto' }}
      />
      <p style={{ marginTop: '10px' }}>{country.name.common}</p>
    </div>
  )
}

export default FlagCard
