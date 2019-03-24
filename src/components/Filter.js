import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/output.css'
// import '../style/App.css'
// import '../style/index.css'
import { connect } from 'unistore/react';
import Produk from '../img/img/produk/gitarc315-1.jpg'
import { actions } from '../store';

class Filter extends Component {
    constructor(props){
        super(props);
        this.state = {
		}
    }

    render(){
        return(
            <div className="col-md-3 d-none d-md-block">
                <div className="card nav-left">
                    <div className="nav-samping">
                        <div className="card-body">
                            <h5 className="heading-coklat">New Arrival</h5>
                        </div>
                        <hr/>
                    </div>
                    <div className="nav-samping">
                        <div className="card-body">
                            <h5 className="heading-coklat">Promo</h5>
                        </div>
                        <hr/>
                    </div>
                    <div className="nav-samping">
                        <div className="card-body">
                            <h5 className="heading-coklat">Kategori: </h5>
                            <form>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="pilihanKategori" id="pilihanKategori1" value="gitar" onChange={e => this.props.onKategoriChanged(e)}/>
                                    <label className="form-check-label" htmlFor="pilihanKategori1">
                                        Gitar
                                    </label>
                                    </div>
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio" name="pilihanKategori" id="pilihanKategori2" value="biola" onChange={e => this.props.onKategoriChanged(e)}/>
                                    <label className="form-check-label" htmlFor="pilihanKategori2">
                                        Biola
                                    </label>
                                    </div>
                                    <div className="form-check disabled">
                                    <input className="form-check-input" type="radio" name="pilihanKategori" id="pilihanKategori3" value="piano" onChange={e => this.props.onKategoriChanged(e)}/>
                                    <label className="form-check-label" htmlFor="pilihanKategori3">
                                        Piano
                                    </label>
                                </div>
                            </form>
                        </div>
                        <hr/>
                    </div>
                    <div className="nav-samping">
                        <div className="card-body">
                            <h5 className="heading-coklat">Urutkan berdasarkan: </h5>
                            <form>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="pilihanUrutan" id="pilihanUrutan1" value="harga-termurah" onChange={e => this.props.onUrutanChanged(e)}/>
                                    <label className="form-check-label" htmlFor="pilihanUrutan1">
                                        Harga Termurah
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="pilihanUrutan" id="pilihanUrutan2" value="harga-termahal" onChange={e => this.props.onUrutanChanged(e)}/>
                                    <label className="form-check-label" htmlFor="pilihanUrutan2">
                                        Harga Termahal
                                    </label>
                                </div>
                                <div className="form-check disabled">
                                    <input className="form-check-input" type="radio" name="pilihanUrutan" id="pilihanUrutan3" value="pembelian" onChange={e => this.props.onUrutanChanged(e)}/>
                                    <label className="form-check-label" htmlFor="pilihanUrutan3">
                                        Pembelian
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="pilihanUrutan" id="pilihanUrutan4" value="terbaru" onChange={e => this.props.onUrutanChanged(e)}/>
                                    <label className="form-check-label" htmlFor="pilihanUrutan4">
                                        Postingan Baru
                                    </label>
                                </div>
                            </form>
                        </div>
                        <hr/>
                    </div>
                    <div className="nav-samping">
                        <div className="card-body">
                            <h5 className="heading-coklat">Filter berdasarkan status: </h5>
                            <form>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="statusFilter1"/>
                                    <label className="form-check-label" htmlFor="statusFilter1">
                                        Ready Stock
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="statusFilter2"/>
                                    <label className="form-check-label" htmlFor="statusFilter2">
                                        Pre-Order
                                    </label>
                                </div>
                            </form>
                        </div>
                        <hr/>
                    </div> 
                    <div className="nav-samping">
                        <div className="card-body">
                            <h5 className="heading-coklat">Filter berdasarkan lokasi: </h5>
                            <form>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="filterLokasi1"/>
                                    <label className="form-check-label" htmlFor="filterLokasi1">
                                        Kota Malang
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="filterLokasi2"/>
                                    <label className="form-check-label" htmlFor="filterLokasi2">
                                        Kota Jakarta
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="filterLokasi3"/>
                                    <label className="form-check-label" htmlFor="filterLokasi3">
                                        Kota Bandung
                                    </label>
                                </div>
                            </form>
                        </div>
                        <hr/>
                    </div>
                    <div className="nav-samping">
                        <div className="card-body">
                            <h5 className="heading-coklat">Filter berdasarkan harga: </h5>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="harga_minimum" className="col-form-label">Harga Minimum</label>
                                    <input type="text" className="form-control" id="harga_minimum"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="harga_maksimum" className="col-form-label">Harga Maksimum</label>
                                    <input type="text" className="form-control" id="harga_maksimum"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("kategori", actions)(Filter);
