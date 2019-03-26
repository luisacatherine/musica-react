import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions } from "../store";

class ListSeller extends Component{
    render(){
        return(
            <tr>
                <td><Link to={'/seller/' + this.props.id }>{this.props.id}</Link></td>
                <td><Link to={'/seller/' + this.props.id }>{this.props.client_id}</Link></td>
                <td><Link to={'/seller/' + this.props.id }><img src={this.props.photo} style={{width: '50px'}}/></Link></td>
                <td><Link to={'/seller/' + this.props.id }>{this.props.nama}</Link></td>
                <td>{this.props.kota}</td>
                <td><Link to={'/edit/seller/' + this.props.id }>edit</Link></td>
            </tr>
        )
    }
}

export default connect("baseUrl, data_status", actions)(ListSeller);
