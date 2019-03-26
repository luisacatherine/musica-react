import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import {Redirect} from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";
import Piano from '../img/img/home/piano.png';
import axios from 'axios';
import ListTransaksi from '../components/ListTransaksi';

class ProfilUser extends Component {
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            profil: [],
            urlUser: this.props.baseUrl + '/user',
            urlTransaksi: this.props.baseUrl + '/transaction',
            user_id:'',
            listTransaksi: []
		}
    }

    componentDidMount = () => {
        this._isMounted = true;
        window.scrollTo(0, 0)
        const self = this;
        const {user_id} = this.props.match.params
        self.setState({user_id: user_id})
        const token = localStorage.getItem("token");
        axios
            .get(self.state.urlUser + '/' + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(function(response){
                self.setState({profil: response.data.user});
                self.getTransaction(response.data.user.client_id)
            })
            .catch(function(error){
                console.log(error);
            });
    };

    componentWillUnmount = () => {
        this._isMounted = false;
    }
    
    getTransaction = (client_id) => {
        const token = localStorage.getItem("token");
        const self = this;
        axios
        .get(self.state.urlTransaksi, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: {'buyer_id': client_id }
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
        if(status !== 'admin'){
            return <Redirect to={{pathname: "/"}} />;
        } else {
            const email = localStorage.getItem("email");
            return(
                <div className="ProfilUser">
                    <div className="kategori-barang">
                        <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                        <h1 className="judul-kategori">Profil Pembeli</h1>
                    </div>
                    <div className="container barang">
                        <Breadcrumb link={'/user/' + this.state.user_id} judul={'Profil Pembeli' + this.state.user_id} linkparents={'/admin/user'} judulparents={'Daftar Pembeli'}/>
                    <div className="row">
                        <div className="col-8">
                            <h4 className="heading-coklat">Profil Pembeli</h4>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-4 col-sm-3 col-12">
                            <div className="gambar-produk">
                                <div className="imgProfilSeller">
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
                                            <td>User</td>
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
                            <h4 className="heading-coklat" style={{"marginTop": "20px", "marginBottom": "20px"}}>Transaksi Pembeli</h4>
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
                                            <th>Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.listTransaksi.map((item, key) => {
                                            return (
                                                <ListTransaksi key={key} id={item.id} user_id={item.user_id} seller_id={item.seller_id} tanggal={item.created_at} status_transaksi={item.status_transaksi}/>
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

export default connect("baseUrl", actions)(ProfilUser);