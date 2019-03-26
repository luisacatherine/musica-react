import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Piano from '../img/img/home/piano.png';
import CartItems from '../components/CartItems';
import { connect } from "unistore/react";
import { actions } from "../store";

const token = localStorage.getItem("token");

class SignUpU extends Component {

    constructor(props){
        super(props);
        this.state = {
            pilihanProvinsi: '',
            pilihanKota: ''
		}
    }

    componentDidMount(){
        window.scrollTo(0, 0)        
        this.props.getProvinsi();
        this.props.getKota(this.state.pilihanProvinsi);
    }

    onProvinsiChange = e => {
        const self = this
        self.setState({pilihanProvinsi: e.target.value});
        this.props.getKota(e.target.value);
    }

    onKotaChange = e => {
        const self = this
        self.setState({pilihanKota: e.target.value})
    }

    changeInput = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    postProduct = () => {
        const { namaUser, date_of_birth, fotoUser, gender, teleponUser, emailUser, alamatUser, password } = this.state;
        const data = {
            name: namaUser,
            date_of_birth: date_of_birth,
            gender: gender,
            phone_number: teleponUser,
            email: emailUser,
            alamat: alamatUser,
            provinsi: this.state.pilihanProvinsi,
            kota: this.state.pilihanKota,
            password: password,
            photo_url: fotoUser
        };
        const self = this;
        axios
            .post(this.props.baseUrl+"/user", data)
            .then(function(response){
                console.log(response.data);
                if (response.data.status === 'oke'){
                    self.props.history.push("/profile");
                } else {
                    alert(response.data.message);
                }
            })
            .catch(function(error){
                console.log(error);
            });
    }

    render(){
        const status = localStorage.getItem("status");
        if(status === 'seller' || status === 'user'){
            return <Redirect to={{pathname: "/"}} />;
        }
        var list_provinsi=[];
        for(var i=0; i<this.props.data_provinsi.length; i++){
            list_provinsi.push(this.props.data_provinsi[i].nama_provinsi);
        }
        var list_kota=[];
        if (this.props.data_kota !== undefined){
            for(var j=0; j<this.props.data_kota.length; j++){
                list_kota.push(this.props.data_kota[j].nama_kota);
            }    
        }
        return(
            <div className="SignUpU">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                    <h1 className="judul-kategori">Registrasi</h1>
                </div>
                <div className="container barang">
                    <Breadcrumb link={'/signup/user'} judul={'Daftar Sebagai Pembeli'} linkparents={'/'}/>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat">Daftar Sebagai Pembeli</h4>
                            <hr/>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="namaUser" className="col-form-label">Nama:</label>
                                        <input type="text" className="form-control" id="namaUser" name="namaUser" onChange={e => this.changeInput(e)} required/>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="date_of_birth" className="col-form-label">Tanggal Lahir:</label>
                                        <input type="date" className="form-control" id="date_of_birth" name="date_of_birth" onChange={e => this.changeInput(e)} required/>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="fotoUser" className="col-form-label">URL Foto User:</label>
                                        <input type="text" className="form-control" id="fotoUser" name="fotoUser" onChange={e => this.changeInput(e)} required/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-2">
                                        <label className="col-form-label">Jenis Kelamin:</label><br/>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="m" onChange={e => this.changeInput(e)} required/>
                                            <label className="form-check-label" htmlFor="inlineRadio1">L</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="f" onChange={e => this.changeInput(e)} required/>
                                            <label className="form-check-label" htmlFor="inlineRadio2">P</label>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="emailUser" className="col-form-label">Email:</label>
                                        <input type="email" className="form-control" id="emailUser" name="emailUser" onChange={e => this.changeInput(e)} required/>                                    
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="teleponUser" className="col-form-label">No HP:</label>
                                        <input type="number" className="form-control" id="teleponUser" name="teleponUser" onChange={e => this.changeInput(e)} required/>                                    
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="alamatUser" className="col-form-label">Alamat:</label>
                                    <textarea className="form-control" id="alamatUser" rows="2" name="alamatUser" onChange={e => this.changeInput(e)} required></textarea>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputProvinsi">Provinsi:</label>
                                        <select id="inputProvinsi" className="form-control" name="inputProvinsi" value={this.state.pilihanProvinsi} onChange={e => this.onProvinsiChange(e)} required>
                                            <option></option>
                                            {list_provinsi.map((item, key) => {
                                                return (
                                                    <option key={key} value={item}>{item}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputKota">Kota:</label>
                                        <select id="inputKota" className="form-control" name="inputKota" value={this.state.pilihanKota} onChange={e => this.onKotaChange(e)} required>
                                            <option></option>
                                            {list_kota.map((item, key) => {
                                                return (
                                                    <option key={key} value={item}>{item}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="password" className="col-form-label">Password:</label>
                                        <input type="password" className="form-control" id="password" name="password" onChange={e => this.changeInput(e)} required/>
                                    </div>    
                                    <div className="form-group col-md-6">
                                        <label htmlFor="password_confirm" className="col-form-label">Confirmation Password:</label>
                                        <input type="password" className="form-control" id="password_confirm" required/>
                                    </div>            
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="syaratSeller" required/>
                                    <label className="form-check-label" htmlFor="syaratSeller">Dengan ini saya menyatakan telah membaca serta menyetujui <a href="terms-seller.html">syarat dan ketentuan</a> yang berlaku</label>
                                </div>
                                <br/>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-lg btn-warning" onClick={() => this.postProduct()}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("baseUrl, data_provinsi, data_kota", actions)(SignUpU);