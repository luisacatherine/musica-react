import React from "react";
import {Redirect} from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";

const Profile = props => {
    console.log("is_login", props.is_login);

    if(!props.is_login){
        return (<Redirect to={{pathname: "/signin"}} />);
    } else {
        return (
            <section className="content container">
                <div className="container-profile">
                    <div className="row">
                        <div className="col-2">
                            <div className="profile-picture">
                                <img id="profpic" src={props.avatar}></img>                            
                            </div>
                        </div>
                        <div className="col-10">
                            <div className="user-profile">
                                <h3><label>Name: </label>{props.username}</h3>
                                <p><label>Email: </label>{props.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default connect(["is_login", "email", "username", "avatar"], actions)(Profile);