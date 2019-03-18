import React, { Component } from 'react';
import MainRoute from "./MainRoute";
import {withRouter} from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";
import '../style/output.css'
import Header from "../components/Header";
import Footer from "../components/Footer";

class AppAjax extends Component {
    postSignout = () => {
        this.props.postLogout();
        console.log(this.props.is_login)
        this.props.history.push("/");
    };

	render() {
    	return (
      		<div className="AppAjax">
              <Header postSignout={this.postSignout} />
              <MainRoute />
              <Footer />
      		</div>
    	);
  	}
}

export default connect("is_login",actions)(withRouter(AppAjax));