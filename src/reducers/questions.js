import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ANSWER_QUESTION :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          optionOne: {
            ...state[action.id].optionOne,
            votes: action.answer === 'optionOne'
            ? state[action.id].optionOne.votes.concat([action.authedUser])
            : state[action.id].optionOne.votes
          },
          optionTwo: {
            ...state[action.id].optionTwo,
            votes: action.answer === 'optionTwo'
            ? state[action.id].optionTwo.votes.concat([action.authedUser])
            : state[action.id].optionTwo.votes
          }
        }
      }
      case ADD_QUESTION :
      const { question } = action

      return {
        ...state,
        [action.question.id]: action.question,
      }
    default :
      return state
  }
}