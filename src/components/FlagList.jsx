import './FlagList.css'
import FlagCard from './FlagCard'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

function FlagList({ countries }) {
  return (
    <motion.div
      className="flag-list-container"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {countries.map((country) => (
        <FlagCard key={country.name.common} country={country} />
      ))}
    </motion.div>
  )
}

export default FlagList
