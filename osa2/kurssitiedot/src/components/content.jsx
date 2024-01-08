import Part from './part'

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </div>
  )
}

export default Content
