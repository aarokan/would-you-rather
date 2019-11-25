import React from 'react';
import {connect} from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'
import { Card, Container, Row, Col, Badge } from 'react-bootstrap'

const Leaderboard = (props) => {
    const {users} = props;

    let usersInfo = Object.keys(users).map((key, index) => {
        let questionsAnswered = Object.keys(users[key].answers).length;
        let questionsAsked = Object.keys(users[key].questions).length;

        return {
            'name': users[key].name,
            'avatar': users[key].avatarURL,
            'questionsAnswered': questionsAnswered,
            'questionsAsked': questionsAsked,
            'totalScore': questionsAnswered + questionsAsked,
        }
    });

    usersInfo.sort((a, b) => {
        if (b.totalScore < a.totalScore) return -1;
        if (b.totalScore > a.totalScore) return 1;
        return 0;
    });

    return (
        <div>
            {usersInfo.map((user, index) => {
                return (
                    <div key={index}>
                    <Card bg="light" style={{ width: '30rem' }}>
                        <Card.Header>{user.name}</Card.Header>
                        <Card.Body>
                            <img
                            src={user.avatar}
                            alt={`Avatar of ${user.name}`}
                            className='avatar'
                            />
                            <br />
                            <br />
                            <Card.Title>
                                {`Rank: ${index+1}`}
                                <span>
                                    {index === 0 && 'st'}
                                    {index === 1 && 'nd'}
                                    {index === 2 && 'rd'}
                                </span>
                            </Card.Title>
                            <Container>
                                <div>
                                    <Row>
                                        <Col xs={5}>
                                            Answered Questions:
                                        </Col>
                                        <Col>
                                            <Badge variant="secondary">{user.questionsAnswered}</Badge>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={5}>
                                            Created Questions:
                                        </Col>
                                        <Col>
                                            <Badge variant="secondary">{user.questionsAsked}</Badge>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col md={{ span: 4, offset: 4 }}>
                                            Total Score: &nbsp;
                                            <Badge variant="primary">
                                                {user.totalScore}
                                            </Badge>
                                        </Col>
                                    </Row>
                                </div>
                                <br />
                            </Container>
                        </Card.Body>
                    </Card>
                    <br />
                    </div>
                )
            })}
        </div>
    )
};

function mapStateToProps({users}) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Leaderboard);