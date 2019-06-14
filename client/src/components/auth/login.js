import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import LoginSvg from '../../svg/signin.svg';
import { Link } from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state
        const user = { email, password }

        this.props.login(user, this.props.history);

    }
    render() {
        const { email, password } = this.state
        const { errors } = this.props
        return (
            <div className="row">
                <div className="col s4 ">
                    <div className="container valign-wrapper right" style={{ height: '100vh' }}>
                        <img src={`${LoginSvg}`} alt="" width="800px" />
                    </div>
                </div>
                <div className="col s8">
                    <div className="container" style={{ height: '100vh' }}>
                        <h1 className="deep-purple-text lighten-1 center">Login</h1>
                        <br />
                        <br />
                        <form onSubmit={this.onSubmit} className="white">

                            <div className="input-field">
                                <label className="deep-purple-text lighten-1" htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className={classnames(null, { "is-invalid": errors.email })}

                                    onChange={this.onChange}
                                    value={email}
                                />
                                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                            </div>

                            <div className="input-field">
                                <label className="deep-purple-text lighten-1" htmlFor="email">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className={classnames(null, { "is-invalid": errors.password })}
                                    onChange={this.onChange}
                                    value={password}
                                />
                                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            </div>
                            <p className="grey-text text-darken-3 center">Haven't got an account ? <b><Link class="deep-purple-text lighten-1 " to={'/register'}>Register</Link></b></p>
                            <button className="btn deep-purple lighten-1 z-depth-0">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
}


export default connect(mapStateToProps, { login })(Login);