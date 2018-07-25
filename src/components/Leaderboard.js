import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/SharedStyles.css';
import * as trophie from '../Images/trophie.png';
import * as trophie2 from '../Images/trophie2.png';
import * as trophie3 from '../Images/trophie3.png';

class Leaderboard extends Component {
  starColor(id) {
    if (id === this.props.userDetails[0].id) {
      return trophie;
    } else if (id === this.props.userDetails[1].id) {
      return trophie2;
    } else if (id === this.props.userDetails[2].id) {
      return trophie3;
    } else { return null; }
  }

  render() {
    const { userDetails } = this.props;
    return (
      <div className='container'>
        <div className='container-header'>
          <p style={{ marginLeft: '20px' }}>Leaderboard <span role='img' style={{ paddingLeft: '5px' }} aria-label='Trophie'>🏆</span></p>
        </div>
        {userDetails.map((user) => {
          return (
            <div key={user.id} className='leaderboard-body'>
              <img className='leader_star' src={this.starColor(user.id)} alt='rank' />
              <div className='leader-avatar'>
                <img src={user.avatarURL} alt='avatar' className='avatar-large' />
              </div>
              <div className='leader-info'>
                <h3>{user.name}</h3>
                <p> questions asked: <span>{user.questionsAsked}</span></p>
                <p>questions answered: <span>{user.questionsAnswered}</span></p>
              </div>
              <div className='leader-score'>
                <div className='leader-score-header'><p>Score</p></div>
                <span>{user.questionsAnswered + user.questionsAsked}</span>
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

  }).sort((a, b) => (b.total - a.total));

  return {
    userDetails,
  }
}

export default connect(mapStateToProps)(Leaderboard);
