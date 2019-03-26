import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';
import { connect } from "unistore/react";
import { actions } from "../store";

class EditKategori extends Component {

    constructor(props){
        super(props);
        this.state = {
            category_id: '',
            currentCategory: ''
		}
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        const self = this
        const {category_id} = this.props.match.params;
        self.setState({category_id: category_id})
        this.getKategori(category_id);
    }

    changeInput = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    getKategori = (category_id) => {
        const self = this;
        axios({
            method: 'get',
            url: self.props.baseUrl + "/category/" + category_id
        })
        .then(function(response){
            self.setState({currentCategory: response.data.kategori});
        })
        .catch(function(error){
            console.log(error)
        })
    }

    putKategori = () => {
        const self = this;
        const token = localStorage.getItem("token");
        const { namaKategori, logoKategori, backgroundKategori } = self.state;
        axios({
            method: 'put',
            url: self.props.baseUrl + "/category/" + self.state.category_id,
            headers: {'Authorization': 'Bearer ' + token}, 
            data: {'nama_kategori': namaKategori, 'url': logoKategori, 'url_besar': backgroundKategori}
        })
        .then(function(response){
            if (response.data.status === 'oke'){
                self.props.history.push("/admin/category");
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
            <div className="EditKategori">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={this.state.currentCategory.url_besar} style={{width: '100%'}} alt={'gambar kategori'}/>
                    <h1 className="judul-kategori">Edit Kategori</h1>
                </div>
                <div className="container barang">
                    <Breadcrumb link={'/edit/category' + this.state.category_id} judul={'Edit Kategori'} linkparents={'/admin/category'} judulparents={'Daftar Kategori'}/>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="heading-coklat">Edit Kategori</h4>
                            <hr/>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className="form-group">
                                    <label htmlFor="namaKategori" className="col-form-label">Nama Kategori:</label>
                                    <input type="text" className="form-control" id="namaKategori" name="namaKategori" defaultValue={this.state.currentCategory.nama_kategori} onChange={e => this.changeInput(e)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="logoKategori" className="col-form-label">Logo Kategori:</label>
                                    <input type="text" className="form-control" id="logoKategori" name="logoKategori" defaultValue={this.state.currentCategory.url} onChange={e => this.changeInput(e)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="backgroundKategori" className="col-form-label">Background Kategori:</label>
                                    <input type="text" className="form-control" id="backgroundKategori" name="backgroundKategori" defaultValue={this.state.currentCategory.url_besar} onChange={e => this.changeInput(e)}/>
                                </div>
                                <br/>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-lg btn-warning" onClick={() => this.putKategori()}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("baseUrl", actions)(EditKategori);