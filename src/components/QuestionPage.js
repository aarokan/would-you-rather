import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'
import { Card, Button, ProgressBar, Container, Row, Col, Badge } from 'react-bootstrap'
import { handleAnswerQuestion } from '../actions/questions'

class QuestionPage extends Component {
    state = {
        answer: '',
        answerSubmitted: false
    };
    handleSubmit(e, questionId) {
        e.preventDefault()

        const {dispatch} = this.props;
        const {answer} = this.state;
        
        console.log(`handleAnswerQuestion(questionId: ${questionId}, answer:${answer}`)
        dispatch(handleAnswerQuestion(questionId, answer));

        this.setState(() => ({
            answer: '',
            answerSubmitted: true
        }))
    }
    handleInputChange = (e) => {
        const text = e.target.value;

        this.setState(() => ({
            answer: text
        }));
    }

    render() {
        console.log('questionPage props: ', this.props)
        const { question, id } = this.props

        if (question === null) {
          return <p>This Question doesn't exist</p>
        }
        const {
          name, avatar, answer, votedOptOne, votedOptTwo, qId, timestamp, optOneVotes, optTwoVotes, optOneText, optTwoText
        } = question
    
        // Show result if the authedUser has already answered the question
        if (question.answer !== null) {
            const total = optOneVotes + optTwoVotes
            const optOnePercentage = optOneVotes / total * 100
            const optTwoPercentage = optTwoVotes / total * 100
            return (
                <div>
                    <Card bg="light" style={{ width: '30rem' }}>
                        <Card.Header>{`Asked by ${name}`}</Card.Header>
                        <Card.Body>
                            <img
                            src={avatar}
                            alt={`Avatar of ${name}`}
                            className='avatar'
                            />
                            <div>{formatDate(timestamp)}</div>
                            <br />
                            <Card.Title>Would You Rather</Card.Title>
                            <Container>
                                <div>
                                    <Row>
                                        <Col xs={9}>
                                            {optOneText}
                                        </Col>
                                        <Col>
                                            {votedOptOne && <Badge variant="primary">You Voted</Badge>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <ProgressBar now={optOnePercentage} label={`${optOnePercentage}%`} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={{ span: 4, offset: 4 }}>
                                            <Badge variant="light">
                                            {`${optOneVotes} out of ${total} votes`}
                                            </Badge>
                                        </Col>
                                    </Row>
                                </div>
                                <br />
                                <div>
                                    <Row>
                                        <Col xs={9}>
                                            {optTwoText}
                                        </Col>
                                        <Col>
                                            {votedOptTwo && <Badge variant="primary">You Voted</Badge>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <ProgressBar now={optTwoPercentage} label={`${optTwoPercentage}%`} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={{ span: 4, offset: 4 }}>
                                            <Badge variant="light">
                                            {`${optTwoVotes} out of ${total} votes`}
                                            </Badge>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        </Card.Body>
                    </Card>
                </div>
            )
        }

        return (
        <div>
            <Card bg="light" style={{ width: '30rem' }}>
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
                        <Container>
                            <form onSubmit={(e) => this.handleSubmit(e, id)}>
                                <div className="form-check">
                                    <input className="form-check-input"
                                            type="radio"
                                            name="questionPoll"
                                            id="optionOne"
                                            value="optionOne"
                                            onChange={this.handleInputChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="optionOne">
                                        {optOneText}
                                    </label>
                                </div>
                                <br />
                                <div className="form-check">
                                    <input className="form-check-input"
                                            type="radio"
                                            name="questionPoll"
                                            id="optionTwo"
                                            value="optionTwo"
                                            onChange={this.handleInputChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="exampleRadios2">
                                        {optTwoText}
                                    </label>
                                </div>
                                <br />
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    disabled={this.state.answer === ''}
                                >
                                    Submit
                                </Button>
                            </form>
                        </Container>
                </Card.Body>
            </Card>
        </div>
        )
    }
}

function mapStateToProps ({ authedUser, users, questions }, props) {
    const { id } = props.match.params
    const question = questions[id]

    return {
        id,
        authedUser,
        question: question
        ? formatQuestion(question, users[question.author], authedUser, users)
        : null
    }
}

export default connect(mapStateToProps)(QuestionPage)
