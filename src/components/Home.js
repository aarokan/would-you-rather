import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Tabs, Tab } from 'react-bootstrap'

class Home extends Component {
  render() {
    return (
      <div class="home">
        <h3 className='center'>Your Questions</h3>
        <Tabs defaultActiveKey="unanswered-questions" transition={false} id="questions-tab">
          <Tab eventKey="unanswered-questions" title="Unanswered Questions">
            <ul className='home-list'>
              {this.props.unansweredQ.map((id) => (
                <li key={id}>
                  <Question id={id}/>
                </li>
              ))}
            </ul>
          </Tab>
          <Tab eventKey="answered-questions" title="Answered Questions">
            <ul className='home-list'>
              {this.props.answeredQ.map((id) => (
                <li key={id}>
                  <Question id={id}/>
                </li>
              ))}
            </ul>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps ({ questions, authedUser }) {
  
  return {
    answeredQ: Object.keys(questions)
    .filter((q) => (questions[q].optionOne.votes.includes(authedUser) 
      || questions[q].optionTwo.votes.includes(authedUser)))
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    unansweredQ: Object.keys(questions)
    .filter((q) => (!questions[q].optionOne.votes.includes(authedUser) 
      && !questions[q].optionTwo.votes.includes(authedUser)))
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    authedUser
  }
}

export default connect(mapStateToProps)(Home)