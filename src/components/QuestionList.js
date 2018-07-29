import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/SharedStyles.css';

import Question from './Question';
// import FadeIn from 'react-fade-in';

class QuestionList extends Component {
  state = {
    answered: false,
  }

  handleChange = (info) => {
    if (info === 'answered') {
      this.setState({ answered: true });
    } else if (info === 'unanswered') {
      this.setState({ answered: false });
    }
  }

  render() {
    const { questionIds, userawnser } = this.props;
    const { answered } = this.state;

    return (
      <div className='container'>
        <div className='container-header'>
          <p
            onClick={() => { this.handleChange('unanswered'); }}
            className={answered ? 'question-list-btn-non-active' : 'question-list-btn'}
            style={{ borderRight: '1px solid #dad7d7' }}
          >Unanswered Questions</p>
          <p
            onClick={() => { this.handleChange('answered'); }}
            className={answered ? 'question-list-btn' : 'question-list-btn-non-active'}
          >Answered Questions</p>
        </div>
        <ul className='q-list-ul'>
          {this.state.answered
            ? (
              questionIds.map((id) => {
                let answeredID = userawnser.find((answer) => {
                  if (answer === id) {
                    return id;
                  }
                  return null;
                });

                if (answeredID === id) {
                  return (
                    <li key={id}>
                      <Question id={id} btnText='View Results' />
                    </li>
                  );
                }
                return null;
              })
            ) : (
              questionIds.length === userawnser.length
                ?
                <div className='no-more-questions'>
                  <h1>you have answered all questions</h1>
                  <p>check your status on the leaderboard and/or create new questions</p>
                  <p>Thank you for playing!</p>
                </div>
                :
                questionIds.map((id) => {
                  let unansweredID = userawnser.find((answer) => {
                    if (answer === id) {
                      return id;
                    } else {
                      return null;
                    }
                  });
                  if (unansweredID !== id) {
                    return (
                      <li key={id}>

                        <Question id={id} btnText='View Poll' />
                      </li>
                    );
                  }
                  return null;
                }
                ))}
        </ul>
      </div>
    );
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
