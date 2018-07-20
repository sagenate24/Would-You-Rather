import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../logo.svg';
import './App.css';
import { handleSetAuthedUser } from '../actions/authedUser';

class Login extends Component {
  state = {
    authedUser: ''
  }

  handleChange = (e) => {
    this.setState({ authedUser: e.target.value });
  }

  handleAuthedUser = (e) => {
    e.preventDefault();
    this.props.dispatch(handleSetAuthedUser(this.state.authedUser));
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
        <form>
          <select defaultValue='chooseAvatar' onChange={this.handleChange}>
            <option value='chooseAvatar' disabled>Choose Avatar</option>
            <option value='sarahedo'>Sarah Edo</option>
            <option value='tylermcginnis'>Tyler McGinnis</option>
            <option value='johndoe'>John Doe</option>
          </select>
          <button type='submit' onClick={this.handleAuthedUser}>Sign In</button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);
