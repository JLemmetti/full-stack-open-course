import { useEffect, useState } from 'react'
import CountryDetails from './components/country-details'
import CountryList from './components/country-list'
import countryService from './services/countries'
import weatherService from './services/weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [currentCity, setCurrentCity] = useState()

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountries(response)
    })
  }, [])

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      )
    )
  }, [filter])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      weatherService.get(filteredCountries[0]).then((response) => {
        setCurrentCity(response)
      })
    }
  }, [filteredCountries])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showCountry = (countryName) => {
    setFilter(countryName)
  }

  return (
    <div>
      <label>
        Find countries
        <input type="text" onChange={handleFilterChange} value={filter} />
      </label>
      {filteredCountries.length === 1 ? (
        <CountryDetails
          country={filteredCountries[0]}
          currentCity={currentCity}
        />
      ) : (
        <CountryList
          countries={filteredCountries}
          filter={filter}
          showCountry={showCountry}
        />
      )}
    </div>
  )
}

export default App
