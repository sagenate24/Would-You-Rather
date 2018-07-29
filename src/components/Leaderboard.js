import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/SharedStyles.css';
import FadeIn from 'react-fade-in';
import * as trophie from '../Images/trophie.png';
import * as trophie2 from '../Images/trophie2.png';
import * as trophie3 from '../Images/trophie3.png';

class Leaderboard extends Component {
  chooseTrophey(id) {
    if (id === this.props.users[0].id) {
      return trophie;
    } else if (id === this.props.users[1].id) {
      return trophie2;
    } else if (id === this.props.users[2].id) {
      return trophie3;
    } else { return null; }
  }

  render() {
    const { users } = this.props;

    return (
      <FadeIn delay='100' transitionDuration='400'>
        <div className='leader-container'>
          <div className='container-header'>
            <p className='leader-text-header'>Leaderboard <span role='img' style={{ paddingLeft: '5px' }} aria-label='Trophie'>🏆</span></p>
          </div>
          {users.map((user) => {
            return (
              <div key={user.id} className='leaderboard-body'>
                <img className='leader-trophey' src={this.chooseTrophey(user.id)} alt='rank' />
                <div className='leader-avatar'>
                  <img src={user.avatarURL} alt='avatar' className='avatar-leaderboard' />
                </div>
                <div className='leader-info'>
                  <h3>{user.name}</h3>
                  <p> questions asked: <span>{user.questionsAsked}</span></p>
                  <p>questions answered: <span>{user.questionsAnswered}</span></p>
                </div>
                <div className='leader-score'>
                  <div className='leader-score-header'><p>Score</p></div>
                  <span className='leader-total-number'>{user.total}</span>
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users).map((user) => {
      const { questions, answers } = user;

      return {
        ...user,
        questionsAsked: questions.length,
        questionsAnswered: Object.keys(answers).length,
        total: Object.keys(answers).length + questions.length,
      }
    }).sort((a, b) => b.total - a.total)
  }
}

export default connect(mapStateToProps)(Leaderboard);
