import axios from 'axios'
import { useEffect, useState } from 'react'
import NewPerson from './components/new-person'
import Numbers from './components/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()

    if (persons.map((person) => person.name).some((name) => name === newName)) {
      alert(`${newName} is already added to phonebook`)

      return
    }

    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <p>
        Filter shown with <input type="text" onChange={handleFilterChange} />
      </p>
      <NewPerson
        addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <Numbers persons={filteredPersons} />
    </div>
  )
}

export default App
