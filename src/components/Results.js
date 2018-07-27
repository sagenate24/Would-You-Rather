import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/SharedStyles.css';

class Results extends Component {
  state = {
    home: false
  }

  handleWord(number) {
    if (number.length > 1) {
      return `${number.length} out of ${this.props.userArray.length} votes`;
    } else if (number.length === 0) {
      return 'no votes here';
    } else {
      return `${number.length} out of ${this.props.userArray.length} votes`;
    }
  }

  handlePercent(number) {
    if (number.length > 0) {
      let votesDivUsers = number.length / this.props.userArray.length;
      let stringifNumber = votesDivUsers.toString();

      if (stringifNumber === '1') {
        return '100% of people voted for this option';
      } else {
        let percent = stringifNumber.substring(2, 4) + '%';
        return `${percent} of people voted for this option`;
      }
    } else { return null; }
  }

  userAwnsered(index) {
    let users = this.props.question[index].votes;
    let authedUser = this.props.authedUser;

    let answeredQuestion = users.find((user) => {
      return user === authedUser;
    });

    if (answeredQuestion === authedUser) {
      return <h5 className='your-vote'>Your Vote</h5>;
    } else { return null; }
  }

  handleRedirect = () => {
    this.setState({ home: true });
  }

  goToHome() {
    if (this.state.home === true) {
      return <Redirect to='/' />;
    }
  }

  render() {
    const { optionOne, optionTwo } = this.props.question;

    return (
      <div>
        {this.goToHome()}
        <h3 style={{ fontSize: '24px' }}>Results:</h3>
        <div className='container-body' style={{ color: '#fff' }}>
          <span className='pollQ-option-one' style={{ cursor: 'default', pointerEvents: 'none' }}>
            {this.userAwnsered('optionOne')}
            <span>{optionOne.text} ?</span>
            <p>{this.handleWord(optionOne.votes)}</p>
            <p>{this.handlePercent(optionOne.votes)}</p>
          </span>
          <span className='question-or'>OR</span>
          <span className='pollQ-option-two' style={{ cursor: 'default', pointerEvents: 'none' }}>
            {this.userAwnsered('optionTwo')}
            <span>{optionTwo.text} ?</span>
            <p>{this.handleWord(optionTwo.votes)}</p>
            <p>{this.handlePercent(optionTwo.votes)}</p>
          </span>
          <button className='button' onClick={this.handleRedirect}>more questions?</button>
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
    userArray: Object.keys(users),
    question,
    author: users[question.author],
  }
}

export default connect(mapStateToProps)(Results);
