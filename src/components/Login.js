import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';

class Login extends Component {
  render() {
    return (
      <div>
        <div>
          <h3>Welcome To Would You Rather App!</h3>
          <p>Please sign in to continue</p>
        </div>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>Sign in</h1>
        <select>
          <option value='sarahedo'>Sarah Edo</option>
          <option value='tylermcginnis'>Tyler McGinnis</option>
          <option value='johndoe'>John Doe</option>
        </select>
        <button>Sign In</button>
      </div>
    );
  }
}

export default Login;