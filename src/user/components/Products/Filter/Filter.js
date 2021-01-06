import React from "react";
import PriceButton from "../PriceButton/PriceButton"
import './Filter.css'
import {  fetchItemsTypeList} from "../../../services/ItemService";
import history from "../../../../history";

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaiMatHangList: []
          };
      }

    getItemsTypeList = async() =>{
        const res = await fetchItemsTypeList();
        if (res.status === 200) {
          this.setState({
              ...this.state,
            loaiMatHangList: res.data.data,
          })
      }
    }

    componentDidMount() {
        this.getItemsTypeList()
    }

    onChange(event) {
        const selectedIndex = event.target.selectedIndex - 1
        const id = this.state.loaiMatHangList[selectedIndex].maLoaiMatHang
        this.props.getItemsListByType(id)
    }


  render() {
    return (
        <div>
            <div className = "row">
                <div className = "col-2">
                    <p className="FilterContent">Chọn mức giá: </p>
                </div>
                <div className = "col-6">
                    <PriceButton to={1000000} handleClick = {this.props.getFilter}/>
                    <PriceButton from={1000000} to={3000000} handleClick = {this.props.getFilter}/>
                    <PriceButton from={3000000} handleClick = {this.props.getFilter}/>
                </div>
                <div className= "col-2 droplist">
                    <select id="select" onChange={this.onChange.bind(this)}>
                        <option disabled selected>Loại mặt hàng</option>
                        {this.state.loaiMatHangList.map((item)=>(<option> {item.tenLoaiMatHang} </option>)) }
                    </select>
                </div>
            </div>
        </div>
           
    );
  }
}

