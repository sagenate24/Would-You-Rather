export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_VOTES = 'ADD_USER_VOTES';

export function receiveUsers (users) {
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