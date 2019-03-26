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
	
	componentDidMount = () => {
		this.props.getKategori()
	}

	render(){
		var list_kategori=[];
        for(var i=0; i<this.props.data_kategori.length; i++){
            list_kategori.push(this.props.data_kategori[i].nama_kategori);
        }
		const { showModal } = this.state;
		const is_login = JSON.parse(localStorage.getItem("is_login"));
		const status = localStorage.getItem("status");
		return(
			<div className="Header">
				<nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
					<Link to="/" className="navbar-brand">
						<img src={Logo} style={{ width: 'auto', height: '50px' }} className="d-inline-block align-top" alt=""/>
					</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarCollapse">
						<div className="navbar-nav">
							<div className="dropdown">
								<a className="nav-item nav-link dropdown-toggle mr-2" id="dropdownMenuCategory" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category</a>
								<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuCategory">
									{list_kategori.map((item, key) => {
										return (
											<Link key={key} to={"/category/" + item} className="dropdown-item">{item}</Link>
										)
									})}
								</div>
							</div>
						</div>
						<div className="searchbar">
							<form action='/search'>
								<div className="input-group">								
									<input type="text" name="q" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2"/>
									<div className="input-group-append">
										<button className="btn btn-outline-warning" type="submit"><i className="fa fa-search"></i></button>
									</div>
								</div>
							</form>
						</div>
						<ul className="navbar-nav flex-row ml-md-auto d-md-flex justify-content-center">
							<li className="nav-item cart" style={{ display: status==='user' ? 'inline-block' : 'none'}}>
								<Link to="/cart">
									<button type="button" className="btn btn-warning">
										<span className="fa fa-shopping-cart"></span> Cart
									</button>
								</Link>
							</li>
							<button id ="logIn" type="button" className="btn btn-outline-warning button-login" onClick={this.handleModalShowClick} data-toggle="modal" data-target="#modalLogIn" style={{ display: status === 'public' ? 'block' : 'none' }}>Log In</button>
							<Link to="/signup/user">
								<button id ="signUp" type="button" className="btn btn-outline-warning button-login" style={{ display: status === 'public' ? 'block' : 'none'}}>Sign Up</button>						
							</Link>
							<div className="dropdown">
								<a className="nav-item nav-link dropdown-toggle mr-2" id="dropdownMenuAdmin" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ display: status === 'admin' ? 'block' : 'none' }}>Admin Page </a>
								<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuAdmin">
									<Link to="/admin/transaction" className="dropdown-item" >Daftar Transaksi</Link>
									<Link to="/admin/items" className="dropdown-item" >Daftar Produk</Link>
									<Link to="/admin/seller" className="dropdown-item" >Daftar Penjual</Link>
									<Link to="/admin/user" className="dropdown-item" >Daftar Pembeli</Link>
									<Link to="/admin/category" className="dropdown-item" >Daftar Kategori</Link>
									<Link to="/admin/message" className="dropdown-item" >Pesan Masuk</Link>
								</div>
							</div>
							<div className="dropdown">
								<a className="nav-item nav-link dropdown-toggle mr-2" id="dropdownMenuAccount" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ display: status === 'user' || status === 'seller' || status === 'admin' ? 'block' : 'none' }}>My Account </a>
								<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuAccount">
									<Link to="/profile" className="dropdown-item" style={{ display: status === 'user' || status === 'seller' ? 'block' : 'none' }}>Profile</Link>
									<Link to='/' onClick={()=> this.postSignout()} style={{ display: is_login ? 'block' : 'none' }} className="dropdown-item">Log Out</Link>
								</div>
							</div>
						</ul>
					</div>
				</nav>
				{showModal ? (<ModalLogIn handleModalCloseClick={this.handleModalCloseClick} />) : null}
			</div>
		)
	}
};

export default connect("data_kategori", actions)(withRouter(Header));