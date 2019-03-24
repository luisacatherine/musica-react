import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import '../style/w3.css'
import '../style/output.css'
import CardFront from './CardFront';
// import '../style/App.css'
// import '../style/index.css'
import { connect } from 'unistore/react';
import Produk from '../img/img/produk/gitarc315-1.jpg'
// import { actions } from '../store';

const urlItems = 'http://localhost:5000/item'
class NewArrival extends Component {
    constructor(props){
        super(props);
        this.state = {
			allItems: []
		}
    }

    componentDidMount = () => {
        const self = this;
        axios
            .get(urlItems, {
                params: {
                    'new_arrival': true,
                    'q': 3
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
                        <a href="view.html" className="heading-coklat judul-promo">Lihat Semua</a>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    {allItems.map((item, key) => {
                        return (
                            <CardFront key={key} id={item.id} gambar={item.photo_url} nama={item.nama} harga_promo={item.harga_promo} harga={item.harga} seller={item.seller} seller_city={item.seller_city} deskripsi={item.deskripsi_produk}/>
                        )
                    })}
                </div>
            </div>  
        )
    }
}

export default NewArrival;