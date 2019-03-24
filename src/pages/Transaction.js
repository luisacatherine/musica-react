import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import Piano from '../img/img/home/piano.png';


const urlTransaksi = "http://localhost:5000/transaction"
const urlTransaction = "http://localhost:5000/transdetail"

class Transaction extends Component{

    constructor(props){
        super(props);
        this.state = {
            id_transaksi: 0,
            listTransaksi: []
		}
    }
    
    componentDidMount() {
        window.scrollTo(0, 0)
        const self = this;
        const token = localStorage.getItem("token");
        axios
            .get(urlTransaksi, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }, params: {
                    'status_transaksi': 0
                }
            })
            .then(function(response){
                self.setState({id_transaksi: response.data.transaction[0].id});
                axios
                .get(urlTransaction, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }, params: {
                        'transaction': response.data.transaction[0].id
                    }
                })
                .then(function(response){
                    self.setState({listTransaksi: response.data.transaction_details});
                    console.log(response.data)
                })
                .catch(function(error){
                    console.log(error)
                })        
            })
            .catch(function(error){
                console.log(error);
            });
    }
    
    render(){
        const {listTransaksi} = this.state;
        return(
            <div className='Transaction'>
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                    <h1 className="judul-kategori">Transaction</h1>
                </div>
                <div className="container barang">
                    <Breadcrumb />
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat">{this.state.listTransaksi.nama}</h4>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <table className="tabel-transaksi">
                                <tbody>
                                    <tr>
                                        <th scope="row"><span>Nama Pembeli</span></th>
                                        <td>:</td>
                                        <td><a href="profile.html">Luisa Catherine</a></td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><span>Alamat Email</span></th>
                                        <td>:</td>
                                        <td><span>luisacatherine@gmail.com</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><span>Alamat Pengiriman</span></th>
                                        <td>:</td>
                                        <td><span>Taman Kopo Indah II B2-16</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" style={{color: "white"}}>Metode Pembayaran</th>
                                        <td style={{color: "white"}}>:</td>
                                        <td>Kota Bandung</td>
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
                                        <td><span>Kartu Kredit</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><span>Status Pembayaran</span></th>
                                        <td>:</td>
                                        <td><span>Terverifikasi</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><span>Status Pengiriman</span></th>
                                        <td>:</td>
                                        <td><span>Telah sampai di tujuan</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><span>Status Transaksi</span></th>
                                        <td>:</td>
                                        <td>Selesai</td>
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
                                        <tr>
                                            <td> 
                                                <div className="gambar-produk">
                                                    <div className="imgProfile">
                                                        <img src="assets/img/produk/gitarc315-2.jpg"/>
                                                    </div>
                                                </div>            
                                            </td>
                                            <td><h6 className="heading-coklat">Gitar Yamaha C315</h6>
                                                <span className="nama-penjual">Qty: 2</span><br/>
                                                <span className="nama-penjual">Yamaha Music ID</span>
                                            </td>
                                            <td>
                                                <span>2 x Rp 750,000</span>
                                            </td>
                                            <td>
                                                <span className="harga-promo">Rp 1,500,000</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> 
                                                <div className="gambar-produk">
                                                    <div className="imgProfile">
                                                        <img src="assets/img/exp-gallery/phil-desforges-1322844-unsplash.jpg"/>
                                                    </div>
                                                </div>            
                                            </td>
                                            <td><h6 className="heading-coklat">Gitar Yamaha C315</h6>
                                                <span className="nama-penjual">Qty: 2</span><br/>
                                                <span className="nama-penjual">Yamaha Music ID</span>
                                            </td>
                                            <td>
                                                <span>2 x Rp 750,000</span>
                                            </td>
                                            <td>
                                                <span className="harga-promo">Rp 1,500,000</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" style={{textAlign: 'right', fontWeight: "600"}}>
                                                <span>Biaya Pengiriman:</span>
                                            </td>
                                            <td>
                                                <span className="harga-promo">Rp 22,000</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" style={{textAlign: 'right', fontWeight: "600"}}>
                                                <span>Total:</span>
                                            </td>
                                            <td>
                                                <span className="harga-promo">Rp 3,022,000</span>
                                            </td>    
                                        </tr>
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

export default Transaction
