const Person = ({ person, removePerson }) => (
  <li key={person.name}>
    {person.name} {person.number}{' '}
    <button onClick={() => removePerson(person)}>&#9587;</button>
  </li>
)

export default Person
