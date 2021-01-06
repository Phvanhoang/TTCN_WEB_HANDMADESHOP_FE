import React from "react";
import { getBymaMatHang } from "./api/products";
export default class Product extends React.Component {
  state = {
    loading: true,
    product: {},
    cart: []
  };

  componentDidMount() {
    const maMatHang = this.props.match.params.id;

    getBymaMatHang(parseInt(maMatHang)).then((product) => {
      this.setState({
        product,
        loading: false
      });
    });
  }

  addToCart(product) {
    const cartItem = {
      matHang: {},
      soLuong: 1
    };
    let trung = false;
    const newCart = Object.assign([], this.state.cart);
    for (let item of newCart) {
      if (product.maMatHang === item.matHang.maMatHang) {
        console.log(item.matHang.maMatHang);
        item.soLuong++;
        trung = true;
        this.setState({ cart: newCart });
      }
    }
    if (trung === false) {
      cartItem.matHang = product;
      newCart.push(cartItem);
      this.setState({ cart: newCart });
    }
  }

  render() {
    console.log(this.state.cart);
    // const { products } = this.state;
    if (this.state.loading) return "Loading ..";

    const product = this.state.product;

    return (
      <div>
        <div className={"row"}>
        <div className="col-2"></div>
          <div className="col-3">
            <img src={product.URL[0]} width={"50%"} alt="" />
          </div>
          <div className="col-4 box-details ">
            <h1>{product.tenMatHang}</h1>
            <p>Price: {product.gia}$</p>
            <p>{product.moTa}</p>

            <button
              className="btn btn-primary"
              onClick={() => this.addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}
