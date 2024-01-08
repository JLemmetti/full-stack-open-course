const Person = ({ person }) => (
  <li key={person.name}>
    {person.name} {person.number}
  </li>
)

export default Person
