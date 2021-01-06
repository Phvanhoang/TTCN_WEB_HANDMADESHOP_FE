import React, { Component } from "react";
import Item from "./Item";
import "./Purchase.css";
import {fetchListStatusOrder} from "../../../user/services/UserService"
import {chechURLService} from "../../../user/services/CheckURLService"
const id = 5;
export default class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      purchase:this.props.purchase,
      trangThai:[]
    });
  }
  componentDidMount(){
  fetchListStatusOrder().then((res) => {
        this.setState({
            ...this.state,
            trangThai:res.data})
      }).catch((err)=> {
        console.log(err)
    alert("tai that bai")})
 }
  render() {
   
    // if(this.state.cart.length === 0) return (<div><h1>Giỏ hàng trống</h1></div>)
    
    // const {Purchase,trangThai} = this.state;
    // // console.log(this.state.trangThai);
    // if(Purchase===null) return (<div><h1>Bạn chưa mua đơn hàng nào cả</h1></div>)
    const {trangThai} = this.state;
    console.log(trangThai)
    //console.log(purchase.data)
    //console.log(trangThai)
    // if(this.props.purchase.data.len==undefined)
    console.log(this.state.purchase)
    //if(this.props.purchase.data!==undefined){
    //const danhSachDonHang = this.props.purchase.data
    //console.log(danhSachDonHang)
    //console.log(trangThai)
    return (
        <div className="purchase container">
            <div className="contain-donhang container">
             {
             this.state.purchase===null?<></>:
             this.state.purchase.map((donHang,index)=>(
                    <Item 
                    key={index}
                    maDonHang={donHang.maDonHang}
                    trangThai={trangThai}
                    maTrangThai={donHang.maTrangThaiDonHang}
                 /> ))
             }
            </div>
        </div>
    );//}else return<></>
  }
}
