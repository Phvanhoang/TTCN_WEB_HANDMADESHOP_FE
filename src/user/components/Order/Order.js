import React, { Component } from "react";
import "./Order.css";
import isEmpty from "validator/lib/isEmpty";
import {requestOrderInfo} from "../../../user/services/OrderService";
import { Redirect } from "react-router-dom";
import Header from '../Header/Header'
export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      phonenumber: "",
      address: "",
      note: "",
      validationMsg: {},
    };
    // if(JSON.parse(localStorage.getItem("inforOrder")===null))
    // {
    //     const inforOrder = {
    //         tenNguoiNhanHang:"",
    //         role: "ROLE_GUEST",
    //         tokenType:"",
    //         diaChiGiaoHang: "",
    //         SDTGiaoHang: "",
    //         chuThich: ""
    //     }
    //     localStorage.setItem("inforOrder",JSON.stringify(inforOrder))
    // }
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitForm(e) {
    e.preventDefault();
    const { fullname, phonenumber, address } = this.state;
    const msg = {};
    if (isEmpty(fullname) || isEmpty(phonenumber) || isEmpty(address)) {
      msg.warning = "Vui lòng nhập đủ thông tin giao hàng";
    }
    this.setState({
      validationMsg: msg
    });
    if (Object.keys(msg).length > 0) return;
   
    const cart = JSON.parse(sessionStorage.getItem("cart"))
    const danhSachMatHang = cart.map((e)=>{
        const mH = { matHang:{
            maMatHang:e.matHang.maMatHang
        },
        soLuong :e.soLuong
    }
        return mH;
    })
    const orderInfo = {
        fullname:this.state.fullname,
        phonenumber: this.state.phonenumber,
        address: this.state.address,
        note: this.state.note,
        order: danhSachMatHang
    }
    requestOrderInfo(orderInfo).then((res) => {
        if(res.status===201) 
        {
            alert("dat hang thanh cong")
            sessionStorage.removeItem("cart")
        }
    }).catch((err) => { 
    })

        // console.log(res.data)
        // const userInforOrder = {
        //     token:res.data.accessToken,
        //     id:res.data.id,
        //     tenNguoiNhanHang:res.data.tenNguoiNhanHang,
        //     role: res.data.role,
        //     tokenType: res.data.tokenType,
        //     diaChiGiaoHang:  res.data.diaChiGiaoHang,
        //     SDTGiaoHang: res.data.SDTGiaoHang,
        //     chuThich: res.data.chuThich
    
        // this.setState({inforOrder:userInforOrder})
    }
  render() {
    // const userInforOrder = JSON.parse(localStorage.getItem('inforOrder'));
    // const role = userInforOrder.role
    // if (role==="ROLE_GUEST")
    // {
    //     return <Redirect to= "/signup" />
    // }
    // if(role==="ROLE_ADMIN")
    // {
    //   return <Redirect to= "/admin" />
    // }
    // if(role==="ROLE_USER")
    //return <Redirect to = "/"/>
    return (
        <>
        <React.Fragment>
            <br></br>
            <div className="Order">
            <div className="datHang"><h1 className="datHang" >Đặt hàng</h1></div>
            <br />
            <form className="form-group">
                <div className="required-field">Họ tên:</div>
                <input
                type="text"
                // placeholder="Họ tên (*)"
                name="fullname"
                value={this.state.fullname}
                onChange={this.onChange}
                />
                {/* <p className="warning">{this.state.validationMsg.fullname}</p> */}
                <br />
                <div className="required-field">Số điện thoại:</div>
                <input
                type="text"
                className="required-field"
                // placeholder="Số điện thoại (*)"
                name="phonenumber"
                value={this.state.phonenumber}
                onChange={this.onChange}
                />
                {/* <p className="warning">{this.state.validationMsg.phonenumber}</p> */}
                <br />
                <div className="required-field">Địa chỉ:</div>
                <input
                type="text"
                // placeholder="Địa chỉ (*)"
                name="address"
                value={this.state.address}
                onChange={this.onChange} 
                />
                {/* <p className="warning">{this.state.validationMsg.address}</p> */}
                <br />
                <div >Ghi chú:</div>
                <textarea
                type="text"
                // placeholder="Ghi chú"
                name="note"
                value={this.state.note}
                onChange={this.onChange}
                />
                <p className="warning">{this.state.validationMsg.warning}</p>
                <div  className="button_order"><button
                className="submit"
                onClick={this.submitForm.bind(this)}
                >Đặt hàng</button>
                </div>
            </form>
            </div>
            <br/>   
        </React.Fragment>
      </>
    );
  }
}
