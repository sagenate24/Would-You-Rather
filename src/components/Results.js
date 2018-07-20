import React, { Component } from 'react';
import { connect } from 'react-redux';

class Results extends Component {

  handleWord(number) {
    if (number.length > 1) {
      return `${number.length} ot of 3 votes`;
    } else if (number.length === 0) {
      return 'no one voted this';
    } else { return `${number.length} out of 3 votes`; }
  }

  handlePercent(number) {
    if (number.length > 0) {
      let votesDivUsers = number.length / 3;
      let stringifNumber = votesDivUsers.toString();
      let percent = stringifNumber.substring(2, 4) + '%';
      return `${percent} of people voted for this option`;
    } else { return null; }
  }

  userAwnsered(index) {
    let users = this.props.question[index].votes;
    let authedUser = this.props.authedUser;

    let answeredQuestion = users.find((user) => {
      return user === authedUser;
    });

    if (answeredQuestion === authedUser) {
      return 'you voted for this';
    } else { return null; }
  }

  render() {
    console.log(this.props);
    const { question } = this.props;
    return (
      <div>
        <div className='questions'>
          <h1>RESULTS</h1>
          <div className='question_one'>
            <h3>{question.optionOne.text} ?</h3>
            {this.userAwnsered('optionOne')}
            <p>{this.handleWord(question.optionOne.votes)}</p>
            <span>{this.handlePercent(question.optionOne.votes)}</span>
          </div>
          <br />
          <div className='question_two'>
            <h3>{question.optionTwo.text} ?</h3>
            {this.userAwnsered('optionTwo')}
            <p>{this.handleWord(question.optionTwo.votes)}</p>
            <span>{this.handlePercent(question.optionTwo.votes)}</span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props;
  const question = questions[id];

  return {
    id,
    authedUser,
    users,
    question,
    author: users[question.author]
  }
}

export default connect(mapStateToProps)(Results);
