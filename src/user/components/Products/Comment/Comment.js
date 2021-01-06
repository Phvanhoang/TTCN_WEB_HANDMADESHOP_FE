import React from "react";
import "./Comment.css";
import StarRatingComponent from 'react-star-rating-component';
import { FaStar } from "react-icons/fa";

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
          };
      }

    
    render(){
        return(
            <>
                <div>
                <div className = "row">
                    <div className="col-1 avatarctn">
                    <img className="avatar" src= {process.env.PUBLIC_URL + "/logo/user.png"} alt='..'/>
                    </div>
                    <div className="col-3">
                        <h4> Tên người dùng</h4>
                        <StarRatingComponent 
                            name="rate1" 
                            starCount={5}
                            value={4}
                        />
                    </div>
                </div>
                    <p> Đánh giá </p>
                </div>
            </>
        )
    }

}