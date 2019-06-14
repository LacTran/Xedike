import React, { Component } from 'react'

import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { withRouter, Link } from 'react-router-dom';
import SignupSvg from '../../svg/signup.svg'
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password2: "",
            phone: "",
            userType: "",
            dateOfBirth: "",
            fullName: ""
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { email, password, password2, phone, fullName, dateOfBirth, userType } = this.state;
        const newUser = { email, password, password2, phone, fullName, dateOfBirth, userType }

        this.props.registerUser(newUser, this.props.history);

    }

    render() {
        const { email, password, password2, phone, fullName, dateOfBirth, userType } = this.state
        const { errors } = this.props
        return (
            <div className="row">
                <div className="col s4">
                    <div className="container valign-wrapper left" style={{ height: '100vh' }}>
                        <img src={`${SignupSvg}`} alt="" width="800px" />
                    </div>
                </div>
                <div className="col s8">
                    <div className="container">
                        <h1 className="deep-purple-text center">Register</h1>
                        <form onSubmit={this.onSubmit}>

                            <div className="input-field">
                                <label className="deep-purple-text lighten-1" htmlFor="email">Email:</label>
                                <input type="text"
                                    className={classnames("form-control", { "is-invalid": errors.email })}
                                    name="email"
                                    onChange={this.onChange}
                                    value={email}
                                />
                                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                            </div>

                            <div className="input-field">
                                <label className="deep-purple-text lighten-1" htmlFor="password">Password:</label>
                                <input type="password"
                                    className={classnames("form-control", { "is-invalid": errors.password })}
                                    name="password"
                                    onChange={this.onChange}
                                    value={password}
                                />
                                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            </div>

                            <div className="input-field">
                                <label className="deep-purple-text lighten-1" htmlFor="password2">Confirm Password:</label>
                                <input type="password"
                                    className={classnames("form-control", { "is-invalid": errors.password2 })}
                                    name="password2"
                                    onChange={this.onChange}
                                    value={password2}
                                />
                                {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                            </div>

                            <div className="input-field">
                                <label className="deep-purple-text lighten-1" htmlFor="fullName">Full Name:</label>
                                <input type="text"
                                    className={classnames("form-control", { "is-invalid": errors.fullName })}
                                    name="fullName"
                                    onChange={this.onChange}
                                    value={fullName}
                                />
                                {errors.fullName && (<div className="invalid-feedback">{errors.fullName}</div>)}
                            </div>

                            <div className="input-field">
                                <label className="deep-purple-text lighten-1" htmlFor="phone">Phone:</label>
                                <input type="text"
                                    className={classnames("form-control", { "is-invalid": errors.phone })}
                                    name="phone"
                                    onChange={this.onChange}
                                    value={phone}
                                />
                                {errors.phone && (<div className="invalid-feedback">{errors.phone}</div>)}
                            </div>

                            <div className="input-field">
                                <input type="text"
                                    className={classnames("datepicker active", { "is-invalid": errors.dateOfBirth })}
                                    name="dateOfBirth"
                                    onChange={this.onChange}
                                    value={dateOfBirth}
                                />
                                <label className="deep-purple-text lighten-1" htmlFor="dateOfBirth">Date Of Birth:</label>
                                {errors.dateOfBirth && (<div className="invalid-feedback">{errors.dateOfBirth}</div>)}
                            </div>

                            <div className="input-field">
                                <select
                                    className={classnames("form-control", { "is-invalid": errors.userType })}
                                    name="userType" onChange={this.onChange} value={userType}>
                                    <option value="-1">Select User Type</option>
                                    <option value="driver">Driver</option>
                                    <option value="passenger">Passenger</option>
                                </select>
                                <label className="deep-purple-text lighten-1" htmlFor="userType">User Type</label>
                                {errors.userType && (<div className="invalid-feedback">{errors.userType}</div>)}
                            </div>
                            <br />
                            <p className="grey-text text-darken-3 center">Already got an account ? <b><Link class="deep-purple-text lighten-1 " to={'/login'}>Login</Link></b></p>
                            <button className="btn deep-purple lighten-1 z-depth-0">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, { registerUser })(withRouter(Register))