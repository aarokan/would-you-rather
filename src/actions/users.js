import {getUsers} from "../utils/api";

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_QUESTION_ANSWER = 'ADD_USER_QUESTION_ANSWER';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addUserQuestion(question) {
  return {
      type: ADD_USER_QUESTION,
      question
  }
}

export function addUserQuestionAnswer(qid, authedUser, answer) {
  return {
      type: ADD_USER_QUESTION_ANSWER,
      qid,
      authedUser,
      answer
  }
}

export function handleGetUsers() {
  return (dispatch) => {
      return getUsers()
          .then((users) => {
              dispatch(receiveUsers(users));
          });
  }
}