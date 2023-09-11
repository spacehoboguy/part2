import { useState, useEffect } from 'react'
import InputForm from './components/InputForm'
import FilteredList from './components/FilteredList'
import FilterInput from './components/FilterInput'
import personService from './services/personService'
import Notification from './components/Notification'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState("success")

  useEffect(() => {
    personService
      .getAll()
      .then(res => {
        setPersons(res)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (!checkIfInPersons(newPerson)) {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      setErrorMessage(`Added ${newPerson.name}`)
      setErrorType("success")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
      setNewName("")
      setNewNumber("")

    } else { //update number
      window.confirm(`${newName} is already added to phonebook,
      replace the old number with a new one?`)
      const existingPerson = persons.find(p => p.name === newPerson.name)

      personService
        .update(existingPerson.id, newPerson)
        .then(
          returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName("")
            setNewNumber("")
            setErrorMessage(`Updated ${returnedPerson.name}'s number to ${newPerson.number}`)
            setErrorType("success")
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);
          }
        )
    }
  }

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    console.log(personToDelete)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(personToDelete.id)
        .then(
          setPersons(persons.filter(p => p.id !== personToDelete.id))
        )
      console.log(persons)
    } else {
      return
    }

  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const checkIfInPersons = (personToAdd) => {
    return persons.some(person => {
      return JSON.stringify(person.name) == JSON.stringify(personToAdd.name)
    })
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={errorType} />
      <FilterInput
        handleFilterChange={handleFilterChange}
        filter={filter} />
      <h3>Add a new contact</h3>
      <InputForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <FilteredList
        filter={filter}
        persons={persons}
        handleDeletePerson={handleDeletePerson}

      />
    </div>
  )
}

export default App
