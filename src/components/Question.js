import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatPollQuestion } from '../utils/helpers';
import { Link, withRouter } from 'react-router-dom';

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
      <div>
        <h5>{author.name} asks:</h5>
        <h3>Would You Rather</h3>
        <img src={avatar} alt='avatar' height={'80px'} />
        <p>{this.handleStringLength(optionOne.text)}</p>
        <Link to={`/question/${id}`}>View Poll</Link>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  // const userAwnsers = users[authedUser].answers

  return {
    // authedUser,
    // id,
    // userawnser: Object.keys(userAwnsers),
    question: formatPollQuestion(question, users[question.author], authedUser)
  }
}

export default withRouter(connect(mapStateToProps)(Question));