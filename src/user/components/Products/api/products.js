
import Products from "./products.json";

export function getAll() {
  return Promise.resolve(Products);
}

export function getBymaMatHang(maMatHang) {
  const product = Products.find((item) => item.maMatHang === maMatHang);

  return Promise.resolve(product);
}

export default {
  getAll,
  getBymaMatHang
};
