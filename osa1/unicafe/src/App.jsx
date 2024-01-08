import { useState } from 'react'

const Button = ({ type, value, setValue }) => {
  return <button onClick={() => setValue(value + 1)}>{type}</button>
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <th>{text}</th>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const getAverage = (good, neutral, bad) => {
    return ((good + neutral + -bad) / (good + neutral + bad) || 0).toFixed(2)
  }

  const getPositive = (good, neutral, bad) => {
    return ((good / (good + neutral + bad)) * 100 || 0).toFixed(1)
  }

  if ([good, neutral, bad].every((value) => value === 0)) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feefback given</p>
      </>
    )
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={'Good'} value={good} />
          <StatisticLine text={'Neutral'} value={neutral} />
          <StatisticLine text={'Bad'} value={bad} />
          <StatisticLine text={'All'} value={good + neutral + bad} />
          <StatisticLine
            text={'Average'}
            value={getAverage(good, neutral, bad)}
          />
          <StatisticLine
            text={'Positive'}
            value={`${getPositive(good, neutral, bad)} %`}
          />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give feedback</h1>
      <Button type="good" value={good} setValue={setGood} />
      <Button type="neutral" value={neutral} setValue={setNeutral} />
      <Button type="bad" value={bad} setValue={setBad} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
