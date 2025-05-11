import { Input, Form, message, Checkbox, Spin } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import useAuth from "../../../hook/useAuth";
import { useSendOtp } from "../../../apis/auth";
import { useSendOtpHospital } from "../../../apis/hospitals/auth";
import Cookies from "js-cookie";

export default function Login({ userId }) {
  const navigate = useNavigate();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedLoginType, setSelectedLoginType] = useState("user");
  const { login, loginHospitals2 } = useAuth();
  const { mutateAsync: sendOtp } = useSendOtp();
  const { mutateAsync: sendOtpHospital } = useSendOtpHospital();

  useEffect(() => {
    if (userId) {
      setSelectedLoginType("hospital");
    }
  }, [userId]);

  const MESSAGES = {
    loginSuccess: "Login successful.",
    emailNotVerified:
      "Your email is not verified. Please check your email and verify your email.",
    otpSent: "An OTP has been sent to your email.",
    subscriptionRequired:
      "You need to purchase a subscription to start using hospital services.",
    loginError: "An error occurred during login. Please try again.",
  };

  const onFinish = async (values) => {
    setLoading(true);
    const { email } = values;
    try {
      if (selectedLoginType === "user") {
        const response = await login(values);
        if (response) {
          if (!response.user.verified) {
            await sendOtp({ email });
            message.success(
              "Login Successfully. Your Email Are does not Verified Please Verify Your Email"
            );
            navigate("/verify-otp", { email: values.email });
            setLoading(false);
          } else {
            message.success("Login Successfully");
            form.resetFields();
            navigate("/");
            setLoading(false);
          }
        }
      } else if (selectedLoginType === "hospital") {
        const response = await loginHospitals2(values);
        if (response) {
          if (response.hospital.otpVerified) {
            if (response.hospital.subscribed) {
              message.success("Login Successfully as Hospital");
              form.resetFields();
              navigate("/clinics/sub/treatments");
              Cookies.set("token", response?.token, { expires: 1 });
              Cookies.set("user_id", response?.hospital._id, { expires: 1 });
              Cookies.set("role", response?.hospital.role, { expires: 1 });
              Cookies.set("verified", "true");
            } else {
              message.info(
                "You have to Purchase to our Subscription to Start Using Hospital Services!"
              );
              navigate("/pricing", {
                state: { email: email, hospitalId: response.hospital._id },
              });
            }
            setLoading(false);
          } else {
            await sendOtpHospital({ email });
            message.success(
              "Login Successfully. Your Email Are does not Verified Please  check your email and Verify Your Email"
            );
            navigate("/verify-hospital", {
              state: { email: email, hospitalId: response.hospital._id },
            });
            setLoading(false);
          }
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  const handleCheckboxChange = (e) => {
    setSelectedLoginType(e.target.value);
  };

  return (
    <div className="flex justify-center items-center bg-white pt-16 pb-16 w-full min-h-screen">
      <Spin spinning={loading}>
        <div className="flex justify-center items-center w-full max-w-7xl mx-auto">
          <div className="bg-white border-[1px] w-full container border-1 border-gray-300 rounded-xl overflow-hidden shadow-2xl flex flex-col  gap-x-[30px] lg:flex-row">
            <div className="w-full lg:w-1/2 flex justify-center items-center">
              <img
                alt="Picture of me taking a photo of an image"
                src="/login.jpeg"
                loading="lazy"
                className="w-full lg:h-full rounded-2xl p-[10px]"
              />
            </div>
            <div className="w-full lg:w-1/2 bg-white flex justify-center items-center">
              <Form
                form={form}
                className="w-full max-w-xl p-6"
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <h1 className="text-2xl font-bold mb-[30px] text-start">
                  Log In Now 🔑📲
                </h1>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email Address!",
                    },
                    {
                      type: "email",
                      message: "Please enter the correct email Address",
                    },
                  ]}
                >
                  {userId ? (
                    <Input
                      type="email"
                      size="large"
                      value={userId}
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder="Please Enter the Email"
                    />
                  ) : (
                    <Input
                      type="email"
                      size="large"
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder="Please Enter the Email"
                    />
                  )}
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter a Password!",
                    },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters!",
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    className="pl-2"
                  />
                </Form.Item>
                <span
                  className="flex justify-end items-end w-full mb-4 font-semibold text-lg cursor-pointer hover:underline"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password
                </span>
                <Form.Item>
                  <Checkbox
                    className="mb-2"
                    checked={selectedLoginType === "user"}
                    value="user"
                    onChange={handleCheckboxChange}
                  >
                    Login as User
                  </Checkbox>
                  <Checkbox
                    checked={selectedLoginType === "hospital"}
                    value="hospital"
                    onChange={handleCheckboxChange}
                  >
                    Login as Hospital
                  </Checkbox>
                  <button
                    type="submit"
                    className="w-full bg-clr3 hover:bg-transparent mt-[20px] py-2 text-white font-semibold text-xl rounded-xl hover:text-clr3 border-2 border-clr3 transition-all duration-300 ease-in-out"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                  <div className="mt-[20px] text-center flex flex-row gap-x-2 justify-between  items-center">
                    <span className="text-lg">Don't have an account?</span>
                    <span
                      className="text-clr3 text-lg font-semibold cursor-pointer hover:underline"
                      onClick={() => navigate("/signup")}
                    >
                      Register here
                    </span>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
}
