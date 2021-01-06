import React from 'react';
//import Header from './user/components/Header/Header'
// import Products from './user/components/Products/Products'
import ProductsList from './user/components/Products/ProductsList'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
//import {DataProvider} from './user/components/Products/DataProvider'
import Product from './user/components/Products/Product/Product'
import Cart from './user/components/Cart/Cart'
//import Footer from './user/components/Footer/Footer'
import SignUp from './user/components/SignUp/SignUp'
import Order from './user/components/Order/Order'
import Home from './user/components/HomePage/HomePage'
import Profile from './user/components/Profile/Profile'
import Header from "./user/components/Header/Header"
import Footer from "./user/components/Footer/Footer"
import Purchase from "./user/components/Purchase/Purchase"
import history from "./history";
import Containpurchase from './user/components/Purchase/Containpurchase';
import UserPage from './user/components/UserPage/UserPage';
import {isLoggedIn} from './user/services/AuthenticationService'
// import {AdminPage} from './admin/AdminPage'
class App extends React.Component {
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
    render(){
  return(    
    <BrowserRouter history={history}>    
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

            {/* <Route path="/" exact component={UserPage} /> */}
            {/* <Route path='/admin' component={AdminPage}/> */}
        </Switch>
        </div>
        <Footer />
    {/* </div> */}
    </BrowserRouter>
  );
    }
}

export default App;
