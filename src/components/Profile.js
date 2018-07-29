import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleLogOutUser } from '../actions/authedUser';
import '../styles/Profile.css';
import '../styles/SharedStyles.css';
import Popup from 'reactjs-popup';

class Profile extends Component {
  handleLogOut = () => {
    this.props.dispatch(handleLogOutUser());
  }

  render() {
    const { authedUser, users } = this.props;

    return (
      <div className='profile'>
        <p className='profile-name'>{users[authedUser].name}</p>
        <img src={users[authedUser].avatarURL} alt='avatar' className='avatar-small-profile' />
        <Popup
          contentStyle={{ padding: '5px', border: 'none', width: '80px', cursor: 'default' }}
          trigger={<p className='logout-trigger'>Logout</p>}
          position='bottom right'
          offset='1'
        >
          {close => (
            <div className='popUp-info'>
              <p style={{ fontSize: '9px' }}>Are you sure you want to Logout?</p>
              <button
                className='button-cancel'
                onClick={() => {
                  close();
                }}>cancel</button>
              <button
                className='button-yes'
                onClick={() => {
                  close();
                  this.handleLogOut();
                }}>yes</button>
            </div>
          )}
        </Popup>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  }
}

export default connect(mapStateToProps)(Profile);
