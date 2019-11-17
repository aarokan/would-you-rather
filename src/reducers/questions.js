import { RECEIVE_QUESTIONS, ANSWER_QUESTION } from '../actions/questions'

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
    default :
      return state
  }
}

{ /* 
questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['sarahedo'],
      text: 'have horrible short term memory',
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory'
    }
  },
*/ }