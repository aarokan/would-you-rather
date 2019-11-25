import React, { Component } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  }

  
  handleChangeOne = (e) => {
    e.preventDefault()
    const optionOne = e.target.value

    this.setState(() => ({
      optionOne
    }))
    }
  handleChangeTwo = (e) => {
    e.preventDefault()
    const optionTwo = e.target.value

    this.setState(() => ({
      optionTwo
    }))
  }


  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(optionOne, optionTwo))

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true,
    }))
  }
  render() {
    const { optionOne, optionTwo, toHome } = this.state

    // Redirect to / if submitted
    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
        <div>
            <Card>
                <Card.Header>Create New Question</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formOptOne">
                            <Card.Title>Would You Rather...</Card.Title>
                            <Form.Label>Option One</Form.Label>
                            <Form.Control 
                                name="optionOne"
                                defaultValue={this.state.optionOne}
                                onChange={this.handleChangeOne}
                                placeholder="Type your first option" 
                            />
                        </Form.Group>
                        <Form.Group controlId="formOptTwo">
                            <Form.Label>Option Two</Form.Label>
                            <Form.Control 
                                name="optionTwo"
                                defaultValue={this.state.optionTwo}
                                onChange={this.handleChangeTwo}
                                placeholder="Type your second option" 
                            />
                        </Form.Group>
                        <Button 
                            type="submit" 
                            variant="primary" 
                            disabled={(optionOne === '' || optionTwo === '')} 
                        >submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>            
        </div>
    )
  }
}

export default connect()(NewQuestion)