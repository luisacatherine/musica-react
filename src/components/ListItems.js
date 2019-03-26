import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions } from "../store";

class ListItems extends Component{
    render(){
        return(
            <tr>
                <td><Link to={'/items/' + this.props.id }>{this.props.id}</Link></td>
                <td>{this.props.nama}</td>
                <td>{this.props.category}</td>
                <td>{this.props.seller}</td>
                <td>{this.props.stok}</td>
                <td><Link to={'/edit/items/' + this.props.id }>edit</Link></td>
            </tr>
        )
    }
}

export default connect("baseUrl, data_status", actions)(ListItems);
