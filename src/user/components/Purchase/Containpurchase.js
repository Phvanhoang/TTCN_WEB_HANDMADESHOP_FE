import Header from "../../../user/components/Header/Header"
import React, { Component } from 'react'
import Purchase from "./Purchase"
import {fetchUserOrder} from "../../../user/services/UserService"
import "./Containpurchase.css"
export default class Containpurchase extends Component {
    constructor(props){
        super(props);
        this.state=({
            purchase:null,
            trangThaiGioHang:false
        })
    }
    componentDidMount(){
    fetchUserOrder().then((res) => {
        this.setState({
            ...this.state,
            purchase: res.data
        })
      }).catch((err)=> {
        console.log(err)
        // alert("tai that bai")
    })
    }
    render() {
    // if(purchase!==null) 
    // {const {length} = purchase.data.length
    // console.log(purchase.data.isArray.length)
    // }
    if(this.state.purchase!==null)
    {
        //console.log(this.state.purchase.data)
        if(this.state.purchase.data!==undefined) {return (
            <div>
                {/* <div className="Tong-don">Đơn hàng của bạn</div> */}
                
                <div className="contain_donHang">
                    <Purchase className ="contain_donHang"
                        purchase={this.state.purchase.data}
                    />
                </div>
           </div>)}else return(<></>)
        // )}else return (<div className="donRong">Bạn chưa mua đơn hàng nào cả</div>)
    }else return(<></>)
}
}
