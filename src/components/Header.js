import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/output.css'
import Logo from '../img/logo/logo-min.png';
import ModalLogin from './ModalLogin';
import {withRouter} from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

class Header extends Component{

	constructor(props) {
		super(props);
		this.handleModalShowClick = this.handleModalShowClick.bind(this);
		this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
		this.state = {
			showModal: false,
		}
	}
	
	handleModalShowClick(e) {
		e.preventDefault();
		this.setState({
		  showModal: true
		})
	}
	
	handleModalCloseClick() {
		this.setState({
		  showModal: false
		})
	}

	render(){
		const { showModal } = this.state;
		return(
			<div className="Header">
				<nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
					<a className="navbar-brand" href="index.html">
						<img src={Logo} style={{ width: 'auto', height: '50px' }} className="d-inline-block align-top" alt=""/>
					</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarCollapse">
						<div className="navbar-nav">
							<div className="dropdown">
								<a className="nav-item nav-link dropdown-toggle mr-md-2" href="#" data-toggle="dropdown">Category </a>
								<div className="dropdown-menu">
									<a className="dropdown-item" href="#">String</a>
									<a className="dropdown-item" href="#">Wind</a>
									<a className="dropdown-item" href="#">Piano</a>
								</div>
							</div>
						</div>
						<div className="searchbar">
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2"/>
								<div className="input-group-append">
									<button className="btn btn-outline-warning" type="submit"><i className="fa fa-search"></i></button>
								</div>
							</div>
						</div>
						<ul className="navbar-nav flex-row ml-md-auto d-md-flex justify-content-center">
							<li className="nav-item dropdown">
								<a className="nav-item nav-link dropdown-toggle mr-2" href="#" data-toggle="dropdown">My Account </a>
								<div className="dropdown-menu dropdown-menu-right">
									<a id ="logIn" className="dropdown-item" href="#modalLogIn" onClick={this.handleModalShowClick} data-toggle="modal" data-target="#modalLogIn">Log In</a>
									<a id ="signUp" className="dropdown-item" href="#modalSignUp" data-toggle="modal" data-target="#modalSignUp">Sign Up</a>
									<a className="dropdown-item" href="profile.html">Profile</a>
									<a className="dropdown-item" href="#">Log Out</a>
								</div>
							</li>
							<li className="nav-item cart">
								<button type="button" className="btn btn-warning">
									<span className="fa fa-shopping-cart"></span> Cart <span className="badge badge-light">40</span>
								</button>
							</li>
						</ul>
					</div>
				</nav>
				{showModal ? (<ModalLogIn handleModalCloseClick={this.handleModalCloseClick} />) : null}
			</div>
		)
	}
};

class ModalLogIn extends Component{
    constructor (props){
        super(props);
    }

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

	doLogIn = () => {
        this.props.postLogin().then(() => {
            console.log("this", this);
            // this.props.history.replace("/profile")
        });
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
							<form onSubmit={e => e.preventDefault()}>
                                <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">Email:</label>
                                    <input type="email" name="username" className="form-control" id="email" onChange={e => this.props.setField(e)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="col-form-label">Password:</label>
                                    <input type="password" name="password" className="form-control" id="password" onChange={e => this.props.setField(e)}/>
                                </div>
                            </form>
                            <span>Belum mempunyai akun? </span><a href="#modalSignUp" data-toggle="modal" data-target="#modalSignUp" data-dismiss="modal">Daftar sekarang</a>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-warning" onClick={() => this.doLogIn()}>Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("is_login", actions)(withRouter(Header));