import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatPollQuestion } from '../utils/helpers';
import { Link, withRouter } from 'react-router-dom';
import '../styles/Question.css';

class Question extends Component {
  handleStringLength(str) {
    const ending = '...';

    if (str.length > 11) {
      return str.substring(0, 11 - ending.length) + ending;
    } else { return str; }
  }

  render() {
    const { author, avatar, id, optionOne } = this.props.question;
    return (
      <div className='question'>
        <div className='question_header'>
          <span>{author.name} asks:</span>
        </div>
        <div className='question_body'>
          <img src={avatar} alt='avatar' className='question_avatar' />
          <div className='question_info'>
            <span>Would You Rather</span>
            <p>{this.handleStringLength(optionOne.text)}</p>
            <Link className='question_link' to={`/questions/${id}`}>View Poll</Link>
            {/* <button onClick={() => this.handleRedirect}>View Poll</button> */}
          </div>


        </div>
      </div>
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
