import React, { Component } from 'react';
// import classnames from 'classnames';
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
  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = { email, password }

    this.props.login(user, this.props.history);

  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value]
    })
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="text"
                // className={classnames("form-control", { "is-invalid": errors.email })}
                name="email"
                placeholder="Enter email..."
                onChange={this.onChange}
                value={email}
              />
              {/* {errors.email && (<div className="invalid-feedback">{errors.email}</div>)} */}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="text"
                // className={classnames("form-control", { "is-invalid": errors.password })}
                name="password"
                placeholder="Enter password..."
                onChange={this.onChange}
                value={password}
              />
              {/* {errors.password && (<div className="invalid-feedback">{errors.password}</div>)} */}
            </div>
            <button className="btn btn-success btn-block">Submit</button>
          </form>
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

export default connect(mapStateToProps, { login })(Login);