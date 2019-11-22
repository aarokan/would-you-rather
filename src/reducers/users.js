import { RECEIVE_USERS, ADD_USER_QUESTION, ADD_USER_QUESTION_ANSWER } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case ADD_USER_QUESTION:
      return {
          ...state,
          [action.question.author]: {
              ...state[action.question.author],
              questions: [...state[action.question.author].questions, action.question.id]
          }
      }
    case ADD_USER_QUESTION_ANSWER:
      console.log('users reducers : qid, authed, answer', action.qid, action.authedUser, action.answer)
      return {
          ...state,
          [action.authedUser]: {
              ...state[action.authedUser],
              answers: {
                  ...state[action.authedUser].answers,
                  [action.qid]: action.answer
              }
          }
        }
    default :
      return state
  }
}