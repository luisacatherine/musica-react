import React from 'react';
import PropTypes from 'prop-types';
import '../style/output.css'

const KartuKategori = (props) => {
    return(
        <div className="col-lg-3 col-md-4 col-sm-6 col-6">
            <div className="gambar-kategori">
                <img src={props.gambar} style={{width: '100%'}} />
            </div>
        </div>
    )
}

KartuKategori.propTypes = {
    gambar: PropTypes.string
}

export default KartuKategori