import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import {Redirect} from 'react-router-dom'
import { Card, Container, Form, Button } from 'react-bootstrap'

class Login extends Component {
    state = {
        username: '',
        isLogged: false
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {username} = this.state
        const {dispatch} = this.props

        if (username !== "") {
            dispatch(setAuthedUser(username))
            this.setState(() => ({isLogged: true}))
        }
    }
    handleChange = (e) => {
        const username = e.target.value
        this.setState(() => ({username}))
    }

    render() {
        // const {from} = this.props.location.state || {from: {pathname: '/'}}

        const {isLogged} = this.state

        if (isLogged) {
            // return <Redirect to='/home'/>
            return <Redirect to='/'/>
        }


        return (
            <Card bg="light" style={{ width: '30rem', marginTop:'30px' }}>
                <Card.Header>Welcome to Would You Rather App</Card.Header>
                <Card.Body>
                    <Card.Title>Please Sign in</Card.Title>
                        <Container>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>User:<span>&nbsp;</span></Form.Label>
                                    <select 
                                        id="username"
                                        value={this.state.username}
                                        onChange={this.handleChange}>
                                            <option value='' disabled>Select</option>
                                            {this.props.users.map((user) => (
                                                    <option key={user.id} value={user.id}>{user.name}</option>
                                                )
                                            )}
                                    </select>
                                </Form.Group>
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    disabled={this.state.answer === ''}
                                >
                                    Login
                                </Button>
                            </Form>
                        </Container>
                    </Card.Body>
                </Card>
        )
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        users: Object.values(users).map((user) => {
            return ({
                id: user.id,
                name: user.name
            })
        }),
        username: authedUser
    }
}

export default connect(mapStateToProps)(Login)