import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";

export default class StarRating extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: 0,
            rating: 0
        }
    }
    render() {
    return (
        <>
        <div className = "row">
        
        <div className="label col-4">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <>
              <FaStar
                rating={this.state.rating}
                className="star"
                color={ratingValue <= (this.state.hover || this.state.rating) ? "#ffc107" : "#e4e5e9"}
                size={30}
                onMouseEnter={() => this.setState({
                    ...this.state,
                    hover: ratingValue})}
                onMouseLeave={() => this.setState({
                    ...this.state,
                    hover: ratingValue})}
                onClick={() => {
                    this.setState({
                        ...this.state,
                        rating: ratingValue})
                    this.props.setSao(ratingValue)
                }}
              />
            </>
          )
        })}
        
      </div>
      <div className = "col-8">
        <p> Bạn đánh giá {this.state.rating} * cho sản phẩm này</p>
        </div>
      </div></>
    );
  };
}
  

  

























