import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter.jsx';
import PersonForm from './components/PersonForm.jsx';
import PersonsDisplay from './components/PersonsDisplay.jsx';
import personsService from './service/persons.js';
import Notification from './components/Notification.jsx';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch]=useState('')
  
  useEffect(() => {
    personsService
      .getAll().then((dataPerson)=>{
        setPersons(dataPerson)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const addPerson=(event)=>{
    event.preventDefault();
    const personObject ={
      name:newName,
      number:newNumber,
    }
    let sameName = persons.find((item)=>item.name===newName);
    let sameNumber = persons.find((item)=>item.number===newNumber);
    let noSameNumber = persons.find((item)=>item.number!==newNumber);
    if(sameName&&sameNumber){
      alert(`${newName} is already added to the phonebook`)
      //
    }else if (sameName&&noSameNumber) {
        if (window.confirm(`${newName} is already added to the phonebook,replace the number?`)){
          const contactInfo = persons.find(person=> person.name === newName);
          console.log(contactInfo);
          personsService
            .personUpdate(contactInfo.id, { ...contactInfo, number: newNumber })
            .then((updatedContact) => {
              setPersons(
                persons.map((person) =>
                  person.name === newName ? updatedContact : person
                )
              );
              setErrorMessage(`Number updated '${newNumber} '`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setNewName("");
              setNewNumber("");
            });
        }
    }else{
      personsService
        .personPost(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setErrorMessage(`Added '${newName} '`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
      {/*setPersons(persons.concat(personObject))
      console.log(persons)
      setNewName('')
        setNewNumber('')*/}
    }
  }

  const deletePerson = (id, name) => {
    let deletedPerson = window.confirm(`Do you want to delete ${name}?`);
    console.log(persons)
    if (deletedPerson) {
      personsService
        .personRemove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNewName("");
          setNewNumber("");
          console.log(`${name} removed from phonebook`);
        })
    }
  };

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
      <Notification message={errorMessage} />
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
      <PersonsDisplay persons={persons} lowerCaseFilter={lowerCaseFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App