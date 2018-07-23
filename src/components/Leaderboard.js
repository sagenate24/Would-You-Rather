import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Leaderboard.css';

class Leaderboard extends Component {
  organizeLeaderBoard(id) {
    if (id === this.props.userDetails[0].id) {
      return '1';
    } else if (id === this.props.userDetails[1].id) {
      return '2';
    } else if (id === this.props.userDetails[2].id) {
      return '3';
    } else { return null; }
  }
  
  render() {
    const { userDetails } = this.props;
    return (
      <div>
        <h1>Leaderboard</h1>
        {userDetails.map((user) => {
          return (
            <div key={user.id} className='leaderboard'>
              <img src={user.avatarURL} alt='avatar' className='avatar' />
              <div className='leaderboard_description'>
                <h3>{user.name}</h3>
                <p> questions asked: {user.questionsAsked}</p>
                <p>questions answered: {user.questionsAnswered}</p>
                <p>RANK: {this.organizeLeaderBoard(user.id)}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  //create a new array of objects for each user created
  const userDetails = Object.keys(users).map((user) => {
    const userObject = {
      id: users[user].id,
      avatarURL: users[user].avatarURL,
      name: users[user].name,
      questionsAsked: users[user].questions.length,
      questionsAnswered: Object.keys(users[user].answers).length,
    }
    const total = userObject.questionsAsked + userObject.questionsAnswered;
    userObject.total = total;
    return (userObject);

  }).sort((a, b) => (
    b - a
  ));

  return {
    userDetails,
  }
}

export default connect(mapStateToProps)(Leaderboard);
