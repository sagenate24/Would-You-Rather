import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/shared';
import '../styles/PollQuestion.css';

import Results from './Results';
import NoMatch from './NoMatch';

class PollQuestion extends Component {
  state = {
    answer: '',
  }

  handleChange = (option) => {
    console.log(option)
    this.setState({
      answer: option
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, question, authedUser } = this.props;
    const { answer } = this.state;

    // Todo: add both of these to shared actions
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
    const questionAwnsered = this.props.userAnswer.filter((answer) => answer === this.props.id);

    if (questionAwnsered.length > 0) {
      this.setState(() => ({
        resultsPage: true
      }))
    } else {
      this.setState(() => ({
        resultsPage: false
      }))
    }
  }

  render() {
    if (this.props.question === null) {
      return (<NoMatch />);
    }
    else {
      const { author, question, id } = this.props;

      return (
        <div>
          {this.state.resultsPage
            ?
            <div className='pollQuestion'>
              <div className='pollQuestion_author_header'>
                <img src={author.avatarURL} alt={'avatar'} className='pollQuestion_avatar' />
                <p>{author.name} asks:</p>
              </div>
              <div className='pollQuestion_body_container'>
                <h3>Would You Rather?</h3>
                <Results key={id} id={id} />
              </div>
            </div>
            :
            <div className='pollQuestion'>
              <div className='pollQuestion_author_header'>
                <img src={author.avatarURL} alt={'avatar'} className='pollQuestion_avatar' />
                <p>{author.name} asks:</p>
              </div>
              <div className='pollQuestion_body_container'>
                  <h3>Would You Rather</h3>
                <div className='pollQuestion_body'>
                  <span onClick={() => { this.handleChange('optionOne') }} className='pollQuestion_optionA'>{question.optionOne.text} ?</span>
                  <span className='pollQuestion_or'>OR</span>
                  <span onClick={() => { this.handleChange('optionTwo') }} className='pollQuestion_optionB'>{question.optionTwo.text} ?</span>
                </div>
                <button onClick={this.handleSubmit} disabled={this.state.answer === ''}>Submit</button>
              </div>
            </div>}
        </div>);
    }
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
    return { question: null }
  }
}

export default connect(mapStateToProps)(PollQuestion);
