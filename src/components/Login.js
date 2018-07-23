import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../logo.svg';
import '../styles/App.css';
import { handleSetAuthedUser } from '../actions/authedUser';
import '../styles/Login.css';

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
    const { userArray, users } = this.props;
    return (
      <div className='login_container'>
        <div className='login_header'>
          <span><h1>Welcome to my Would You Rather App!</h1></span>
          <p>Please sign in to continue</p>
        </div>
        <div className='login_description'>
          <img src={logo} className='App-logo' alt='logo' />
          <h3>Sign in</h3>
        </div>
        <form className='login_form'>
          <select defaultValue='chooseAvatar' className='login_select' onChange={this.handleChange}>
            <option value='chooseAvatar' className='login_option' disabled>Choose Avatar</option>
            {userArray.map((user) => {
              return (
                <option
                  key={users[user].id}
                  value={users[user].id}
                  className='login_option'
                >{users[user].name}</option>
              );
            })}
          </select>
          <button
            type='submit'
            onClick={this.handleAuthedUser}
            disabled={this.state.authedUser === ''}
            className='login_button'>Sign In</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userArray: Object.keys(users),
    users
  }
}

export default connect(mapStateToProps)(Login);


// <div key={users[user].id} onMouseEnter={this.handleChange.bind(this)} className='logo_and_name'>
//                 <img src={users[user].avatarURL} alt='avatar' className='avatar'/>
//                 <h1>{users[user].name}</h1>
//               </div>