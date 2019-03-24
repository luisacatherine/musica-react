import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/output.css'
import Logo from '../img/logo/logo-min.png';
import ModalLogIn from './ModalLogin';
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
		if (localStorage.getItem('status') === undefined){
			localStorage.setItem("status", 'public');
			localStorage.setItem("token", '');
			localStorage.setItem("email", '');	
		}
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

	postSignout = () => {
		localStorage.removeItem("is_login");
		localStorage.setItem("token", '');
		localStorage.setItem("status", 'public');
		localStorage.setItem("email", '');
        this.props.history.push("/");
    };

	render(){
		const { showModal } = this.state;
		const is_login = JSON.parse(localStorage.getItem("is_login"));
		const status = localStorage.getItem("status");
		const email = localStorage.getItem("email");
		const token = localStorage.getItem("token");
		return(
			<div className="Header">
				<nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
					<Link to="/" className="navbar-brand">
						<img src={Logo} style={{ width: 'auto', height: '50px' }} className="d-inline-block align-top" alt=""/>
						{/* <Link to='/' className='nav-link'></Link> */}
					</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarCollapse">
						<div className="navbar-nav">
							<div className="dropdown">
								<a className="nav-item nav-link dropdown-toggle mr-md-2" href="#" data-toggle="dropdown">Category </a>
								<div className="dropdown-menu">
									<Link to="/category/Violin" className="dropdown-item">Violin</Link>
									<Link to="/category/Saxophone" className="dropdown-item">Saxophone</Link>
									<Link to="/category/Piano" className="dropdown-item">Piano</Link>
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
                            <li className="nav-item cart" style={{ display: status==='user' ? 'inline-block' : 'none'}}>
								<Link to="/cart">
									<button type="button" className="btn btn-warning">
										<span className="fa fa-shopping-cart"></span> Cart <span className="badge badge-light">40</span>
									</button>
								</Link>
                            </li>
							<button id ="logIn" type="button" className="btn btn-outline-warning button-login" onClick={this.handleModalShowClick} data-toggle="modal" data-target="#modalLogIn" style={{ display: status === 'public' ? 'block' : 'none' }}>Log In</button>
							<button id ="signUp" type="button" className="btn btn-outline-warning button-login" style={{ display: status === 'public' ? 'block' : 'none'}}>Sign Up</button>
							{/* <Link id ="logIn" className="dropdown-item" href="#modalLogIn" onClick={this.handleModalShowClick} data-toggle="modal" data-target="#modalLogIn" style={{ display: status === 'public' ? 'block' : 'none' }}>Log In</Link>
							<Link id ="signUp" className="dropdown-item" href="#modalSignUp" data-toggle="modal" data-target="#modalSignUp" style={{ display: status === 'public' ? 'block' : 'none' }}>Sign Up</Link> */}
							<a className="nav-item nav-link dropdown-toggle mr-2" href="#" data-toggle="dropdown" style={{ display: status === 'user' || status === 'seller' ? 'block' : 'none' }}>My Account </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <Link to="/profile" className="dropdown-item" style={{ display: is_login ? 'block' : 'none' }}>Profile</Link>
                                <Link to='/' onClick={()=> this.postSignout()} style={{ display: is_login ? 'block' : 'none' }} className="dropdown-item">Log Out</Link>
                            </div>
						</ul>
					</div>
				</nav>
				{showModal ? (<ModalLogIn handleModalCloseClick={this.handleModalCloseClick} />) : null}
			</div>
		)
	}
};

export default connect(actions)(withRouter(Header));