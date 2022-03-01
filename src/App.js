import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddTodo from './components/add-todo';
import TodosList from './components/todos-list';
import Login from './components/login';
import Signup from './components/signup';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Navbar';

import TodoDataService from './services/todos';

function App() {
  // React.useState hook that lets us add some local state to functional components. 
  // useState declares a variable. 
  // React preserves this state between re-renders of the component
  // assigning the current state user value to user, and the function to update it to setUser.
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState('');

  // The login function will be called from the Login component
  // and the login route passes the login function as a prop
  async function login(user = null) {
    // default user to null
    TodoDataService.login(user)
      .then(response => {        
        setToken(response.data.token);     
        setUser(user.username);
        // login API returns an authorization token
        // which we set to the token state variable
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
        setError('');
      })
      // store the token and username in local storage 
      // so that a user will not have to constantly re-login as
      // navigating away and returning to application
      .catch( e => {
        console.log('login', e);
        setError(e.toString());       
      });
  }

  async function logout() {
    setToken('');
    setUser('');
    localStorage.setItem('token', '');
    localStorage.setItem('user', ''); 
  }

  async function signup(user = null) {
    // default user to null
    TodoDataService.signup(user)
      .then(response =>{
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
      })
      .catch( e =>{
        console.log(e);
        setError(e.toString());
      })
  }
  
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>TodosApp</Navbar.Brand>
          <Nav className="me-auto">
            <Container>
              <Link className="nav-link" to={"/todos"}>Todos</Link>
              { user ? (
                <Link className="nav-link" onClick={logout}>Logout ({user})</Link>
              ) : (
                <>
                  <Link className="nav-link" to={"/login"}>Login</Link>
                  <Link className="nav-link" to={"/signup"}>Sign Up</Link>
                </>
              )}
            </Container>
          </Nav>
        </div>
      </Navbar>
      
      <div className="container mt-4">
        <Switch>	
          <Route exact path={["/", "/todos"]} render={(props) =>
            <TodosList {...props} token={token} />
          }>
          </Route>
          <Route path="/todos/create" render={(props)=> 
            <AddTodo {...props} token={token} />
          }>
          </Route>
          <Route path="/todos/:id/" render={(props)=> 
            <AddTodo {...props} token={token} />
          }>
          </Route>
          <Route path="/login" render={(props)=> 
            <Login {...props} login={login} />
          }>
          </Route>
          <Route path="/signup" render={(props)=> 
            <Signup {...props} signup={signup} />
          }>
          </Route>
        </Switch>
      </div>
      
      <footer className="text-center text-lg-start 
        bg-light text-muted mt-4">
        <div className="text-center p-4">
          © Copyright - <a 
            target="_blank" 
            className="text-reset fw-bold text-decoration-none" 
            href="https://www.linkedin.com/in/thuc-nguyen-b0327313b/"
          >
            Thuc Nguyen
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
