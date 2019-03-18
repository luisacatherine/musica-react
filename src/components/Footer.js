import React, { Component } from 'react';
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
                            <a href="#">Tentang Kami</a><br/>
                            <a href="#">Blog</a><br/>
                            <a href="#">News</a><br/>
                            <a href="#">Event</a><br/><br/>
                            <div className="d-block d-sm-none">
                                <h5 className="heading-putih heading-footer">Bantuan</h5>
                                <a href="#">Syarat dan Ketentuan</a><br/>
                                <a href="#">Pembayaran</a><br/>
                                <a href="contact.html">Hubungi Kami</a><br/>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-4 col-6 info">
                            <h5 className="heading-putih heading-footer">Beli</h5>
                            <a href="#">Cara Belanja</a><br/>
                            <a href="#modalSignUp" data-toggle="modal" data-target="#modalSignUp">Daftar Sebagai Pembeli</a><br/>
                            <a href="#">Pembayaran</a><br/><br/>
                            <div className="d-block d-sm-block d-md-none">
                                <h5 className="heading-putih heading-footer">Jual</h5>
                                <a href="#">Cara Berjualan Online</a><br/>
                                <a href="seller.html">Daftar Sebagai Penjual</a><br/>
                                <a href="#">Penarikan Dana</a><br/>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-4 d-none d-md-block info">
                            <h5 className="heading-putih heading-footer">Jual</h5>
                            <a href="#">Cara Berjualan Online</a><br/>
                            <a href="seller.html">Daftar Sebagai Penjual</a><br/>
                            <a href="#">Penarikan Dana</a><br/>
                        </div>
                        <div className="col-md-3 col-sm-4 d-none d-sm-block info">
                            <h5 className="heading-putih heading-footer">Bantuan</h5>
                            <a href="#">Syarat dan Ketentuan</a><br/>
                            <a href="#">Pembayaran</a><br/>
                            <a href="contact.html">Hubungi Kami</a><br/>
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