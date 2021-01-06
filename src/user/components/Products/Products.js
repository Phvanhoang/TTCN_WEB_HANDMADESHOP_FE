import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ProductItem from "./ProductItem";
import ProductsApi from "./api/products";
import "./Product.css";

export default class Products extends React.Component {
  state = {
    products: [],
    cart: []
  };

  componentDidMount() {
    ProductsApi.getAll().then((data) => {
      this.setState({
        products: data
      });
    });
  }

  render() {
    console.log(this.state.cart);
    // const { products } = this.state;
    return (
      <div>
        <div className="container">
          <h1>Products</h1>
          <div className="row">
            {this.state.products.map((product) => (
              <div className={"col-4"} key={product.maMatHang}>
                <ProductItem product={product} />
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }
}
