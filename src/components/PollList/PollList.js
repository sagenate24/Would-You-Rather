import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnsweredPollQuestion from '../AnsweredPoll/AnsweredPoll';
import './PollList.css';

class PollList extends Component {

  handleChange = (e) => {
    e.preventDefault();
    alert(e.target.value);
  }

  render() {
    console.log(this.props)
    return (
      <div className='poll_list_container'>
        <h3>Questions</h3>
        <select onChange={this.handleChange}>
          <option value='awnseredPolls'>Answered Polls</option>
          <option value='unawnseredPolls'>Unanswered Polls</option>
        </select>
        <br />
        <br />
        <ul className='poll_list'>
          {this.props.questionIds.map((id) => (
            <li key={id}>
              <AnsweredPollQuestion id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ questions, users }) {
  return {
    questionIds: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  }
}

export default connect(mapStateToProps)(PollList);