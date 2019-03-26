import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import Piano from '../img/img/home/piano.png';
import { connect } from "unistore/react";
import { actions } from "../store";

const token = localStorage.getItem("token");
class EditSeller extends Component {

    constructor(props){
        super(props);
        this.state = {
            pilihanProvinsi: '',
            pilihanKota: '',
            currentSeller: '',
            currentAlamat: '',
            bank: '',
            seller_id:''
		}
    }

    componentDidMount(){
        const self = this
        window.scrollTo(0, 0)
        const {seller_id} = this.props.match.params;
        self.setState({seller_id: seller_id})
        this.props.getProvinsi();
        this.getSeller(seller_id);
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

    getSeller = (seller_id) => {
        const token = localStorage.getItem("token");
        const self = this;
        axios({
            method: 'get',
            url: this.props.baseUrl + '/seller/' + seller_id,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function(response){
            self.setState({currentSeller: response.data.seller});
            self.setState({pilihanProvinsi: response.data.seller.provinsi});
            self.setState({pilihanKota: response.data.seller.kota});
            self.setState({currentAlamat: response.data.seller.alamat});
            self.setState({bank: response.data.seller.bank})
            self.props.getKota(response.data.seller.provinsi)
            self.props.formatDate(response.data.seller.date_of_birth);
        })
        .catch(function(error){
            console.log(error)
        })
    }

    putSeller = () => {
        const { namaSeller, date_of_birth, fotoSeller, gender, teleponSeller, emailSeller, alamatSeller, password, bankSeller, rekeningSeller } = this.state;
        const data = {
            name: namaSeller,
            date_of_birth: date_of_birth,
            gender: gender,
            phone_number: teleponSeller,
            email: emailSeller,
            alamat: this.state.currentAlamat,
            provinsi: this.state.pilihanProvinsi,
            kota: this.state.pilihanKota,
            bank: this.state.bank,
            no_rekening: rekeningSeller,
            password: password,
            photo_url: fotoSeller
        };
        const self = this;
        axios
            .put(this.props.baseUrl + "/seller/" + this.state.seller_id, data,{
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
        const { currentSeller } = this.state;
        const currentGender = (currentSeller.gender === "f")
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
            <div className="EditSeller">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                    <h1 className="judul-kategori">Edit Profil Penjual</h1>
                </div>
                <div className="container barang">
                    <Breadcrumb link={'/signup/seller'} judul={'Edit Profil Penjual'} linkparents={'/'}/>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat">Edit Profil Penjual</h4>
                            <hr/>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="namaSeller" className="col-form-label">Nama:</label>
                                        <input type="text" className="form-control" id="namaSeller" name="namaSeller" defaultValue={currentSeller.name} onChange={e => this.changeInput(e)}/>
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
                                        <label htmlFor="teleponSeller" className="col-form-label">No HP:</label>
                                        <input type="text" className="form-control" id="teleponSeller" name="teleponSeller" defaultValue={currentSeller.phone_number} onChange={e => this.changeInput(e)}/>                                    
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="fotoSeller" className="col-form-label">URL Foto Seller:</label>
                                        <input type="text" className="form-control" id="fotoSeller" name="fotoSeller" defaultValue={currentSeller.photo_url} onChange={e => this.changeInput(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="alamatSeller" className="col-form-label">Alamat:</label>
                                    <textarea className="form-control" id="alamatSeller" rows="2" name="alamatSeller"  value={this.state.currentAlamat} onChange={e => this.changeAlamat(e)}></textarea>
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
                                <div className="form-row">
                                    <div className="form-group col-md-3">
                                        <label htmlFor="bankSeller" className="col-form-label">Bank:</label>
                                        <select className="form-control" id="bankSeller" name="bankSeller" value={this.state.bank} onChange={e => this.onBankChange(e)}>
                                            <option></option>
                                            <option value="BCA">BCA</option>
                                            <option value="BNI">BNI</option>
                                            <option value="BRI">BRI</option>
                                            <option value="Mandiri">Mandiri</option>
                                            <option value="BTPN">BTPN</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-9">
                                        <label htmlFor="rekeningSeller" className="col-form-label">No Rekening:</label>
                                        <input type="number" className="form-control" id="rekeningSeller" name="rekeningSeller" defaultValue={currentSeller.no_rekening} onChange={e => this.changeInput(e)}/>
                                    </div>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="syaratSeller"/>
                                    <label className="form-check-label" htmlFor="syaratSeller">Dengan ini saya menyatakan telah membaca serta menyetujui <a href="terms-seller.html">syarat dan ketentuan</a> yang berlaku</label>
                                </div>
                                <br/>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-lg btn-warning" onClick={() => this.putSeller()}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("baseUrl, data_provinsi, data_kota, tanggal", actions)(EditSeller);