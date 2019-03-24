import React from "react";
import {Route, Switch} from "react-router-dom";
// import SignIn from "../pages/SignIn.js"
// import Profile from "../pages/Profile"
import { connect } from "unistore/react";
import { actions } from "../store";
import Home from "../pages/Home"
import View from "../pages/View"
import NewArrival from "../components/NewArrival";
import Category from "../pages/Category"
import Profile from "../pages/Profile"
import Detail from "../pages/Detail"
import NotMatch from "../pages/NotMatch"
import Cart from "../pages/Cart"
import CheckOut from "../pages/CheckOut"
import Transaction from "../pages/Transaction"
import NewProduct from "../pages/NewProduct";

const MainRoute = () => {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/view" component={View} />
            <Route exact path="/newarrival" component={NewArrival} />
            <Route path="/category/:category_name" component={Category} />
            <Route exact path="/profile" component={Profile}/>
            <Route path="/items/:items_id" component={Detail}/>
            <Route exact path="/cart" component={Cart}/>
            <Route exact path="/checkout" component={CheckOut}/>
            <Route path="/transaction/:transaction_id" component={Transaction}/>
            <Route exact path="/newproduct" component={NewProduct}/>
            {/* <Route exact path="/signin" component={SignIn} />
            <Route exact path="/action" component={ActionMovies}/>
            <Route exact path="/romance" component={RomanceMovies}/>
            <Route exact path="/comedy" component={ComedyMovies}/>
            <Route exact path="/fiction" component={FictionMovies}/>
            <Route path="/sources/:source_name" component={Cnbc}/> */}
            <Route component={NotMatch}/>
        </Switch>
    )
}

export default MainRoute;