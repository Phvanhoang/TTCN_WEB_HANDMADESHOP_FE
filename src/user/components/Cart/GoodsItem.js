import React, { Component } from "react";
import "./GoodItem.css";
export default class GoodsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
      alt: "123",
      title: "",
      descriptionItem: "",
      quantityvalid: 1,
      quantity: 1,
      unitprice: 1
    };
  }
  componentWillMount() {
    this.setState({
      src: this.props.matHang.danhSachHinhAnh[0],
      title: this.props.matHang.tenMatHang,
      descriptionItem: this.props.matHang.moTa,
      quantityvalid: this.props.matHang.soLuong,
      quantity: this.props.soLuong,
      unitprice: this.props.matHang.gia
    });
  }
  formatCash(str) {
    return str.toFixed('').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  render() {
    const src=`data:image/*;base64, ${this.props.matHang.danhSachHinhAnh[0] !== undefined ? this.props.matHang.danhSachHinhAnh[0].anh: ""}`
    const moTaThuGon = this.state.descriptionItem.substr(0,100) 
    const priceSplit = this.formatCash(this.state.unitprice)
    const multyPriceSplit = this.formatCash(this.props.soLuong*this.state.unitprice)
    return (
        <div>
           
      <div className="goodsItem">
        <img
          //src={process.env.PUBLIC_URL + this.state.src}
          src={src}
          alt={this.state.alt}
          className="imageItem"
        />
        <div className="content">
          <div className="title">{this.state.title}</div>
          <div className="description">{moTaThuGon}...</div>
          <p className="unitprice">Đơn giá: {priceSplit} VND</p>
          
        </div>
        <div className="calculation">
        <div idName="price"><h2 className="mulprice"> {multyPriceSplit}đ</h2> </div>
          <input
            type="number"
            min="1"
            max={this.state.quantityvalid}
            className="quantity"
            defaultValue={this.state.quantity}
            onChange={this.props.changeQuantity}
          ></input>
          <button onClick={this.props.deleteItem} className="removeitem">
            Xóa
          </button>
        </div>
      </div>
      </div>
    );
  }
}