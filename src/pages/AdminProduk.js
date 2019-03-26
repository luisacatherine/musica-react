import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from "react-router-dom";
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions } from "../store";
import Piano from '../img/img/home/piano.png';
import ListItems from '../components/ListItems';

class AdminProduk extends Component{

    constructor(props){
        super(props);
        this.state = {
            listBarang: [],
            urlItems: this.props.baseUrl + '/item',
            urlPUser: this.props.baseUrl + '/public/user'
		}
    }
    
    componentDidMount() {
        window.scrollTo(0, 0)
        const self = this;
        axios
        .get(self.state.urlItems)
        .then(function(response){
            self.setState({listBarang: response.data.items});
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
            <div className="AdminProduk">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                    <h1 className="judul-kategori">Daftar Produk</h1>
                </div>

                <div className="container barang">
                    <Breadcrumb link='/admin/items' judul={'Daftar Produk'} linkparents={'/'}/>
                    <div className="container-cart">
                        <div className="row">
                            <div className="col-12">
                                <h4 className="heading-coklat">Daftar Produk</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="table-responsive text-center">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Nama</th>
                                                <th>Kategori</th>
                                                <th>Penjual</th>
                                                <th>Stok</th>
                                                <th>Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.listBarang.map((item, key) => {
                                                return (
                                                    <ListItems key={key} nama={item.nama} id={item.id} seller={item.item_seller.name} category={item.item_category.nama_kategori} stok={item.stok}/>
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
export default connect("baseUrl, data_provinsi, data_kota", actions)(AdminProduk);