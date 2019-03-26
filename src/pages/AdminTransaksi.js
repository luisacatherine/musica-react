import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from "react-router-dom";
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions } from "../store";
import Piano from '../img/img/home/piano.png';
import ListTransaksi from '../components/ListTransaksi';

class AdminTransaksi extends Component{

    constructor(props){
        super(props);
        this.state = {
            listTransaksi: [],
            urlTransaksi: this.props.baseUrl + '/transaction',
            urlCart: this.props.baseUrl + '/transdetail'
		}
    }
    
    componentDidMount() {
        window.scrollTo(0, 0)
        const self = this;
        const token = localStorage.getItem("token");
        axios
        .get(this.state.urlTransaksi, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function(response){
            self.setState({listTransaksi: response.data.transaction});
        })
        .catch(function(error){
            console.log(error)
        })
    }

    render(){
        const status = localStorage.getItem("status");
        if(status !== 'admin'){
            return <Redirect to={{pathname: "/"}} />;
        }
        return(
            <div className="AdminTransaksi">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                    <h1 className="judul-kategori">Daftar Transaksi</h1>
                </div>

                <div className="container barang">
                    <Breadcrumb link='/admin/transaction' judul={'Daftar Transaksi'} linkparents={'/'}/>
                    <div className="container-cart">
                        <div className="row">
                            <div className="col-12">
                                <h4 className="heading-coklat">Daftar Transaksi</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="table-responsive text-center">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Penjual</th>
                                                <th>Pembeli</th>
                                                <th>Tanggal Transaksi</th>
                                                <th>Status Transaksi</th>
                                                <th>Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.listTransaksi.map((item, key) => {
                                                return (
                                                    <ListTransaksi key={key} id={item.id} seller_id={item.seller_id} user_id={item.user_id} tanggal={item.created_at} status_transaksi={item.status_transaksi}/>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}

export default connect("baseUrl, data_provinsi, data_kota", actions)(AdminTransaksi);