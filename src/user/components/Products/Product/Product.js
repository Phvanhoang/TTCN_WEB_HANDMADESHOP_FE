import React from "react";
import "./Product.css"
import DetailsThumb from "./DetailsThumb";
import UploadCmt from "../RatingStar/UploadCmt";
import { fetchItem } from "../../../services/ItemService";
import Comment from "../Comment/Comment"
import {isLoggedIn} from '../../../services/AuthenticationService'
import requestComment from "../../../services/CommentService"
import config from "../../../config/config";

export default class Product extends React.Component {
 constructor(props)
 { super( props)
    this.state = {
    index: 0,
    cart: [],
    noiDung: "",
    validationMsg: {},
    isLoggedIn: this.props.isLoggedIn,
    soSao: 0
  };
 }

  getItem = async() => {
    const params = this.props.match.params
    const res = await fetchItem(params.id);
    if (res.status === 200) {
        this.setState({
          ...this.state,
          product: res.data,
        })
        console.log( res.data)
    } else console.log("tt")
}


//   onStarClick(nextValue, prevValue, name) {
//     this.setState({ rating: nextValue });
//   }

  

 myRef = React.createRef();
    handleTab = (index) => {
      this.setState({ index: index });
      const images = this.myRef.current.children;
      console.log(this.myRef.current)
      for (let i = 0; i < images.length; i++) {
        images[i].className = images[i].className.replace("active", "");
      }
      images[index].className = "active";
    };

  componentDidMount() {
    this.getItem()
    // const index = this.state.index;
    // console.log(this.myRef.current.children)
    //  this.myRef.current.children[index].className = "active";
  }

  addToCart(product) {
    const cartItem = {
      matHang: {},
      soLuong: 1
    };
    let trung = false;
    const cart = JSON.parse(sessionStorage.getItem("cart"))
    if(cart !==null) {
         var newCart = cart
    }
    else { newCart = Object.assign([], this.state.cart);}
    for (let item of newCart) {
      if (product.maMatHang === item.matHang.maMatHang) {
        item.soLuong++;
        trung = true;
        console.log(newCart)
        sessionStorage.removeItem("cart")
        sessionStorage.setItem("cart", JSON.stringify(newCart))
        this.setState({
            ...this.state,
             cart: newCart
        });
      }
    }
    if (trung === false) {
        if(newCart.length===9) {
            alert("Giỏ hàng đã đầy")
            return
    }
      cartItem.matHang = product;
      newCart.push(cartItem);
      sessionStorage.removeItem("cart")
      sessionStorage.setItem("cart", JSON.stringify(newCart))
      this.setState({ ...this.state,
        cart: newCart });
    }
  }

  formatCash(str) {
    return str.toFixed('').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  render() {
    const product = this.state.product;
    console.log(product)
    const index = this.state.index;
    if (product === undefined) return (<div>Khong tim thay</div>)
    const src=`data:image/*;base64, ${product.danhSachHinhAnh[index] !== undefined ? product.danhSachHinhAnh[index].anh: ""}`
    const priceSplit = this.formatCash(product.gia)
    return (
        <>
           
            <div className="container">
            <br></br>
                <div className={"row"}>
                
                    <div className="col-1"></div>
                    <div className="col-5 image-details">
                        <img src={src} className="image-show" alt="" />
                    </div>
                    <div className="col-6 box-details ">
                        <h1>{product.tenMatHang}</h1>
                        <p>Price: {priceSplit} ₫</p>
                        <p>{product.moTa}</p>
                        {<DetailsThumb 
                            // className="img-details"
                          images={product.danhSachHinhAnh}
                          tab={this.handleTab}
                          myRef={this.myRef} 
                        />}
                        <button className="btn btn-primary " onClick={() => this.addToCart(product)}>Thêm vào giỏ hàng </button>
                    </div>
                </div>  
                <br></br>
                <UploadCmt product={this.state.product}/>
                 {/* <div>      
                    <h2> Đánh giá của khách hàng</h2>
                       <p> -{product.danhGia} </p>  */}
                       {/* {product.map(product => <p key={product.maMatHang} name={product.danhGia} />)} */}
                      {/* <div>
                          <Comment />
                      </div> */}
                 {/* </div>  */}
            </div>
      </>
    );
  }
}


