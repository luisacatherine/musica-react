import React, { Component } from 'react';
import axios from 'axios';
import '../style/output.css';
import KartuKategori from './KartuKategori';

const urlMovie = 'https://api-todofancy.herokuapp.com/api/movies'
const urlKategori = 'http://localhost:5000/category'

class KategoriDepan extends Component {
    constructor(props){
        super(props);
        this.state = {
            listKategori: []
        }
    }

    componentDidMount = () => {
        const self = this;
        axios
            .get(urlKategori)
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
                            return <KartuKategori key={key} gambar={item.url}/>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default KategoriDepan;