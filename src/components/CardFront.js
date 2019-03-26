import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/output.css';
import { connect } from 'unistore/react';
import { actions } from '../store';

class CardFront extends Component {
    
    truncate = (s) => {
        if (s.length > 150)
            return s.slice(0, 150);
        else
            return s; 
    }

    render(){
        const status = localStorage.getItem("status");
        return(
            <div className="col-md-4 col-sm-6 col-6">
                <div className="flip-container">
                    <div className="flipper">
                        <div className="front">
                            <div className="gambar-front">
                                <img className="card-img-top" src={this.props.gambar} alt="Card image cap"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title nama-barang">{this.props.nama}</h5>
                                <span className="card-text harga-promo">Rp {this.props.harga_promo} </span>
                                <span className="card-text harga-asli"><s>Rp {this.props.harga}</s></span><br/><br/>
                                <span className="card-text kota-penjual">{this.props.seller_city}</span><br/>
                                <span className="card-text nama-penjual">{this.props.seller}</span><br/>
                            </div>
                        </div>
                        <div className="back">
                            <h5 className="card-title nama-barang">{this.props.nama}</h5>
                            <p className="deskripsi-depan">{this.truncate(this.props.deskripsi)}</p>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <Link to={"/items/" + this.props.id}>
                                    <button type="button" className="btn btn-outline-warning">
                                        <span className="fa fa-search"></span> Lihat Detail
                                    </button>
                                </Link>
                                <button type="button" className="btn btn-outline-warning" style={{display: status === 'user' ? 'block' : 'none'}} onClick={() => this.props.addToCart(this.props.id, 1)}>
                                    <span className="fa fa-shopping-cart"></span> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CardFront.propTypes = {
    id: PropTypes.number,
    gambar: PropTypes.string,
    nama: PropTypes.string,
    harga_promo: PropTypes.number,
    harga: PropTypes.number,
    seller: PropTypes.string,
    seller_city: PropTypes.string,
    deskripsi: PropTypes.string
}

export default connect("baseUrl", actions)(CardFront);