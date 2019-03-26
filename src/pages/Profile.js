import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {Redirect} from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";
import axios from 'axios';
import ListTransaksi from '../components/ListTransaksi';
import Breadcrumb from '../components/Breadcrumb';
import Piano from '../img/img/home/piano.png';
import ListItems from '../components/ListItems';

class Profile extends Component {
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            profil: [],
            urlSeller: this.props.baseUrl + '/seller',
            urlUser: this.props.baseUrl + '/user',
            urlTransaksi: this.props.baseUrl + '/transaction',
            urlItem: this.props.baseUrl + '/item',
            listTransaksi: [],
            listBarang: []
		}
    }

    componentDidMount = () => {
        this._isMounted = true;
        window.scrollTo(0, 0)
        const self = this;
        const token = localStorage.getItem("token");
        const status = localStorage.getItem("status");
        axios
            .get(status === 'user' ? self.state.urlUser : self.state.urlSeller, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(function(response){
                self.setState({profil: status === 'user' ? response.data.user : response.data.seller});
                self.getTransaction()
                if (status === 'seller'){
                    self.getItems()
                }
            })
            .catch(function(error){
                console.log(error);
            });
    };

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    getItems = () => {
        const self = this;
        axios
        .get(self.state.urlItem, {
            params: {
                'showall': true,
                'seller_id': self.state.profil.client_id
        }})
        .then(function(response){
            self.setState({listBarang: response.data.items});
        })
        .catch(function(error){
            console.log(error)
        })
    }

    getTransaction = () => {
        const token = localStorage.getItem("token");
        const self = this;
        axios
        .get(self.state.urlTransaksi, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function(response){
            self.setState({listTransaksi: response.data.transaction});
        })
        .catch(function(error){
            console.log(error)
        })
    }

    render(){
        const status = localStorage.getItem("status");
        if(status !== 'user' && status !== 'seller'){
            return <Redirect to={{pathname: "/"}} />;
        } else {
            const email = localStorage.getItem("email");
            return(
                <div className="Profile">
                    <div className="kategori-barang">
                        <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                        <h1 className="judul-kategori">Profil Saya</h1>
                    </div>
                    <div className="container barang">
                        <Breadcrumb link={'/profile'} judul={'Profil Saya'} linkparents={'/'} />
                    <div className="row">
                        <div className="col-8">
                            <h4 className="heading-coklat">Profil Saya</h4>
                        </div>
                        <div className="col-4 text-right align-bottom">
                            <Link to={status === 'seller' ? '/edit/seller/'+ this.state.profil.id : '/edit/user/'+ this.state.profil.id} >
                                <span className="heading-coklat">Edit profil</span>
                            </Link>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-4 col-sm-3 col-12">
                            <div className="gambar-produk">
                                <div className="imgProfile">
                                    <img src={this.state.profil.photo_url}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-9 col-12 keterangan">
                            <div className="table-responsive">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Nama: </th>
                                            <td>{this.state.profil.name}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tanggal Lahir: </th>
                                            <td>{this.state.profil.date_of_birth}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Jenis Kelamin: </th>
                                            <td>{this.state.profil.gender === 'f' ? 'Perempuan' : 'Laki-Laki'}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Email: </th>
                                            <td>{email}</td>
                                        </tr>    
                                        <tr>
                                            <th scope="row">Alamat: </th>
                                            <td>{this.state.profil.alamat}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kota: </th>
                                            <td>{this.state.profil.kota}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Bergabung sejak: </th>
                                            <td>{this.state.profil.created_at}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Status: </th>
                                            <td>{status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat" style={{"marginTop": "20px", "marginBottom": "20px"}}>Transaksi Saya</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="table-responsive text-center">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Penjual</th>
                                            <th>Pembeli</th>
                                            <th>Tanggal Transaksi</th>
                                            <th>Status Transaksi</th>
                                            <th style={{display : status === 'user' ? 'none': 'table-cell'}}>Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.listTransaksi.map((item, key) => {
                                            return (
                                                <ListTransaksi key={key} id={item.id} seller_id={item.seller_id} user_id={item.user_id} tanggal={item.created_at} status_transaksi={item.status_transaksi}/>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>                        
                        </div>
                    </div>
                    <div className="row" style={{display: status === 'seller' ? 'flex' : 'none'}}>
                        <div className="col-8">
                            <h4 className="heading-coklat">Produk Saya</h4>
                        </div>
                        <div className="col-4 text-right align-bottom">
                            <Link to='/newproduct' >
                                <span className="heading-coklat">+ Tambah Produk</span>
                            </Link>
                        </div>
                    </div>
                    <div className="row" style={{display: status === 'seller' ? 'block' : 'none'}}>
                        <div className="col-12">
                            <div className="table-responsive text-center">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>Kategori</th>
                                            <th>Penjual</th>
                                            <th>Stok</th>
                                            <th>Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.listBarang.map((item, key) => {
                                            return (
                                                <ListItems key={key} nama={item.nama} id={item.id} seller={item.item_seller.name} category={item.item_category.nama_kategori} stok={item.stok}/>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
    }
};

export default connect("baseUrl", actions)(Profile);