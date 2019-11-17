import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'
import { Card, Button } from 'react-bootstrap'
import { handleAnswerQuestion } from '../actions/questions'

class Question extends Component {
  handleAnswer = (e) => {
    e.preventDefault()

    // todo: Handle Answer Question
    const { dispatch, question, authedUser } = this.props

      dispatch(handleAnswerQuestion({
        id: question.id,
        answer: question.answer,
        authedUser
      }))
  }

  handleViewResult = (e) => {
    e.preventDefault()

    // todo: Handle View Result
  }
  
  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This Question doesn't exist</p>
    }
    const {
      name, avatar, answer, votedOptOne, votedOptTwo, id, timestamp, optOneVotes, optTwoVotes, optOneText, optTwoText
    } = question
    
    return (
      <div>
        <Card bg="light" style={{ width: '18rem' }}>
          <Card.Header>{`${name} Asks:`}</Card.Header>
          <Card.Body>
            <img
              src={avatar}
              alt={`Avatar of ${name}`}
              className='avatar'
            />
            <div>{formatDate(timestamp)}</div>
            <br />
            <Card.Title>Would You Rather?</Card.Title>
            <Card.Text>
              {optOneText}
            </Card.Text>
            <Card.Text>
              {optTwoText}
            </Card.Text>
            {answer === null
              ? <Button variant="primary" onClick={this.handleAnswer}>Answer Question</Button>
              : <Button variant="primary" onClick={this.handleViewResult}>View Result</Button>
            }
          </Card.Body>
        </Card>
        <br />
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser, users)
      : null
  }
}

export default connect(mapStateToProps)(Question)