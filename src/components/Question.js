import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatPollQuestion } from '../utils/helpers';
import { Link, withRouter } from 'react-router-dom';
import '../styles/Question.css';
import '../styles/SharedStyles.css';
import FadeIn from 'react-fade-in';

class Question extends Component {
  handleStringLength(str) {
    const ending = '...';

    if (str.length > 15) {
      return str.substring(0, 15 - ending.length) + ending;
    } else { return str; }
  }

  render() {
    const { author, avatar, id, optionOne } = this.props.question;

    return (
      <FadeIn delay='200' transitionDuration='600'>
        <div className='question'>
          <div className='question-header'>
            <span>{author.name} asks:</span>
          </div>
          <div className='question-body'>
            <img src={avatar} alt='avatar' className='avatar-large' />
            <div className='question-info'>
              <span>Would You Rather</span>
              <p>{this.handleStringLength(optionOne.text)}</p>
              <Link className='question-link' to={`/questions/${id}`}>{this.props.btnText}</Link>
            </div>
          </div>
        </div>
      </FadeIn>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];

  return {
    question: formatPollQuestion(question, users[question.author], authedUser)
  }
}

export default withRouter(connect(mapStateToProps)(Question));
