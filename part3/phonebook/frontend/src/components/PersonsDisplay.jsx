
const PersonsDisplay = ({persons, lowerCaseFilter, deletePerson})=>{
    return(
    <ul>
          {persons.filter(lowerCaseFilter).map(person =>{
            return(
            <li key={person.id}>
                <span>{person.name}: {person.number}  </span>
                <button onClick={()=>deletePerson(person.id, person.name)}>delete</button>
            </li>
            )}
        )}
    </ul>
    );
}
export default PersonsDisplay