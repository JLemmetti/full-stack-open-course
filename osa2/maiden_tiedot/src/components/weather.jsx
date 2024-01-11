const Weather = ({ currentCity }) => {
  if (!currentCity) return

  const {
    name,
    main: { temp: kelvin },
    weather,
    wind,
  } = currentCity
  const celcius = ((kelvin * 100 - 27315) / 100).toFixed(2)
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

  return (
    <>
      <h2>Weather in {name}</h2>
      <ul>
        <li>
          Temperature: {celcius}°C
          <div>
            <img
              style={{
                backgroundColor: '#0002',
                borderRadius: '100%',
                margin: '2em',
              }}
              src={weatherIconUrl}
              alt={weather[0].description}
            />
          </div>
        </li>
        <li>Wind: {wind.speed} m/s</li>
      </ul>
    </>
  )
}

export default Weather
