import React, { Component } from 'react'
import "./SanPham.css"

export default class SanPham extends Component {
    constructor(props) {
        super(props);
        //  const maDonHang= this.props.maDonHang
        //  console.log(maDonHang)
        this.state={
            sanPham:this.props.sanPham
        }
      }
    render() {
        const {sanPham}= this.state
        const src=`data:image/*;base64, ${this.props.sanPham.danhSachHinhAnh[0] !== undefined ? this.props.sanPham.danhSachHinhAnh[0].anh: ""}`
        return (   
      <div className="sanPham">
        <div className="contain-anh">
        <img
          src={src}
          alt={""}
          className="anhSanPham"
        ></img>
        </div>
        <div className="noiDung">
          <div className="tenMatHang">{sanPham.tenMatHang}</div>
          {/* <div className="moTaSanPham">{sanPham.moTa}</div> */}
          
        </div>
        <div className="soLuong">Số lượng: {this.props.soLuong}
        <p className="donGia">Đơn giá {sanPham.gia}đ</p>
        </div>
      </div>
        ) 
    }
}
