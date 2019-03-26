import React from "react";
import {Route, Switch} from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";
import Home from "../pages/Home"
import NewArrival from "../components/NewArrival";
import Category from "../pages/Category"
import Profile from "../pages/Profile"
import Detail from "../pages/Detail"
import NotMatch from "../pages/NotMatch"
import Cart from "../pages/Cart"
import CheckOut from "../pages/CheckOut"
import Transaction from "../pages/Transaction"
import NewProduct from "../pages/NewProduct";
import EditProduct from "../pages/EditProduct";
import SignUpU from "../pages/SignUpU";
import SignUpS from "../pages/SignUpS";
import EditSeller from "../pages/EditSeller";
import EditUser from "../pages/EditUser";
import AdminTransaksi from "../pages/AdminTransaksi";
import EditTransaction from "../pages/EditTransaction";
import AdminProduk from "../pages/AdminProduk";
import AdminKategori from "../pages/AdminKategori";
import AdminSeller from "../pages/AdminSeller";
import AdminUser from "../pages/AdminUser";
import PostKategori from "../pages/PostKategori";
import EditKategori from "../pages/EditKategori";
import Promo from "../pages/Promo";
import PageNewArrival from "../pages/PageNewArrival";
import PageSearch from "../pages/PageSearch";
import ProfilSeller from "../pages/ProfilSeller";
import ProfilUser from "../pages/ProfilUser";

const MainRoute = () => {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/newarrival" component={NewArrival} />
            <Route path="/category/:category_name" component={Category} />
            <Route exact path="/profile" component={Profile}/>
            <Route path="/items/:items_id" component={Detail}/>
            <Route exact path="/cart" component={Cart}/>
            <Route exact path="/checkout" component={CheckOut}/>
            <Route path="/transaction/:transaction_id" component={Transaction}/>
            <Route path="/edit/transaction/:transaction_id" component={EditTransaction}/>
            <Route exact path="/newproduct" component={NewProduct}/>
            <Route path="/edit/items/:items_id" component={EditProduct}/>
            <Route exact path="/signup/user" component={SignUpU}/>
            <Route exact path="/signup/seller" component={SignUpS}/>
            <Route path="/edit/seller/:seller_id" component={EditSeller}/>
            <Route path="/edit/user/:user_id" component={EditUser} />
            <Route exact path="/admin/transaction" component={AdminTransaksi} />
            <Route exact path="/admin/items" component={AdminProduk} />
            <Route exact path="/admin/category" component={AdminKategori}/>
            <Route exact path="/admin/seller" component={AdminSeller} />
            <Route exact path="/admin/user" component={AdminUser} />
            <Route exact path="/add/category" component={PostKategori}/>
            <Route path="/edit/category/:category_id" component={EditKategori}/>
            <Route exact path="/promo" component={Promo}/>
            <Route exact path="/new-arrival" component={PageNewArrival}/>
            <Route path="/search" component={PageSearch}/>
            <Route path="/user/:user_id" component={ProfilUser}/>
            <Route path="/seller/:seller_id" component={ProfilSeller}/>
            <Route component={NotMatch}/>
        </Switch>
    )
}

export default MainRoute;