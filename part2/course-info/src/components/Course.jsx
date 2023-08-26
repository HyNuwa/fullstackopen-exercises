const Header = ({course})=>{
    return (
      <>
        <h3>{course}</h3>
      </>
    );  
  }
  
  const Part = ({name, exercise})=>{
    return (
      <>
        <p>{name}: {exercise}</p>
      </>
    );  
  }
  const TotalSum = ({ sum }) => <p>Total of exercises:{sum}</p>
  const Content = ({parts})=>{
    return (
      <>
        {parts.map(note => <Part key={note.id} name={note.name} exercise={note.exercises}/>)}
      </>
    )
  }
  const Course = ({courses})=>{
    return (
      <>
        <h1>Web development curriculum</h1>
        {courses.map(course=>
          <div key={course.id}>
            <Header course={course.name}/>    
            <Content parts={course.parts}/>
            <TotalSum sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)}/>
          </div>
        )}
      </>
    )
  }
  export default Course