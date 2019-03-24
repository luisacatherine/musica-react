import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";
import axios from 'axios'

const urlSeller = 'http://localhost:5000/seller'
const urlUser = 'http://localhost:5000/user'

class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            profil: []
		}
    }

    componentDidMount = () => {
        window.scrollTo(0, 0)
        const self = this;
        const token = localStorage.getItem("token");
        const status = localStorage.getItem("status");
        axios
            .get(status === 'user' ? urlUser : urlSeller, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(function(response){
                self.setState({profil: status === 'user' ? response.data.user : response.data.seller});
            })
            .catch(function(error){
                console.log(error);
            });
    };

    render(){
        const status = localStorage.getItem("status");
        if(status !== 'user' && status !== 'seller'){
            return <Redirect to={{pathname: "/"}} />;
        } else {
            const email = localStorage.getItem("email");
            return(
                <div className="Profile">
                    <div className="container profil-user">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb lokasi">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Profil</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat">Profil Saya</h4>
                            <hr/>
                        </div>
                    </div>
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
                                            <th scope="row">Jumlah transaksi: </th>
                                            <td>15</td>
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
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nomor Transaksi</th>
                                            <th>Tanggal Transaksi</th>
                                            <th>Status Transaksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><a href="transaction.html"> 0001/musica/2019/03/09/111</a></td>
                                            <td>9 Maret 2019</td>
                                            <td>Transaksi selesai</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td><a href="transaction.html"> 0002/musica/2019/03/09/111</a></td>
                                            <td>9 Maret 2019</td>
                                            <td>Menunggu konfirmasi pembayaran</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td><a href="transaction.html"> 0003/musica/2019/03/09/111</a></td>
                                            <td>9 Maret 2019</td>
                                            <td>Pesanan sedang diproses oleh penjual</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td><a href="transaction.html"> 0004/musica/2019/03/09/111</a></td>
                                            <td>9 Maret 2019</td>
                                            <td>Pesanan sedang dalam pengiriman</td>
                                        </tr>    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <nav aria-label="Navigasi Data Transaksi">
                        <ul className="pagination justify-content-end">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" tabIndex="-1">Previous</a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>   
                </div>
            </div>
            )
        }
    }
};

export default connect(actions)(Profile);