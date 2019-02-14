import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bounce from 'react-reveal/Bounce';
import { Container, Row, Col } from 'react-bootstrap'
import './Slider.scss'
class Slider extends Component {
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("Home").style.opacity = '1';
        document.body.style.transition = 'all 0.5s ease-in-out';
    }
    render() {
        return (
            <div className="main_cover" onClick={this.closeNav}>
                <div id="slider" style={{ backgroundImage: `url(./assets/images/Basic/slider_mustag.jpg)` }}>
                    <div className="slider_info">
                        <Bounce top>
                            <h3 className="d-none d-md-block">The smarter way to buy your new car</h3>
                        </Bounce>
                        <Bounce >
                            <p className="d-none d-md-block">our perfect car, compare offers from local and national dealers and buy at a price that’s right for you.</p>
                        </Bounce>

                        <a href="#carbrand">
                            <button className="select_car" onClick={this.handleShow}>
                                Select a car
                            </button>
                        </a>

                        <button className="not_sure">
                            <Link to="/car_chooser">Not sure what you want?</Link>
                        </button>
                    </div>
                </div>
                <div className="brandlist_container" id="carbrand">
                    <Container className="list">
                        <h3>Choose your car brand</h3>
                        <hr />
                        <Row>
                            <Col md={{ span: 8, offset: 2 }}>
                                <ul className="m-auto">
                                    <li>
                                        <Link to="#">
                                            <img src="./assets/images/logo/Audi-logo.png" alt="Audi logo" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <img src="./assets/images/logo/BMW-logo.png" alt="BMW logo" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <img src="./assets/images/logo/Volvo-logo.png" alt="Volvo logo" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <img src="./assets/images/logo/Jaguar-logo.png" alt="Jaguar logo" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <img src="./assets/images/logo/Dodge-logo.png" alt="Dodge logo" />
                                        </Link>
                                    </li>
                                </ul>
                            </Col>
                        </Row>


                    </Container>
                </div>
            </div >
        )
    }
}
export default Slider;