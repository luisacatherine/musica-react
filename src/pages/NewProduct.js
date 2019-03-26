import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import Piano from '../img/img/home/piano.png';
import CartItems from '../components/CartItems';
import { connect } from "unistore/react";
import { actions } from "../store";

const token = localStorage.getItem("token");

class NewProduct extends Component {

    constructor(props){
        super(props);
        this.state = {
            pilihanKategori: ''
		}
    }

    componentDidMount(){
        window.scrollTo(0, 0)       
        this.props.getKategori();
    }

    onKategoriChange = e => {
        const self = this
        self.setState({pilihanKategori: e.target.value})
    }

    changeInput = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    postProduct = () => {
        const token = localStorage.getItem("token");
        const { nama_produk, photo_url, merkProduk, beratProduk, hargaProduk, hargaPromo, showProduk, deskripsiProduk, statusProduk, stokProduk, promoProduk } = this.state;
        const data = {
            kategori: this.state.pilihanKategori,
            nama: nama_produk,
            merk: merkProduk,
            harga: hargaProduk,
            status: statusProduk,
            stok: stokProduk,
            deskripsi_produk: deskripsiProduk,
            berat: beratProduk,
            promo: promoProduk,
            harga_promo: hargaPromo,
            show: showProduk,
            photo_url: photo_url
        };
        const self = this;
        console.log(data);
        axios
            .post(self.props.baseUrl + "/item", data, {
                headers: {
                'Authorization': 'Bearer ' + token
                }})
            .then(function(response){
                console.log(response.data);
                if (response.data.status === 'oke'){
                    self.props.history.push("/profile");
                } else {
                    alert(response.data.message);
                }
            })
            .catch(function(error){
                console.log(error);
            });
    }

    render(){
        var list_kategori=[];
        for(var i=0; i<this.props.data_kategori.length; i++){
            list_kategori.push(this.props.data_kategori[i].nama_kategori);
        }
        return(
            <div className="NewProduct">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                    <h1 className="judul-kategori">Tambah Produk</h1>
                </div>
                <div className="container barang">
                    <Breadcrumb link={'/newproduct'} judul={'Add New Product'} linkparents={'/'}/>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat">Tambah Produk</h4>
                            <hr/>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className="form-row">
                                    <div className="form-group col-md-9">
                                        <label htmlFor="namaProduk" className="col-form-label">Nama Produk:</label>
                                        <input type="text" className="form-control" id="namaProduk" name="nama_produk" onChange={e => this.changeInput(e)} required/>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="fotoProduk" className="col-form-label">URL Foto Produk:</label>
                                        <input type="text" className="form-control" id="fotoProduk" name="photo_url" onChange={e => this.changeInput(e)} required/>
                                    </div>
                    
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label htmlFor="kategori_produk" className="col-form-label">Kategori:</label>
                                        <select className="form-control" id="kategori_produk" name="kategori_produk" value={this.state.pilihanKategori} onChange={e => this.onKategoriChange(e)} required>
                                            {list_kategori.map((item, key) => {
                                                return (
                                                    <option key={key} value={item}>{item}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="merkProduk" className="col-form-label">Brand Produk:</label>
                                        <input type="text" className="form-control" id="merkProduk" name="merkProduk" onChange={e => this.changeInput(e)} required/>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="beratProduk" className="col-form-label">Berat Produk (gr):</label>
                                        <input type="text" className="form-control" id="beratProduk" name="beratProduk" onChange={e => this.changeInput(e)} required/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="hargaProduk" className="col-form-label">Harga Produk:</label>
                                        <input type="text" className="form-control" id="hargaProduk" name="hargaProduk" onChange={e => this.changeInput(e)} required/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="statusProduk" className="col-form-label">Status:</label>
                                        <select className="form-control" id="statusProduk" name="statusProduk" onChange={e => this.changeInput(e)} required>
                                            <option value="pre-order">Pre-order</option>
                                            <option value="ready">Ready Stock</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="stokProduk" className="col-form-label">Stok Produk:</label>
                                        <input type="text" className="form-control" id="stokProduk" name="stokProduk" onChange={e => this.changeInput(e)} required/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="deskripsiProduk" className="col-form-label">Deskripsi Produk:</label>
                                    <textarea className="form-control" id="deskripsiProduk" name="deskripsiProduk" rows="5" onChange={e => this.changeInput(e)} required></textarea>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="promoProduk" className="col-form-label">Promo:</label>
                                        <select className="form-control" id="promoProduk" name="promoProduk" onChange={e => this.changeInput(e)} required>
                                            <option value="true">Ya</option>
                                            <option value="false">Tidak</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="hargaPromo" className="col-form-label" >Harga Promo:</label>
                                        <input type="text" className="form-control" id="hargaPromo" name="hargaPromo" onChange={e => this.changeInput(e)} required/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="showProduk" className="col-form-label" >Tampilkan Produk:</label>
                                        <select className="form-control" id="showProduk" name="showProduk"onChange={e => this.changeInput(e)} required>
                                            <option value="true">Ya</option>
                                            <option value="false">Tidak</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="syaratSeller" required/>
                                    <label className="form-check-label" htmlFor="syaratSeller">Dengan ini saya menyatakan telah membaca serta menyetujui <a href="terms-seller.html">syarat dan ketentuan</a> yang berlaku</label>
                                </div>
                                <br/>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-lg btn-warning" onClick={() => this.postProduct()}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("data_kategori, baseUrl", actions)(NewProduct);