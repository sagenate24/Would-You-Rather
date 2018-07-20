import { getInitialData } from '../utils/api';
import { receiveUsers } from '../actions/users';
import { receiveQuestions } from '../actions/questions';
import { showLoading, hideLoading } from 'react-redux-loading';
import { setAuthedUser } from './authedUser';

const AUTHED_USER = null;

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());

    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(setAuthedUser(AUTHED_USER));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  }
}
