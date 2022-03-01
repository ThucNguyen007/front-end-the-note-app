import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
 
const Login = props => {
  /*
  The username and password state variables keep track of what a user has
  entered into the login form fields
  username and password are default set to empty strings with useState(“ ”)
  */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 

  const onChangeUsername = e => {
    const username = e.target.value;
    setUsername(username);
  }
  const onChangePassword = e => {
    const password = e.target.value;
    setPassword(password);
  }
  // call the login function in App.js and set App’s user state
  // If necessary, passing on the logged-in user to other components
  const login = () => {
    props.login({username: username, password: password});
    props.history.push('/');
  }  

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter username" 
            value={username} 
            onChange={onChangeUsername}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={onChangePassword}
          />
        </Form.Group>        
        <Button variant="primary" onClick={login}>
          Login
        </Button>
      </Form>        
    </Container>
  )
}

export default Login;