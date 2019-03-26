import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from "react-router-dom";
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions } from "../store";
import Piano from '../img/img/home/piano.png';
import ListUser from '../components/ListUser';

class AdminUser extends Component{

    constructor(props){
        super(props);
        this.state = {
            listUser: [],
            urlUser: this.props.baseUrl + '/user'
		}
    }
    
    componentDidMount() {
        window.scrollTo(0, 0)
        const self = this;
        const token = localStorage.getItem("token");
        axios
        .get(self.state.urlUser, {
            headers: {
                'Authorization': 'Bearer ' + token
            }})
        .then(function(response){
            console.log(response.data.user)
            self.setState({listUser: response.data.user});
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
            <div className="AdminUser">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                    <h1 className="judul-kategori">Daftar Pembeli</h1>
                </div>

                <div className="container barang">
                    <Breadcrumb link='/admin/user' judul={'Daftar Pembeli'} linkparents={'/'}/>
                    <div className="container-cart">
                        <div className="row">
                            <div className="col-12">
                                <h4 className="heading-coklat">Daftar Pembeli</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="table-responsive text-center">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>User ID</th>
                                                <th>Client ID</th>
                                                <th>Photo</th>
                                                <th>Nama</th>
                                                <th>Kota</th>
                                                <th>Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.listUser.map((item, key) => {
                                                return (
                                                    <ListUser key={key} nama={item.name} id={item.id} client_id={item.client_id} kota={item.kota} photo={item.photo_url}/>
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
export default connect("baseUrl, data_provinsi, data_kota", actions)(AdminUser);