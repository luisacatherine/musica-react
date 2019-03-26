import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/output.css'
// import '../style/App.css'
// import '../style/index.css'
import { connect } from 'unistore/react';
import Logo from '../img/logo/logo-min.png';
import CarouselDrum from '../img/img/home/drums.png'
import CarouselSax from '../img/img/home/sax.png'
import CarouselGuitar from '../img/img/home/guitar.png'
// import { actions } from '../store';

class Carousel extends Component {
    render(){
        return(
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="first-slide" src={CarouselDrum} alt="First slide"/>
                        <div className="container">
                            <div className="carousel-caption text-left">
                                <h1>Sulit mencari perlengkapan musik?</h1>
                                <p>Dapatkan perlengkapan musikmu dengan harga termurah dari semua penjual se-Indonesia sekarang!</p>
                                <p><Link to='/signup/user' className="btn btn-warning" role="button">Daftar Sebagai Pembeli</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="second-slide" src={CarouselSax} alt="Second slide"/>
                        <div className="container">
                            <div className="carousel-caption">
                                <h1>Sulit menjual produkmu?</h1>
                                <p>Dengan bergabung sebagai penjual, Anda berkesempatan mendapat pesanan dari pecinta musik se-Indonesia!</p>
                                <p><Link to='/signup/seller' className="btn btn-warning" role="button">Daftar Sebagai Penjual</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="third-slide" src={CarouselGuitar} alt="Third slide"/>
                        <div className="container">
                            <div className="carousel-caption text-left">
                                <h1>Harga mahal?</h1>
                                <p>Tenang saja! Kami menyediakan produk dengan beragam promo menarik!</p>
                                <p><Link to='/promo' className="btn btn-warning" role="button">Saya mau!</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}

export default Carousel