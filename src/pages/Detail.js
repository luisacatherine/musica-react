import React, { Component } from 'react';
import Filter from '../components/Filter';
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import Piano from '../img/img/home/piano.png';
import '../style/output.css';
import axios from 'axios'
import Other from '../components/Other'
import { connect } from "unistore/react";
import { actions } from "../store";


const urlItems = 'http://localhost:5000/item'
const urlKategori = 'http://localhost:5000/category'

class Detail extends Component {
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            allItems: [],
            itemSeller: [],
            items_id: '',
            jumlah: 1,
            ongkir: 0,
            kategori_barang: ''
		}
    }

    componentDidMount = () => {
        window.scrollTo(0, 0)
        this._isMounted = true;
        window.scrollTo(0, 0)
        this.getItems();
        this.props.getProvinsi();
        this.props.getKota('Jawa Barat');
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.match.params !== prevProps.match.params){
            window.scrollTo(0, 0)
            this.getItems();
        }
    };

    getItems = () => {
        const self = this;
        const {items_id} = this.props.match.params
        self.setState({items_id: items_id})
        console.log(items_id)
        axios
            .get(urlItems + '/' + items_id)
            .then(function(response){
                self.setState({allItems: response.data.items});
                self.getKategori(1)
                axios
                .get(urlItems, {
                    params: {
                        'seller_id': response.data.items.id_penjual,
                        'q': 6,
                        'excluded_id': items_id
                    }
                })
                .then(function(response){
                    self.setState({itemSeller: response.data.items});
                    console.log(response.data);
                })
                .catch(function(error){
                    console.log(error);
                })
            })
            .catch(function(error){
                console.log(error);
            });
    }

    getKategori = (id_kategori) => {
        const self = this;
        axios({ method: 'get', url: urlKategori + '/' + id_kategori})
        .then(function(response){
            self.setState({kategori_barang: response.data.kategori.nama_kategori})
        })
        .catch(function(error){
            console.log(error)
        })
    }

    hitungOngkir = (origin, destination, weight) => {
        const self = this;
        axios
        .get("http://localhost:5000/ongkir", {
            params: {
                origin: origin,
                destination: destination,
                weight: weight
            }
        })
        .then(function(response){
            console.log(response.data);
            if (response.data.status === 'oke'){
                self.setState({ongkir: response.data.ongkir})
            } else {
                alert(response.data.message);
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }

    onJumlahChange = e => {
        this.setState({
            jumlah: e.target.value
        });
    };

    onProvinsiChange = e => {
        const self = this
        self.setState({pilihanProvinsi: e.target.value});
        this.props.getKota(e.target.value);
    }

    onKotaChange = e => {
        const self = this
        self.setState({pilihanKota: e.target.value})
        this.hitungOngkir(this.state.allItems.seller_city, e.target.value, this.state.allItems.berat)
    }

    render(){
        const {itemSeller} = this.state;
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
            <div className="Detail">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                    <h1 className="judul-kategori">{this.state.kategori_barang}</h1>
                </div>
                <div className="container barang">
                    <Breadcrumb />
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat">{this.state.allItems.nama}</h4>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-12">
                            <div className="gambar-produk">
                                <img id="imgDisp" src={this.state.allItems.photo_url}/>
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-8 keterangan">
                            <div className="table-responsive">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Kategori: </th>
                                            <td>{this.state.kategori_barang}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Brand: </th>
                                            <td>{this.state.allItems.merk}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Harga: </th>
                                            <td><span className="harga-promo">Rp {this.state.allItems.harga_promo} </span><span className="harga-asli" style={{display : this.state.allItems.harga_promo === this.state.allItems.harga ? 'none' : 'inline-block'}}><s>Rp {this.state.allItems.harga}</s></span></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Status: </th>
                                            <td>{this.state.allItems.status === 'pre-order' ? 'Pre Order' : 'Ready Stock'}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Stok: </th>
                                            <td>{this.state.allItems.stok < 0 ? 0 : this.state.allItems.stok}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Berat: </th>
                                            <td>{this.state.allItems.berat} gr</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Penjual: </th>
                                            <td>{this.state.allItems.seller}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Dikirim dari: </th>
                                            <td>{this.state.allItems.seller_city}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Perkiraan ongkos kirim: </th>
                                            <td>
                                                <form onSubmit={e => e.preventDefault()}>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="inputProvinsi">Provinsi</label>
                                                            <select id="inputProvinsi" className="form-control" name="inputProvinsi" value={this.state.pilihanProvinsi} onChange={e => this.onProvinsiChange(e)}>
                                                                <option>Pilih Provinsi</option>
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
                                                                <option>Pilih Kota</option>
                                                                {list_kota.map((item, key) => {
                                                                    return (
                                                                        <option key={key} value={item}>{item}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    Rp {this.state.ongkir}
                                                </form>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Jumlah pembelian: </th>
                                            <td>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <select className="form-control" id="jumlahItem" name="banyakItem" onChange={e => this.onJumlahChange(e)}>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <button type="submit" className="btn btn-warning" onClick={() => this.props.addToCart(this.state.items_id, this.state.jumlah)}>
                                                            <span className="fa fa-shopping-cart"></span>Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card text-left">
                                <div className="card-header">
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <div className="nav" id="nav-tab" role="tablist">
                                            <a className="nav-item nav-link active" id="nav-deskripsi-tab" data-toggle="tab" href="#nav-deskripsi" role="tab" aria-controls="nav-deskripsi" aria-selected="true">Deskripsi Produk</a>
                                            <a className="nav-item nav-link" id="nav-diskusi-tab" data-toggle="tab" href="#nav-diskusi" role="tab" aria-controls="nav-diskusi" aria-selected="false">Diskusi Produk</a>
                                            <a className="nav-item nav-link" id="nav-review-tab" data-toggle="tab" href="#nav-review" role="tab" aria-controls="nav-review" aria-selected="false">Review</a>
                                        </div>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="nav-deskripsi" role="tabpanel" aria-labelledby="nav-deskripsi-tab">
                                            <p> {this.state.allItems.deskripsi_produk} </p>
                                        </div>
                                        <div className="tab-pane fade" id="nav-diskusi" role="tabpanel" aria-labelledby="nav-diskusi-tab">
                                            <form>
                                                <div className="form-group text-right">
                                                    <textarea className="form-control" id="kolomDiskusi" rows="2" placeholder="Ada pertanyaan? Diskusikan dengan penjual atau pengguna lain"></textarea>
                                                    <button type="submit" className="btn btn-warning" style={{marginTop: '10px'}}>Tanyakan</button>
                                                </div>
                                            </form>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-md-1 col-sm-2 col-2 text-center">
                                                    <img src="assets/img/photo.jpeg" width="100%" style={{borderRadius: '50%'}}/>
                                                </div>
                                                <div className="col-md-11 col-sm-10 col-10">
                                                    <h6 className="heading-coklat">Nama</h6>
                                                    <p className="tanggal-komentar"><i>9 Maret 2019, 14:37 WIB</i></p>
                                                    <p>Apakah barang ini bisa dikirim besok pagi?</p>
                                                    <hr/>
                                                    <div className="row" style={{paddingTop: '10px'}}>
                                                        <div className="col-md-1 col-sm-2 col-2 text-center">
                                                            <img src="assets/img/photo.jpeg" width="100%" style={{borderRadius: '50%'}}/>
                                                        </div>
                                                        <div className="col-md-11 col-sm-10 col-10">
                                                            <h6 className="heading-coklat">Yamaha Music ID</h6>
                                                            <p className="tanggal-komentar"><i>9 Maret 2019, 14:59 WIB</i></p>
                                                            <p>Bisa gan.. Silakan diorder</p>            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-md-1 col-sm-2 col-2 text-center">
                                                    <img src="assets/img/photo.jpeg" width="100%" style={{borderRadius: '50%'}}/>
                                                </div>
                                                <div className="col-md-11 col-sm-10 col-10">
                                                    <h6 className="heading-coklat">Nama</h6>
                                                    <p className="tanggal-komentar"><i>9 Maret 2019, 14:37 WIB</i></p>
                                                    <p>Apakah barang ini bisa dikirim besok pagi?</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab">
                                            <form>
                                                <div className="form-group text-right">
                                                    <textarea className="form-control" id="kolomDiskusi" rows="2" placeholder="Tuliskan ulasan Anda mengenai produk ini"></textarea>
                                                    <button type="submit" className="btn btn-warning" style={{marginTop: '10px'}}>Submit</button>
                                                </div>
                                            </form>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-md-1 col-sm-2 col-2 text-center">
                                                    <img src="assets/img/photo.jpeg" width="100%" style={{borderRadius: '50%'}}/>
                                                </div>
                                                <div className="col-md-11 col-sm-10 col-10">
                                                    <h6 className="heading-coklat">Alex</h6>
                                                    <p className="tanggal-komentar"><i>9 Maret 2019, 14:54 WIB</i></p>
                                                    <p>Gitar terbaik dengan harga terjangkau</p>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-md-1 col-sm-2 col-2 text-center">
                                                    <img src="assets/img/photo.jpeg" width="100%" style={{borderRadius: '50%'}}/>
                                                </div>
                                                <div className="col-md-11 col-sm-10 col-10">
                                                    <h6 className="heading-coklat">Agus</h6>
                                                    <p className="tanggal-komentar"><i>9 Maret 2019, 14:50 WIB</i></p>
                                                    <p>Pas, sesuai dengan harganya</p>
                                                </div>
                                            </div>        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container other-product">
                    <div className="row">
                        <div className="col-12">
                            <h6 className="heading-coklat">Produk lainnya dari toko ini</h6>
                        </div>
                    </div>
                    <div className="row">
                        {itemSeller.map((item, key) => {
                            return (
                                <Other key={key} id={item.id} gambar={item.photo_url} nama={item.nama} harga={item.harga_promo} toko={item.seller} kota={item.seller_city}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("data_provinsi, data_kota", actions)(Detail);