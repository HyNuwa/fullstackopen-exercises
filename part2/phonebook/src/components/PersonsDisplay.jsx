const PersonsDisplay = ({persons, lowerCaseFilter})=>{
    return(
    <>
      <ul>
          {persons.filter(lowerCaseFilter).map(person =>
          <li key={person.id}>{person.name}: {person.number}</li>
        )}
      </ul>
    </>
    );
}
export default PersonsDisplay