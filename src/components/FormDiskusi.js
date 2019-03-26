import React, { Component } from 'react'
import axios from 'axios'
import { connect } from "unistore/react";
import { actions } from "../store";

class FormDiskusi extends Component {

    constructor(props){
        super(props);
        this.state = {
		}
    }

    changeInput = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    postDiskusi = () => {
        const self = this;
        const token = localStorage.getItem("token");
        const { kolomDiskusi } = self.state;
        axios({
            method: 'post',
            url: self.props.baseUrl+"/diskusi",
            headers: {'Authorization': 'Bearer ' + token}, 
            data: {
                'id_produk': self.props.id_produk, 
                'isi_diskusi': kolomDiskusi
            }
        })
        .then(function(response){
        })
        .catch(function(error){
            console.log(error);
        });
    }

    render(){
        return(
            <form onSubmit={e => e.preventDefault()}>
                <div className="form-group text-right">
                    <textarea className="form-control" id="kolomDiskusi" name="kolomDiskusi" rows="2" placeholder="Ada pertanyaan? Diskusikan dengan penjual atau pengguna lain" onChange={e => this.changeInput(e)}></textarea>
                    <button type="submit" className="btn btn-warning" style={{marginTop: '10px'}} onClick={() => this.postDiskusi()}>Tanyakan</button>
                </div>
            </form>
        )
    }
}

export default connect("baseUrl", actions)(FormDiskusi);