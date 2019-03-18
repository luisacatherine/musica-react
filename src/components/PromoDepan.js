import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../style/w3.css'
import '../style/output.css'
import CardFront from './CardFront';
// import '../style/App.css'
// import '../style/index.css'
import { connect } from 'unistore/react';
import Produk from '../img/img/produk/gitarc315-1.jpg'
// import { actions } from '../store';

class PromoDepan extends Component {
    render(){
        return(
            <div className="container promo">
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-6">
                        <h4 className="heading-coklat judul-promo">Promo</h4>
                    </div>
                    <div className="col-md-6 col-sm-6 col-6 text-right">
                        <a href="view.html" className="heading-coklat judul-promo">Lihat Semua</a>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-6">
                        <CardFront />
                    </div>
                    <div className="col-md-4 col-sm-6 col-6">
                        <CardFront />
                    </div>
                    <div className="col-md-4 col-sm-6 col-6">
                        <CardFront />
                    </div>
                </div>
            </div>  
        )
    }
}

export default PromoDepan;

