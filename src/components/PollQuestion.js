import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/shared';
import '../styles/PollQuestion.css';
import '../styles/SharedStyles.css';
import * as CheckMark from '../Images/checkMark.png';
import * as wyrBanner from '../Images/wyrBanner.png';

import Results from './Results';
import NoMatch from './NoMatch';

class PollQuestion extends Component {
  state = {
    answer: '',
  }

  componentDidMount() {
    this.handleInitialRender();
  }

  handleChange = (option) => {
    this.setState({ answer: option });
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

    this.setState(() => ({
      resultsPage: true
    }));
  }

  handleInitialRender() {
    if (this.props && this.props.userAnswer) {
      const questionAwnsered = this.props.userAnswer.filter((answer) => answer === this.props.id);

      if (questionAwnsered.length > 0) {
        this.setState(() => ({
          resultsPage: true
        }));
      }
    } else {
      this.setState(() => ({
        resultsPage: false
      }));
    }
  }

  render() {
    if (this.props.question === null) {
      return (<NoMatch />);
    }
    else {
      const { author, question, id, loadingBar } = this.props;
      const { answer } = this.state;

      return (
        <div className='container'>
          <div className='container-header'>
            <img src={author.avatarURL} alt={'avatar'} className='avatar-medium' />
            <p>{author.name} asks:</p>
          </div>
          {this.state.resultsPage && loadingBar.default === 0
            ?
            <div>
              <h3>Results:</h3>
              <Results key={id} id={id} />
            </div>
            :
            <div>
              <img src={wyrBanner} alt='wyrbanner' className='wyr-banner'/>
              <div className='container-body' style={{ color: '#fff' }}>
                <span
                  onClick={() => { this.handleChange('optionOne') }}
                  className={this.state.answer === 'optionOne' ? 'pollQ-option-active' : 'pollQ-option-one'}
                >
                  <img
                    src={CheckMark}
                    alt='checkMark'
                    className={answer === 'optionOne' ? 'check-mark' : 'not-active'} />
                  {question.optionOne.text} ?
                  </span>
                <span className='question-or'>OR</span>
                <span
                  onClick={() => { this.handleChange('optionTwo') }}
                  className={this.state.answer === 'optionTwo' ? 'pollQ-option-active' : 'pollQ-option-two'}
                >
                  <img
                    src={CheckMark}
                    alt='checkMark'
                    className={answer === 'optionTwo' ? 'check-mark' : 'not-active'} />
                  {question.optionTwo.text} ?
                  </span>
                <button
                  onClick={this.handleSubmit}
                  className={answer.length > 0 ? 'button' : 'not-active'}
                  disabled={answer === ''}
                >Submit</button>
              </div>

            </div>}
        </div>
      );
    }
  }
}

function mapStateToProps({ authedUser, questions, users, loadingBar }, props) {

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
      loadingBar,
    }
  } else {
    return { question: null }
  }
}

export default connect(mapStateToProps)(PollQuestion);
