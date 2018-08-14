import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/shared';
import { withRouter } from 'react-router-dom';
import '../styles/SharedStyles.css';
import * as CheckMark from '../Images/checkMark.png';
import * as wyrBanner from '../Images/wyrBanner.png';
import FadeIn from 'react-fade-in';

import Results from './Results';
import NoMatch from './NoMatch';

class PollQuestion extends Component {
  state = {
    answer: '',
    wyrClassName: 'wyr-initial',
  }

  componentDidMount() {

    setTimeout(() => {
      this.setState(() => ({
        wyrClassName: 'wyr-banner-transition'
      }));
    }, 1);
  }

  handleChange = (option) => {

    this.setState(() => ({
      answer: option
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch, question, authedUser } = this.props;
    const { answer } = this.state;

    dispatch(handleAnswerQuestion({
      authedUser,
      qid: question.id,
      answer
    }));
  }

  goToHome = () => {
    this.props.history.push('/');
  }

  render() {
    if (this.props.question === null) {
      return (<NoMatch />);
    }

    const { author, question, id, userAnswer } = this.props;
    const { answer, wyrClassName, resultsPage } = this.state;

    const questionAwnsered = userAnswer.filter((answer) => answer === id);

    return (
      <FadeIn delay='100'>
        <div className='container'>
          <div className='container-header'>
            <img src={author.avatarURL} alt={'avatar'} className='avatar-medium' />
            <p>{author.name} asks:</p>
          </div>
          <div
            className='close-poll'
            onClick={this.goToHome}>
            CLOSE
          </div>
          {questionAwnsered.length > 0
            ?
            <div className='results-padding'>
              <Results key={id} id={id} />
            </div>
            :
            <div>
              <img src={wyrBanner} alt='wyrbanner' className={wyrClassName} />
              <FadeIn delay='700' transitionDuration='600'>
                <div className='container-body' style={{ color: '#fff' }}>
                  <span
                    onClick={() => { this.handleChange('optionOne') }}
                    className={answer === 'optionOne' ? 'pollQ-option-active' : 'pollQ-option-one'}>
                    <img
                      src={CheckMark}
                      alt='checkMark'
                      className={answer === 'optionOne' ? 'check-mark' : 'not-active'} />
                    {question.optionOne.text}?
                  </span>
                  <span className='question-or'>OR</span>
                  <span
                    onClick={() => { this.handleChange('optionTwo') }}
                    className={answer === 'optionTwo' ? 'pollQ-option-active' : 'pollQ-option-two'}>
                    <img
                      src={CheckMark}
                      alt='checkMark'
                      className={answer === 'optionTwo' ? 'check-mark' : 'not-active'} />
                    {question.optionTwo.text}?
                  </span>
                  <button
                    onClick={this.handleSubmit}
                    className={answer === '' ? 'button-not-active' : 'button'}
                    disabled={answer === '' || resultsPage === true}
                  >Submit</button>
                </div>
              </FadeIn>
            </div>
          }
        </div>
      </FadeIn>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const userAnswers = users[authedUser].answers;

  if (question) {
    return {
      id,
      authedUser,
      userAnswer: Object.keys(userAnswers),
      question,
      author: users[question.author],
    }
  } else {
    return {
      question: null,
    }
  }
}

export default withRouter(connect(mapStateToProps)(PollQuestion));
