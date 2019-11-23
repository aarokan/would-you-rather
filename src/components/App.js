import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import { Layout } from './Layout'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import { NavigationBar } from './NavigationBar'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
            <Layout>
              {/* <NavigationBar /> */}
              { 
              /* 
              <Switch>
                  <Route exact path="/" component={Home} />
              </Switch>
              */ 
              }
              {this.props.loading === true
                ? null
                : <div>
                    <Route path='/' exact component={Home} />
                    <Route path='/question/:id' component={QuestionPage} />
                    <Route path='/newquestion' component={NewQuestion} />
                    {/* { 
                    <Route path='/leaderboard' component={Leaderboard} />
                    <Route path='/login' component={Login} />
                    } */}
                  </div>}
            </Layout>          
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)