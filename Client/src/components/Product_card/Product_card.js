import React, { Component } from 'react'
import "./Product_card.scss"
import { Row, Col, Card, Button } from 'react-bootstrap'

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fav: false
        }
    }
    addFavourate = () => {
        let fav = false;
        (this.state.fav) ? fav = false : fav = true;
        this.setState({ fav })
    }
    render() {
        return (
            <Row>
                <Col md={6} lg={4} sm={6} xs={12}>
                    <Card>
                        <button id="favHeart" onClick={this.addFavourate}><i className={this.state.fav ? 'fas fa-heart fav' : 'fas fa-heart nonfav'}></i></button>
                        <Card.Img variant="top" src="./assets/images/Basic/slider_mustag.jpg" />
                        <Card.Body>
                            <Row>
                                <Col md={3} >
                                    <img src="./assets/images/logo/Ford-logo.png" alt="Ford" width="60px" />
                                </Col>
                                <Col md={9} >
                                    <div className="card-generic_product-brand-name" variant="success">
                                        Ford
                                    </div>
                                    <div className="card-generic_product-name">
                                        Mustag
                                    </div>
                                </Col>
                            </Row>
                            <Card.Text className="card_text">
                                Save up to an additional £500 in the Golf Range Event for orders placed before 17 February
                    </Card.Text>
                            <Card.Footer>
                                <div className="price">
                                    <b>Prices</b>
                                    <p className="muted"> $ 25,000</p>
                                </div>
                                <Button variant="success" size="lg" block>
                                    Available deals
                        </Button>
                            </Card.Footer>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}
export default ProductCard;
