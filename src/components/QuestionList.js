import React, { Component } from 'react';
import { connect } from 'react-redux';

import Question from './Question';

class QuestionList extends Component {
  state = {
    answered: false
  }

  handleChange = (e) => {
    e.preventDefault()
    if (e.target.value === 'answered') {
      this.setState({
        answered: true
      });
    } else if (e.target.value === 'unanswered') {
      this.setState({
        answered: false
      });
    }
  }

  render() {
    const { questionIds, userawnser } = this.props;
    return (
      <div>
        <h3>Your Questions</h3>
        <select onChange={this.handleChange}>
          <option value='unanswered'>Unanswered</option>
          <option value='answered'>Answered</option>
        </select>
        <ul>
          {this.state.answered
            ? (
              questionIds.map((id) => {
                let answeredID = userawnser.find((answer) => {
                  if (answer === id) { return id; }
                });

                if (answeredID === id) {
                  return (
                    <li key={id}>
                      <Question id={id} />
                    </li>
                  );
                }
              })
            ) : (
              questionIds.map((id) => {
                let unansweredID = userawnser.find((answer) => {
                  if (answer === id) { return id; }
                });
                if (unansweredID !== id) {
                  return (
                    <li key={id}>
                      <Question id={id} />
                    </li>
                  );
                }
              }
              ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  const userAwnsers = users[authedUser].answers

  return {
    userawnser: Object.keys(userAwnsers),
    questionIds: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  }
}

export default connect(mapStateToProps)(QuestionList);
