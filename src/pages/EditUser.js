import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import Piano from '../img/img/home/piano.png';
import { connect } from "unistore/react";
import { actions } from "../store";

const token = localStorage.getItem("token");
class EditUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            pilihanProvinsi: '',
            pilihanKota: '',
            currentUser: '',
            currentAlamat: '',
            bank: '',
            user_id:''
		}
    }

    componentDidMount(){
        const self = this
        window.scrollTo(0, 0)
        const {user_id} = this.props.match.params;
        self.setState({user_id: user_id})
        this.props.getProvinsi();
        this.getUser(user_id);
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

    onBankChange = e => {
        const self = this
        self.setState({bank: e.target.value})
    }

    changeInput = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    changeAlamat = e => {
        const self = this
        self.setState({currentAlamat: e.target.value})
    }

    getUser = (user_id) => {
        const token = localStorage.getItem("token");
        const self = this;
        axios({
            method: 'get',
            url: this.props.baseUrl + '/user/' + user_id,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function(response){
            self.setState({currentUser: response.data.user});
            self.setState({pilihanProvinsi: response.data.user.provinsi});
            self.setState({pilihanKota: response.data.user.kota});
            self.setState({currentAlamat: response.data.user.alamat});
            self.props.getKota(response.data.user.provinsi)
            self.props.formatDate(response.data.user.date_of_birth);
        })
        .catch(function(error){
            console.log(error)
        })
    }

    putUser = () => {
        const { namaUser, date_of_birth, fotoUser, gender, teleponUser, emailUser, password} = this.state;
        const data = {
            name: namaUser,
            date_of_birth: date_of_birth,
            gender: gender,
            phone_number: teleponUser,
            email: emailUser,
            alamat: this.state.currentAlamat,
            provinsi: this.state.pilihanProvinsi,
            kota: this.state.pilihanKota,
            password: password,
            photo_url: fotoUser
        };
        const self = this;
        axios
            .put(this.props.baseUrl + "/user/" + this.state.user_id, data,{
                headers: {
                'Authorization': 'Bearer ' + token
                }})
            .then(function(response){
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
        const { currentUser } = this.state;
        const currentGender = (currentUser.gender === "f")
        const currentTanggal = this.props.tanggal;

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
            <div className="EditUser">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                    <h1 className="judul-kategori">Edit Profil Pembeli</h1>
                </div>
                <div className="container barang">
                    <Breadcrumb link={'/signup/user'} judul={'Edit Profil Pembeli'} linkparents={'/'}/>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat">Edit Profil Pembeli</h4>
                            <hr/>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="namaUser" className="col-form-label">Nama:</label>
                                        <input type="text" className="form-control" id="namaUser" name="namaUser" defaultValue={currentUser.name} onChange={e => this.changeInput(e)}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="date_of_birth" className="col-form-label">Tanggal Lahir:</label>
                                        <input type="date" className="form-control" id="date_of_birth" name="date_of_birth" defaultValue={currentTanggal} onChange={e => this.changeInput(e)}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-2">
                                        <label className="col-form-label">Jenis Kelamin:</label><br/>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="m" onChange={e => this.changeInput(e)} defaultChecked={!currentGender}/>
                                            <label className="form-check-label" htmlFor="inlineRadio1">L</label>
                                        </div> 
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="f" onChange={e => this.changeInput(e)} defaultChecked={currentGender}/>
                                            <label className="form-check-label" htmlFor="inlineRadio2">P</label>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="teleponUser" className="col-form-label">No HP:</label>
                                        <input type="text" className="form-control" id="teleponUser" name="teleponUser" defaultValue={currentUser.phone_number} onChange={e => this.changeInput(e)}/>                                    
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="fotoUser" className="col-form-label">URL Foto User:</label>
                                        <input type="text" className="form-control" id="fotoUser" name="fotoUser" defaultValue={currentUser.photo_url} onChange={e => this.changeInput(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="alamatUser" className="col-form-label">Alamat:</label>
                                    <textarea className="form-control" id="alamatUser" rows="2" name="alamatUser"  value={this.state.currentAlamat} onChange={e => this.changeAlamat(e)}></textarea>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputProvinsi">Provinsi:</label>
                                        <select id="inputProvinsi" className="form-control" name="inputProvinsi" value={this.state.pilihanProvinsi} onChange={e => this.onProvinsiChange(e)}>
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
                                        <select id="inputKota" className="form-control" name="inputKota" value={this.state.pilihanKota} onChange={e => this.onKotaChange(e)}>
                                            <option></option>
                                            {list_kota.map((item, key) => {
                                                return (
                                                    <option key={key} value={item}>{item}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="syaratUser"/>
                                    <label className="form-check-label" htmlFor="syaratUser">Dengan ini saya menyatakan telah membaca serta menyetujui <a href="terms-user.html">syarat dan ketentuan</a> yang berlaku</label>
                                </div>
                                <br/>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-lg btn-warning" onClick={() => this.putUser()}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("baseUrl, data_provinsi, data_kota, tanggal", actions)(EditUser);