import React, { Component } from 'react';
import Filter from '../components/Filter';
import Breadcrumb from '../components/Breadcrumb';
import CardDetail from '../components/CardDetail';
import Piano from '../img/img/home/piano.png';
import '../style/output.css';
import Contoh from '../pages/Contoh'
import axios from 'axios'

const urlItems = 'http://localhost:5000/item'

class View extends Component {
    constructor(props){
        super(props);
        this.state = {
            listBarang: []
        }
    }

    componentDidMount = () => {
        const self = this;
        axios
            .get(urlItems, {
                params: {
                    'rp': 12,
                    'p': 1
                }
            })
            .then(function(response){
                self.setState({listBarang: response.data.items});
                console.log(response.data);
            })
            .catch(function(error){
                console.log(error);
            });
    };

    render(){
        const {listBarang} = this.state;
        return(
            <div className="View">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}}/>
                    <h1 className="judul-kategori">New Arrival</h1>
                </div>
                <div className="container barang">
                    <Breadcrumb />
                    <div className="row">
                        <Filter />
                        <div className="col-md-9">
                            <p>Menampilkan hasil 1-12 dari 100 hasil</p>
                            <div className="row">
                                {listBarang.map((item, key) => {
                                    return <CardDetail key={key} gambar={item.photo_url} nama={item.nama} harga={item.harga_promo} kota={item.seller_city} toko={item.seller}/>
                                })}
                            </div>
                            <Contoh />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default View