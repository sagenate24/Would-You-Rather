import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import FadeIn from 'react-fade-in';

class Results extends Component {
  state = {
    home: false
  }

  handleWord(chosenOption) {
    if (chosenOption.length === 1) {
      return `${chosenOption.length} vote`;
    } else {
      return `${chosenOption.length} votes`;
    }
  }

  handlePercent(chosenOption) {
    const { optionOne, optionTwo } = this.props;
    let totalVotes = optionOne.votes.length + optionTwo.votes.length;
    let votePercent = Math.floor((chosenOption.length / totalVotes) * 100);

    return votePercent;
  }

  userAwnsered(index) {
    let users = this.props[index].votes;
    let authedUser = this.props.authedUser;

    let answeredQuestion = users.find((user) => {
      return user === authedUser;
    });

    if (answeredQuestion === authedUser) {
      return <h5 className='your-vote'>Your Vote</h5>;
    } else { return null; }
  }

  handleRedirect = () => {

    this.setState(() => ({
      home: true
    }));
  }

  render() {
    const { optionOne, optionTwo } = this.props;
    const { home } = this.state;

    if (home === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <FadeIn delay='200'>
          <h3 style={{ color: 'black', fontSize: '24px', marginTop: '0' }}>Results:</h3>
          <div className='container-body' style={{ color: '#fff' }}>
            <span className='pollQ-option-one' style={{ cursor: 'default', pointerEvents: 'none' }}>
              {this.userAwnsered('optionOne')}
              <span className='results-option-text'>{optionOne.text}?</span>
              <p>{this.handleWord(optionOne.votes)}</p>
              <p>{this.handlePercent(optionOne.votes)}% of voters chose this option.</p>
            </span>
            <span className='question-or'>OR</span>
            <span className='pollQ-option-two' style={{ cursor: 'default', pointerEvents: 'none' }}>
              {this.userAwnsered('optionTwo')}
              <span className='results-option-text'>{optionTwo.text}?</span>
              <p>{this.handleWord(optionTwo.votes)}</p>
              <p>{this.handlePercent(optionTwo.votes)}% of voters chose this option.</p>
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
    ...question,
    authedUser,
    author: users[question.author],
  }
}

export default connect(mapStateToProps)(Results);
