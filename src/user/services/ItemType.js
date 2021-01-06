import axios from "axios";
import config from "../config/config"
async function fetchItemsTypeList() {
    config()
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "GET",
      url: `/loai-mat-hang-management/loai-mat-hang`})
}

export {fetchItemsTypeList};