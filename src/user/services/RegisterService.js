import axios from "axios";
import config from "../config/config"

async function requestRegister(user) {
    config()
    const body = {
        tenDangKy: user.tenDangKy,
        matKhau: user.matKhau,
        tenNguoiDung: user.tenNguoiDung
    };
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "POST",
      url: "/register",
      data: body,
    });
}
export default requestRegister