import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';


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
            <div className="container">
                <h1 className="grey-text text-darken-3">Login</h1>
                <form onSubmit={this.onSubmit} className="white">

                    <div className="input-field">
                        <label htmlFor="email">Email</label>
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
                        <label htmlFor="email">Password</label>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            className={classnames(null, { "is-invalid": errors.password })}
                            onChange={this.onChange}
                            value={password}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <button className="btn orange lighten-1 z-depth-0">Submit</button>
                </form>
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