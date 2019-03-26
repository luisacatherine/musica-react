import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions } from "../store";
const status = localStorage.getItem("status");

class ListTransaksi extends Component{

    constructor(props){
        super(props);
        this.state = {
            hasil: ''
        }
        
    }

    componentDidMount(){
        this.getStatus(this.props.status_transaksi);
    }

    getStatus(status){
        if (status === 1){
            this.setState({hasil: "Menunggu konfirmasi pembayaran"})
        }
        else if (status === 2){
            this.setState({hasil: "Pembayaran telah diterima, menunggu konfirmasi dari penjual"})
        }
        else if (status === 3){
            this.setState({hasil: "Pesanan sedang diproses oleh penjual"})
        }
        else if (status === 4){
            this.setState({hasil: "Pesanan sedang dalam pengiriman"})
        }
        else if (status === 5){
            this.setState({hasil: "Pesanan sudah sampai di tujuan"})
        }
        else if (status === 6){
            this.setState({hasil: "Transaksi selesai"})
        }
        else if (status === 7){
            this.setState({hasil: "Transaksi dibatalkan"})
        }
        else if (status === 0){
            this.setState({hasil: "User belum checkout"})
        }        
    }

    render(){
        return(
            <tr>
                <td><Link to={'/transaction/' + this.props.id }>{this.props.id}</Link></td>
                <td>{this.props.seller_id}</td>
                <td>{this.props.user_id}</td>
                <td>{this.props.tanggal.slice(0, 16)}</td>
                <td>{this.state.hasil}</td>
                <td style={{display : status === 'user' ? 'none': 'table-cell'}}><Link to={'/edit/transaction/' + this.props.id }>edit</Link></td>
            </tr>
        )
    }
}

export default connect("baseUrl, data_status", actions)(ListTransaksi);
