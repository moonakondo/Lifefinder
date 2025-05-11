import React, { useState } from "react";
import { Form, Input, message, Card, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { passwordStrength } from "../../../utils/helpers/index";
import { LockOutlined } from "@ant-design/icons";
import { MdLockReset } from "react-icons/md";
import { useUpdatePassword } from "../../../apis/auth";

function UpdatePassword({ token, email }) {
  const [passwordForm] = useForm();
  const navigate = useNavigate();
  const [passwordStrengthState, setPasswordStrengthState] = useState("");
  const { mutateAsync: updatePassword } = useUpdatePassword();
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleUpdatePassword = async (values) => {
    const { newPassword } = values;
    setLoading(true);
    try {
      await passwordForm.validateFields();
      const response = await updatePassword({ newPassword, token, email }); // Include token and email
      if (response) {
        message.success("Password updated successfully!");
        passwordForm.resetFields();
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      message.error("Failed to update password");
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="bg-white pt-10  w-full flex justify-center items-center">
        <Card className="bg-white shadow-xl flex justify-center items-center max-w-[440px]">
          <h1 className="text-3xl font-bold text-center mb-10">
            Update Password
          </h1>
          <Form
            form={passwordForm}
            className="max-w-[400px] min-w-[250px] md:min-w-[400px]"
            onFinish={handleUpdatePassword}
          >
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "Please Enter a Password!" },
                { min: 8, message: "Password must be at least 8 characters!" },
              ]}
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
              help={passwordStrengthMessage}
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
              name="confirmPassword"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<MdLockReset className="site-form-item-icon" />}
                size="large"
                placeholder="Retype New Password"
              />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                className="w-full login-form-button bg-clr3 hover:bg-transparent py-[8px] text-white font-semibold text-xl rounded-xl hover:text-clr3 border-2 border-clr3 transition-all duration-300 ease-in-out"
              >
                Update Password
              </button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Spin>
  );
}

export default UpdatePassword;
