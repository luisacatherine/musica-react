import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import '../style/output.css'
import {withRouter} from "react-router-dom";
import { connect } from 'unistore/react';
import { actions } from '../store';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

class ModalLogIn extends Component{
    state = {email: "", password: ""};

    componentDidMount() {
		const { handleModalCloseClick } = this.props;
		$(this.modal).modal('show');
		$(this.modal).on('hidden.bs.modal', handleModalCloseClick);
	}
  
	handleCloseClick() {
		const { handleModalCloseClick } = this.props;
		$(this.modal).modal('hide');
		handleModalCloseClick();
    }
    
    changeInput = e => {
        this.setState({[e.target.name]: e.target.value});
    };

	doLogIn = () => {
        this.props.postLogin().then(() => {
            $(this.modal).modal('hide');
            this.props.history.push("/")
        });
    }

    signIn = () => {
        const { email, password } = this.state;
        const data = {
            email: email,
            password: password
        };
        const self = this;
        axios
            .post(this.props.baseUrl + "/login", data)
            .then(function(response){
                if (response.data.status === 'oke'){
                    localStorage.setItem("is_login", true);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("email", response.data.email);
                    localStorage.setItem("status", response.data.user_status);
                    self.props.history.push("/profile");
                } else {
                    alert(response.data.message);
                }
            })
            .catch(function(error){
                console.log(error);
            });
        $(this.modal).modal('hide');
    }
 
    render(){
        return(
            <div className="modal fade" ref={modal=> this.modal = modal} id="modalLogIn" tabIndex="-1" role="dialog" aria-labelledby="modalLogInTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitleLogIn">Log In</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
							<form onSubmit={e => e.preventDefault()} noValidate>
                                <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">Email:</label>
                                    <input type="email" name="email" className="form-control" id="email" onChange={e => this.changeInput(e)} required/>
                                    <div className="valid-feedback">Success! You've done it.</div>
                                    <div className="invalid-feedback">No, you missed this one.</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="col-form-label">Password:</label>
                                    <input type="password" name="password" className="form-control" id="password" onChange={e => this.changeInput(e)} required/>
                                    <div className="valid-feedback">Success! You've done it.</div>
                                    <div className="invalid-feedback">No, you missed this one.</div>
                                </div>
                            </form>
                            <span>Belum mempunyai akun? </span><Link to="/signup/user">Daftar sekarang</Link>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-warning" onClick={() => this.signIn()}>Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("is_login, baseUrl", actions)(withRouter(ModalLogIn));