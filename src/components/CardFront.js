import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/output.css'
// import '../style/App.css'
// import '../style/index.css'
import { connect } from 'unistore/react';
import Produk from '../img/img/produk/gitarc315-1.jpg'
// import { actions } from '../store';

class CardFront extends Component {
    render(){
        return(
            <div className="flip-container">
                <div className="flipper">
                    <div className="front">
                        <div className="gambar-produk">
                            <img className="card-img-top" src={Produk} alt="Card image cap"/>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title nama-barang">Gitar Yamaha C315</h5>
                            <span className="card-text harga-promo">Rp 750,000</span>
                            <span className="card-text harga-asli"><s>Rp 850,000</s></span><br/><br/>
                            <span className="card-text kota-penjual">Jakarta</span><br/>
                            <span className="card-text nama-penjual">Yamaha Music ID</span><br/>
                        </div>
                    </div>
                    <div className="back">
                        <h5 className="card-title nama-barang">Gitar Yamaha C315</h5>
                        <p className="deskripsi-depan">
                            Body Hasil Akhir Gloss <br/>
                            String Skala String 650 mm (25 9/16") <br/>
                            Kedalaman Body 94-100 mm (3 11/16"-3 15/16") <br/>
                            Lebar Papan Jari (Nut/Body) 52 mm (2 1/16") <br/>
                            Atas Spruce <br/>
                            Belakang Agathis <br/>
                            Sisi Samping Agathis <br/>
                            Leher Nato <br/>
                            Papan Jari Nato <br/>
                            Pegangan Nato 
                        </p>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-outline-warning">
                                <span className="fa fa-search"></span> Lihat Detail</button>
                            <button type="button" className="btn btn-outline-warning">
                                <span className="fa fa-shopping-cart"></span> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardFront