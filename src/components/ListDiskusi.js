import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions } from "../store";

class ListDiskusi extends Component{
    render(){
        return(
            <div className="ListDiskusi">
                <div className="row">
                    <div className="col-md-1 col-sm-2 col-2 text-center">
                        <img src={this.props.photo} width="100%" style={{borderRadius: '50%'}} alt='foto penulis'/>
                    </div>
                    <div className="col-md-11 col-sm-10 col-10">
                        <h6 className="heading-coklat">{this.props.nama}</h6>
                        <p className="tanggal-komentar"><i>{this.props.tanggal}</i></p>
                        <p>{this.props.isi}</p>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }
}

export default connect("baseUrl, data_status", actions)(ListDiskusi);