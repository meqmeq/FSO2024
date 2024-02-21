const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <Part key={index} part={part.name} exercise={part.exercises} />
      ))}
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Total = (props) => {
  return (
    <p style={{ fontWeight: "bold" }}>
      Total of exercises{" "}
      {props.parts.map((part) => part.exercises).reduce((a, b) => a + b, 0)}
    </p>
  );
};

export default Course;
