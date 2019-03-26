import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import Piano from '../img/img/home/piano.png';
import CartItems from '../components/CartItems';
import { connect } from "unistore/react";
import { actions } from "../store";

class Cart extends Component{

    constructor(props){
        super(props);
        this.state = {
            id_transaksi: 0,
            listTransaksi: [],
            seller_name: '',
            transaksi: '',
            pilihanProvinsi: '',
            pilihanKota: '',
            pilihanPembayaran: 'cash',
            pilihanAlamat: '',
            urlTransaksi: this.props.baseUrl + '/transaction',
            urlCart: this.props.baseUrl + '/transdetail'
		}
    }
    
    componentDidMount() {
        window.scrollTo(0, 0)
        const self = this;
        const token = localStorage.getItem("token");
        axios
            .get(this.state.urlTransaksi, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }, params: {
                    'status_transaksi': 0
                }
            })
            .then(function(response){
                self.setState({id_transaksi: response.data.transaction[0].id});
                const transID = response.data.transaction[0].id

                axios({
                    method: 'get', 
                    url: self.state.urlCart, 
                    headers: { 'Authorization': 'Bearer ' + token }, 
                    params: {'transaction': transID}})
                .then(function(response){
                    self.setState({listTransaksi: response.data.transaction_details});
                })
                .catch(function(error){
                    console.log(error)
                })

                axios({ method: 'patch', url: self.state.urlTransaksi+'/' + transID, headers: { 'Authorization': 'Bearer ' + token } })
                .then(function(response){
                    self.setState({transaksi: response.data.transaction})
                })
                .catch(function(error){
                    console.log(error)
                })
            })
            .catch(function(error){
                console.log(error);
            });
        this.props.getProvinsi();
        this.props.getKota(this.state.pilihanProvinsi);
    }

    onProvinsiChange = e => {
        const self = this
        self.setState({pilihanProvinsi: e.target.value});
        this.props.getKota(e.target.value);
    }

    onKotaChange = e => {
        const self = this
        self.setState({pilihanKota: e.target.value})
    }

    onPembayaranChange = e => {
        const self = this
        self.setState({pilihanPembayaran: e.target.value})
    }

    onAlamatChange = e => {
        const self = this
        self.setState({pilihanAlamat: e.target.value})
    }
    
    render(){
        const {listTransaksi} = this.state;
        const {transaksi} = this.state;
        var list_provinsi=[];
        for(var i=0; i<this.props.data_provinsi.length; i++){
            list_provinsi.push(this.props.data_provinsi[i].nama_provinsi);
        }
        var list_kota=[];
        if (this.props.data_kota !== undefined){
            for(var j=0; j<this.props.data_kota.length; j++){
                list_kota.push(this.props.data_kota[j].nama_kota);
            }    
        }
        return(
            <div className='Cart'>
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}} alt='gambar-kategori'/>
                    <h1 className="judul-kategori">Cart</h1>
                </div>
                <div className="container barang">
                    <Breadcrumb link='/cart' judul={'Cart'} linkparents={'/'}/>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat">Cart</h4>
                            <hr/>
                        </div>
                    </div>
                    <div className="container-cart">
                        {listTransaksi.map((item, key) => {
                            return(
                                <CartItems key={key} id={item.product_id} harga={item.harga} qty={item.qty} nama={item.product_id} seller={item.seller_id} trans_id={item.id}/>
                            )
                        })}
                        <div className="row total-cart">
                            <div className="col-md-6 col-sm-6 col-12 text-center">
                                <span>Total: </span>
                            </div>
                            <div className="col-md-3 col-sm-3 col-6 cart-items red">
                                <span>{transaksi.total_item} barang</span>
                            </div>
                            <div className="col-md-3 col-sm-3 col-6 cart-items red">
                                <span>Rp {transaksi.total_harga}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container barang" style={{display: transaksi.total_item > 0 ? 'block' : 'none'}}>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat">Pengiriman dan Pembayaran</h4>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className='container-cart'>
                                <form onSubmit={e => e.preventDefault()}>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress">Address</label>
                                        <input type="text" className="form-control" id="inputAddress" onChange={e => this.onAlamatChange(e)}/>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputProvinsi">Provinsi</label>
                                            <select id="inputProvinsi" className="form-control" name="inputProvinsi" value={this.state.pilihanProvinsi} onChange={e => this.onProvinsiChange(e)}>
                                                <option></option>
                                                {list_provinsi.map((item, key) => {
                                                    return (
                                                        <option key={key} value={item}>{item}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputKota">Kota</label>
                                            <select id="inputKota" className="form-control" name="inputKota" value={this.state.pilihanKota} onChange={e => this.onKotaChange(e)}>
                                                <option></option>
                                                {list_kota.map((item, key) => {
                                                    return (
                                                        <option key={key} value={item}>{item}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPembayaran">Metode Pembayaran</label>
                                        <select id="inputPembayaran" className="form-control" name="inputPembayaran" value={this.state.pilihanPembayaran} onChange={e => this.onPembayaranChange(e)}>
                                            <option value="cash">Cash</option>
                                            <option value="transfer">Transfer</option>
                                            <option value="credit_card">Kartu Kredit</option>
                                        </select>
                                    </div>
                                    <Link to='/checkout'>
                                    <button type="submit" className="btn btn-warning" onClick={() => this.props.checkOut(this.state.id_transaksi, this.state.pilihanPembayaran, this.state.pilihanAlamat, this.state.pilihanKota)}>Check Out</button></Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("baseUrl, data_provinsi, data_kota", actions)(Cart);