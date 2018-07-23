export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_VOTES = 'ADD_USER_VOTES';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function handleAddUserQuestion(id) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(addUserQuestion(id, authedUser));
  }
}

export function addUserVotes({ authedUser, qid, answer }) {
  return {
    type: ADD_USER_VOTES,
    authedUser,
    qid,
    answer,
  }
}

function addUserQuestion(id, authedUser) {
  return {
    type: ADD_USER_QUESTION,
    id,
    authedUser,
  }
}
