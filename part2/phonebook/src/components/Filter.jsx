const Filter = ({search, handleSearchChange})=>{
    return(
    <>
        <form>
            <label htmlFor="contact-search"></label>
            <input type='search' 
            id="contact-search"
            placeholder='search person by name' 
            value={search} 
            onChange={handleSearchChange}/>
        </form>
    </>
    );
}
export default Filter