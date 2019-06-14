import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; //chuyen cac the a -> <Link>
import { logout } from '../../actions/authActions';


const header = (props) => {
    const { isAuthenticated, user } = props.auth;
    console.log(isAuthenticated)
    return (
        <div>
            <nav className="nav-extended">
                <div className="nav-wrapper deep-purple lighten-1">
                    <div className="container">
                        <a href="/" className="brand-logo">XEDIKE</a>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        {!isAuthenticated ? (
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/">Home</a></li>
                                <li><a href="register">Register</a></li>
                                <li><a href="Login">Login</a></li>
                            </ul>) : (
                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/profile">Hello {user.fullName}</a></li>
                                    <li>
                                        <Link
                                            to="/"
                                            className="nav-link"
                                            onClick={props.logout}
                                        >
                                            Log Out
                                    </Link>
                                    </li>
                                </ul>)}
                    </div>
                </div>
            </nav>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(header);