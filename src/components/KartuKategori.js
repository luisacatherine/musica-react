import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/output.css'

const KartuKategori = (props) => {
    return(
        <div className="col-lg-3 col-md-4 col-sm-6 col-6">
            <Link to={"/category/" + props.nama}>
                <div className="gambar-kategori">
                    <img src={props.gambar} style={{width: '100%'}} alt={props.nama} />
                </div>
            </Link>
        </div>
    )
}

KartuKategori.propTypes = {
    nama: PropTypes.string,
    gambar: PropTypes.string
}

export default KartuKategori