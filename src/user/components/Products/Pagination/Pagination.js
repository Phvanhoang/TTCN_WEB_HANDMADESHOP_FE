import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

export default class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageCount: this.props.totalPages,
            activePage:  10
          };
      }

    onChange(data) {
        this.props.onNavPage(data.selected)
    }  
    
    render() {
        if (this.props.totalPages <= 1) return <div></div>
        else return (
            <div id="navPage">
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.props.totalPages}
                    activePage={this.props.page}
                    forcePage={this.props.page}
                    initialPage={this.props.page}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.onChange.bind(this)}
                    containerClassName={"pagination"}
                    disableInitialCallback={true}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                    
            </div>
        )
    }
}