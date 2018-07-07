import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question'

class Dashboard extends Component {
  state = {
    answered: false
  }

  handleChange = (e) => {
    e.preventDefault()
    if (e.target.value === 'answered') {
      this.setState({
        answered: true
      })
    } else if (e.target.value === 'unanswered') {
      this.setState({
        answered: false
      })
    }
  }

  render() {
    console.log(this.props)
    const { questionIds, userawnser } = this.props;
    return (
      <div>
        <h3>Your Questions</h3>
        <select onChange={this.handleChange}>
          <option value='unanswered'>Unanswered</option>
          <option value='answered'>Answered</option>
        </select>
        <ul>
          {!this.state.answered
            ? (
              questionIds.map((id) => {
                if (userawnser[0] === id || userawnser[1] === id) {
                  return (
                    <li key={id}>
                      <Question id={id} />
                    </li>
                  )
                }
              })
            ) : (
              questionIds.map((id) => {
                if (userawnser[0] !== id && userawnser[1] !== id) {
                  // console.log(id)
                  return (
                    <li key={id}>
                      <Question id={id} />
                    </li>
                  )
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
    authedUser,
    userawnser: Object.keys(userAwnsers),
    questionIds: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  }
}

export default connect(mapStateToProps)(Dashboard);