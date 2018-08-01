import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import '../styles/Question.css';
import '../styles/SharedStyles.css';
import FadeIn from 'react-fade-in';

class Question extends Component {
  handleStringLength(str) {
    const ending = '...';

    if (str.length > 21) {
      return str.substring(0, 21 - ending.length) + ending;
    } else {
      return str;
    }
  }

  render() {
    const { name, avatarURL, id, optionOne } = this.props;

    return (
      <FadeIn delay='200'>
        <div className='question'>
          <div className='question-header'>
            <span>{name} asks:</span>
          </div>
          <div className='question-body'>
            <img src={avatarURL} alt='avatar' className='avatar-large' />
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

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];
  const { name, avatarURL } = users[question.author];

  return {
    ...question,
    name,
    avatarURL,
  }
}

export default withRouter(connect(mapStateToProps)(Question));
