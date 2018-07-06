export function formatPollQuestion(question, author, authedUser) {
  const { id, timestamp, optionOne, optionTwo } = question
  const { name, avatarURL } = author
  // const answer = Object.keys(answers)
  // .sort((a,b) => answers[b].timestamp - answers[a].timestamp)
  // console.log(authedUser)
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

// export function formatUserAwnsers(users) {
//   const { answers, questions } = users;
//   // console.log(users)
//   return {
//     answers,
//     questions,
//   }
// }