/* eslint-disable react/prop-types */
import { useState } from "react";

const Filter = (props) => (
  <div>
    <form>
      filter shown with a :{" "}
      <input value={props.filter} onChange={props.onChange} />
    </form>
  </div>
);

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      <p></p>
    </div>
    <div>
      number:{" "}
      <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Person = (props) => (
  <div>
    {props.persons.map((person) => {
      if (person.name.toLowerCase().includes(props.filter)) {
        return (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        );
      }
    })}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setFilter(searchTerm);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    if (!persons.find((person) => person.name === newPerson.name)) {
      setPersons((oldPersons) => [...oldPersons, newPerson]);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilter} />

      <h2>Add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Person persons={persons} filter={filter} />
    </div>
  );
};

export default App;
