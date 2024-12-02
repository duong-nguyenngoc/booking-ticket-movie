import { Button, Form, Input, message, Space } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL, configHeaders } from "../../api/config";
import { SET_INFO } from "../../redux/constant/userConstant";
import { userLocalStorage } from "../../api/localService";
import { useEffect, useState } from "react";

const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values, form]);

  return (
    <Button
      type="primary"
      className="bg-blue-300"
      htmlType="submit"
      disabled={!submittable}
    >
      Submit
    </Button>
  );
};

export default function FormLogin() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    axios
      .post(`${BASE_URL}/QuanLyNguoiDung/DangNhap`, values, {
        headers: configHeaders(),
      })
      .then((res) => {
        message.success("Login Successful");
        const action = {
          type: SET_INFO,
          payload: res.data,
        };
        dispatch(action);

        userLocalStorage.set(res.data);
        navigate("/");
      })
      .catch((err) => {
        message.error("Login Failed");
        console.error(err);
      });
  };
  return (
    <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      <Form.Item
        label="Username"
        name="taiKhoan"
        rules={[
          {
            required: true,
            message: "Write your name",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="matKhau"
        rules={[
          {
            required: true,
            message: "Create your password",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item className="flex justify-center">
        <Space>
          <SubmitButton form={form} />
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
