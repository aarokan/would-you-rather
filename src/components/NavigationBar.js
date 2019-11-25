import React, {Component} from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import {signOut} from '../actions/authedUser'
import {connect} from 'react-redux'

class NavigationBar extends Component { 
    state = {
        redirectLogin: false
    }

    handleSignout = (e) => {
        e.preventDefault()
        this.props.dispatch(signOut())
        this.setState(() => ({
            redirectLogin: true
        }))
    }

    render() {
        const { authedUser } = this.props
        const {redirectLogin} = this.state

        if (redirectLogin === true) {
            return (<Redirect to="/"/>)
        }

        return (
            <div>
                { authedUser === null
                    ? <div></div>
                    : (
                        <nav className="navbar navbar-expand navbar-light bg-light">
                            <div className='projectContainer'>
                                <div className="collapse navbar-collapse">
                                    <ul className="navbar-nav">
                                        <NavLink to='/' exact activeClassName='active'
                                                className="nav-item nav-link">Home</NavLink>
                                        <NavLink to='/add' exact activeClassName='active'
                                                className="nav-item nav-link">New Question</NavLink>
                                        <NavLink to='/leaderboard' exact activeClassName='active'
                                                className="nav-item nav-link">Leaderboard</NavLink>
                                    </ul>
                                    <span
                                        style={{marginLeft: '90px'}}
                                        className="navbar-text margin-left-100 margin-right-25 text-info"
                                    >
                                        Hello &nbsp;{authedUser}
                                    </span>
                                    <span 
                                        className="navbar-nav"><Link to="#">&nbsp;<button
                                        className="btn-sm btn-info"
                                        onClick={this.handleSignout}
                                        >Logout</button></Link>
                                    </span>
                                </div>
                            </div>
                        </nav>
                    )
                }
                <br />
            </div>
        )
    
    }  
} 

function mapStateToProps({authedUser, users}) {
    return {
        authedUser,
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(NavigationBar)