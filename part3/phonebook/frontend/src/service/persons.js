import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAll =()=>{
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
}
const personPost=(personObject)=>{
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}
const personRemove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
};
const personUpdate = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
};
  
export default { getAll, personPost, personRemove, personUpdate }