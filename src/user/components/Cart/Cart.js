import React, { Component } from "react";
import FormOrder from "./FormOrder";
import GoodsItem from "./GoodsItem";
import "./Cart.css";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      shipping: 10000,
      cart:[]
    });
  }
  price() {
    return this.state.cart.reduce(function (total, item) {
      return total + item.soLuong * item.matHang.gia;
    }, 0);
  }

  total = () => {
    return this.price() + this.state.shipping;
  };

  deleteGoodsItem = (index, e) => {
    const items = Object.assign([], this.state.cart);
    items.splice(index, 1);
    sessionStorage.removeItem("cart")
    sessionStorage.setItem("cart",JSON.stringify(items))
    window.location.reload();
  };

  changeQuantity = (index, e) => {
    const item = Object.assign([], this.state.cart);
    item[index].soLuong = e.target.valueAsNumber;
    sessionStorage.removeItem("cart")
    sessionStorage.setItem("cart",JSON.stringify(item))
    this.setState({
      cart: item
    });
  };
  componentDidMount(){
    const cart =JSON.parse(sessionStorage.getItem("cart"))
    if(cart!==null)
    this.setState({
        ...this.state,
        cart:cart
    })
    else this.state.cart.length=0
  }
  render() {
    if(this.state.cart.length === 0){
        return (
        <div className= "nullCart">
            Giỏ hàng trống
        </div>)
    } 
    return (
        
        <div className="cart">
        <br></br>
            <div className="row">
                <div className = "col-8">
                    {this.state.cart.map((item, index) => (
                      <GoodsItem
                        key={index}
                        matHang={item.matHang}
                        soLuong ={item.soLuong}
                        deleteItem={this.deleteGoodsItem.bind(this, index)}
                        //setquantity={item => this.setState(item)}
                        changeQuantity={this.changeQuantity.bind(this, index)}
                        className="GoodItem"
                      />
                    ))}
                </div> 
                <div className="col-4">
                    <FormOrder
                     className="FormOrder"
                     shipping={this.state.shipping}
                     price={this.price()}
                     total={this.total()}
                    />
                </div>
            </div>
        </div>
    );
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
}
