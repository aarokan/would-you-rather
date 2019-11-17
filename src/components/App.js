import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import { Layout } from './Layout'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { NavigationBar } from './NavigationBar'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <React.Fragment>
        <LoadingBar />
        { /* <Router> */ }
          { /* <NavigationBar /> */ }
          <Layout>
          { 
          /* 
          <Switch>
              <Route exact path="/" component={Home} />
          </Switch>
          */ 
          }
            {this.props.loading === true
              ? null
              : <NewQuestion />}
          </Layout>          
        { /* </Router> */ }
      </React.Fragment>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)