import React from "react";
import './PriceButton.css'
function PriceButton(props){
    const from = props.from
    const to = props.to
    if  (from !== undefined && to !== undefined) 
    return(
        <button className = "gia"  onClick= {() => props.handleClick(from, to)}> 
            Từ {from/1000000} triệu tới {to/1000000} 
        </button>
    )
    else if (from !== undefined)
    return(
        <button className = "gia"  onClick= {() => props.handleClick(from, 9999999999)}> 
            Trên {from/1000000} triệu  
        </button>
    )
    else 
    return(
        <button className = "gia"  onClick= {() => props.handleClick(0, to)}> 
            Dưới {to/1000000} triệu  
        </button>
    )
}

export default PriceButton;