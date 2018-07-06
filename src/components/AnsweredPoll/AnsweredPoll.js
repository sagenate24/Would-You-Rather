import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatPollQuestion } from '../../utils/helpers';
import './AnsweredPoll.css';

class AnsweredPollQuestion extends Component {
  render() {
    return (
      <div className='answered_poll'>
        {this.props.question.optionOneAuth || this.props.question.optionTwoAuth
          ? (
            <div>
              <div>
                <h5>{this.props.question.id} asks: </h5>
              </div>
              <div className='poll_question'>
                <img src={this.props.question.avatar} className='avatar' alt='avatar' />
                <h3>Would You Rather</h3>
                <span><p>{this.props.question.optionOne.text}</p><h3>OR</h3><p>{this.props.question.optionTwo.text}</p></span>
              </div>
            </div>
          ) : (
            <div></div>
          )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  // const answeredPoll = Object.keys(users)
  // .sort((a,b) => users[b].timestamp - users[a].timestamp)

  return {
    authedUser,
    users,
    question: formatPollQuestion(question, users[question.author], authedUser)
  }
}

export default connect(mapStateToProps)(AnsweredPollQuestion);