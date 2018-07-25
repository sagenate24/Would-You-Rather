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
        <p>{users[authedUser].name}</p>
        <img src={users[authedUser].avatarURL} alt='avatar' className='avatar-small' />
        <Popup
          contentStyle={{ padding: "0px", border: "none", width: '95px', cursor: 'default' }}
          // on='hover'
          trigger={<p className='logout_trigger'>Logout</p>}
          position='bottom center'
          offset='1'
        >
          {close => (
            <div className='popUp-info'>
              <p style={{ fontSize: '10px' }}>Are you sure you want to Logout?</p>
              <button
                className="button-cancel"
                onClick={() => {
                  close();
                }}>cancel</button>
              <button
                className="button-yes"
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
