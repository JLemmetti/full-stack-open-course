import Person from './person'

const Numbers = ({ persons, removePerson }) => (
  <>
    <h2>Numbers</h2>
    <ul>
      {persons.map((person) => (
        <Person key={person.name} person={person} removePerson={removePerson} />
      ))}
    </ul>
  </>
)

export default Numbers
