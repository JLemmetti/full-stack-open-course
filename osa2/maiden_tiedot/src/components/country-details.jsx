import Weather from './weather'

const CountryDetails = ({ country, currentCity }) => {
  const {
    area,
    capital,
    flags,
    name: { common },
    languages,
  } = country

  return (
    <>
      <h1>{common}</h1>
      <ul>
        <li>Capital: {capital}</li>
        <li>Area: {area}</li>
      </ul>

      <h2>Languages</h2>
      <ul>
        {Object.entries(languages).map((language) => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <img
        style={{ border: '1px solid #999' }}
        src={flags.png}
        alt={flags.alt}
      />
      <Weather currentCity={currentCity} />
    </>
  )
}

export default CountryDetails
