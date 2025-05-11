import React, { useCallback, useState } from "react";
import { Form, Input, message, Card, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { MailOutlined } from "@ant-design/icons";
import { PiCirclesFourDuotone } from "react-icons/pi";
import UpdatePassword from "../UpdatePassword";
import { useSendOtp, useVerifyOtp } from "../../../apis/auth";

function ForgotPassword() {
  const [form] = useForm();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [otpToken, setOtpToken] = useState(""); // Store the OTP token
  const { mutateAsync: sendOtp } = useSendOtp();
  const { mutateAsync: verifyOtp } = useVerifyOtp();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await form.validateFields(["email"]);
      const response = await sendOtp({ email });
      if (response) {
        form.resetFields(["email"]);
        message.success("OTP sent successfully! please Check the gmail");
        setOtpVisible(true);
        setOtpToken(response.token); // Store the OTP token
        setLoading(false);
        localStorage.setItem("email", email);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await form.validateFields(["otp"]);
      const response = await verifyOtp({ otp, token: otpToken });
      if (response) {
        message.success(`Verify Otp Successfully`);
        form.resetFields(["otp"]);
        setUpdatePassword(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }, [form, otp, otpToken, verifyOtp]);

  const resendOtp = useCallback(async () => {
    try {
      setOtpVisible(false);
      const email = localStorage.getItem("email");
      const response = await sendOtp({ email });
      if (response) {
        form.resetFields(["email"]);
        message.success("OTP sent successfully! please Check the gmail");
        setOtpVisible(true);
        setOtpToken(response.token); // Store the OTP token
        setLoading(false);
        localStorage.setItem("email", email);
      }
    } catch (error) {}
  }, [form, sendOtp]);

  return (
    <Spin spinning={loading} className="!w-full !h-full">
      <div className="bg-white pt-16 pb-16v w-full flex justify-center items-center !h-[100vh]">
        {updatePassword ? (
          <UpdatePassword token={otpToken} email={email} />
        ) : (
          <Card className="bg-white shadow-xl flex justify-center items-center max-w-[440px] ">
            <h1 className="text-3xl font-bold text-center mb-6">
              Forgot Password
            </h1>
            <Form
              disabled={loading}
              className="max-w-[400px] min-w-[250px] md:min-w-[400px] custom-form"
              onFinish={handleSendOtp}
              form={form}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  size="large"
                  disabled={otpVisible}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                />
              </Form.Item>
              <Form.Item className="flex w-full items-end">
                {!otpVisible ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={!email}
                    className="w-full bg-clr3 hover:bg-transparent hover:text-clr3 text-white px-[15px] py-[8px] rounded-xl border-2 font-semibold border-clr3"
                  >
                    Send OTP
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={resendOtp}
                    className="w-full bg-clr3 hover:bg-transparent hover:text-clr3 text-white px-[15px] py-[8px] rounded-xl border-2 font-semibold border-clr3"
                  >
                    Resend Otp
                  </button>
                )}
              </Form.Item>
            </Form>
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item
                name="otp"
                rules={[
                  { required: true, message: "Please enter the OTP!" },
                  { min: 4, message: "Otp must be 4 characters!" },
                  { max: 4 },
                ]}
                className="otp-main-num"
              >
                <Input
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  size="large"
                  maxLength={4}
                  disabled={!otpVisible}
                  prefix={<PiCirclesFourDuotone />}
                  placeholder={
                    !otpVisible
                      ? "Please enter the email address then enter the OTP"
                      : "Enter the OTP"
                  }
                />
              </Form.Item>
              <Form.Item className="mt-[10px]">
                <button
                  type="button"
                  disabled={!otpVisible}
                  onClick={handleSubmit}
                  className={`w-full login-form-button bg-clr3 hover:bg-transparent py-[8px] text-white font-semibold rounded-xl hover:text-clr3 border-2 border-clr3 transition-all duration-300 ease-in-out ${
                    !otpVisible ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  Submit
                </button>
              </Form.Item>
            </Form>
          </Card>
        )}
      </div>
    </Spin>
  );
}

export default ForgotPassword;
