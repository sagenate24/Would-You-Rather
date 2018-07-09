import { saveQuestionAnswer, saveQuestion } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    }).then((optionOneText, optionTwoText) => dispatch(addQuestion(optionOneText, optionTwoText)))
    .then(() => dispatch(hideLoading()));
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function answerQuestion({ id, authedUser, awnser}) {
  return {
    type: ANSWER_QUESTION,
    id,
    authedUser,
    awnser
  }
}

export function handleAwnserQuestion(info) {
  return (dispatch) => {
    dispatch(answerQuestion(info))

    return saveQuestionAnswer(info).catch((e) => {
      console.warn('Error in handleAwnser: ', e)
      dispatch(answerQuestion(info));
      alert('There was an error answereing that question. Please try again peasent');
    })
  }
}