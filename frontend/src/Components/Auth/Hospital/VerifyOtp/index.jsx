import React, { useState } from "react";
import { Input, Button, Typography, message, Form } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useSendOtpHospital,
  useVerifyOtpHospital,
} from "../../../../apis/hospitals/auth";

const { Title, Text } = Typography;

const VerificationHospital = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, hospitalId } = location.state || {};
  const { mutateAsync: sendOtp } = useSendOtpHospital();
  const { mutateAsync: verifyOtp } = useVerifyOtpHospital();

  const handleSubmit = async (value) => {
    const { otp } = value;
    setLoading(true);
    try {
      const response = await verifyOtp({ email, otp });
      if (response) {
        setLoading(false);
        message.success("Email verified successfully");
        navigate("/pricing", {
          state: { email: email, hospitalId: hospitalId },
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await sendOtp({ email });
      message.success("OTP sent successfully");
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center h-[60vh] ">
      <div className="bg-white p-10 rounded-lg shadow-2xl text-center">
        <Title level={1}>Verify Your Account</Title>
        <div className="flex justify-center gap-2 my-4 w-full">
          <Form onFinish={handleSubmit} className="max-w-[400px] min-w-[400px]">
            <Form.Item
              className="w-full"
              name={"otp"}
              rules={[{ required: true, message: "Please Enter the Otp" }]}
            >
              <Input.OTP length={4} className=" text-center text-2xl w-full" />
            </Form.Item>
            <Form.Item
              name={"otp"}
              rules={[{ required: true, message: "Please Enter the Otp" }]}
            >
              <Button
                type="primary"
                htmlType="submit"
                block
                className="w-full md:w-auto !bg-clr1 hover:!bg-transparent border-2 border-clr1 hover:!text-clr1 font-semibold text-lg h-[50px]"
                loading={loading}
              >
                Verify
              </Button>
            </Form.Item>
          </Form>
        </div>

        <Text>
          If you didn't receive a code!!{" "}
          <Button type="link" onClick={handleResend} className="p-0">
            Resend
          </Button>
        </Text>
      </div>
    </div>
  );
};

export default VerificationHospital;
