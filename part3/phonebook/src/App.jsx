/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import personService from "./service/personService";
import "./index.css";

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
          <div key={person.id}>
            <p>
              {person.name} {person.number} {}
              <button
                onClick={() => props.deletePerson(person.id, person.name)}
              >
                delete
              </button>
            </p>
          </div>
        );
      }
    })}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

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
      personService.create(newPerson).then((returnedPersons) => {
        setPersons(persons.concat(returnedPersons));
        setMessage(`Added ${newPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      });
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const deletePerson = (id, personName) => {
    if (window.confirm(`Delete ${personName}?`)) {
      personService.deletePersonById(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="added">{message}</div>;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className="added" message={message} />
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
      <Person persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
