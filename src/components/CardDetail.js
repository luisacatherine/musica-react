import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/output.css'
// import '../style/App.css'
// import '../style/index.css'
import { connect } from 'unistore/react';
import Produk from '../img/img/produk/gitarc315-1.jpg'
// import { actions } from '../store';

class CardDetail extends Component {
    render(){
        return(
            <div className="col-lg-3 col-md-4 col-sm-6 col-6 produk-all">
                <div className="card">
                    <div className="gambar-produk">
                        <img className="card-img-top" src={Produk} alt="Card image cap"/>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title nama-barang">Card title</h5>
                        <span className="card-text harga-promo">Rp 7,980,000</span><br/>
                        <span className="card-text kota-penjual">Jakarta</span><br/>
                        <span className="card-text nama-penjual">Yamaha Music ID</span><br/>
                    </div>
                </div>            
            </div>
        )
    }
}

export default CardDetail