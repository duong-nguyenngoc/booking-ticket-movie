import Header from "../../component/Header/Header";
import { Button, Form, Input, Select, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { SET_INFO } from "../../redux/constant/userConstant";
import { putUserInfo, getUserInfo, getUserTickets } from "../../api/api";
import { userLocalStorage, adminLocalStorage } from "../../api/api";
import { GROUP_ID } from "../../api/config";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { SET_INFO_ADMIN } from "../../redux/constant/adminConstant";

const SubmitButton = () => {
  return (
    <Button type="primary" className="bg-blue-400" htmlType="submit">
      Update
    </Button>
  );
};

export default function Account() {
  const navigate = useNavigate();
  const info = useSelector((state) => state.userReducer.info);
  const infoAdmin = useSelector((state) => state.adminReducer.info);
  const [ticketHistory, setTicketHistory] = useState([]);
  useEffect(() => {
    if (!info?.accessToken) {
      message.error("Login to continue.");
      navigate("/login");
    } else {
      getUserInfo(info.taiKhoan)
        .then((res) => {
          form.setFieldsValue({
            ...res.data[0],
          });
          setLoanding(false);
        })
        .catch((err) => {
          console.error(err);
        });
      getUserTickets(info.taiKhoan)
        .then((res) => {
          setTicketHistory([...res.data.thongTinDatVe]);
          setLoadingTicket(false); //?UNknow where is it
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [info]);

  const { Option } = Select;
  const [form] = Form.useForm;
  const onAccountTypeChange = (value) => {
    switch (value) {
      case "KhachHang":
        form.setFieldsValue({
          maLoaiNguoiDung: "KhachHang",
        });
        break;
      case "QuanTri":
        form.setFieldsValue({
          maLoaiNguoiDung: "QuanTri",
        });
        break;
      default:
        form.setFieldsValue({
          maLoaiNguoiDung: "KhachHang",
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
    message.error("Error.");
  };
  const dispatch = useDispatch();
  const onFinish = (values) => [
    putUserInfo({ ...values, maNhom: GROUP_ID }, info.accessToken)
      .then(() => {
        message.success("Updated!");
        userLocalStorage.set({ ...values, accessToken: info.accessToken });
        dispatch({
          type: SET_INFO,
          payload: { ...values, accessToken: info.accessToken },
        });
        if (infoAdmin.taiKhoan === info.taiKhoan) {
          adminLocalStorage.set({
            ...values,
            accessToken: infoAdmin.accessToken,
          });
          dispatch({
            type: SET_INFO_ADMIN,
            payload: { ...values, accessToken: infoAdmin.accessToken },
          });
        }
      })
      .catch((err) => {
        console.error(err);
      }),
  ];

  const [loading, setLoading] = useState(true);
  const [loadingTicket, setLoadingTicket] = useState(true);
  if (!info?.accessToken) return null;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-movie-background bg-center bg-cover bg-no-repeat bg-fixed relative">
        <div className="fixed min-w-full z-50">
          <Header />
        </div>
        <div className="flex flex-1 justify-center items-center mt-24 mb-7">
          {loading || loadingTicket} ? (
          <p className="text-white text-center">Please wait for loading...</p>
          ):(
          <div className="grid grid-cols-1 gap-5 w-[80%]">
            <div className="m-2 p-3 bg-white rounded-lg">
              <div className="mb-3 border-b-2 pb-3">
                <h1 className="font-bold text-xl">Account</h1>
                <p>Update whenever you want ^^</p>
              </div>
              <Form
                form={form}
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: "email",
                        message: "Input not valid E-mail",
                      },
                      {
                        required: true,
                        message: "Write your E-mail",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="taiKhoan"
                    label="Nickname"
                    tooltip="Your nickname"
                    rules={[
                      {
                        required: true,
                        message: "Create your nickname",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="hoTen"
                    label="Full name"
                    rules={[
                      {
                        required: true,
                        message: "Write your full name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="soDt"
                    label="Phone number"
                    rules={[
                      {
                        pattern: new RegExp(/^0(?!0)\d{9}$/g),
                        message: "Please correct your phone number",
                      },
                      {
                        required: true,
                        message: "Write your phone number",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="matKhau"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Create your password",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    className={`${
                      info.maLoaiNguoiDung === "KhachHang" && "hidden"
                    }`}
                    name="maLoaiNguoiDung"
                    label="Account type"
                    rules={[
                      {
                        required: true,
                        message: "Select your account type",
                      },
                    ]}
                  >
                    <Select
                      disabled={info.maLoaiNguoiDung === "KhachHang"}
                      placeholder="Select type"
                      onChange={onAccountTypeChange}
                    >
                      <Option value="KhachHang">Customer</Option>
                      <Option value="QuanTri">Adminstrator</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item className="flex justify-center">
                    <Space>
                      <SubmitButton form={form} />
                    </Space>
                  </Form.Item>
                </div>
              </Form>
            </div>
            <div className="m-2 p-3 bg-white rounded-lg">
              <div className="pb-3 mb-3 border-b-2">
                <h1 className="font-bold text-xl">Booking History</h1>
              </div>
              <div className="grid grid-cols-1 gap-11 h-96 overflow-y-auto md:grid-cols-2">
                {ticketHistory.length > 0 ? (
                  ticketHistory.map((item, index) => (
                    <div key={index}>
                      <p className="font-semibold">
                        Date:{" "}
                        {moment(item.ngayDat).format("DD-MM-YYYY | hh:mm")}
                      </p>
                      <p className="font-bold text-xl text-[#fb4226]">
                        Movie: {item.tenPhim}
                      </p>
                      <p>
                        Length: {item.thoiLuongPhim} minutes, Price:{" "}
                        {item.giaVe.toLocaleString(countryFormat)} VND
                      </p>
                      <p className="font-bold text-xl text-[#008000]">
                        {item.danhSachGhe[0].tenHeThongRap}
                      </p>
                      <p>
                        {item.danhSachGhe[0].tenCumRap}, Seat:{""}{" "}
                        {item.danhSachGhe.map((itemChild, indexChild) => (
                          <span>
                            {itemChild.tenGhe}
                            {indexChild === item.danhSachGhe.length - 1
                              ? "."
                              : ","}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="font-semibold">No Booking</p>
                )}
              </div>
            </div>
          </div>
          )
        </div>
      </div>
    </>
  );
}
