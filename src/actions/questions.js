import { saveQuestionAnswer, saveQuestion } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';

// Add Question Actions
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

// Answer Question Actions
function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  }
}

export function handleAwnserQuestion(info) {
  return (dispatch) => {

    dispatch(showLoading())
    dispatch(answerQuestion(info))

    return saveQuestionAnswer(info).catch((e) => {
      console.warn('ERROR in handling your answer: ', e);
      dispatch(answerQuestion(info));
      alert('There was an error answereing this poll. Please try again');

    }).then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}