import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/output.css'
// import '../style/App.css'
// import '../style/index.css'
import { connect } from 'unistore/react';
import Produk from '../img/img/produk/gitarc315-1.jpg'
// import { actions } from '../store';

class Breadcrumb extends Component {
    render(){
        return(
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb lokasi">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">New Arrival</li>
                </ol>
            </nav>
        )
    }
}

export default Breadcrumb