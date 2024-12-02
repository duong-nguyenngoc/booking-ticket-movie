import axios from "axios";
import { BASE_URL, BASE_URL_2, configHeaders, https, GROUP_ID } from "./config";

export const getListMovies = () => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`,
    method: "GET",
    headers: configHeaders(),
  });
};

export const getDetailMovie = (id) => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
    method: "GET",
    headers: configHeaders(),
  });
};

export const postTickets = (id, seats, info) => {
  return axios({
    url: `${BASE_URL}/QuanLyDatVe/DatVe`,
    method: "POST",
    headers: {
      ...configHeaders(),
      Authorization: `Bearer ${info.accessToken}`,
    },
    data: {
      maLichChieu: id,
      danhSachVe: seats,
      taiKhoanNguoiDung: info.taiKhoan,
    },
  });
};

export const getUserInfo = (userName) => {
  return axios({
    url: `${BASE_URL}/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${userName}`,
    method: "GET",
    headers: { ...configHeaders() },
  });
};
export const postUserTicket = (userName) => {
  return axios({
    url: `${BASE_URL}/QuanLyNguoiDung/ThongTinTaiKhoan`,
    method: "POST",
    headers: {
      ...configHeaders(),
    },
    data: {
      taiKhoan: userName,
    },
  });
};

export const getDetailShowTimes = (id) => {
  return axios({
    url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
    method: "GET",
    headers: configHeaders(),
  });
};

export const getSeatListByMovie = (id) => {
  return axios({
    url: `${BASE_URL}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
    method: "GET",
    headers: configHeaders(),
  });
};

export const getMoviesByCinema = () => {
  return axios({
    url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`,
    method: "GET",
    headers: configHeaders(),
  });
};

export const getDataSlick = () => {
  return axios({
    url: `${BASE_URL_2}/QuanLyPhim/LayDanhSachBanner`,
    method: "GET",
    headers: configHeaders(),
  });
};

export const putUserInfo = (values, accessToken) => {
  return axios({
    url: `${BASE_URL}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    method: "PUT",
    headers: { ...configHeaders(), Authorization: `Bearer ${accessToken}` },
    data: values,
  });
};

export const userService = {
  getList: () => {
    return https.get(
      `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`
    );
  },
  deleteUser: (taiKhoan) =>
    https.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`),
};

export const adminService = {
  deleteMovie: (MaPhim) => https.delete(`/QuanLyPhim/XoaPhim?MaPhim=${MaPhim}`),
};
