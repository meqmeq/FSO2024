/* eslint-disable react/prop-types */
import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const updateGood = () => {
    setGood((n) => n + 1);
  };
  let updateNeutral = () => {
    setNeutral(neutral + 1);
  };
  let updateBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={updateGood}>good</button>
      <button onClick={updateNeutral}>neutral</button>
      <button onClick={updateBad}>bad</button>
      <h1>feedback</h1>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        average={(good - bad) / (good + neutral + bad)}
        positive={good / (good + neutral + bad)}
      />
    </div>
  );
};

const Statistics = (props) => {
  if (props.good > 0 || props.bad > 0 || props.neutral > 0) {
    return (
      <div>
        <table>
          <StatisticLine text="good" value={props.good} />

          <StatisticLine text="neutral" value={props.neutral} />

          <StatisticLine text="bad" value={props.bad} />

          <StatisticLine
            text="all"
            value={props.good + props.neutral + props.bad}
          />

          <StatisticLine text="average" value={props.average} />

          <StatisticLine text="positive" value={props.positive * 100} />
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
};

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  );
};

export default App;
