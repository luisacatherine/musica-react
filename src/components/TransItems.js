import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/output.css'
import axios from 'axios';
import { connect } from 'unistore/react';
import { actions } from '../store';


class TransItems extends Component {

    constructor(props){
        super(props);
        this.state = {
            item: '',
            seller_name: '',
            urlItems: this.props.baseUrl + '/item',
            urlPSeller: this.props.baseUrl + '/public/seller',
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

    render(){
        const {item} = this.state;
        const {seller_name} = this.state;
        return(
            <tr>
                <td> 
                    <div className="gambar-produk">
                        <div className="imgProfile">
                            <img src={item.photo_url}/>
                        </div>
                    </div>
                </td>
                <td><h6 className="heading-coklat">{item.nama}</h6>
                    <span className="nama-penjual">Qty: {this.props.qty}</span><br/>
                    <span className="nama-penjual">{seller_name}</span>
                </td>
                <td>
                    <span>{this.props.qty} x Rp {this.props.harga / this.props.qty}</span>
                </td>
                <td>
                    <span className="harga-promo">Rp {this.props.harga}</span>
                </td>
            </tr>
        )
    }
}

TransItems.propTypes = {
    id: PropTypes.number,
    gambar: PropTypes.string,
    qty: PropTypes.number,
    harga: PropTypes.number,
    toko: PropTypes.string,
    seller: PropTypes.number
}

export default connect("baseUrl", actions)(TransItems);
