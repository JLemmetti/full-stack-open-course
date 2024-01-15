import { useEffect, useState } from 'react'
import NewPerson from './components/new-person'
import Notification from './components/notification'
import Numbers from './components/numbers'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('notification')

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const notify = (type, message) => {
    setNotificationType(type)

    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addOrUpdatePerson = (event) => {
    event.preventDefault()

    const targetPerson = {
      name: newName,
      number: newNumber,
    }

    if (
      persons
        .map((person) => person.name)
        .some((name) => name === targetPerson.name)
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(targetPerson)
        return
      }
      alert(`${newName} is already added to phonebook`)
      return
    }

    addPerson(targetPerson)
  }

  const addPerson = (person) => {
    personService.create(person).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')

      notify('notification', `Added ${person.name}`)
    })
  }

  const updatePerson = (updatedPerson) => {
    const personId = persons.find(
      (person) => person.name === updatedPerson.name
    ).id

    personService
      .update(personId, updatedPerson)
      .then((updatedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== personId ? person : updatedPerson
          )
        )
        setNewName('')
        setNewNumber('')

        notify('notification', `Updated ${updatedPerson.name}`)
      })
      .catch(() => {
        setPersons(persons.filter((person) => person.id !== personId))

        notify(
          'error',
          `Information of ${updatedPerson.name} has already been removed from server`
        )
      })
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id).then((returnedPerson) => {
        setPersons(persons.filter((person) => person.id !== returnedPerson.id))

        notify('notification', `Removed ${returnedPerson.name}`)
      })
    }
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
      <Notification message={notification} type={notificationType} />
      <p>
        Filter shown with <input type="text" onChange={handleFilterChange} />
      </p>
      <NewPerson
        addOrUpdatePerson={addOrUpdatePerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <Numbers persons={filteredPersons} removePerson={removePerson} />
    </div>
  )
}

export default App
