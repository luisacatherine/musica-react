import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import Piano from '../img/img/home/piano.png';
import CartItems from '../components/CartItems';
import { connect } from "unistore/react";
import { actions } from "../store";

const token = localStorage.getItem("token");

class EditProduct extends Component {

    constructor(props){
        super(props);
        this.state = {
            pilihanKategori: '',
            items_id: '',
            urlItem: this.props.baseUrl + '/item',
            currentItem: '',
            currentShow: '',
            currentPromo: '',
            currentStatus: '',
            currentDescription: ''
        }
        
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        const self = this;
        const {items_id} = this.props.match.params;
        self.setState({items_id: items_id})
        this.getProduct(items_id);
        this.props.getKategori();
    }

    onKategoriChange = e => {
        const self = this
        self.setState({pilihanKategori: e.target.value})
    }

    onShowChange = e => {
        const self = this
        self.setState({currentShow: e.target.value})
    }

    onPromoChange = e => {
        const self = this
        self.setState({currentPromo: e.target.value})
    }

    onStatusChange = e => {
        const self = this
        self.setState({currentStatus: e.target.value})
    }

    changeDescription = e => {
        const self = this
        self.setState({currentDescription: e.target.value})
    }

    changeInput = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    getCategoryName = (category_id) => {
        const self = this;
        axios({
            method: 'get',
            url: this.state.urlKategori + '/' + category_id
        })
        .then(function(response){
            self.setState({pilihanKategori: response.data.kategori.nama_kategori})
        })
        .catch(function(error){
            console.log(error)
        })

    }

    getProduct = (items_id) => {
        const self = this;
        axios({ 
            method: 'get', 
            url: this.state.urlItem + '/' + items_id})
        .then(function(response){
            self.setState({currentItem: response.data.items});
            self.setState({currentShow: response.data.items.show});
            self.setState({currentPromo: response.data.items.promo});
            self.setState({currentStatus: response.data.items.status});
            self.setState({currentDescription: response.data.items.deskripsi_produk});
            this.getCategoryName(response.data.items.id_kategori);
        })
        .catch(function(error){
            console.log(error)
        })
    }

    putProduct = () => {
        const status = localStorage.getItem("status");
        const { nama_produk, photo_url, merkProduk, beratProduk, hargaProduk, hargaPromo, stokProduk} = this.state;
        const data = {
            kategori: this.state.pilihanKategori,
            nama: nama_produk,
            merk: merkProduk,
            harga: hargaProduk,
            status: this.state.currentStatus,
            stok: stokProduk,
            deskripsi_produk: this.state.currentDescription,
            berat: beratProduk,
            promo: this.state.currentPromo,
            harga_promo: hargaPromo,
            show: this.state.currentShow,
            photo_url: photo_url
        };
        const self = this;
        console.log(data);
        axios
            .put(this.state.urlItem + '/' + this.state.items_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }})
            .then(function(response){
                console.log(response.data);
                if (response.data.status === 'oke'){
                    if (status == 'admin'){
                        self.props.history.push("/admin/items");
                    } else if (status == 'seller'){
                        self.props.history.push("/profile")
                    }
                } else {
                    alert(response.data.message);
                }
            })
            .catch(function(error){
                console.log(error);
            });
    }

    render(){
        const { currentItem } = this.state;
        var list_kategori=[];
        for(var i=0; i<this.props.data_kategori.length; i++){
            list_kategori.push(this.props.data_kategori[i].nama_kategori);
        }
        return(
            <div className="EditProduct">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                    <h1 className="judul-kategori">Edit Produk</h1>
                </div>
                <div className="container barang">
                    <Breadcrumb link={'/editproduct/' + this.state.items_id} judul={'Edit Product'} linkparents={'/'}/>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat">Edit Produk</h4>
                            <hr/>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className="form-row">
                                    <div className="form-group col-md-9">
                                        <label htmlFor="namaProduk" className="col-form-label">Nama Produk:</label>
                                        <input type="text" className="form-control" id="namaProduk" name="nama_produk" defaultValue={currentItem.nama} onChange={e => this.changeInput(e)}/>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="fotoProduk" className="col-form-label">URL Foto Produk:</label>
                                        <input type="text" className="form-control" id="fotoProduk" name="photo_url" defaultValue={currentItem.photo_url} onChange={e => this.changeInput(e)}/>
                                    </div>
                    
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label htmlFor="kategori_produk" className="col-form-label">Kategori:</label>
                                        <select className="form-control" id="kategori_produk" name="kategori_produk" value={this.state.pilihanKategori} onChange={e => this.onKategoriChange(e)}>
                                            {list_kategori.map((item, key) => {
                                                return (
                                                    <option key={key} value={item}>{item}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="merkProduk" className="col-form-label">Brand Produk:</label>
                                        <input type="text" className="form-control" id="merkProduk" name="merkProduk" defaultValue={currentItem.merk} onChange={e => this.changeInput(e)}/>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="beratProduk" className="col-form-label">Berat Produk (gr):</label>
                                        <input type="text" className="form-control" id="beratProduk" name="beratProduk" defaultValue={currentItem.berat} onChange={e => this.changeInput(e)}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="hargaProduk" className="col-form-label">Harga Produk:</label>
                                        <input type="text" className="form-control" id="hargaProduk" name="hargaProduk" defaultValue={currentItem.harga} onChange={e => this.changeInput(e)}/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="statusProduk" className="col-form-label">Status:</label>
                                        <select className="form-control" id="statusProduk" value={this.state.currentStatus} name="statusProduk" onChange={e => this.onStatusChange(e)}>
                                            <option value="pre-order">Pre-order</option>
                                            <option value="ready">Ready Stock</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="stokProduk" className="col-form-label">Stok Produk:</label>
                                        <input type="text" className="form-control" id="stokProduk" name="stokProduk" defaultValue={currentItem.stok} onChange={e => this.changeInput(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="deskripsiProduk" className="col-form-label">Deskripsi Produk:</label>
                                    <textarea className="form-control" id="deskripsiProduk" name="deskripsiProduk" rows="5" value={this.state.currentDescription} onChange={e => this.changeDescription(e)}></textarea>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="promoProduk" className="col-form-label">Promo:</label>
                                        <select className="form-control" id="promoProduk" name="promoProduk" value={this.state.currentPromo} onChange={e => this.onPromoChange(e)}>
                                            <option value="true">Ya</option>
                                            <option value="false">Tidak</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="hargaPromo" className="col-form-label" >Harga Promo:</label>
                                        <input type="text" className="form-control" id="hargaPromo" name="hargaPromo" defaultValue={currentItem.harga_promo} onChange={e => this.changeInput(e)}/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="showProduk" className="col-form-label" >Tampilkan Produk:</label>
                                        <select className="form-control" id="showProduk" name="showProduk" value={this.state.currentShow} onChange={e => this.onShowChange(e)}>
                                            <option value="true">Ya</option>
                                            <option value="false">Tidak</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="syaratSeller"/>
                                    <label className="form-check-label" htmlFor="syaratSeller">Dengan ini saya menyatakan telah membaca serta menyetujui <a href="terms-seller.html">syarat dan ketentuan</a> yang berlaku</label>
                                </div>
                                <br/>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-lg btn-warning" onClick={() => this.putProduct()}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("baseUrl, data_kategori", actions)(EditProduct);