import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/SharedStyles.css';
import FadeIn from 'react-fade-in';

class Results extends Component {
  state = {
    home: false
  }

  handleWord(chosenOption) {
    const { optionOne, optionTwo } = this.props.question;
    let userAnswer = chosenOption.find((id) => {
      if (this.props.authedUser === id) {
        return id;
      }
      return null;
    });
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;

    if (chosenOption.length === 1 && this.props.authedUser === userAnswer && totalVotes === 1) {
      return `Congrats! Your the first voter!`
    } else if (chosenOption.length >= 1) {
      return `${chosenOption.length} out of ${totalVotes} votes`
    } else {
      return 'No votes here';
    }
  }

  handlePercent(chosenOption) {
    const { optionOne, optionTwo } = this.props.question;
    let totalVotes = optionOne.votes.length + optionTwo.votes.length;
    let votePercent = chosenOption.length / totalVotes;

    if (chosenOption.length > 0) {
      if (votePercent === 1) {
        return '100% of voters chose this option';
      } else if (votePercent === .5) {
        return '50% of voters chose this option';
      } else if (votePercent > 0) {
        let stringifyNumber = votePercent.toString();
        let percent = stringifyNumber.substring(2, 4) + '%';
        return `${percent} of voters chose this option`;
      }
    } else { return '0% of votes here'; }
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
        <FadeIn delay='200' transitionDuration='600'>
          <h3 style={{ color: 'black', fontSize: '24px', marginTop: '0' }}>Results:</h3>
          <div className='container-body' style={{ color: '#fff' }}>
            <span className='pollQ-option-one' style={{ cursor: 'default', pointerEvents: 'none' }}>
              {this.userAwnsered('optionOne')}
              <span className='results-option-text'>{optionOne.text}?</span>
              <p>{this.handleWord(optionOne.votes)}</p>
              <p>{this.handlePercent(optionOne.votes)}</p>
            </span>
            <span className='question-or'>OR</span>
            <span className='pollQ-option-two' style={{ cursor: 'default', pointerEvents: 'none' }}>
              {this.userAwnsered('optionTwo')}
              <span className='results-option-text'>{optionTwo.text}?</span>
              <p>{this.handleWord(optionTwo.votes)}</p>
              <p>{this.handlePercent(optionTwo.votes)}</p>
            </span>
            <button className='button' onClick={this.handleRedirect}>more questions?</button>
          </div>
        </FadeIn>
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
