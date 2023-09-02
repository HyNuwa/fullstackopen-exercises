const FormPart = ({ inputName, value, onChange }) => {
    return (
      <div>
        {inputName}: <input value={value} onChange={onChange} />
      </div>
    );
  };

const PersonForm = ({addPerson, newName,newNumber,handleNameChange,handleNumberChange, buttonTitle})=>{
    return(
    <>
      <form onSubmit={addPerson}>
        <FormPart inputName={'name'} value={newName} onChange={handleNameChange}/>
        <FormPart inputName={'number'} value={newNumber} onChange={handleNumberChange}/>
        <div>
          <button type="submit">{buttonTitle}</button>
        </div>
      </form>
    </>
    );
}
export default PersonForm