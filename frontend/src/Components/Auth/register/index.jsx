import React, { useMemo, useState } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Form, Checkbox, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { passwordStrength } from "../../../utils/helpers";
import { useForm } from "antd/es/form/Form";
import useAuth from "../../../hook/useAuth";
import { FaCity } from "react-icons/fa";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useSendOtp } from "../../../apis/auth";

export default function SignUp() {
  const [form] = useForm();
  const [passwordStrengthState, setPasswordStrengthState] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const options = useMemo(() => countryList().getData(), []);
  const { mutateAsync: sendOtp } = useSendOtp();
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");

  const onFinish = async (value) => {
    const { firstName, lastName, email, password, city, countryValue } = value;
    const country = countryValue.label;
    setLoading(true);

    try {
      const response = await register({
        firstName,
        lastName,
        email,
        password,
        city,
        country,
      });

      if (response && response.user && response.user.email) {
        await sendOtp({ email });
        setLoading(false);
        message.success("Registered Successfully. Please verify your email.");
        form.resetFields();
        navigate("/verify-otp", { state: { email: response.user.email } });
      } else {
        throw new Error("User registration response is invalid.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during registration or OTP sending:", error);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const strength = passwordStrength(password);
    setPasswordStrengthState(strength);

    switch (strength) {
      case "weak":
        setPasswordStrengthMessage(
          "Password is too weak. Consider adding numbers and special characters."
        );
        break;
      case "medium":
        setPasswordStrengthMessage(
          "Password is medium. Try to include a mix of letters, numbers, and special characters."
        );
        break;
      case "strong":
        setPasswordStrengthMessage("Password is strong. Good job!");
        break;
      default:
        setPasswordStrengthMessage("");
    }
  };

  return (
    <Spin spinning={loading} className="!w-full !max-w-full">
      <div className="flex justify-center items-center pt-16 pb-16 w-full">
        <div className="flex justify-center items-center w-full max-w-7xl mx-auto">
          <div className="bg-white w-full container rounded-xl overflow-hidden shadow-2xl border-gray-300 border-[1px] flex flex-col gap-x-[30px] lg:flex-row">
            <div className="w-full lg:w-1/2 bg-white flex justify-center items-center">
              <Form
                className="w-full max-w-xl p-6"
                name="normal_login"
                form={form}
                onFinish={onFinish}
                disabled={loading}
              >
                <h1 className="text-2xl font-bold mb-[30px] text-start">
                  Register In Securely 📝🔒
                </h1>
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter your First Name!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Please Enter the First Name"
                    className="pl-2"
                  />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter the Last Name!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Please Enter the Last Name"
                    className="pl-2"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter your Email Address!",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid Email Address!",
                    },
                  ]}
                >
                  <Input
                    type="email"
                    size="large"
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Enter the Email"
                    className="pl-2"
                  />
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
                  help={passwordStrengthMessage}
                  hasFeedback
                  validateStatus={
                    passwordStrengthState === "weak"
                      ? "error"
                      : passwordStrengthState === "medium"
                      ? "warning"
                      : passwordStrengthState === "strong"
                      ? "success"
                      : ""
                  }
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    className="pl-2"
                    onChange={handlePasswordChange}
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The Confirm passwords does not math Please Enter the correct Confirm Password!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm Password"
                    className="pl-2"
                  />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  name="countryValue"
                  rules={[
                    {
                      required: true,
                      message: "Please select a country!",
                    },
                  ]}
                >
                  <Select
                    options={options}
                    placeholder="Select a country"
                    className=""
                  />
                </Form.Item>
                <Form.Item
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter City Name!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<FaCity className="site-form-item-icon" />}
                    placeholder="Please Enter City Name!"
                    className="pl-2"
                  />
                </Form.Item>
                <Form.Item>
                  <button
                    type="primary"
                    htmlType="submit"
                    className="w-full bg-clr3 hover:bg-transparent py-2 text-white font-semibold text-xl rounded-xl hover:text-clr3 border-2 border-clr3 transition-all duration-300 ease-in-out"
                  >
                    Register
                  </button>
                  <div className="mt-4 text-center flex flex-row gap-x-2 justify-between items-center">
                    <span className="text-lg">Already have an account?</span>
                    <span
                      className="text-clr3 text-lg font-semibold cursor-pointer hover:underline"
                      onClick={() => navigate("/login")}
                    >
                      Login here
                    </span>
                  </div>
                </Form.Item>
              </Form>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center items-center">
              <img
                alt="Welcome Image"
                src="/register.jpg"
                loading="lazy"
                className="w-full lg:h-full rounded-2xl  object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
}
