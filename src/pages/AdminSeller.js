import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from "react-router-dom";
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions } from "../store";
import Piano from '../img/img/home/piano.png';
import ListSeller from '../components/ListSeller';

class AdminSeller extends Component{

    constructor(props){
        super(props);
        this.state = {
            listSeller: [],
            urlItems: this.props.baseUrl + '/item',
            urlPUser: this.props.baseUrl + '/public/user',
            urlSeller: this.props.baseUrl + '/seller'
		}
    }
    
    componentDidMount() {
        window.scrollTo(0, 0)
        const self = this;
        const token = localStorage.getItem("token");
        axios
        .get(self.state.urlSeller, {
            headers: {
                'Authorization': 'Bearer ' + token
            }})
        .then(function(response){
            self.setState({listSeller: response.data.seller});
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
            <div className="AdminSeller">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                    <h1 className="judul-kategori">Daftar Penjual</h1>
                </div>

                <div className="container barang">
                    <Breadcrumb link='/admin/seller' judul={'Daftar Penjual'} linkparents={'/'}/>
                    <div className="container-cart">
                        <div className="row">
                            <div className="col-12">
                                <h4 className="heading-coklat">Daftar Penjual</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="table-responsive text-center">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Seller ID</th>
                                                <th>Client ID</th>
                                                <th>Photo</th>
                                                <th>Nama</th>
                                                <th>Kota</th>
                                                <th>Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.listSeller.map((item, key) => {
                                                return (
                                                    <ListSeller key={key} nama={item.name} id={item.id} client_id={item.client_id} kota={item.kota} photo={item.photo_url}/>
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
export default connect("baseUrl, data_provinsi, data_kota", actions)(AdminSeller);