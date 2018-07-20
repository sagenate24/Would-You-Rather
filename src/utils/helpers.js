export function formatPollQuestion(question, author, authedUser) {
  const { id, timestamp, optionOne, optionTwo } = question;
  const { name, avatarURL } = author;

  return {
    name,
    id,
    timestamp,
    avatar: avatarURL,
    author,
    optionOne,
    optionTwo,
    optionOneAuth: optionOne.votes.includes(authedUser),
    optionTwoAuth: optionTwo.votes.includes(authedUser),
  }
}
