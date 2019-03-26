import React, { Component } from 'react';
import '../style/output.css'
import {withRouter} from "react-router-dom";
import { connect } from 'unistore/react';
import { actions } from '../store';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

class ModalAlert extends Component{
    constructor (props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
		const { handleModalCloseClick } = this.props;
		$(this.modal).modal('show');
		$(this.modal).on('hidden.bs.modal', handleModalCloseClick);
	}
  
	handleCloseClick() {
		const { handleModalCloseClick } = this.props;
		$(this.modal).modal('hide');
		handleModalCloseClick();
    }
  
    render(){
        return(
            <div className="modal fade" ref={modal=> this.modal = modal} id="ModalAlert" tabIndex="-1" role="dialog" aria-labelledby="ModalAlertTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitleLogIn">{this.props.judul}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{this.props.pesan}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("is_login, baseUrl", actions)(withRouter(ModalAlert));