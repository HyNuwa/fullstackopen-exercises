const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors')

app.use(express.json()); 
app.use(cors())
app.use(morgan('tiny'));
app.use(express.static('dist'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})
app.get('/info', (request, response) => {
  const todayDate = new Date(Date.now());
  const maxPerson = persons.length
  response.send(`the phonebook has info for ${maxPerson} people ${todayDate}`);
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const selectedPerson = persons.find(person => person.id === id)
  response.json(selectedPerson)
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)  
  response.status(204).end()
})
const generateId=()=>{
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0
  const randomId = Math.floor(Math.random(maxId+1)*100)
  return randomId;
}
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }else if(!body.number){
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }
  if(persons.find(person=>person.name===body.name)){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  const person = {
    id: generateId(),
    name: body.name || false,
    number: body.number,
  }
  persons = persons.concat(person);
  console.log(person);
  response.json(person);
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})