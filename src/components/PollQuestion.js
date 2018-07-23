import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/shared';

import Results from './Results';
import NoMatch from './NoMatch';

class PollQuestion extends Component {
  state = {
    answer: '',
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      answer: e.target.value
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
            <div>
              <img src={author.avatarURL} alt={'avatar'} height={'100px'} />
              <div>
                <p>{author.name} asks:</p>
                <h3>Would You Rather?</h3>
              </div>
              <div>
                <Results key={id} id={id} />
              </div>
            </div>
            :
            <div>
              <img src={author.avatarURL} alt={'avatar'} height={'100px'} />
              <div>
                <p>{author.name} asks:</p>
                <h3>Would You Rather?</h3>
              </div>
              <div>
                <form onSubmit={this.handleSubmit}>
                  <select defaultValue='none' onChange={this.handleChange}>
                    <option disabled value='none'>?</option>
                    <option value='optionOne'>{question.optionOne.text}</option>
                    <option disabled>OR</option>
                    <option value='optionTwo'>{question.optionTwo.text}</option>
                  </select>
                  <button type='submit' disabled={this.state.answer === ''}>Submit</button>
                </form>

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
