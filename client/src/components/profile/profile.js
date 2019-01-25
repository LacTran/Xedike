import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
    }

    onChange = (e) => {
        this.setState({
            file: e.target.file[0]
        }, () => {
            const formData = new FormData();

            formData.append('avatar', this.state.file)

            axios.post('http://localhost:5000/api/users/upload-avatar', formData)
                .then(() => {
                    window.location.reload();
                })
                .catch(console.log)
        })
    }

    render() {
        const { user } = this.props.auth
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src={`http://localhost:5000/${user.avatar}`}
                            alt="avatar"
                        />
                        <form>
                            <input
                                className="form-control"
                                type="file"
                                name="avatar"
                                onChange = {this.onChange}
                            />
                            <button className="btn btn-success btn-block">Submit</button>
                        </form>
                    </div>

                    <div className="col-md-6">

                    </div>
                </div>
            </div>
        );
    };
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Profile);