import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions } from "../store";

class ListKategori extends Component{
    render(){
        return(
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.nama}</td>
                <td><Link to={'/edit/category/' + this.props.id}>edit</Link></td>
            </tr>
        )
    }
}

export default connect(actions)(ListKategori);
