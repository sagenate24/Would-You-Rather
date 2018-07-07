import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatPollQuestion } from '../utils/helpers';

class PollQuestion extends Component {
  render() {
    const { author, question, id } = this.props;
    console.log(this.props)

    return (
      <div>
        <img src={author.avatarURL} alt={'avatar'} height={'100px'}/>
        <div>
          <p>{author.name} asks:</p>
          <h3>Would You Rather?</h3>
        </div>
        <div>
          <select>
            <option></option>
            <option></option>
          </select>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params

  return {
    id,
    question : questions[id],
    author: users[questions[id].author]
  }
}

export default connect(mapStateToProps)(PollQuestion);