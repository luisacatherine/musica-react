import React, { Component } from 'react';
import axios from 'axios';
import '../style/output.css';
import KartuKategori from './KartuKategori';
import { connect } from "unistore/react";
import { actions } from "../store";

class KategoriDepan extends Component {
    constructor(props){
        super(props);
        this.state = {
            listKategori: [],
            urlKategori: this.props.baseUrl + '/category'
        }
    }

    componentDidMount = () => {
        const self = this;
        axios
            .get(this.state.urlKategori)
            .then(function(response){
                self.setState({listKategori: response.data.kategori});
                console.log(response.data);
            })
            .catch(function(error){
                console.log(error);
            });
    };

    render(){
        const {listKategori} = this.state;
        return(
            <div className="KategoriDepan">
                <div className="container allCategories">
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-6">
                            <h4 className="heading-coklat judul-promo">Kategori</h4>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        {listKategori.map((item, key) => {
                            return <KartuKategori key={key} gambar={item.url} nama={item.nama_kategori}/>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("baseUrl", actions)(KategoriDepan);