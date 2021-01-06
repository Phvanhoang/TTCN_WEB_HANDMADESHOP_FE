import React, { Component } from "react";
import "./form.css";
import isEmpty from "validator/lib/isEmpty";
import { Redirect } from "react-router-dom";
import config from "../../../user/config/config";
import {requestLogin} from "../../services/AuthenticationService"
import history from '../../../history' 

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      password: "",
      validationMsg: {},
      user:{},
      returnUrl: history.location.pathname
    };
    console.log("constructor login");
    // if(JSON.parse(localStorage.getItem("user")===null))
    // {
    //     const user = {
    //         token:"",
    //         id:0,
    //         tenDangNhap:"",
    //         role: "",
    //         tokenType:""
    //     }
    //     localStorage.setItem("user",JSON.stringify(user))
    // }
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  onFocus(e){
    this.setState({
    validationMsg: ""
    });
    }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitForm(e) {
    e.preventDefault();
    const msg = {};
    const { mail, password } = this.state;
    if (isEmpty(mail) || isEmpty(password)) {
        msg.warning = "Vui lòng nhập đủ thông tin đăng nhập";
    }
    this.setState({
      validationMsg: msg
    });
    if (Object.keys(msg).length > 0) return;
    const user = {
        tenDangNhap: this.state.mail,
        matKhau: this.state.password,
    }
    config()
    requestLogin(user).then((res) => {
        console.log(res.data)
        const userInfor = {
            token: res.data.accessToken,
            id: res.data.id,
            tenDangNhap: res.data.tenDangNhap,
            role: res.data.role,
            tokenType: res.data.tokenType
        }
        localStorage.removeItem("user");
        localStorage.setItem('user', JSON.stringify(userInfor));
        window.history.back()
        this.setState({user:userInfor})
        // console.log(isLoggedIn())
        this.props.onLogIn()
        this.setState({
            ...this.state,
            isLoggedIn: true
        })
        // return <Redirect to={this.state.returnUrl}></Redirect>
    }).catch( ()=> {alert("Đăng nhập thất bại")})
}
  render() {
    if(JSON.parse(localStorage.getItem('user'))!==null){
    const userInfor = JSON.parse(localStorage.getItem('user'));
    var role = userInfor.role
    // if(isLoggedIn()){
    //     return <Redirect to = {this.state.returnUrl} />
    } else role=""
    if(role==="ROLE_ADMIN")
    {
      return <Redirect to= "/admin" />
    }
    if(role==="ROLE_USER")
    return <Redirect to = "/"/>
    return (
        <React.Fragment>
        <div className="Login">
          <br />
          <div className="form-group">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              name="mail"
              value={this.state.mail}
              onChange={this.onChange}
              onKeyDown={this.onChange}
              onFocus={this.onFocus}
              autoComplete="false"
            />
            <br />
            <input
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              onKeyDown={this.onChange}
              onFocus={this.onFocus}
            />
            <p className="warning">{this.state.validationMsg.warning}</p>
            <div className="cont_btnlogin">
            <button
              className="button_login"
              onClick={this.submitForm}
            > Đăng nhập
            </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
