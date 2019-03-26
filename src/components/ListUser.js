import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions } from "../store";

class ListUser extends Component{
    render(){
        return(
            <tr>
                <td><Link to={'/user/' + this.props.id }>{this.props.id}</Link></td>
                <td>{this.props.client_id}</td>
                <td><img src={this.props.photo} style={{width: '50px'}}/></td>
                <td>{this.props.nama}</td>
                <td>{this.props.kota}</td>
                <td><Link to={'/edit/user/' + this.props.id }>edit</Link></td>
            </tr>
        )
    }
}

export default connect("baseUrl, data_status", actions)(ListUser);
