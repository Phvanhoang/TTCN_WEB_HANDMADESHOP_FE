import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./List.css";
import { Col, Button } from "reactstrap";
import {Link } from "react-router-dom";

export default class ProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        // products: [],
        cart: [],
        search: "",
        // to: 0,
        // from: 0,
        // loaiMatHangList: [],
      };
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

  formatCash(str) {
    return str.toFixed('').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  renderProduct = (product) => {
    const src=`data:image/*;base64, ${product.danhSachHinhAnh[0] !== undefined ? product.danhSachHinhAnh[0].anh: ""}`
    const priceSplit = this.formatCash(product.gia)
    return (
        <>
        <Col sm="3">
            <div className="card">
                <img src={src} className="card-img-top" alt="..." />
                <div className="card-body">
                  <p className="card-title">{product.tenMatHang}</p>
                  <p className="card-text">Giá {priceSplit} ₫</p>
                  <div className="">
                    <div>
                      <Button onClick={() => this.addToCart(product)}>Chọn mua</Button>
                    {/* </div>
                    <div sm="6" xs="12">
                         */}
                      <Link 
                        to={"/productslist/" + product.maMatHang}
                        className="btn btn-primary mat-hang"
                      >
                        Chi tiết
                      </Link>

                    </div>
                  </div>
                </div>
            </div>
            <br></br>
        </Col>
        </>
    );
  };

  render() {
    return (
        <>
            <div className="container">
                <br></br>
                <div>
                  <div className="row">
                    {this.props.list.map((product) => {return this.renderProduct(product);})}                  
                  </div>
                </div>
         </div>
      </>
    );
  }
}
