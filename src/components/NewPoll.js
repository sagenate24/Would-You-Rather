import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';

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
    }))
  }

  handleChangeB = (e) => {
    const optionTwoText = e.target.value;

    this.setState(() => ({
      optionTwoText
    }))
  }

  // handleSubmit adds the question to the store.
  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText))

    console.log('Option A: ', optionOneText)
    console.log('Option B: ', optionTwoText)

    // resets textfield to an empty string.
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: id ? false : true,
    }))
  }

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to='/' />
    }

    const charactersLeftA = 80 - optionOneText.length;
    const charactersLeftB = 80 - optionTwoText.length;

    return (
      <div>
        <h3>Would You Rather</h3>
        <form onSubmit={this.handleSubmit}>
          <textarea
            placeholder='Option A'
            value={optionOneText}
            onChange={this.handleChangeA}
            maxLength={80}
          />
          {charactersLeftA <= 50 && (
            <div>
              {charactersLeftA}
            </div>
          )}
          <h1>OR</h1>
          <textarea
            placeholder='Option B'
            value={optionTwoText}
            onChange={this.handleChangeB}
            maxLength={80}
          />
          {charactersLeftB <= 50 && (
            <div>
              {charactersLeftB}
            </div>
          )}
          <button
            type='submit'
            disabled={optionOneText  === '' || optionTwoText  === ''}
          >Submit</button>
        </form>
      </div>
    )
  }
}

export default connect()(NewPoll);