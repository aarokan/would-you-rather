import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../actions/authedUser';

class Logout extends Component {
    componentDidMount() {
        this.props.dispatch(signOut());
    }

    render() {
        return (
            <Redirect to="/login" />
        );
    }
}

export default connect()(Logout);