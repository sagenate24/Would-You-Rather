import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
// import { handleSetAuthedUser } from '../actions/authedUser';
// import { handleInitialData } from '../actions/shared';

class Login extends Component {
  handleAuthedUser(e) {
    e.preventDefault();
    // this.props.dispatch(handleSetAuthedUser(e.target.value))
  }
  render() {
    return (
      <div>
        <div>
          <h3>Welcome To Would You Rather App!</h3>
          <p>Please sign in to continue</p>
        </div>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>Sign in</h1>
        <select onChange={this.handleAuthedUser}>
        <option disabled>Choose Avatar</option>
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