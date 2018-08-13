import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/shared';
import { Redirect } from 'react-router-dom';
import '../styles/SharedStyles.css';
import * as wyrBanner from '../Images/wyrBanner.png';
import FadeIn from 'react-fade-in';

class NewPoll extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }

  handleChangeA = (e) => {
    const optionOneText = e.target.value;

    this.setState(() => ({
      optionOneText
    }));
  }

  handleChangeB = (e) => {
    const optionTwoText = e.target.value;

    this.setState(() => ({
      optionTwoText
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText));

    this.setState(() => ({
      toHome: id ? false : true,
    }));
  }

  render() {
    const { loadingBar, users, authedUser } = this.props;
    const { optionOneText, optionTwoText, toHome } = this.state;
    const charactersLeftA = 74 - optionOneText.length;
    const charactersLeftB = 74 - optionTwoText.length;

    if (toHome === true && loadingBar.default === 0) {
      return <Redirect to='/' />
    }

    return (
      <FadeIn delay='100' transitionDuration='400'>
        <div className='container'>
          <div className='container-header'>
            <img src={users[authedUser].avatarURL} alt={'avatar'} className='avatar-medium' />
            <p data-uitest='userNameHeader'>{users[authedUser].name} asks:</p>
          </div>
          <p style={{ textAlign: 'left', paddingLeft: '10px', color: 'rgba(0, 0, 0, 0.31)' }}>Complete the question:</p>
          <img src={wyrBanner} alt='wyrbanner' className='wyr-banner' />
          <form onSubmit={this.handleSubmit} className='container-body'>
            <textarea
              placeholder='option one'
              value={optionOneText}
              onChange={this.handleChangeA}
              data-uitest='optionOneText'
              className='text-area'
              maxLength={74}
            />
            {charactersLeftA <= 50 && (
              <div className='option-length'>
                {charactersLeftA}
              </div>
            )}
            <span className='question-or'>OR</span>
            <textarea
              placeholder='option two'
              value={optionTwoText}
              onChange={this.handleChangeB}
              data-uitest='optionTwoText'
              className='text-area'
              maxLength={74}
            />
            {charactersLeftB <= 50 && (
              <div className='option-length'>
                {charactersLeftB}
              </div>
            )}
            <button
              type='submit'
              data-uitest='submitNewPollButton'
              disabled={optionOneText === '' || optionTwoText === ''}
              className={optionOneText === '' || optionTwoText === '' ? 'button-not-active' : 'button'}
            >Submit</button>
          </form>
        </div>
      </FadeIn>
    );
  }
}

function mapStateToProps({ authedUser, loadingBar, users }) {
  return {
    authedUser,
    users,
    loadingBar,
  }
}

export default connect(mapStateToProps)(NewPoll);
