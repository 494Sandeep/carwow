import React, { Component } from 'react'
import ProductCard from '../Product_card/Product_card';
import { openSort, closeSort, openFilters, closeFilters } from "../Miscellaneous";
import { graphql, compose } from "react-apollo";
import { getAllBrands, getAllCars } from "../../queries/queries";
import { Collapse } from "react-bootstrap";
import './Car_choose.scss'
class Car_Choose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBrandChecked: {},
            isSeatsChecked: {},
            isFuelChecked: {},
            queryBrand: [],
            querySeats: [],
            queryFuel: [],
            carListLength: 0,
            SlideFilterBrand: true,
            SlideFilterfuel: false,
            SlideFilterSeats: false,
            sortType: "make"
        }
    }
    HandleChange = (e, item, type) => {
        //Brand Filter
        if (type === 'brand') {
            let isBrandChecked = this.state.isBrandChecked;
            isBrandChecked[item.brand] = e.target.checked;
            this.setState({ isBrandChecked })
            let qb = this.state.isBrandChecked;
            let queryBrand = [];
            if (qb) {
                for (const key in qb) {
                    if (qb.hasOwnProperty(key)) {
                        if (qb[key])
                            queryBrand.push(key)
                    }
                }
            }
            this.setState({ queryBrand })
        }
        //Seats Filter
        if (type === 'seats') {
            let isSeatsChecked = this.state.isSeatsChecked;
            isSeatsChecked[item] = e.target.checked;
            this.setState({ isSeatsChecked })
            let qb = this.state.isSeatsChecked;
            let querySeats = [];
            if (qb) {
                for (const key in qb) {
                    if (qb.hasOwnProperty(key)) {
                        if (qb[key])
                            querySeats.push(key)
                    }
                }
            }
            this.setState({ querySeats })
        }
        //Fuel Filter
        if (type === 'fuel') {
            let isFuelChecked = this.state.isFuelChecked;
            isFuelChecked[item] = e.target.checked;
            this.setState({ isFuelChecked })
            let qb = this.state.isFuelChecked;
            let queryFuel = [];
            if (qb) {
                for (const key in qb) {
                    if (qb.hasOwnProperty(key)) {
                        if (qb[key])
                            queryFuel.push(key)
                    }
                }
            }
            this.setState({ queryFuel })
        }
    }
    HandleSort = (e) => {
        e.preventDefault();
        let sortType = e.target.value;
        this.setState({ sortType })
    }
    componentWillMount = () => {
        if (this.props.match.params.brand) {
            let queryBrand = [];
            queryBrand.push(this.props.match.params.brand);
            this.setState({ queryBrand })
        }
        else {
            this.setState({ queryBrand: [] })
        }
    }
    render() {
        return (
            <div>
                <div>
                    <div id="Sort" className="sidenav" style={{ right: 0 }}>
                        <div className="head">
                            <h3>
                                Sort
            				</h3>
                            <p className="closebtn" onClick={closeSort}>X</p>
                        </div>
                        <div className="sort_input_group">
                            <div className="input_group">
                                <input type="radio" name="sort" value="acces"
                                    onChange={e => this.HandleSort(e)} />Price (Low to High)<br />
                            </div>
                            <div className="input_group">
                                <input type="radio" name="sort" value="desc"
                                    onChange={e => this.HandleSort(e)} /> Price (High to Low)<br />
                            </div>
                            <div className="input_group">
                                <input type="radio" name="sort" value="make"
                                    onChange={e => this.HandleSort(e)} checked /> Make (A-Z)<br />
                            </div>
                        </div>
                    </div>
                    <div id="Filters" className="sidenav" style={{ left: 0 }}>
                        <div className="head">
                            <h3>
                                Filters
            				</h3>
                            <p className="closebtn" onClick={closeFilters}>X</p>
                        </div>
                        <div >
                            <div className="slide-card">
                                {/* Brand */}
                                <h3 onClick={() => this.setState({
                                    SlideFilterBrand: !this.state.SlideFilterBrand,
                                    SlideFilterfuel: false,
                                    SlideFilterSeats: false
                                })}
                                    aria-controls="content1"
                                    aria-expanded={this.state.SlideFilterBrand}>
                                    Brand
                                </h3>
                                <Collapse in={this.state.SlideFilterBrand}>
                                    <div id="content1">
                                        {
                                            !this.props.getAllBrands.loading ?
                                                this.props.getAllBrands.brands.map((item, index) => {
                                                    return (
                                                        <div key={index} className="form-group1" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
                                                            <label style={{ margin: 0 }}>{item.brand}</label>
                                                            <input type="checkbox" name="brand" value={item.brand}
                                                                onChange={e => this.HandleChange(e, item, 'brand')} />
                                                        </div>
                                                    )
                                                })
                                                : ""
                                        }
                                    </div>
                                </Collapse>
                                {/* Seats */}
                                <h3 onClick={() => this.setState({
                                    SlideFilterSeats: !this.state.SlideFilterSeats,
                                    SlideFilterBrand: false,
                                    SlideFilterfuel: false
                                })}
                                    aria-controls="content2"
                                    aria-expanded={this.state.SlideFilterSeats}>
                                    Seats
                                </h3>
                                <Collapse in={this.state.SlideFilterSeats}>
                                    <div id="content2">
                                        {
                                            ["2", "4", "5", "6", "7"].map((item, index) => {
                                                return (
                                                    <div key={index} className="form-group1" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
                                                        <label style={{ margin: 0 }}>{item} Seat </label>
                                                        <input type="checkbox" name="brand" value={item}
                                                            onChange={e => this.HandleChange(e, item, 'seats')} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Collapse>
                                {/* Fuel-type */}
                                <h3 onClick={() => this.setState({
                                    SlideFilterfuel: !this.state.SlideFilterfuel,
                                    SlideFilterSeats: false,
                                    SlideFilterBrand: false
                                })}
                                    aria-controls="content3"
                                    aria-expanded={this.state.SlideFilterfuel}>
                                    Fuel-type
                                </h3>
                                <Collapse in={this.state.SlideFilterfuel}>
                                    <div id="content3">
                                        {
                                            ["Petrol", "Electric(Battery)", "Diesel"].map((item, index) => {
                                                return (
                                                    <div key={index} className="form-group1" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
                                                        <label style={{ margin: 0 }}>{item}</label>
                                                        <input type="checkbox" name="brand" value={item}
                                                            onChange={e => this.HandleChange(e, item, 'fuel')} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="car_chooser" id="car_chooser">
                    <div className="card_filter">
                        <div className="card_filter_header">
                            <h1>Car chooser</h1>
                            <p>Let us help you find your perfect car</p>
                        </div>
                        <div className="card_filter_custom">
                            <button onClick={openFilters} id="openFilter">Filters</button>
                            <button onClick={openSort} id="openSort">Sort</button>
                        </div>
                    </div>
                    <div className="cc_cars_container">
                        <div className="cc_cars">
                            <ProductCard
                                queryBrand={this.state.queryBrand}
                                querySeats={this.state.querySeats}
                                queryFuel={this.state.queryFuel}
                                sortType={this.state.sortType}
                                carlength={(len) => this.carlength(len)} />
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}
export default compose(
    graphql(getAllCars),
    graphql(getAllBrands, { name: 'getAllBrands' })
)(Car_Choose);
