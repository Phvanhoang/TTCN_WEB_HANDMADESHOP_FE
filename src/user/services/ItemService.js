import axios from "axios";
import config from "../config/config"
async function fetchItem(id, filter) {
    config()
    // alert()
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "GET",
      url: `/mat-hang-management/mat-hang/${id}?${filter}`
    })
}

async function fetchItemsList(pageNum) {
    config()
    // alert()
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "GET",
      url: `/mat-hang-management/mat-hang?page=${pageNum}`
    })
}

async function fetchItemsListByType(id) {
    config()
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "GET",
      url: `/mat-hang-management/mat-hang/loai-mat-hang/${id}`
    })
}

async function fetchItemsListFilter(filter) {
    // alert(filter)
    config()
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "GET",
      url: `/mat-hang-management/mat-hang${filter}`
    })
}

async function fetchItemsTypeList() {
    config()
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "GET",
      url: `/loai-mat-hang-management/loai-mat-hang`})
}


export {fetchItem, fetchItemsList, fetchItemsListByType,fetchItemsListFilter, fetchItemsTypeList};