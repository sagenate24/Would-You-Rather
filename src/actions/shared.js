import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
import { setAuthedUser } from './authedUser';
import { handleAddUserQuestion, addUserVotes, receiveUsers } from './users';
import { addQuestion, answerQuestion, receiveQuestions } from './questions';

const AUTHED_USER = 'nathan';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());

    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(setAuthedUser(AUTHED_USER));
      dispatch(receiveQuestions(questions));
    }).then(() => dispatch(hideLoading()));
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    }).then((optionOneText, optionTwoText) => dispatch(addQuestion(optionOneText, optionTwoText)))
      .then((results) => dispatch(handleAddUserQuestion(results.question.id)))
      .then(() => dispatch(hideLoading()));
  }
}

export function handleAnswerQuestion(info) {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(answerQuestion(info));
    dispatch(addUserVotes(info));

      return saveQuestionAnswer(info).catch((e) => {
        console.warn('There was an error with handling your answer: ', e);
        dispatch(answerQuestion(info));
        alert('There was an error answering that poll. Pleas try again');
      }).then(() => dispatch(hideLoading()));
  }
}
