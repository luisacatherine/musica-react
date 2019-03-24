import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../style/w3.css'
import '../style/output.css'
// import '../style/App.css'
// import '../style/index.css'
import { connect } from 'unistore/react';
import Produk from '../img/img/produk/gitarc315-1.jpg'
// import { actions } from '../store';

class NotMatch extends Component {
    render(){
        return(
            <div className="NotMatch">
                <div className="container barang">
                    <h1>Halaman yang Anda minta tidak ditemukan</h1>
                </div>
            </div>
        )
    }
}

export default NotMatch;