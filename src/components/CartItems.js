import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/output.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions } from "../store";

class CartItems extends Component {

    constructor(props){
        super(props);
        this.state = {
            item: '',
            seller_name: '',
            urlItems: this.props.baseUrl + '/item',
            urlPSeller: this.props.baseUrl + '/public/seller',
            urlTransDetail: this.props.baseUrl + '/transdetail/'
		}
    }

    componentDidMount = () => {
        const self = this;
        axios
            .get(self.state.urlItems + '/' + this.props.id)
            .then(function(response){
                self.setState({item: response.data.items})
            })
            .catch(function(error){
                console.log(error);
            });
        axios
            .get(self.state.urlPSeller + '/' + this.props.seller)
            .then(function(response){
                self.setState({seller_name: response.data.seller.name})
            })
            .catch(function(error){
                console.log(error)
            })
    };

    deleteCart = (trans_id) => {
        const self = this
        const token = localStorage.getItem("token");
        axios({
            method: 'delete',
            url: self.state.urlTransDetail + trans_id,
            headers: {'Authorization': 'Bearer ' + token}
        })
        .then(function(response){
            window.location.reload();
        })
        .catch(function(error){
            console.log(error)
        })
    };

    render(){
        const {item} = this.state;
        const {seller_name} = this.state;
        return(
            <div className="CartItems">
                <div className="row">
                    <div className="col-4 d-block d-sm-none"></div>
                    <div className="col-md-2 col-sm-2 col-4">
                        <div className="gambar-cart">
                            <div className="imgProfile">
                                <img src={item.photo_url} alt={'item'}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 d-block d-sm-none"></div>
                    <div className="col-md-4 col-sm-4 col-12 cart-items">
                        <Link to={"/items/" + this.props.id}>
                            <h6 className="heading-coklat" style={{marginTop: '0'}}>{item.nama}</h6>
                        </Link>
                        <span className="nama-penjual">{seller_name}</span>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6 cart-items">
                        <span>{this.props.qty} x Rp {this.props.harga / this.props.qty}</span>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6 cart-items">
                        <span className="harga-promo">Rp {this.props.harga}</span>
                        <button type="button" className="close" onClick={() => this.deleteCart(this.props.trans_id)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }
}

CartItems.propTypes = {
    id: PropTypes.number,
    gambar: PropTypes.string,
    qty: PropTypes.number,
    harga: PropTypes.number,
    toko: PropTypes.string,
    seller: PropTypes.number,
    trans_id: PropTypes.number
}

export default connect("baseUrl", actions)(CartItems);