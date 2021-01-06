import React from 'react';
//import Header from './user/components/Header/Header'
// import Products from './user/components/Products/Products'
import ProductsList from '../Products/ProductsList'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
//import {DataProvider} from './user/components/Products/DataProvider'
import Product from '../Products/Product/Product'
import Cart from '../Cart/Cart'
//import Footer from './user/components/Footer/Footer'
import SignUp from '../SignUp/SignUp'
import Order from '../Order/Order'
import Home from '../HomePage/HomePage'
import Profile from '../Profile/Profile'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import history from "../../../history";
import './UserPage.css'
import Login from '../SignUp/Login';
import {isLoggedIn} from '../../services/AuthenticationService'
import Containpurchase from '../../components/Purchase/Containpurchase';
export default class UserPage extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          isLoggedIn: isLoggedIn()
      }
      this.login = this.login.bind(this)
  }  

  login() {
      this.setState({
          ...this.state,
          isLoggedIn: isLoggedIn()
      })
  }  
  
  render() {
    return(    
        <BrowserRouter>
            <Header isLoggedIn={this.state.isLoggedIn}/>
            <div >
                <Switch>
                <Route path="/" exact  component={ProductsList} />
                {/* <Route path="/productslist/filter/price/:from/:to"  render={({match})=>(<ProductsList params={match.params} path={match.path}></ProductsList>)} /> */}
                <Route path="/search" component={ProductsList}/>
                <Route path="/productslist/filter/price/:from/:to" exact render={(props)=>(<ProductsList {...props}></ProductsList>)} />
                {/* <Route path="/productslist/filter/type/:id"  render={({match})=>(<ProductsList params={match.params} path={match.path}></ProductsList>)} /> */}
                <Route path="/productslist/filter/type/:id" exact  component={ProductsList} />
                <Route path="/productslist/:id" render={(props)=>(<Product {...props}></Product>)} />
                <Route path="/productslist" exact component={ProductsList} />
                <Route path="/signup" exact  component={() => SignUp(this.login)} />
                <Route path="/cart" exact  component={ Cart } />
                <Route path="/order" exact component={ Order } />
                <Route path="/profile" exact component={ Profile  } />
                <Route path="/purchase" exact component= {Containpurchase}/>
                </Switch>
            </div>
        </BrowserRouter>
      );
  }
  
}

// export default GeneralPage;