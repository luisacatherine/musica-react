import React from 'react';
import PropTypes from 'prop-types';
import '../style/output.css'
import { Link } from 'react-router-dom';

const CardDetail = (props) => {
    return(
        <div className="col-lg-3 col-md-4 col-sm-6 col-6 produk-all">
            <Link to={"/items/" + props.id}>
                <div className="card">
                    <div className="gambar-front">
                        <img className="card-img-top" src={props.gambar} alt="Card image cap"/>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title nama-barang">{props.nama}</h5>
                        <span className="card-text harga-promo">Rp {props.harga}</span><br/>
                        <span className="card-text kota-penjual">{props.kota}</span><br/>
                        <span className="card-text nama-penjual">{props.toko}</span><br/>
                    </div>
                </div> 
            </Link>           
        </div>
    )
}

CardDetail.propTypes = {
    id: PropTypes.number,
    gambar: PropTypes.string,
    nama: PropTypes.string,
    harga: PropTypes.number,
    kota: PropTypes.string,
    toko: PropTypes.string
}

export default CardDetail