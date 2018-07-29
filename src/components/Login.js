import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../logo.svg';
import { handleSetAuthedUser } from '../actions/authedUser';
import '../styles/Login.css';
import '../styles/App.css';
import '../styles/SharedStyles.css';
import * as wyrBanner from '../Images/wyrBanner.png';
import FadeIn from 'react-fade-in';

class Login extends Component {
  state = {
    authedUser: '',
  }

  handleChange = (e) => {
    this.setState({ authedUser: e.target.value });
  }

  handleAuthedUser = (e) => {
    e.preventDefault();
    this.props.dispatch(handleSetAuthedUser(this.state.authedUser));
  }

  render() {
    const { userArray, users } = this.props;

    return (
      <FadeIn delay='100' transitionDuration='400'>
        <div className='container'>
          <div className='login-header'>
            <span><h1>Welcome to my <img src={wyrBanner} className='wyr-banner-login' alt='wyr' /> app!</h1></span>
            <p>Please sign in to continue</p>
          </div>
          <div className='login-description'>
            <img src={logo} className='App-logo' alt='logo' />
            <h3>Sign in</h3>
          </div>
          <form className='login-form'>
            <select defaultValue='chooseAvatar' className='login-select' onChange={this.handleChange}>
              <option value='chooseAvatar' className='login-option' disabled>Choose Avatar</option>
              {userArray.map((user) => {
                return (
                  <option
                    key={users[user].id}
                    value={users[user].id}
                    className='login-option'
                  >{users[user].name}</option>
                );
              })}
            </select>
            <button
              type='submit'
              onClick={this.handleAuthedUser}
              disabled={this.state.authedUser === ''}
              className='login-button'>Sign In</button>
          </form>
        </div>
      </FadeIn>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userArray: Object.keys(users),
    users,
  }
}

export default connect(mapStateToProps)(Login);
