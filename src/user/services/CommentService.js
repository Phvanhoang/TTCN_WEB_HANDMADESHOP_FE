import axios from "axios";
import config from "../config/config"

async function requestComment(comment) {
    config()
    const body = {
      noiDung: comment.noiDung,
      soSao:comment.soSao,
      matHang: {
          maMatHang : comment.maMatHang
      }
    };
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "POST",
      url: " /danh-gia-management/authorized/danh-gia",
      data: body,
    });
}

export default requestComment