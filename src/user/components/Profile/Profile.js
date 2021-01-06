import React, { Component } from 'react'
import { Redirect  } from 'react-router-dom'
import "./profile.css"
import DatePicker  from 'react-datepicker' 
import 'react-datepicker/dist/react-datepicker.css'
import isEmpty from "validator/lib/isEmpty"
import validator from "validator"
import config from "../../config/config";
import {fetchUserProfileData, updateUserProfileData, updateUserAvatar} from "../../services/UserService"
export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            userInfor:{
                anhDaiDien:null,
                gioiTinh:3,
                ngaySinh: "1999-11-20",
                hoTen:"",
                thanhPho: "",
                sdt:"",
            },
            danhSachGioiTinh:[],
            validationMsg:{},
            role:"",
            modified: false
        }
        
        if(JSON.parse(localStorage.getItem("user")===null))
        {
            const user = {
                token:"",
                id:0,
                tenDangNhap:"",
                role: "ROLE_GUEST",
                tokenType:""
            }
            localStorage.setItem("user",JSON.stringify(user))
        }
    } 
    componentDidMount(){
       
        const maNguoiDung = JSON.parse(localStorage.getItem("user")).id
        config()
        fetchUserProfileData(maNguoiDung).then((data) => {
        console.log(data.data)
        if(data.data.ngaySinh!==null)
        {
        const date = new Date(data.data.ngaySinh)
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        var ngaySinh = year+"-"+month+"-"+day;
        } else ngaySinh = this.state.userInfor.ngaySinh
        const userInfor = {
            anhDaiDien:data.data.anhDaiDien,
            gioiTinh:data.data.gioiTinh,
            ngaySinh: ngaySinh,
            hoTen:data.data.hoTen,
            thanhPho: data.data.thanhPho,
            sdt:data.data.sdt,
        }
        // if(userInfor.ngaySinh===null)
        // {
        //     userInfor.ngaySinh=this.state.userInfor.ngaySinh
        // }
        this.setState(
            {...this.state,
            userInfor:userInfor
            })
        }).catch((err) => {
            console.log("Tai That bai")
        })
    }
    imageHandler = (e) =>{
        const reader = new FileReader();
        reader.onload =() =>{
            if(reader.readyState===2){
                this.setState({
                    ...this.state,
                    userInfor: {
                        ...this.state.userInfor,
                        anhDaiDien: reader.result.substr(23)
                    },
                    modified: true
                })
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    onChangeGender = (e) => {
        this.setState({ 
            ...this.state,
            userInfor:{
                ...this.state.userInfor,
                gioiTinh: parseInt(e.target.value)
            }
            });
      };

    saveChange = (e) =>{
        e.preventDefault()
        const msg ={};
        const {hoTen,sdt}= this.state.userInfor;
        if(isEmpty(hoTen)){
           msg.hoTen = "Please input your name";
        }
        if((sdt!==null)&&(sdt!=="")&&!validator.isMobilePhone(sdt,"vi-VN")){
            msg.sdt ="Phone is not valid";
        }
        this.setState({
            ...this.state,
            validationMsg:msg,
        });
        if(Object.keys(msg).length>0) return;
        //call api
        const userForm = document.getElementById("userInfor")
        const dataForm = new FormData(userForm)
        
        // dataForm.append("hoTen",userForm["hoTen"].value)
        // dataForm.append("thanhPho",userForm["thanhPho"].value)
        // dataForm.append("sdt",userForm["sdt"].value)
        // dataForm.append("maGioiTinh",userForm["maGioiTinh"].id)
        // dataForm.append("ngaySinh",userForm["ngaySinh"].defaultValue)
        // dataForm.append("anhDaiDien",this.state.userInfor.anhDaiDien)
        // console.log(this.state.userInfor)
        dataForm.set("hoTen","")
        dataForm.set("thanhPho","")
        dataForm.set("sdt","")
        dataForm.set("maGioiTinh","")
        dataForm.set("ngaySinh","")
        dataForm.set("anhDaiDien","")
        // const entries = dataForm.entries()
        // dataForm.append("anhDaiDien",userForm["anhDaiDien"].src)
        updateUserProfileData(this.state.userInfor).then((data) => {
            alert(data.status)
            }).catch((err) => {
                
            })
        if (this.state.modified) {
            updateUserAvatar(userForm).then(res => {
               console.log(res)
            }).catch(err => {
                
            })
        }
        alert("lưu thành công")
        window.location.reload()
    }
    onChangeName = (e) =>
    {
        this.setState(
            {
                ...this.state,
                userInfor:
                {
                    ...this.state.userInfor,
                    hoTen:e.target.value
                }
            }
            );
    }
    onChangeCity = (e) => {
        this.setState({
            ...this.state, 
                userInfor:{
                ...this.state.userInfor,
                thanhPho:e.target.value
                }
             } )
    } 
    onChangePhone = (e) =>{
        this.setState({
            ...this.state,
            userInfor: 
            {
                ...this.state.userInfor,
                sdt:e.target.value
             }
        })
    }
    onclickLogout = () => {
        localStorage.removeItem("user");
        const user = {
            token:"",
            id:0,
            tenDangNhap:"",
            role: "ROLE_GUEST",
            tokenType:""
        }
        localStorage.setItem("user",JSON.stringify(user))
        this.setState({
            ...this.state,
            userInfor:{
                ...this.state.userInfor,
                thanhPho:""
            }
           
        })
    }
    onChangeDay = (e) => {
        var day = e.getDate();
        var month = e.getMonth()+1;
        var year = e.getFullYear();
        this.setState({...this.state,
            userInfor:{
                ...this.state.userInfor,
                ngaySinh: year+"-"+month+"-"+day
            }})
    }

    render() {
        console.log(this.state.userInfor)
        var birthday = new Date(this.state.userInfor.ngaySinh)
        const role = JSON.parse(localStorage.getItem("user")).role
        console.log(this.state.userInfor.gioiTinh)
        let src = (this.state.userInfor.anhDaiDien===null||this.state.userInfor.anhDaiDien.length===0)? `${process.env.PUBLIC_URL}/images/default-avatar.jpg` :`data:image/*;base64,${this.state.userInfor.anhDaiDien}`
        if (role==="ROLE_GUEST")
        return <Redirect to='/signup' />
        return(
            <div>
            <form id="userInfor" encType="multipart/form-data">
                <div className="thongTin">
                    <h1 className= "thongTin">Thông tin người dùng</h1>
                </div>
                <div className="btn_logout">
                    <button className="btn_logout" onClick={this.onclickLogout}> Đăng xuất</button>
                </div>
                <div className="contain_profile">
                    <div className="choose_new_avatar">
                        <div className="avatar_image">
                            <img src={src} alt="this is avatar" className="avatar_image" ></img>
                        </div> 
                        <div className="chooseFile">
                            <input type="file" accept="image/*" onChange={this.imageHandler} name="anhDaiDien" className="avatar_image" ></input>
                        </div>
                    </div>
                    <hr/>
                    <div className="hoTen">Họ Và Tên</div>
                    <input className="your_name" name="hoTen" type="text" defaultValue={this.state.userInfor.hoTen} onChange={this.onChangeName}></input>
                    <p className="warning">{this.state.validationMsg.hoTen}</p>
                    <hr/>
                    
                    <div className="gioiTinh">Giới Tính </div>
                    <div className="Nam"><input type="radio"  name="maGioiTinh" value={1} checked={this.state.userInfor.gioiTinh === 1} onClick={this.onChangeGender}/> Nam  </div>
                    <div className="Nu"><input type="radio"  name="maGioiTinh" value={2} checked={this.state.userInfor.gioiTinh === 2} onClick={this.onChangeGender}/>Nữ</div>
                    <div className="khac"><input type="radio" name="maGioiTinh" value={3} checked={this.state.userInfor.gioiTinh === 3} onClick={this.onChangeGender}/>Khác</div>
                    <hr/>
                    <div className="address">Thành Phố </div>
                    <input type="text" id="address" name="thanhPho" className="address" defaultValue={this.state.userInfor.thanhPho} onChange={this.onChangeCity}></input>
                    <hr/>
                    <div className="birthday">Ngày Sinh </div>
                    <DatePicker className="ngaySinh" name="ngaySinh" dateFormat="yyyy-MM-dd" selected={birthday} onChange={this.onChangeDay}/>
                    <hr/>
                    <div className="sdt"> SDT </div>
                        <input type="text" className="sdt" name="sdt"  defaultValue={this.state.userInfor.sdt} onChange={this.onChangePhone}></input>
                        <p className="warning">{this.state.validationMsg.sdt}</p>
                    <hr/>
                      <div className="button_save"  > <button className="button_save" onClick={this.saveChange} >Lưu</button></div> 
              </div>
              </form>
            </div>    
          )
    }
}
