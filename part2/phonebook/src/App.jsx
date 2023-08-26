import { useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import PersonsDisplay from './components/PersonsDisplay.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch]=useState('')

  const addPerson=(event)=>{
    event.preventDefault();
    //if(persons.some(item => item.name === newName)){}
    if(persons.find((item)=>item.name===newName)&&persons.find((item)=>item.number===newNumber)){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }else{
      const personObject ={
        name:newName,
        number:newNumber,
        id:persons.length + 1,
      }
      setPersons(persons.concat(personObject))
      console.log(persons)
      setNewName('')
      setNewNumber('')
    }
  }
  const handleNameChange=(event)=>{
      setNewName(event.target.value);
  }
  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value);
  }
  const handleSearchChange=(event)=>{
    setSearch(event.target.value);
  }
  const lowerCaseFilter = (p) => p.name.toLowerCase().includes(search.toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange}/>
      <h3>Add a person</h3>
      <PersonForm  
      addPerson={addPerson} 
      newName={newName} 
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      buttonTitle={'add'}/>
      <h3>Numbers</h3>
      <PersonsDisplay persons={persons} lowerCaseFilter={lowerCaseFilter}/>
    </div>
  )
}

export default App