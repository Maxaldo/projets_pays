import { useFetch } from './useFetch'

export function useCountries() {
  const { data, loading, error } = useFetch(
    '/all?fields=name,flags,capital,population,region,subregion,languages,currencies,borders,cca3'
  )

  return {
    countries: data || [],
    loading,
    error
  }
}
