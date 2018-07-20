import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAwnserQuestion } from '../actions/questions';
import { handleAddUserVotes } from '../actions/users';

import Results from './Results';

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

    dispatch(handleAwnserQuestion({
      authedUser,
      qid: question.id,
      answer
    }));

    dispatch(handleAddUserVotes({
      authedUser,
      qid: question.id,
      answer
    }));

    this.setState(() => ({
      questionAwnseredMaybe: true
    }));
    // Todo: Show Results when question is answered
  }

  componentDidMount() {
    this.handleInitialRender();
  }

  handleInitialRender() {
    const questionAwnsered = this.props.userAnswer.filter((answer) => answer === this.props.id)

    if (questionAwnsered.length > 0) {
      this.setState(() => ({
        questionAwnseredMaybe: true
      }))
    } else {
      this.setState(() => ({
        questionAwnseredMaybe: false
      }))
    }
  }

  render() {
    const { author, question, id } = this.props;

    return (
      <div>
        {this.state.questionAwnseredMaybe
          ?
          <div>
          <img src={author.avatarURL} alt={'avatar'} height={'100px'} />
          <div>
            <p>{author.name} asks:</p>
            <h3>Would You Rather?</h3>
          </div>
          <div>
            <Results key={id} id={id}/>
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
                {/* Todo: disable submit button when this.state.answer === '' */}
                <button type='submit'>Submit</button>
              </form>

            </div>
          </div>
        }

      </div>

    )
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const userAnswers = users[authedUser].answers;

  return {
    id,
    authedUser,
    userAnswer: Object.keys(userAnswers),
    // users,
    question,
    // questions,
    author: users[question.author]
  }
}

export default connect(mapStateToProps)(PollQuestion);