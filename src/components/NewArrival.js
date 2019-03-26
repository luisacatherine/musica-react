import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/output.css'
import CardFront from './CardFront';
import { connect } from 'unistore/react';
import { actions } from "../store";

class NewArrival extends Component {
    constructor(props){
        super(props);
        this.state = {
            allItems: [],
            urlItems: this.props.baseUrl + '/item'
		}
    }

    componentDidMount = () => {
        const self = this;
        axios
            .get(self.state.urlItems, {
                params: {
                    'new_arrival': true,
                    'q': 3,
                    'sortby': 'new'
                }
            })
            .then(function(response){
                self.setState({allItems: response.data.items});
                console.log(response.data);
            })
            .catch(function(error){
                console.log(error);
            });
    };

    render(){
        const {allItems} = this.state;
        return(
            <div className="container promo">
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-6">
                        <h4 className="heading-coklat judul-promo">New Arrival</h4>
                    </div>
                    <div className="col-md-6 col-sm-6 col-6 text-right">
                        <Link to="/new-arrival" className="heading-coklat judul-promo">Lihat Semua</Link>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    {allItems.map((item, key) => {
                        return (
                            <CardFront key={key} id={item.id} gambar={item.photo_url} nama={item.nama} harga_promo={item.harga_promo} harga={item.harga} seller={item.item_seller.name} seller_city={item.item_seller.kota} deskripsi={item.deskripsi_produk}/>
                        )
                    })}
                </div>
            </div>  
        )
    }
}

export default connect("baseUrl", actions)(NewArrival);