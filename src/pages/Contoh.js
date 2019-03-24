import React, { Component } from "react";
import axios from 'axios'
import PaginationPage from "../components/PaginationPage";
import CardDetail from "../components/CardDetail";
import PropTypes from 'prop-types';
import { connect } from "unistore/react";
import { actions } from "../store";

const urlItems = 'http://localhost:5000/item'

class Contoh extends Component {
	constructor(props){
        super(props);
        this.state = {
			allItems: [],
			currentItems: [],
			currentPage: null,
			totalPages: null,
			listBarang: [],
			category2: this.props.category
		}
    }

	componentDidMount = () => {
		this.props.setKategori()
		const a = this.props.category
		this.setState({
			category2: a

		})

		// const self = this;
		// // console.log(this.props)
		// const category = self.props.category
		// console.log('iniii kat', category)
		// axios.get(urlItems, {
		// 	params: {
		// 		'kategori': 'saxophone'
		// 	}
		// }).then(function(response){
		// 	self.setState({allItems: response.data.items});
		// 	console.log(response.data.items)
		// 	alert(category)
		// }).catch(function(error){
		// 	console.log(error)
		// 	alert(category)
		// })
	}

    onPageChanged = data => {
        const self = this;
		const { currentPage, totalPages, pageLimit } = data;
		const category = this.props.category
        axios
            .get(urlItems, {
                params: {
                    'rp': pageLimit,
					'p': currentPage,
					'kategori': category
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
	render() {
		console.log(this.state.category2, 'TESSSSS')
	   	const {
		   	allItems,
      		currentItems,
      		currentPage,
      		totalPages
		} = this.state;
    	const totalItems = allItems.length;

    	if (totalItems === 0) return null;

		const headerClass = [
		"text-dark py-2 pr-4 m-0",
		currentPage ? "border-gray border-right" : ""
		]
		.join(" ")
		.trim();

		return (
			<div className="container mb-5">
				<div className="row d-flex flex-row py-5">
					<div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
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
						<div className="d-flex flex-row py-4 align-items-center">
							<PaginationPage
								totalRecords={totalItems}
								pageLimit={12}
								pageNeighbours={1}
								onPageChanged={this.onPageChanged}
							/>
						</div>
					</div>
					{currentItems.map((item, key) => {
                        return <CardDetail key={key} gambar={item.photo_url} nama={item.nama} harga={item.harga_promo} kota={item.seller_city} toko={item.seller}/>
                    })}
				</div>
			</div>
		);
  	}
}

Contoh.propTypes = {
    category: PropTypes.string
}

export default connect("kategori, allItems", actions)(Contoh);