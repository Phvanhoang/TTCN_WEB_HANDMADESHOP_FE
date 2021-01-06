import React, { Component } from "react";
import "./Item.css";
import {fetchUserOrderById} from "../../../user/services/UserService"
import SanPham from "./SanPham"
export default class Item extends Component {
  constructor(props) {
    super(props);
    //  const maDonHang= this.props.maDonHang
    //  console.log(maDonHang)
    //console.log(this.props.donHang)
    this.state=({
        donHang : {}
    })
  }
  componentDidMount() {

    fetchUserOrderById(this.props.maDonHang).then((res) => {
        this.setState({
            donHang:res.data
        })
    })
    .catch((err) => { 
    })
}
getTrangThai(){
    this.props.trangThai.filter((e,index)=>{
        return e.maTrangThai=this.props.trangThai
}).map((item,index)=>{
    return item.tenTrangThai;
})
}
  render() {
    //const src=`data:image/*;base64, ${this.props.matHang.danhSachHinhAnh[0] !== undefined ? this.props.matHang.danhSachHinhAnh[0].anh: ""}`
    //  const danhSachMatHang = this.props.donHang.danhSachMatHang[0]
    const {donHang} = this.state
    const danhSachMatHang = donHang.danhSachMatHang
    const date = donHang.updatedAt
    console.log(this.props.maTrangThai)
    const maTrangThai = this.props.maTrangThai
    const tenTrangThai = this.props.trangThai.filter(item =>{
        return item.maTrangThai=== maTrangThai
    }).map(x =>{
        return x.tenTrangThai
    })
    const ngay = new Date(date)
    const Ngay = ngay.getDate()-1+"-"+ngay.getMonth()+"-"+ngay.getFullYear()
    return (
      <div>
        <div className="donHang-contain container">
          <div className="donNgay"> Đơn hàng ngày {Ngay}</div>
          
          {danhSachMatHang!==undefined?danhSachMatHang.map((sanPham,index)=>(
              <SanPham 
              key ={index}
              sanPham = {sanPham.matHang}
              soLuong = {sanPham.soLuong}
              />)):""}
             
                <div className="tongTien">Tổng tiền {donHang.giaTongCong}</div>
                <div className="trangThai">
                {
                    tenTrangThai[0]
                }
                </div>
                
            </div>
         </div>
    
    );
  }
}
