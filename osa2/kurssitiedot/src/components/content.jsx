import Part from './part'

const Content = ({ parts }) => {
  const getSum = (parts) =>
    parts.map((part) => part.exercises).reduce((acc, cur) => acc + cur, 0)

  return (
    <>
      <ul>
        {parts.map((part, i) => (
          <Part key={i} part={part} />
        ))}
      </ul>
      <strong>Total of {getSum(parts)} exercises</strong>
    </>
  )
}

export default Content
