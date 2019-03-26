import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/output.css'
import { connect } from 'unistore/react';
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
                            <Link to="/new-arrival"><h5 className="heading-coklat">New Arrival</h5></Link>
                        </div>
                        <hr/>
                    </div>
                    <div className="nav-samping">
                        <div className="card-body">
                            <Link to="/promo"><h5 className="heading-coklat">Promo</h5></Link>
                        </div>
                        <hr/>
                    </div>
                    <div className="nav-samping">
                        <div className="card-body">
                            <form action='/search' method="get">
                                <h5 className="heading-coklat">Search: </h5> 
                                <div className="form-group">
                                    <input type="text" className="form-control" id="keyword" name="q"/>
                                </div>
                                <hr/>
                                <h5 className="heading-coklat">Urutkan berdasarkan: </h5>                    
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="sortby" id="pilihanUrutan1" value="hargamin"/>
                                    <label className="form-check-label" htmlFor="pilihanUrutan1">
                                        Harga Termurah
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="sortby" id="pilihanUrutan2" value="hargamax"/>
                                    <label className="form-check-label" htmlFor="pilihanUrutan2">
                                        Harga Termahal
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="sortby" id="pilihanUrutan3" value="new"/>
                                    <label className="form-check-label" htmlFor="pilihanUrutan3">
                                        Postingan Baru
                                    </label>
                                </div>
                                <hr/>
                                <h5 className="heading-coklat">Filter berdasarkan status: </h5>
                                <div className="form-check">
                                    <input className="form-check-input" name="status" type="radio" value="ready" id="statusFilter1"/>
                                    <label className="form-check-label" htmlFor="statusFilter1">
                                        Ready Stock
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name="status" type="radio" value="pre-order" id="statusFilter2"/>
                                    <label className="form-check-label" htmlFor="statusFilter2">
                                        Pre-Order
                                    </label>
                                </div>                        
                                <hr/>
                                <h5 className="heading-coklat">Filter berdasarkan lokasi: </h5>
                                <div className="form-group">
                                    <label htmlFor="lokasi" className="col-form-label" >Lokasi</label>
                                    <input type="text" className="form-control" id="lokasi" name="lokasi"/>
                                </div>
                                <hr/>
                                <h5 className="heading-coklat">Filter berdasarkan harga: </h5>                
                                <div className="form-group">
                                    <label htmlFor="harga_minimum" className="col-form-label" >Harga Minimum</label>
                                    <input type="number" className="form-control" id="harga_minimum" name="harga_min" defaultValue='0'/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="harga_maksimum" className="col-form-label" >Harga Maksimum</label>
                                    <input type="number" className="form-control" id="harga_maksimum" name="harga_max" defaultValue='1000000000'/>
                                </div>
                                <button type="submit" style={{marginBottom: '20px'}} className="btn btn-warning btn-block">Filter</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("kategori", actions)(Filter);
