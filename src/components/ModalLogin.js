import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/output.css'
// import '../style/App.css'
// import '../style/index.css'
import { connect } from 'unistore/react';
import Logo from '../img/logo/logo-min.png';
import CarouselDrum from '../img/img/home/drums.png'
import CarouselSax from '../img/img/home/sax.png'
import CarouselGuitar from '../img/img/home/guitar.png'
// import { actions } from '../store';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

class ModalLogIn extends Component{
    constructor (props){
        super(props);
    }

    // componentDidMount(){
    //     $(this.modal).modal('show');
    //     $(this.modal).on('hidden.bs.modal', handleModalCloseClick);
    // }

    // handleCloseClick() {
    //     const { handleModalCloseClick } = this.props;
    //     $(this.modal).modal('hide');
    //     handleModalCloseClick();
    // }

    render(){
        return(
            <div className="modal fade" ref={modal=> this.modal = modal} id="modalLogIn" tabindex="-1" role="dialog" aria-labelledby="modalLogInTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitleLogIn">Log In</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label for="email" className="col-form-label">Email:</label>
                                    <input type="email" className="form-control" id="email"/>
                                </div>
                                <div className="form-group">
                                    <label for="password" className="col-form-label">Password:</label>
                                    <input type="password" className="form-control" id="password"/>
                                </div>
                            </form>
                            <span>Belum mempunyai akun? </span><a href="#modalSignUp" data-toggle="modal" data-target="#modalSignUp" data-dismiss="modal">Daftar sekarang</a>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-warning">Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalLogIn;