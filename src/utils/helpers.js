export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion (question, author, authedUser, users) {
    console.log('formatQuestion :')
    console.log('question, author, authedUser, users :', question, author, authedUser, users)
    const { id, optionOne, optionTwo, timestamp } = question
    const { name, avatarURL } = author
  
    return {
      name,
      avatar: avatarURL,
      answer: (authedUser && users[authedUser].answers[id]) ? users[authedUser].answers[id] : null,
      votedOptOne: optionOne.votes.includes(authedUser),
      votedOptTwo: optionTwo.votes.includes(authedUser),
      id,
      timestamp,
      optOneVotes: optionOne.votes.length,
      optTwoVotes: optionTwo.votes.length,
      optOneText: optionOne.text,
      optTwoText: optionTwo.text,
    }
}