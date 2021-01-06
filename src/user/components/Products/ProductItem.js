import React from "react";
import {
  Row,
  Col,
  Button
} from "reactstrap";

export default function ProductItem(props) {
  const { product } = props;

  return (
    <div className="card">
      <img src={product.URL[0]} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{product.tenMatHang}</h5>
        <p className="card-text">Price {product.gia}$</p>
        <Row>
          <Col sm="5" xs="12">
            <Button onClick={() => this.addToCart(product)}>Add to cart</Button>
          </Col>
          <Col sm="4" xs="12">
            <a
              href={"/products/" + product.maMatHang}
              className="btn btn-primary"
            >
              Details
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
}
