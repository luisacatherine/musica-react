import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/output.css'
import LogoPutih from '../img/logo/logo-min-plain.png'

class Footer extends Component{
    render(){
        return(
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-4 col-6 info">
                            <h5 className="heading-putih heading-footer">Musica</h5>
                            <Link to='/'>Tentang Kami</Link><br/>
                            <Link to='/'>Blog</Link><br/>
                            <Link to='/'>News</Link><br/>
                            <Link to='/'>Event</Link><br/><br/>
                            <div className="d-block d-sm-none">
                                <h5 className="heading-putih heading-footer">Bantuan</h5>
                                <Link to='/'>Syarat dan Ketentuan</Link><br/>
                                <Link to='/'>Pembayaran</Link><br/>
                                <Link to='/'>Hubungi Kami</Link><br/>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-4 col-6 info">
                            <h5 className="heading-putih heading-footer">Beli</h5>
                            <Link to='/'>Cara Belanja</Link><br/>
                            <Link to="/signup/user">Daftar Sebagai Pembeli</Link><br/>
                            <Link to='/'>Pembayaran</Link><br/>
                            <div className="d-block d-sm-block d-md-none">
                                <h5 className="heading-putih heading-footer">Jual</h5>
                                <Link to='/'>Cara Berjualan Online</Link><br/>
                                <Link to="/signup/seller">Daftar Sebagai Penjual</Link><br/>
                                <Link to='/'>Penarikan Dana</Link><br/>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-4 d-none d-md-block info">
                            <h5 className="heading-putih heading-footer">Jual</h5>
                            <Link to='/'>Cara Berjualan Online</Link><br/>
                            <Link to="/signup/seller">Daftar Sebagai Penjual</Link><br/>
                            <Link to='/'>Penarikan Dana</Link><br/>
                        </div>
                        <div className="col-md-3 col-sm-4 d-none d-sm-block info">
                            <h5 className="heading-putih heading-footer">Bantuan</h5>
                            <Link to='/'>Syarat dan Ketentuan</Link><br/>
                            <Link to='/'>Pembayaran</Link><br/>
                            <Link to='/'>Hubungi Kami</Link><br/>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <img src={LogoPutih} style={{width: "50px", height: "auto" }}/>
                    <span>© Luisa Catherine 2019</span>
                </div>
            </div>
        )
    }
}

export default Footer