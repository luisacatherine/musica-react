import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from "react-router-dom";
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions } from "../store";
import Piano from '../img/img/home/piano.png';
import ListKategori from '../components/ListKategori';

class AdminKategori extends Component{

    constructor(props){
        super(props);
        this.state = {
            listKategori: [],
            urlKategori: this.props.baseUrl + '/category'
		}
    }
    
    componentDidMount() {
        window.scrollTo(0, 0)
        const self = this;
        axios
        .get(self.state.urlKategori)
        .then(function(response){
            self.setState({listKategori: response.data.kategori});
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
            <div className="AdminKategori">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                    <h1 className="judul-kategori">Daftar Kategori</h1>
                </div>

                <div className="container barang">
                    <Breadcrumb link='/admin/category' judul={'Daftar Kategori'} linkparents={'/'}/>
                    <div className="container-cart">
                        <div className="row">
                            <div className="col-8">
                                <h4 className="heading-coklat">Daftar Kategori</h4>
                            </div>
                            <div className col-4>
                                <Link to="/add/category">+ Kategori</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="table-responsive text-center">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Kategori</th>
                                                <th>Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.listKategori.map((item, key) => {
                                                return (
                                                    <ListKategori key={key} id={item.id} nama={item.nama_kategori}/>
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
export default connect("baseUrl, data_provinsi, data_kota", actions)(AdminKategori);