import React from "react";
import {Route, Switch} from "react-router-dom";

import Home from "../pages/Home"
// import SignIn from "../pages/SignIn.js"
// import Profile from "../pages/Profile"
// import NotMatch from "../pages/NotMatch"
import { connect } from "unistore/react";
import { actions } from "../store";

const MainRoute = () => {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/profile" component={Profile}/>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/action" component={ActionMovies}/>
            <Route exact path="/romance" component={RomanceMovies}/>
            <Route exact path="/comedy" component={ComedyMovies}/>
            <Route exact path="/fiction" component={FictionMovies}/>
            <Route path="/sources/:source_name" component={Cnbc}/>
            <Route component={NotMatch}/> */}
        </Switch>
    )
}

export default MainRoute;