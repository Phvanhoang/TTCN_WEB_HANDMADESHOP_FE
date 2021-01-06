import React from 'react';
// import ProductsList from '../Products/ProductsList'
// import Slider from '../Slider/Slider';
// import Header from '../Header/Header'
// import Filter from '../Products/Filter/Filter'
// import List from '../Products/List/List';
// import Pagination from './Pagination/Pagination'
// import {  fetchItemsList} from "../../services/ItemService";
// import ProductsList from '../Products/ProductsList';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // products: [],
            reload: false
          };
      }
    getList = async() => {
        // alert()
        // const res = await fetchItemsList();
        // if (res.status === 200) {
            this.setState({
              ...this.state,
            //   products: res.data.data
            reload : true
            })
        // }
    }
    componentDidMount() {
        // this.getList()
    }

    render() {
        return (
          <>     
            {/* <Header onHomePageBtn = {this.getList.bind(this)} />  */}
            <div className="container">
              
              {/* <Slider /> */}
              <br></br>
              {/* <Filter /> */}
              {/* <List list = {this.state.products} /> */}
              {/* <ProductsList match={this.props.match} reload={this.state.reload}/> */}
            </div>
          </>
        );
}
}

export default Home;
