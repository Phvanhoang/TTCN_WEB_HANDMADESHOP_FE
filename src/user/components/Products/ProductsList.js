import React from "react";
import Filter from './Filter/Filter'
import List from './List/List';
import Pagination from './Pagination/Pagination'
import {  fetchItemsList, fetchItemsListFilter,fetchItemsListByType } from "../../services/ItemService";
import history from "../../../history";
import qs from 'qs'


export default class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            totalPages: 0,
            page: 0,
            isFiltered: false
            // cart: [],
            // search: "",
            // to: 0,
            // from: 0,
            // loaiMatHangList: [],
          };
      }

    getPageable(pageNum) {
        const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        let pageable = ""
        let check = false
        if (pageNum !== null) {
            pageable = pageable + `page=${pageNum}`
            check = true
        }
        else if (query !== undefined && query.page !== undefined) {
            pageable = pageable + `page=${query.page}`
            check = true
            this.setState({
                ...this.state,
                page: query.page
            })
        }
        if (query !== undefined && query.size !== undefined) {
            if (check) pageable = pageable + `&size=${query.size}`
            else {
                pageable = pageable + `size=${query.size}`
                check = true
            }
        } 
        if (query !== undefined && query.ten_mat_hang !== undefined) {
            if (check) pageable = pageable + `&tenMatHang=${query.ten_mat_hang}`
            else {
                pageable = pageable + `tenMatHang=${query.ten_mat_hang}`
                check = true
            }
        } 
        return pageable
    }

    getItemsListFilter = async(filter, pageNum) =>{
        let pageable = this.getPageable(pageNum)
        pageable = pageable === "" ? "" : `?${pageable}`
        filter = filter !== "" ? `${filter}${pageable}` : `${pageable}`
        const res = await fetchItemsListFilter(filter);
        if (res.status === 200) {
            // console.log(res.data.data)
          this.setState({
            ...this.state,
            products: res.data.data,
            totalPages: res.data.totalPages,
            loading: false
          })
      }
    }

    getItemsListByType = async(id) => {
        history.push(`/productslist/filter/type/${id}`)
        const res = await fetchItemsListByType(id);
        if (res.status === 200) {
          this.setState({
              ...this.state,
              totalPages: res.data.totalPages,
              products: res.data.data,
              isFiltered: true
          })
        }
      }

      getFilter = async(from, to) => {
        const path = `/productslist/filter/price/${from}/${to}`
        history.push(path)
        const filter = `?giaBatDau=${from}&giaKetThuc=${to}`
        const res = await fetchItemsListFilter(filter);
        if (res.status === 200) {
            this.setState({
              ...this.state,
              products: res.data.data,
              totalPages: res.data.totalPages,
              loading: false,
              isFiltered: true
            })
        }
      }
    getFilterStr() {
        let filter = ""
        if (this.props.match !== undefined) {
            const params = this.props.match.params
            const path = this.props.match.path
            if (path.includes("filter/price")){
                filter = `?giaBatDau=${params.from}&giaKetThuc=${params.to}`
            }
            else if (path.includes("filter/type")){
                filter = `/loai-mat-hang/${params.id}`
            } 
            // else if (path.includes("/search")){
            //     const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
            //     filter = `?tenMatHang=${query.ten_mat_hang}`
            // }
        }
        return filter
    }

    componentDidMount() {
        if (!this.state.isFiltered) {
            const filter = this.getFilterStr()
            this.getItemsListFilter(filter, null)
        }
    }

    navPage (numPage){
        let path = this.props.match.path === "/" ? '/productslist' : this.props.match.url
        
        history.push(`${path}?${this.getPageable(numPage)}`)
        if (this.props.match.path.includes("/search")){
            const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
            path = `?ten_mat_hang=${query.ten_mat_hang}&${numPage}`
            history.push(path)
        }
        this.getItemsListFilter(this.getFilterStr(), numPage)
    }
  render() {
    return (
        <div className="container">
            <Filter getFilter = {this.getFilter.bind(this)} getItemsListByType={this.getItemsListByType.bind(this)} />
            <List list = {this.state.products}/>
            <Pagination page={this.state.page} totalPages={this.state.totalPages} onNavPage = {this.navPage.bind(this)} />
        </div>
    )
  }
}