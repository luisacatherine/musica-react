import React, { Component } from 'react';
import Filter from '../components/Filter';
import Breadcrumb from '../components/Breadcrumb';
import CardDetail from '../components/CardDetail';
import PaginationPage from "../components/PaginationPage";
import Piano from '../img/img/home/piano.png';
import '../style/output.css';
import axios from 'axios';
import { connect } from "unistore/react";
import { actions } from "../store";

class PageSearch extends Component {
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
			allItems: [],
			currentItems: [],
			currentPage: 1,
			totalPages: null,
            listBarang: [],
            urlItems: this.props.baseUrl + '/item',
            keyword: '',
            harga_min: 0,
            harga_max: 1000000000,
            sortby: '',
            status: '',
            lokasi:''
		}
    }

    componentDidMount = () => {
        const queryString = require('query-string');
        window.scrollTo(0, 0)
        this._isMounted = true;
        const self = this;
        const keyword = (this.props.location.search)
        console.log(keyword)
        const parsed = queryString.parse(this.props.location.search);
        console.log(parsed.harga_min);
        self.setState({'keyword': parsed.q})
        self.setState({'harga_min': parsed.harga_min})
        self.setState({'harga_max': parsed.harga_max})
        self.setState({'sortby': parsed.sortby})
        self.setState({'status': parsed.status})
        self.setState({'lokasi': parsed.lokasi})
        axios
            .get(self.state.urlItems, {
                params: {
                    'nama': parsed.q,
                    'harga_min': parsed.harga_min,
                    'harga_max': parsed.harga_max,
                    'status': parsed.status,
                    'lokasi': parsed.lokasi,
                    'sortby': parsed.sortby
                }
            })
            .then(function(response){
                self.setState({allItems: response.data.items});
            })
            .catch(function(error){
                console.log(error);
            });
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.match.params !== prevProps.match.params){
            window.location.reload();
        }
    };

    onPageChanged = data => {
        window.scrollTo(0, 0)
        const self = this;
        const { currentPage, totalPages, pageLimit } = data;
        axios
            .get(self.state.urlItems, {
                params: {
                    'rp': pageLimit,
					'p': currentPage,
                    'nama': self.state.keyword,
                    'harga_min': self.state.harga_min,
                    'harga_max': self.state.harga_max,
                    'status': self.state.status,
                    'lokasi':self.state.lokasi,
                    'sortby': self.state.sortby
                }
            })
            .then(function(response){
                const currentItems = response.data.items;
                self.setState({ currentPage, currentItems, totalPages})
            })
            .catch(function(error){
                console.log(error)
            })  
   }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
        const {
            allItems,
            currentItems,
            currentPage,
            totalPages
        } = this.state;
        const totalItems = allItems.length;

        if (totalItems === 0) return (
            <div className="Category">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}} alt={'gambar kategori'}/>
                    <h1 className="judul-kategori">Search</h1>
                </div>
                <div className="container barang">
                    <Breadcrumb link={'/search'} judul={'Search'} linkparents={'/'}/>
                    <div className="row">
                        <Filter q={this.state.keyword}/>
                        <div className="col-md-9" >
                            <h2>Items not found!</h2>
                        </div>
                    </div>
                </div>
            </div>
        );

        const headerClass = [
        "text-dark py-2 pr-4 m-0",
        currentPage ? "border-gray border-right" : ""
        ]
        .join(" ")
        .trim();
    
        return(
            <div className="Promo">
                <div className="kategori-barang">
                    <img className="gambar-kategori-satuan" src={Piano} style={{width: '100%'}} alt={'gambar kategori'}/>
                    <h1 className="judul-kategori">Search</h1>
                </div>
                <div className="container barang">
                    <Breadcrumb link={'/search'} judul={'Search'} linkparents={'/'}/>
                    <div className="row">
                        <Filter/>
                        <div className="col-md-9" >
                            <p>Menampilkan hasil pencarian untuk "{this.state.keyword}"</p><br/><br/>
                            <div className="row d-flex flex-row">
                                <div className="w-100 px-4 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <h2 className={headerClass}>
                                            <strong className="text-secondary">{totalItems}</strong>{" "}
                                            Items {this.props.category}
                                        </h2>
                                        {currentPage && (
                                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                            Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                                            <span className="font-weight-bold">{totalPages}</span>
                                            </span>
                                        )}
                                    </div>
                                    <div className="d-flex flex-row py-4 align-items-center" >
                                        <PaginationPage
                                            totalRecords={totalItems}
                                            pageLimit={12}
                                            pageNeighbours={1}
                                            onPageChanged={this.onPageChanged}
                                        />
                                    </div>
                                </div>
                                {currentItems.map((item, key) => {
                                    return <CardDetail key={key} id={item.id} gambar={item.photo_url} nama={item.nama} harga={item.harga_promo} kota={item.seller_city} toko={item.seller}/>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("baseUrl", actions)(PageSearch);

