import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import Fade from "react-reveal/Fade";
import { Navbar, Nav } from 'react-bootstrap'
import './Header.scss'
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSearch: false,
      toggleNav: false
    }
  }
  enableSearchBar = () => {
    if (!this.state.toggleSearch) {
      this.setState({
        toggleSearch: true
      })
    } else {
      this.setState({
        toggleSearch: false
      })
    }
  }
  toggleNavHandle = () => {
    if (!this.state.toggleNav) {
      this.setState({
        toggleNav: true
      })
    } else {
      this.setState({
        toggleNav: false
      })
    }
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "35%";
    // document.getElementById("Home").style.opacity = '0.7';
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    // document.getElementById("Home").style.opacity = '1';
  }
  renderFav = () => {
    return (
      <div className="fav_container">
        <h3>You currently have no cars saved</h3>
        <p>To add cars to your favourites, simply tap on the heart</p>
        <div className="No_car_image"></div>
      </div>
    )
  }
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="md" className="header_container">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={this.toggleNavHandle} />
          <Link className="title mr-auto" to='/'>carwow</Link>
          <Fade top>
            <div className={this.state.toggleSearch ? 'searchBar show' : 'hide'}>
              <input type='text' placeholder='Enter a car name ...'></input>
              <div className='close' onClick={() => this.enableSearchBar()} >x</div>
            </div>
          </Fade>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavLink
                activeClassName="nav_selected"
                to='/car-chooser'
                className={this.state.toggleSearch ? 'hide' : 'show'}>New Cars</NavLink>
              <NavLink
                activeClassName="nav_selected"
                to='/used-cars'
                className={this.state.toggleSearch ? 'hide' : 'show'}>Used Cars</NavLink>
              <NavLink
                activeClassName="nav_selected"
                to='/contact'
                className={this.state.toggleSearch ? 'hide' : 'show'}>Contact Us</NavLink>
              <NavLink
                activeClassName="nav_selected"
                to='/users/sign_in'
                className="d-md-none">Log In</NavLink>
            </Nav>
          </Navbar.Collapse>

          <Nav className="right_nav">
            <div onClick={() => this.enableSearchBar()} className={this.state.toggleSearch || this.state.toggleNav ? 'hide' : 'show'}>
              <i className="fas fa-search"></i>
            </div>
            <div onClick={this.openNav} className={this.state.toggleSearch || this.state.toggleNav ? 'hide' : 'show'}>
              <i className="fas fa-heart"></i>
            </div>
            <Link to='/users/sign_in'>
              <div className={"d-none d-md-block d-lg-block" + this.state.toggleSearch ? 'd-none d-md-block d-lg-block' : 'hide'}>
                <i className="far fa-user"><span>Login</span></i>
              </div>
            </Link>

          </Nav>
        </Navbar>
        <div id="mySidenav" className="sidenav">
          <div className="head">
            <h3>
              Your favourites
            </h3>
            <p className="closebtn" onClick={this.closeNav}>X</p>
          </div>
          {this.renderFav()}
        </div>
      </div >
    )
  }
}
export default Header;
