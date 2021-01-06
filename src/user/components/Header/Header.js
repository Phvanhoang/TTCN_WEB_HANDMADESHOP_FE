import React from 'react'
import { Navbar,Nav,NavDropdown, Form, FormControl} from 'react-bootstrap'
import Cart from '../svg/cart.svg'
// import Home from '../svg/home.svg'
import './Header.css'
import {isLoggedIn, logout} from '../../services/AuthenticationService'
import { Link, Redirect } from 'react-router-dom'
import { Route, Router } from 'react-router'
import ProductsList from '../Products/List/List'
// import { RedirectService } from "../../services/RedirectService"
import  history  from "../../../history"
let cartLength 
class Header extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            isLogout: false,
            cart: []
        }
        this.form = React.createRef()
        
        if(JSON.parse(sessionStorage.getItem("cart")) === null ){
            cartLength = 0
        }
        else{
            cartLength = JSON.parse(sessionStorage.getItem("cart")).length
        }
        
    }

    addToCart(product) {
        const cartItem = {
          matHang: {},
          soLuong: 1
        };
        let trung = false;
        const cart = JSON.parse(sessionStorage.getItem("cart"))
        if(cart !==null) {
             var newCart = cart
        }
        else { newCart = Object.assign([], this.state.cart);}
        for (let item of newCart) {
          if (product.maMatHang === item.matHang.maMatHang) {
            item.soLuong++;
            trung = true;
            console.log(newCart)
            sessionStorage.removeItem("cart")
            sessionStorage.setItem("cart", JSON.stringify(newCart))
            this.setState({
                ...this.state,
                 cart: newCart
            });
          }
        }
        if (trung === false) {
            if(newCart.length===9) {
                alert("Giỏ hàng đã đầy")
                return
        }
          cartItem.matHang = product;
          newCart.push(cartItem);
          sessionStorage.removeItem("cart")
          sessionStorage.setItem("cart", JSON.stringify(newCart))
          this.setState({ ...this.state,
            cart: newCart });
        }
      }

    onLogout() {
        logout()
        this.setState({
            ...this.state,
            isLoggedIn: isLoggedIn(),
            isLogout: true
        })
    }
    getNav() {
        if (!isLoggedIn()) return (<Nav.Link className="navicon"> <Link to='signup'>Đăng nhập/ Đăng ký</Link></Nav.Link>)
        else return (<NavDropdown title={
                        <span>
                            <img src= {process.env.PUBLIC_URL + "/logo/user.png" } alt='..'/>
                        </span>} id="basic-nav-dropdown">
                        <NavDropdown.Item><Link to='profile'>Thông tin cá nhân</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to='purchase'>Đơn hàng</Link></NavDropdown.Item>
                        <NavDropdown.Item onClick={this.onLogout.bind(this)}>Đăng xuất</NavDropdown.Item>
                    </NavDropdown>)
    }


    search (e){
        if (e.key === "Enter"){
            this.form.submit()
        }
    }

    logoutcomponent(){
        // alert(!this.state.isLoggedIn)
        if(this.state.isLogout){
            this.setState({
                ...this.state,
                isLogout: false
            })
             return (<Redirect to = "/" />)
        }
        else return null        
    }
    render(){
        
        // if(!this.state.isLoggedIn) return (<Redirect to = "/" />)
        return(
            <div className="header">
            <div className="row">
                <div className="col-md-12">
                    <Router>
                    <Navbar  expand="lg" sticky="top">
                        <Navbar.Brand className="nguoiDung" href='/'>
                            <img src= {process.env.PUBLIC_URL + "/logo/logo.png"} alt='..' />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Form action="/search" method="get" className="form-center form" ref={this.form}>
                                    <FormControl className="input-search" name="ten_mat_hang" type="text" placeholder="Tìm kiếm" onKeyDown= {this.search}/>
                                </Form>
                            </Nav>
                            <Nav className="header-item">
                                {/* <Nav.Link className="navicon"><Link to='/'>Trang chủ </Link></Nav.Link> */}
                                {/* <Nav.Link ><Link to='/productslist'>Sản phẩm</Link></Nav.Link> */}
                                {this.getNav()}
                                <Nav.Link ><Link to='/cart'>
                                <div className="cart-icon">
                                <span>{cartLength}</span>
                                <img className="carticon" src={Cart} alt="" width="20" />  
                                </div>
                                </Link></Nav.Link>
                                
                            </Nav>
                            <Route exact path='/' Component={ProductsList}></Route>
                        </Navbar.Collapse>
                    </Navbar>
                    {this.logoutcomponent()}
                    </Router>
                </div>
            </div>
            </div>
        )  
    }
}

export default Header;