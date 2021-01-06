import React from "react";
import {isLoggedIn} from '../../../services/AuthenticationService'
import requestComment from "../../../services/CommentService"
import config from "../../../config/config";
import RatingStar from "./RatingStar";

export default class UpLoadCmt extends React.Component {
    constructor(props)
    { super( props)
       this.state = {
       index: 0,
       cart: [],
       noiDung: "",
       validationMsg: {},
       isLoggedIn: this.props.isLoggedIn,
       soSao: 0,
       daDanhGia: false
     };
     this.sendCmt = this.sendCmt.bind(this)
     this.onChange = this.onChange.bind(this);
     this.onFocus = this.onFocus.bind(this);
     this.setSao = this.setSao.bind(this);
    }

    onFocus(e){
        this.setState({
        validationMsg: ""
        });
    }
    onChange(e) {
    this.setState({
      ...this.state,
      noiDung: e.target.value
    });
    }

    setSao(soSao){
        this.setState({
            ...this.state,
            soSao: soSao
        })
    }

sendCmt(e){
    const { noiDung, soSao } = this.state;
    const msg = {};
    if (noiDung === null || noiDung === "") {
        msg.warning = "Bạn chưa nhập đánh giá";
    }
    else if(soSao === 0){
        msg.warning = "Bạn chưa số sao";
    }
    this.setState({
      validationMsg: msg
    });
    if (Object.keys(msg).length > 0) return;
    alert(this.state.product.maMatHang)
    const comment = {
        noiDung:this.state.noiDung,
        soSao: this.state.soSao,
        maMatHang: this.props.product.maMatHang
    };
    config()
    requestComment(comment).then((data) => {
        this.setState({
            ...this.state,
            daDanhGia: true
        })
        if(data.status===201) alert("Bạn đã đánh giá mặt hàng này");
    }).catch((err) => {
         alert("Đánh giá không thành công")
    });
}

    render() {
        if (isLoggedIn())
         return (
             <>
                <h2> Đánh giá của bạn</h2>
                    <div className= "row">
                        <textarea className="comment" name="noiDung" rows="4" type="text" placeholder="Đánh giá của bạn" 
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                        />
                            <div className = " danhgia row">
                                <div className="col-9">
                                    <RatingStar setSao={this.setSao.bind(this)} />
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-primary btn-comment" onClick={this.sendCmt}> Đánh giá </button> 
                            </div>
                            <div className="warningctn">
                                <p className="warning">{this.state.validationMsg.warning}</p>
                            </div>
                        </div>
                    </div>
             </>
         )
    }
}