import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import { Layout } from './Layout'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import NavigationBar from './NavigationBar'
import Login from './Login'
import Leaderboard from './Leaderboard'
import NoMatch from './NoMatch'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    console.log('App Loading, authed: ', this.props.loading, this.props.authedUser)
    return (
      <Router>
        <Fragment>
        {this.props.authedUser === null
          ? (
            <Layout>
              <Login />
            </Layout>
            )
          :
          (
            <Fragment>
              <LoadingBar />
              <Layout>
              <NavigationBar />
              { this.props.loading === true
                ? null
                : <div>
                    <Route path="/" exact component={Home} />
                    <Route path="/question/:id" exact component={QuestionPage} />
                    <Route path="/leaderboard" exact component={Leaderboard} />
                    <Route path="/add" exact component={NewQuestion} />
                    <Route component={NoMatch} />
                  </div>
              }
              </Layout>
            </Fragment>
          )
        }
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App)