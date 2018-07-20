import { showLoading, hideLoading } from 'react-redux-loading';
import { saveQuestion } from '../utils/api';


export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_VOTES = 'ADD_USER_VOTES';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

function addUserVotes({ authedUser, qid, answer }) {
  return {
    type: ADD_USER_VOTES,
    authedUser,
    qid,
    answer,
  }
}

export function handleAddUserVotes(info) {
  return (dispatch) => {
    dispatch(addUserVotes(info))
  }
}

function addUserQuestion(question) {
  return {
    type: ADD_USER_QUESTION,
    question,
  }
}

export function handleAddUserQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    }).then((optionOneText, optionTwoText) => dispatch(addUserQuestion(optionOneText, optionTwoText)))
      .then(() => dispatch(hideLoading()));
  }
}