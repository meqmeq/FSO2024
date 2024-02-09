import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const generateRandomNumber = () => {
    let num = Math.floor(Math.random() * anecdotes.length);
    setSelectedIndex(num);
    console.log(points);
    return num;
  };

  const handlePoints = (index) => {
    const key = index.toString();
    const pointsCopy = {
      ...points,
      [key]: (points[index] += 1),
    };

    setPoints(pointsCopy);
  };

  function getKeyWithMaxValue(obj) {
    return Object.keys(obj).reduce(
      (maxKey, key) => (obj[key] > obj[maxKey] ? key : maxKey),
      Object.keys(obj)[0]
    );
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={() => setSelected(generateRandomNumber())}>
        next anecdote
      </button>
      <button onClick={() => handlePoints(selectedIndex)}>vote</button>
      {JSON.stringify(points)}
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[getKeyWithMaxValue(points)]}</p>
      <p>has {getKeyWithMaxValue(points)} votes</p>
    </div>
  );
};

export default App;
