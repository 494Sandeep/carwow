import React, { Component } from 'react'
import ProductCard from '../Product_card/Product_card';
import { graphql, compose } from "react-apollo";
import { getAllBrands, getAllCars } from "../../queries/queries";
import { Collapse } from "react-bootstrap";
import Drawer from 'rc-drawer';
import { Checkbox, Menu, Icon, Radio } from 'antd';
import 'antd/dist/antd.css';
import 'antd/lib/style';
import 'antd/lib/menu/style';
import 'rc-drawer/assets/index.css';
import './Car_choose.scss'
const SubMenu = Menu.SubMenu;
const RadioGroup = Radio.Group;
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
            sortType: "make",
            openFilter: false,
            openSort: false
        }
    }
    onChange = (bool) => {
        console.log(bool);
    }
    onTouchEnd = () => {
        this.setState({
            openFilter: false,
            openSort: false
        });
    }
    onSwitchFilter = () => {
        this.setState({
            openFilter: !this.state.openFilter,
            openSort: false
        });
    }
    onSwitchSort = () => {
        this.setState({
            openSort: !this.state.openSort,
            openFilter: false
        });
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
                    <Drawer
                        onChange={this.onChange}
                        open={this.state.openSort}
                        onMaskClick={this.onTouchEnd}
                        handler={false}
                        placement={'right'}
                        level={null}
                        width={window.outerWidth < '600' ? "80vw" :"35vw"}>
                        <div className="drawer_header">
                            Sorts
                        </div>
                        <div style={{ right: 0 }}>
                            <div className="sort_input_group">
                                <RadioGroup onChange={e => this.HandleSort(e)} style={{ margin: "20px 0px" }}>
                                    <Radio name="sort" value="acces" style={{ margin: "10px 20px" }}>
                                        <span>Price (Low to High) <Icon type="arrow-up" style={{ margin: "0 0 0 5px", color: 'skyblue' }} /></span>
                                    </Radio><br />
                                    <Radio name="sort" value="desc" style={{ margin: "10px 20px" }}>
                                        <span>Price (High to Low) <Icon type="arrow-down" style={{ margin: "0 0 0 5px", color: 'skyblue' }} /></span>
                                    </Radio><br />
                                    <Radio name="sort" value="make" style={{ margin: "10px 20px" }}>
                                        <span>Make (A-Z)<Icon type="flag" style={{ margin: "0 0 0 5px", color: 'skyblue' }} /></span>
                                    </Radio><br />
                                </RadioGroup>
                            </div>
                        </div>
                    </Drawer>
                    <Drawer
                        onChange={this.onChange}
                        open={this.state.openFilter}
                        onMaskClick={this.onTouchEnd}
                        placement={'left'}
                        handler={false}
                        level={null}
                        width={window.outerWidth < '600' ? "80vw" :"35vw"}>
                        <div className="drawer_header">
                            Filters
                        </div>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['brand']}
                            mode="inline" >
                            {/* Brands */}
                            <SubMenu key="brand" title={<span><Icon type="flag" theme="twoTone" /><span>Brands</span></span>}>
                                {
                                    !this.props.getAllBrands.loading ?
                                        this.props.getAllBrands.brands.map((item, index) => {
                                            return (
                                                <div key={index} className="form-group1" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
                                                    <label style={{ margin: 0 }}>{item.brand}</label>
                                                    <Checkbox name="brand" value={item.brand}
                                                        onChange={e => this.HandleChange(e, item, 'brand')} ></Checkbox>
                                                </div>
                                            )
                                        })
                                        : ""
                                }
                            </SubMenu>
                            {/* Seats */}
                            <SubMenu key="seats" title={<span><Icon type="car" theme="twoTone" /><span>Seats</span></span>}>
                                {
                                    ["2", "4", "5", "6", "7"].map((item, index) => {
                                        return (
                                            <div key={index} className="form-group1" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
                                                <label style={{ margin: 0 }}>{item} Seat </label>
                                                <Checkbox name="seats" value={item}
                                                    onChange={e => this.HandleChange(e, item, 'seats')} ></Checkbox>
                                            </div>
                                        )
                                    })
                                }
                            </SubMenu>
                            {/* Fuel-type */}
                            <SubMenu key="fuel" title={<span><Icon type="fire" theme="twoTone" /><span>Fuel-type</span></span>}>
                                {
                                    ["Petrol", "Electric(Battery)", "Diesel"].map((item, index) => {
                                        return (
                                            <div key={index} className="form-group1" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
                                                <label style={{ margin: 0 }}>{item}</label>
                                                <Checkbox name="fuel" value={item}
                                                    onChange={e => this.HandleChange(e, item, 'fuel')} ></Checkbox>
                                            </div>
                                        )
                                    })
                                }
                            </SubMenu>
                        </Menu>
                    </Drawer>
                </div >
                <div className="car_chooser" id="car_chooser">
                    <div className="card_filter">
                        <div className="card_filter_header">
                            <h1>Car chooser</h1>
                            <p>Let us help you find your perfect car</p>
                        </div>
                        <div className="card_filter_custom">
                            <button onClick={this.onSwitchFilter}>Filters</button>
                            <button onClick={this.onSwitchSort}>Sort</button>
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
