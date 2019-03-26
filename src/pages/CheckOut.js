import React, { Component } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import TransItems from "../components/TransItems";
import Piano from '../img/img/home/piano.png';
import '../style/output.css';
import axios from 'axios';
import { connect } from "unistore/react";
import { actions } from "../store";


const token = localStorage.getItem("token");
const email = localStorage.getItem("email");

class CheckOut extends Component {

    constructor(props){
        super(props);
        this.state = {
            id_transaksi: 0,
            listTransaksi: [],
            transaksi: '',
            nama_user:'',
            urlTransaksi: this.props.baseUrl + '/transaction',
            urlCart: this.props.baseUrl + '/transdetail',
            urlPUser: this.props.baseUrl + '/public/user'
		}
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        const self = this;
        axios
            .get(this.state.urlTransaksi, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }, params: {
                    'status_transaksi': 1
                }
            })
            .then(function(response){
                console.log(response.data)
                self.setState({id_transaksi: response.data.transaction[0].id});
                const transID = response.data.transaction[0].id
                axios({method: 'get', url: self.state.urlCart, headers: { 'Authorization': 'Bearer ' + token }, params: {'transaction': transID}})
                .then(function(response){
                    self.setState({listTransaksi: response.data.transaction_details});
                })
                .catch(function(error){
                    console.log(error)
                })

                axios({ method: 'get', url: self.state.urlTransaksi+'/' + transID, headers: { 'Authorization': 'Bearer ' + token } })
                .then(function(response){
                    self.setState({transaksi: response.data.transaction})
                    self.getUser(response.data.transaction.user_id)
                    self.props.getStatus(response.data.transaction.status_transaksi)
                })
                .catch(function(error){
                    console.log(error)
                })
            })
            .catch(function(error){
                console.log(error);
            });
    }

    getUser = (id_user) => {
        const self = this;
        axios({ method: 'get', url: self.state.urlPUser + '/' + id_user})
        .then(function(response){
            self.setState({nama_user: response.data.user.name})
        })
        .catch(function(error){
            console.log(error)
        })
    }

    render(){
        const {listTransaksi} = this.state;
        return(
            <div className="CheckOut">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}} alt="gambar-kategori"/>
                    <h1 className="judul-kategori">Terima Kasih!</h1>
                </div>
                <div className="container barang">
                    <Breadcrumb link={'/checkout'} judul={'Check Out'} linkparents={'/'}/>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat">Berikut rincian transaksi dan pembayaran yang harus Anda lakukan</h4>
                            <hr/>
                        </div>
                    </div>
                    <div className="container-cart">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <table className="tabel-transaksi">
                                    <tbody>
                                        <tr>
                                            <th scope="row"><span>Nama Pembeli</span></th>
                                            <td>:</td>
                                            <td>{this.state.nama_user}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><span>Alamat Email</span></th>
                                            <td>:</td>
                                            <td><span>{email}</span></td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><span>Alamat Pengiriman</span></th>
                                            <td>:</td>
                                            <td><span>{this.state.transaksi.alamat}</span></td>
                                        </tr>
                                        <tr>
                                            <th scope="row" style={{color: "white"}}></th>
                                            <td style={{color: "white"}}></td>
                                            <td>{this.state.transaksi.kota}</td>
                                        </tr> 
                                    </tbody>
                                </table>                   
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <table className="tabel-transaksi">
                                    <tbody>
                                        <tr>
                                            <th scope="row"><span>Metode Pembayaran</span></th>
                                            <td>:</td>
                                            <td><span>{this.state.transaksi.payment_method}</span></td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><span>Status Transaksi</span></th>
                                            <td>:</td>
                                            <td>{this.props.data_status.status}</td>
                                        </tr> 
                                    </tbody>
                                </table>            
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-12">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Item</th>
                                                <th>Harga</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {listTransaksi.map((item, key) => {
                                            return(
                                                <TransItems key={key} id={item.product_id} harga={item.harga} qty={item.qty} nama={item.product_id} seller={item.seller_id} />
                                            )
                                        })}
                                            <tr>
                                                <td colSpan="3" style={{textAlign: 'right', fontWeight: "600"}}>
                                                    <span>Biaya Pengiriman:</span>
                                                </td>
                                                <td>
                                                    <span className="harga-promo">Rp {this.state.transaksi.total_ongkir}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" style={{textAlign: 'right', fontWeight: "600"}}>
                                                    <span>Total:</span>
                                                </td>
                                                <td>
                                                    <span className="harga-promo">Rp {this.state.transaksi.total_harga + this.state.transaksi.total_ongkir}</span>
                                                </td>    
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p>Pembayaran secara cash dapat dilakukan melalui gerai Alfa***** dan Indo***** dengan membawa nomor transaksi</p>
                                <p>Pembayaran secara transfer dapat dilakukan ke virtual account Bank Bank dengan kode 1234 dan mencantumkan nomor transaksi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("baseUrl, data_provinsi, data_kota, data_status", actions)(CheckOut);