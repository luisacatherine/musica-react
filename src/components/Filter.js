import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/output.css'
// import '../style/App.css'
// import '../style/index.css'
import { connect } from 'unistore/react';
import Produk from '../img/img/produk/gitarc315-1.jpg'
// import { actions } from '../store';

class Filter extends Component {
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
                                    <input className="form-check-input" type="radio" name="pilihanKategori" id="pilihanKategori1" value="gitar" checked/>>
                                    <label className="form-check-label" for="pilihanKategori1">
                                        Gitar
                                    </label>
                                    </div>
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio" name="pilihanKategori" id="pilihanKategori2" value="biola"/>
                                    <label className="form-check-label" for="pilihanKategori2">
                                        Biola
                                    </label>
                                    </div>
                                    <div className="form-check disabled">
                                    <input className="form-check-input" type="radio" name="pilihanKategori" id="pilihanKategori3" value="piano"/>
                                    <label className="form-check-label" for="pilihanKategori3">
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
                                    <input className="form-check-input" type="radio" name="pilihanUrutan" id="pilihanUrutan1" value="harga-termurah" checked/>>
                                    <label className="form-check-label" for="pilihanUrutan1">
                                        Harga Termurah
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="pilihanUrutan" id="pilihanUrutan2" value="harga-termahal"/>
                                    <label className="form-check-label" for="pilihanUrutan2">
                                        Harga Termahal
                                    </label>
                                </div>
                                <div className="form-check disabled">
                                    <input className="form-check-input" type="radio" name="pilihanUrutan" id="pilihanUrutan3" value="pembelian"/>
                                    <label className="form-check-label" for="pilihanUrutan3">
                                        Pembelian
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="pilihanUrutan" id="pilihanUrutan4" value="terbaru"/>
                                    <label className="form-check-label" for="pilihanUrutan4">
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
                                    <label className="form-check-label" for="statusFilter1">
                                        Ready Stock
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="statusFilter2"/>
                                    <label className="form-check-label" for="statusFilter2">
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
                                    <label className="form-check-label" for="filterLokasi1">
                                        Kota Malang
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="filterLokasi2"/>
                                    <label className="form-check-label" for="filterLokasi2">
                                        Kota Jakarta
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="filterLokasi3"/>
                                    <label className="form-check-label" for="filterLokasi3">
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
                                    <label for="harga_minimum" className="col-form-label">Harga Minimum</label>
                                    <input type="text" className="form-control" id="harga_minimum"/>
                                </div>
                                <div className="form-group">
                                    <label for="harga_maksimum" className="col-form-label">Harga Maksimum</label>
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

export default Filter
