import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { addUserQuestionAnswer, addUserQuestion } from './users'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (question) {
  console.log('addQuestion question', question)
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(addUserQuestion(question))
      })
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function AnswerQuestion (qid, authedUser, answer) {
  console.log(`inside-AnswerQuestion(id: ${qid} authedUser: ${authedUser} answer: ${answer}`)
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer
  }
}

export function handleAnswerQuestion (qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    console.log(`actions-dispatch(AnswerQuestion(questionId, authedUser, answer: ${qid}, ${authedUser}, ${answer}))`)
    console.log(`handle-AnswerQuestion(info: ${AnswerQuestion(qid, authedUser, answer)}`)
    
    

    saveQuestionAnswer({qid, authedUser, answer})
      .then(() => {
        console.log('---Inside of promise', qid, authedUser, answer)
        dispatch(AnswerQuestion(qid, authedUser, answer))
        dispatch(addUserQuestionAnswer(qid, authedUser, answer))
      })
      .catch((e) => {
        console.warn('Error in handleAnswerQuestion: ', e)
        alert('The was an error saving the question. Try again.')
      })
  }
}