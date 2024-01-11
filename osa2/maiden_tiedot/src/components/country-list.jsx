const CountryList = ({ countries, filter, showCountry }) => {
  switch (true) {
    case countries.length === 0 || filter.length === 0:
      return <p>No countries found</p>
    case countries.length > 10:
      return <p>Too many matches</p>
    default:
      return (
        <ul>
          {countries.map((country) => {
            const {
              name: { common: countryName },
            } = country
            return (
              <li key={country.altSpellings[0]}>
                {countryName}{' '}
                <button onClick={() => showCountry(countryName)}>Show</button>
              </li>
            )
          })}
        </ul>
      )
  }
}

export default CountryList
