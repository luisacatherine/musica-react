import React from 'react';
import PropTypes from 'prop-types';
import '../style/output.css'
import { Link } from 'react-router-dom';

const Other = (props) => {
    return(
        <div className="col-lg-2 col-md-3 col-sm-4 col-6 produk-lain-bawah">
            <Link to={"/items/" + props.id}>
                <div className="card">
                    <div className="gambar-front">
                        <img className="card-img-top" src={props.gambar} alt="produk lain"/>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title nama-barang-kecil">{props.nama}</h5>
                        <span className="card-text harga-promo-kecil">{props.harga}</span><br/>
                        <span className="card-text kota-penjual-kecil">{props.kota}</span><br/>
                        <span className="card-text nama-penjual-kecil">{props.toko}</span><br/>
                    </div>
                </div> 
            </Link>           
        </div>
    )
}

Other.propTypes = {
    id: PropTypes.number,
    gambar: PropTypes.string,
    nama: PropTypes.string,
    harga: PropTypes.number,
    kota: PropTypes.string,
    toko: PropTypes.string
}

export default Other