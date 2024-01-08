import Person from './person'

const Numbers = ({ persons }) => (
  <>
    <h2>Numbers</h2>
    <ul>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </ul>
  </>
)

export default Numbers
