import Form from "./Form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { message } from "antd";
import { useselector } from "react-redux";

export default function Login() {
  const { info } = useselector((state) => {
    return state.userReducer;
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (info?.accessToken) {
      message.warning("Already logged in");
      navigate("/");
    }
  }, []);
  if (info?.accessToken) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-movie-background bg-center bg-cover bg-no-repeat bg-fixed relative">
        <div className="flex flex-1 justify-center items-center">
          <div className="p-3 m-2 bg-white rounded-lg w-2/3 md:w-1/3">
            <h1 className="mb-3 font-bold text-2xl text-center">Login</h1>
            <Form />
            <p className="text-right text-red-700">
              {"Haven't had an account?"}
              <Link
                to="/register"
                className="font-bold text-red-700 hover:text-red-300 duration-300"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
