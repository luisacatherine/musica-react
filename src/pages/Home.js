import React, { Component } from 'react';
import Carousel from '../components/Carousel';
import PromoDepan from '../components/PromoDepan';
import NewArrival from '../components/NewArrival';
import KategoriDepan from '../components/KategoriDepan';

class Home extends Component {
    render(){
        return(
            <div className="Home">
                <Carousel />
                <PromoDepan />
                <NewArrival />
                <KategoriDepan />
            </div>
        )
    }
}

export default Home