import React, { Component } from 'react'

import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
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
        const errors = this.props
        return (
            <div className="container">
                <h1>Register</h1>

                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text"
                            className={classnames("form-control", { "is-invalid": errors.email })}
                            name="email"
                            placeholder="Enter email..."
                            onChange={this.onChange} />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="text"
                            className={classnames("form-control", { "is-invalid": errors.password })}
                            name="password"
                            placeholder="Enter password..."
                            onChange={this.onChange} />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password2">Confirm Password:</label>
                        <input type="text"
                            className={classnames("form-control", { "is-invalid": errors.password2 })}
                            name="password2"
                            placeholder="Enter password2..."
                            onChange={this.onChange} />
                        {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                    </div>

                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input type="text"
                            className={classnames("form-control", { "is-invalid": errors.fullName })}
                            name="fullName"
                            placeholder="Enter full name..."
                            onChange={this.onChange} />
                        {errors.fullName && (<div className="invalid-feedback">{errors.fullName}</div>)}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="text"
                            className={classnames("form-control", { "is-invalid": errors.phone })}
                            name="phone"
                            placeholder="Enter phone..."
                            onChange={this.onChange} />
                        {errors.phone && (<div className="invalid-feedback">{errors.phone}</div>)}
                    </div>

                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date Of Birth:</label>
                        <input type="date"
                            className={classnames("form-control", { "is-invalid": errors.dateOfBirth })}
                            name="dateOfBirth"
                            placeholder="Enter DOB..."
                            onChange={this.onChange} />
                        {errors.dateOfBirth && (<div className="invalid-feedback">{errors.dateOfBirth}</div>)}
                    </div>

                    <div className="form-group">
                        <label htmlFor="userType">User Type</label>
                        <select
                            className={classnames("form-control", { "is-invalid": errors.userType })}
                            name="userType" onChange={this.onChange}>
                            <option value="-1">Select User Type</option>
                            <option value="driver">Driver</option>
                            <option value="passenger">Passenger</option>
                        </select>
                        {errors.userType && (<div className="invalid-feedback">{errors.userType}</div>)}
                    </div>

                    <button className="btn btn-success btn-block">Submit</button>
                </form>
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