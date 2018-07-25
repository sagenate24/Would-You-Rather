import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/QuestionList.css';
import '../styles/SharedStyles.css';

import Question from './Question';

class QuestionList extends Component {
  state = {
    answered: false,
    unansweredBtn: 'question_list_butn',
    answeredBtn: 'notActive',
  }

  handleChange = (info) => {
    if (info === 'answered') {
      this.setState({
        answered: true,
        answeredBtn: 'question_list_butn2',
        unansweredBtn: 'notActive2'

      });
    } else if (info === 'unanswered') {
      this.setState({
        answered: false,
        unansweredBtn: 'question_list_butn',
        answeredBtn: 'notActive'
      });
    }
  }

  render() {
    const { questionIds, userawnser } = this.props;
    const { unansweredBtn, answeredBtn } = this.state;
    return (
      <div className='container'>
        <div className='question_list_header'>
          <div onClick={() => {
            this.handleChange('unanswered');
          }} className={unansweredBtn}>Unanswered Questions</div>
          <div onClick={() => {
            this.handleChange('answered');
          }} className={answeredBtn}>Answered Questions</div>
        </div>
        <ul>
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
                      <Question id={id} />
                    </li>
                  );
                }
                return null;
              })
            ) : (
              questionIds.map((id) => {
                let unansweredID = userawnser.find((answer) => {
                  if (answer === id) {
                    return id;
                  }
                  return null;
                });
                if (unansweredID !== id) {
                  return (
                    <li key={id}>
                      <Question id={id} />
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
