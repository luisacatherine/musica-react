import React, { Component } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import TransItems from "../components/TransItems";
import Piano from '../img/img/home/piano.png';
import '../style/output.css';
import axios from 'axios';
import { connect } from "unistore/react";
import { actions } from "../store";


const token = localStorage.getItem("token");

class EditTransaction extends Component {

    constructor(props){
        super(props);
        this.state = {
            transaction_id: '',
            transaksi: '',
            listTransaksi: [],
            nama_user:'',
            nama_seller: '',
            urlTransaksi: this.props.baseUrl + '/transaction',
            urlCart: this.props.baseUrl + '/transdetail',
            urlPUser: this.props.baseUrl + '/public/user',
            urlPSeller: this.props.baseUrl + '/public/seller',
            status_transaksi: '',
            hasil: '',
            transaction_status: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        const {transaction_id} = this.props.match.params;
        this.setState({transaction_id: transaction_id})
        const self = this;

        axios({method: 'get', url: self.state.urlCart, headers: { 'Authorization': 'Bearer ' + token }, params: {'transaction': transaction_id}})
        .then(function(response){
            self.setState({listTransaksi: response.data.transaction_details});
        })
        .catch(function(error){
            console.log(error)
        })

        axios({ method: 'get', url: self.state.urlTransaksi+'/' + transaction_id, headers: { 'Authorization': 'Bearer ' + token } })
        .then(function(response){
            console.log(response.data)
            self.setState({transaksi: response.data.transaction})
            self.setState({transaction_status: response.data.transaction.status_transaksi})
            self.getUser(response.data.transaction.user_id)
            self.getSeller(response.data.transaction.seller_id)
            self.getStatus(response.data.transaction.status_transaksi)
        })
        .catch(function(error){
            console.log(error)
        })
    }

    getStatus(status){
        if (status === 1){
            this.setState({status_transaksi: "Menunggu konfirmasi pembayaran"})
        }
        else if (status === 2){
            this.setState({status_transaksi: "Pembayaran telah diterima, menunggu konfirmasi dari penjual"})
        }
        else if (status === 3){
            this.setState({status_transaksi: "Pesanan sedang diproses oleh penjual"})
        }
        else if (status === 4){
            this.setState({status_transaksi: "Pesanan sedang dalam pengiriman"})
        }
        else if (status === 5){
            this.setState({status_transaksi: "Pesanan sudah sampai di tujuan"})
        }
        else if (status === 6){
            this.setState({status_transaksi: "Transaksi selesai"})
        }
        else if (status === 7){
            this.setState({status_transaksi: "Transaksi dibatalkan"})
        }
        else if (status === 0){
            this.setState({status_transaksi: "User belum checkout"})
        }        
    }

    getUser = (id_user) => {
        const self = this;
        axios({ method: 'get', url: self.state.urlPUser + '/' + id_user})
        .then(function(response){
            console.log(response.data)
            self.setState({nama_user: response.data.user.name})
        })
        .catch(function(error){
            console.log(error)
        })
    }

    getSeller = (id_seller) => {
        const self = this;
        axios({ method: 'get', url: self.state.urlPSeller + '/' + id_seller})
        .then(function(response){
            console.log(response.data)
            self.setState({nama_seller: response.data.seller.name})
        })
        .catch(function(error){
            console.log(error)
        })
    }

    onStatusChange = e => {
        const self = this
        self.setState({transaction_status: e.target.value})
    }

    patchTransactionStatus = () => {
        const self = this
        axios({ method: 'patch', 
            url: self.state.urlTransaksi + '/' + this.state.transaction_id, 
            headers: { 'Authorization': 'Bearer ' + token },
            data: {'status_transaksi': this.state.transaction_status}
        })
        .then(function(response){
            if(response.data.status === 'oke'){
                self.props.history.push("/admin/transaction");
            }
            console.log(response.data)
        })
        .catch(function(error){
            console.log(error)
        })
    }

    render(){
        const {listTransaksi} = this.state;
        return(
            <div className="EditTransaction">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}} alt='gambar-kategori'/>
                    <h1 className="judul-kategori">Transaksi {this.state.transaction_id} </h1>
                </div>
                <div className="container barang">
                    <Breadcrumb link={'/Transaction' + this.state.transaction_id} judul={'Transaksi ' + this.state.transaction_id} linkparents={'/'}/>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat">Transaksi {this.state.transaction_id}</h4>
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
                                            <th scope="row"><span>Nama Penjual</span></th>
                                            <td>:</td>
                                            <td><span>{this.state.nama_seller}</span></td>
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
                                            <td>
                                                <form onSubmit={e => e.preventDefault()}>
                                                    <select className="form-control" id="bankSeller" name="bankSeller" value={this.state.transaction_status} onChange={e => this.onStatusChange(e)}>
                                                        <option value="1">Menunggu konfirmasi pembayaran</option>
                                                        <option value="2">Pembayaran telah diterima, menunggu konfirmasi dari penjual</option>
                                                        <option value="3">Pesanan sedang diproses oleh penjual</option>
                                                        <option value="4">Pesanan sedang dalam pengiriman</option>
                                                        <option value="5">Pesanan sudah sampai di tujuan</option>
                                                        <option value="6">Transaksi selesai</option>
                                                        <option value="7">Transaksi dibatalkan</option>
                                                    </select>
                                                    <button type="submit" className="btn btn-lg btn-warning" onClick={() => this.patchTransactionStatus()}>Submit</button>
                                                </form>
                                            </td>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect("baseUrl, data_provinsi, data_kota, data_status", actions)(EditTransaction);