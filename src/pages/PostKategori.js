import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';
import Piano from '../img/img/home/piano.png';
import { connect } from "unistore/react";
import { actions } from "../store";

class PostKategori extends Component {

    constructor(props){
        super(props);
        this.state = {
		}
    }

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    changeInput = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    postKategori = () => {
        const self = this;
        const token = localStorage.getItem("token");
        const { namaKategori, logoKategori, backgroundKategori } = self.state;
        axios({
            method: 'post',
            url: self.props.baseUrl+"/category",
            headers: {'Authorization': 'Bearer ' + token}, 
            data: {'nama_kategori': namaKategori, 'url': logoKategori, 'url_besar': backgroundKategori}
        })
        .then(function(response){
            console.log(response.data);
            if (response.data.status === 'oke'){
                self.props.history.push("/");
            } else {
                alert(response.data.message);
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }

    render(){
        return(
            <div className="PostKategori">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                    <h1 className="judul-kategori">Tambah Kategori</h1>
                </div>
                <div className="container barang">
                    <Breadcrumb link={'/add/category'} judul={'Tambah Kategori'} linkparents={'/'}/>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat">Tambah Kategori</h4>
                            <hr/>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className="form-group">
                                    <label htmlFor="namaKategori" className="col-form-label">Nama Kategori:</label>
                                    <input type="text" className="form-control" id="namaKategori" name="namaKategori" onChange={e => this.changeInput(e)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="logoKategori" className="col-form-label">Logo Kategori:</label>
                                    <input type="text" className="form-control" id="logoKategori" name="logoKategori" onChange={e => this.changeInput(e)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="backgroundKategori" className="col-form-label">Background Kategori:</label>
                                    <input type="text" className="form-control" id="backgroundKategori" name="backgroundKategori" onChange={e => this.changeInput(e)}/>
                                </div>
                                <br/>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-lg btn-warning" onClick={() => this.postKategori()}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("baseUrl", actions)(PostKategori);