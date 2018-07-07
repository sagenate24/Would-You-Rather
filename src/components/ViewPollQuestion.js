import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatPollQuestion } from '../utils/helpers';

class PollQuestion extends Component {
  state = {
    value: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    alert(this.state.value);
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const { author, question, id } = this.props;

    return (
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
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params

  return {
    id,
    question: questions[id],
    author: users[questions[id].author]
  }
}

export default connect(mapStateToProps)(PollQuestion);