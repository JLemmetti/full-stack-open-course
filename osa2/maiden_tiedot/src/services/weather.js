import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY

const get = (country) => {
  const { altSpellings, capital } = country

  const params = {
    q: `${encodeURIComponent(capital)},${altSpellings[0]}`,
    appid: api_key,
  }
  const urlEncodedParameters = Object.entries(params)
    .map((param) => `${param[0]}=${param[1]}`)
    .join('&')
  const url = `${baseUrl}?${urlEncodedParameters}`

  const request = axios.get(url)
  return request.then((response) => response.data)
}

export default {
  get,
}
