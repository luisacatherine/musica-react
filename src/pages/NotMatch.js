import React, { Component } from 'react';
import '../style/output.css'

class NotMatch extends Component {
    render(){
        return(
            <div className="NotMatch">
                <div className="container barang" style={{marginTop: '200px'}}>
                    <h1>Halaman yang Anda minta tidak ditemukan</h1>
                </div>
            </div>
        )
    }
}

export default NotMatch;