import React, { Component } from 'react'
import './index.scss';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Components
import Header from './Header/Header';
import Home from './Layout/Home';
import Login from './Login/Login';
import Footer from './Footer/Footer';
import Car_Choose from './Layout/Car_Choose';
import Contact from './Contact/Contact';
import NotFound from './NotFound/NotFound';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/users/sign_in" component={Login} />
                        <Route path="/car-chooser" component={Car_Choose} />
                        <Route path="/used-cars" component={Car_Choose} />
                        <Route path="/contact" component={Contact} />
                        <Route exact path="/" component={Home} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}
export default App;
