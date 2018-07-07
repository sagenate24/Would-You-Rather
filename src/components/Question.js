import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatPollQuestion } from '../utils/helpers';
import { Link, withRouter } from 'react-router-dom';

class Question extends Component {

  handleStringLength(str) {
    const length = 11;
    const ending = '...';
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  }

  render() {
    const { author, avatar, id, optionOne } = this.props.question;
    return (
      <div>
        <h5>{author.name} asks:</h5>
        <h3>Would You Rather</h3>
        <img src={avatar} alt='avatar' height={'80px'} />
        <p>{this.handleStringLength(optionOne.text)}</p>
        <span><Link to={`/question/${id}`}>View Poll</Link></span>
      </div>
    );

  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const userAwnsers = users[authedUser].answers

  return {
    authedUser,
    userawnser: Object.keys(userAwnsers),
    question: formatPollQuestion(question, users[question.author], authedUser)
  }
}

export default withRouter(connect(mapStateToProps)(Question));