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
        console.log('------nav authed: ', authedUser)
        console.log('------nav state: ', this.state)

        if (redirectLogin === true) {
            return (<Redirect to="/"/>)
        }

        console.log('nav authedUser :', authedUser)
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
                                    {/* <Row>
                                        <Col></Col>
                                        <Col></Col>
                                    </Row> */}
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

{
    /*

function NavigationBar() {
    return (
        <Navbar expand="lg">
            <Navbar.brand href="/">Would You Rather</Navbar.brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item>
                        <Nav.Link>
                            <NavLink to='/' exact activeClassName='active'>
                                Home
                            </NavLink>
                            {/* <Link to="/">Home</Link> }
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>
                            <NavLink to='/add' activeClassName='active'>
                                New Question
                            </NavLink>
                            {/* <Link to="/add">New Question</Link> }
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>
                            <NavLink to='/leaderboard' activeClassName='active'>
                                    Leaderboard
                            </NavLink>
                            {/* <Link to="/leaderboard">Leaderboard</Link> }
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>
                            <NavLink to='/login' activeClassName='active'>
                                    Login
                            </NavLink>
                            {/* <Link to="/login">Logout</Link> }
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
  }
  
  export default NavigationBar;
  /* }
// export default function NavigationBar () {
    
//     return (
//         <Navbar expand="lg">
//             <Navbar.brand href="/">Would You Rather</Navbar.brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav className="ml-auto">
//                     <Nav.Item>
//                         <Nav.Link>
//                             <NavLink to='/' exact activeClassName='active'>
//                                 Home
//                             </NavLink>
//                             {/* <Link to="/">Home</Link> */}
//                         </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link>
//                             <NavLink to='/add' activeClassName='active'>
//                                 New Question
//                             </NavLink>
//                             {/* <Link to="/add">New Question</Link> */}
//                         </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link>
//                             <NavLink to='/leaderboard' activeClassName='active'>
//                                     Leaderboard
//                             </NavLink>
//                             {/* <Link to="/leaderboard">Leaderboard</Link> */}
//                         </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link>
//                             <NavLink to='/login' activeClassName='active'>
//                                     Login
//                             </NavLink>
//                             {/* <Link to="/login">Logout</Link> */}
//                         </Nav.Link>
//                     </Nav.Item>
//                 </Nav>
//             </Navbar.Collapse>
//         </Navbar>
//     )
//   }

{ /*
    export const NavigationBar = () => (
        <Styles>
            <Navbar expand="lg">
                <Navbar.brand href="/">Would You Rather</Navbar.brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Nav.Link>
                            <Link to="/">Home</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                            <Link to="/add">New Question</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                            <Link to="/leaderboard">Leaderboard</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                            <Link to="/login">Logout</Link>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
    )


    ----------------------------
    const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`;
*/ }