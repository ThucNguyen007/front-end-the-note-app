// axios for sending get, post, put and delete requests.
import axios from 'axios';

class TodoDataService {
  /* 
  getAll returns all the todos for a given use, 
  attach the token as our authorization header for axios request
  Then put the API URL into the axios.get method
  returns a promise with the todos retrieved from the database 
  and set it to the todos state variable
  */
  getAll(token) {      
    axios.defaults.headers.common["Authorization"] = "Token " + token;      
    return axios.get('http://localhost:8000/api/todos/');
  }
  /*
  attach the token and use the same API URL but because creating a todo 
  by using the axios.post method
  Note how with the same TodoListCreate API endpoint, by sending different HTTP
  types (get, post), that can perform different operations.
  */
  createTodo(data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.post("http://localhost:8000/api/todos/", data);
  }
  /* 
  use the axios.put method and append the todo’s id at the end of the API URL
  endpoint. 
  */
  updateTodo(id, data, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(`http://localhost:8000/api/todos/${id}`, data);
  }
  // same as todoretrieveupdatedestroy endpoint, performs different operations
  // different http types
  deleteTodo(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.delete(`http://localhost:8000/api/todos/${id}`);
  }
  completeTodo(id, token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(`http://localhost:8000/api/todos/${id}/complete`);    
  }   
  // call TodoDataService’s login method which calls the Django API login endpoint
  login(data) {
    return axios.post("http://localhost:8000/api/login/", data);
  }   

  signup(data) {
    return axios.post("http://localhost:8000/api/signup/", data);
  }      
}

export default new TodoDataService();