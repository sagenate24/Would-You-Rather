import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Leaderboard.css';

class Leaderboard extends Component {
  organizeLeaderBoard(a, b) {
    let total = a + b;
    return total;
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
                <p>RANK: {this.organizeLeaderBoard(user.questionsAsked, user.questionsAnswered)}</p>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const userDetails = Object.keys(users).map((user) => {
    const userObject = {
      id: users[user].id,
      avatarURL: users[user].avatarURL,
      name: users[user].name,
      questionsAsked: users[user].questions.length,
      questionsAnswered: Object.keys(users[user].answers).length,
    }

    const rank = userObject.questionsAsked + userObject.questionsAnswered;
    userObject.userRank = rank;
    return (userObject);
  }).sort((a, b) => (
    b.userRank - a.userRank
  ));

  return {
    userDetails,
  }
}

export default connect(mapStateToProps)(Leaderboard);
