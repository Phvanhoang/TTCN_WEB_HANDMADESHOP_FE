import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./FormOrder.css";
class FormOrder extends Component {    
    formatCash(str) {
        return str.toFixed('').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
    
    render() {
        const permission = JSON.parse(localStorage.getItem("user"))===null?"":"ROLE_USER"
        const priceSplit = this.formatCash(this.props.price)
        const shippingSplit = this.formatCash(this.props.shipping)
        const totalSplit =  this.formatCash(this.props.total)
        return (
        <div className="FormOrder">
            <h5>Tổng giá trị đơn hàng</h5>
            <p className="howpay">Cửa hàng nhận thanh toán COD</p>
            <div className="tdLeft" >Phí sản phẩm</div>
            <div className="tdRight" >{priceSplit} VND</div> 
            <div className="tdLeft" >Phí ship</div>
            <div className="tdRight" >{shippingSplit} VND</div> 
            <hr className="totalLine"/>
            <div className="tdLeft" style={{fontWeight:"bold"}}>Tổng:</div>
            <div className="tdRight" >{totalSplit} VND</div>
            <div className="cont_btnpay">
            <button className="pay" >
            <Link to = {permission==="ROLE_USER"?"/order":"/signup"} onClick={(e)=>{console.log(e)}}>
               Đặt hàng 
            </Link>
            </button>
            </div>
        </div>
        );
    }
}
export default FormOrder;