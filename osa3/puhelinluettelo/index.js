const express = require('express')
const app = express()

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
]

const infoPageTemplate = (time) => `
<h1>Phonebook</h1>
<p>phonebook has info for ${persons.length} people</p>
<p>${time}</p>
`

const generateId = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

app.use(express.json())

app.get('/info', (request, response) => {
  response.send(infoPageTemplate(new Date()))
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  if (
    persons
      .map((person) => person.name)
      .some((personName) => personName === name)
  ) {
    return response.status(422).json({
      error: `name must be unique`,
    })
  }

  const person = {
    name,
    number,
    id: generateId(10, 5000),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
