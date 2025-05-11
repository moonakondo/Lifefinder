import React, { useCallback, useMemo, useState } from "react";
import {
  Form,
  Input,
  Button,
  Avatar,
  Select,
  Typography,
  message,
  Spin,
  TimePicker,
  Alert,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { servicesList } from "./services";
import countryList from "react-select-country-list";
import { passwordStrength } from "../../../../utils/helpers";
import { UseUploadImage } from "../../../../apis/auth";
import useAuth from "../../../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { FaDollarSign } from "react-icons/fa";
import { useSendOtpHospital } from "../../../../apis/hospitals/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { cities } from "../../../Clinic/ClinicsSub/data";

const { TextArea } = Input;
const { Option } = Select;

const SignUpHospital = () => {
  const [services, setServices] = useState([]);
  const [email, setEmail] = useState("");
  const [servicePrices, setServicePrices] = useState({});
  const [serviceDays, setServiceDays] = useState({});
  const options = useMemo(() => countryList().getData(), []);
  const [passwordStrengthState, setPasswordStrengthState] = useState("");
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");
  const [file, setFile] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [city, setCity] = useState("");
  const { mutateAsync: uploadImage } = UseUploadImage();
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const { registerHospital } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync: sendOtp } = useSendOtpHospital();

  const handleServiceChange = (value) => {
    setServices(value);
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

  const onFinish = useCallback(
    async (values) => {
      setLoading(true);
      try {
        let imageUrl = avatarUrl;
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const uploadResponse = await uploadImage(formData);
          imageUrl = uploadResponse.filePath;
        }

        if (!imageUrl) {
          setLoading(false);
          return message.info("Image is required");
        }

        const servicesWithPrices = services.map((service) => ({
          serviceName: service,
          servicePrice: servicePrices[service] || "0",
          availability: serviceDays[service] || {},
        }));
        const fullPhoneNumber = `+${phoneNumber}`;
        const offset = new Date().getTimezoneOffset();

        const response = await registerHospital({
          ...values,
          image: imageUrl,
          services: servicesWithPrices,
          offset: offset,
          phone: fullPhoneNumber,
        });

        if (response) {
          message.success("Hospital registered successfully!");
          await sendOtp({ email });
          setLoading(false);
          navigate("/verify-hospital", {
            state: { email: email, hospitalId: response?._id },
          });
        }
      } catch (error) {
        setLoading(false);
        console.error("Registration Error:", error);
      }
    },
    [
      file,
      avatarUrl,
      uploadImage,
      registerHospital,
      services,
      servicePrices,
      serviceDays,
      navigate,
      email,
      sendOtp,
    ]
  );

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleServicePriceChange = (value, serviceName) => {
    setServicePrices((prevPrices) => ({
      ...prevPrices,
      [serviceName]: value,
    }));
  };

  const handleDayChange = (value, serviceName) => {
    setServiceDays((prevDays) => ({
      ...prevDays,
      [serviceName]: value.reduce((acc, day) => {
        acc[day] = prevDays[serviceName]?.[day] || [];
        return acc;
      }, {}),
    }));
  };

  const handleTimeChange = (time, day, serviceName) => {
    setServiceDays((prevDays) => ({
      ...prevDays,
      [serviceName]: {
        ...prevDays[serviceName],
        [day]: time ? time.map((t) => t.format("HH:mm")) : [],
      },
    }));
  };

  const daysOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const offset = -(new Date().getTimezoneOffset() / 60);

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handleCountryCodeChange = (value) => {
    setCountryCode(value);
  };
  const handleCityChange = (value) => {
    setCity(value);
  };

  return (
    <Spin className="w-full" spinning={loading}>
      <div className="p-8 container flex  flex-col md:flex-row w-full md:gap-x-8 gap-x-0 h-full justify-start items-start">
        <div className="bg-white shadow-2xl rounded-lg p-6 md:w-[70%] w-full ">
          <h2 className="text-2xl font-semibold mb-5">
            Hospital Registration Form
          </h2>
          <Alert
            className="mb-5"
            message="You will need to purchase our subscription in the next step"
            type="info"
            showIcon
          />
          <Form
            name="signup_hospital"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
          >
            <Form.Item
              label={<span className="font-medium text-lg">Hospital Name</span>}
              name="title"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Enter a Hospital Name"
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-medium text-lg">Email Address</span>}
              name="email"
              rules={[
                { required: true, message: "Please input your email address!" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<MailOutlined />}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter a Hospital Email Address"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="font-medium text-lg">Password</span>}
              rules={[
                {
                  required: true,
                  message: "Please enter a password!",
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
                placeholder="Enter a Password"
                className="pl-2"
                onChange={handlePasswordChange}
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label={
                <span className="font-medium text-lg">Confirm Password</span>
              }
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
              label={<span className="font-medium text-lg">Services</span>}
              name="services"
              rules={[
                { required: true, message: "Please select your services!" },
              ]}
            >
              <Select
                mode="multiple"
                size="large"
                placeholder="Select Services"
                onChange={handleServiceChange}
              >
                {servicesList.map((service) => (
                  <Option key={service} value={service}>
                    {service}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Custom Day Picker for Service Availability */}

            {services.map((service) => (
              <div className="flex flex-col" key={service}>
                <Form.Item
                  key={`${service}_days`}
                  label={
                    <span className="font-medium text-lg">
                      {service} Availability Days
                    </span>
                  }
                  name={`${service}_days`}
                  rules={[
                    {
                      required: true,
                      message: `Please select ${service} availability days!`,
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder={`Select the Days for ${service}`}
                    options={daysOptions.map((day) => ({
                      value: day,
                      label: day,
                    }))}
                    onChange={(value) => handleDayChange(value, service)}
                  />
                </Form.Item>
                {offset > 0 ? (
                  <Alert
                    className="mb-5"
                    message={`This time is in standard format which is GMT/UTC, you time is +${offset} Hours ahead of this time. Kindly select accordingly.`}
                    type="info"
                    showIcon
                  />
                ) : (
                  <Alert
                    className="mb-5"
                    message={`This time is in standard format which is GMT/UTC, you time is ${offset} Hours behind of this time. Kindly select accordingly.`}
                    type="info"
                    showIcon
                  />
                )}

                {serviceDays[service] &&
                  Object.keys(serviceDays[service]).map((day) => (
                    <Form.Item
                      className="w-full"
                      key={`${service}_${day}_time`}
                      label={
                        <span className="font-medium text-lg">
                          {service} Availability Time for {day}
                        </span>
                      }
                      name={`${service}_${day}_time`}
                      rules={[
                        {
                          required: true,
                          message: `Please select ${service} availability time for ${day}!`,
                        },
                      ]}
                    >
                      <TimePicker.RangePicker
                        size="large"
                        className="w-full"
                        onChange={(time) =>
                          handleTimeChange(time, day, service)
                        }
                      />
                    </Form.Item>
                  ))}
              </div>
            ))}

            {services.map((service) => (
              <Form.Item
                name={`${service}_price`}
                key={`${service}_price`}
                label={
                  <span className="font-medium text-lg">{service} Price</span>
                }
                rules={[
                  {
                    required: true,
                    message: `Please input the price for ${service}!`,
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<FaDollarSign />}
                  placeholder={`Enter the Price for ${service}`}
                  onChange={(e) =>
                    handleServicePriceChange(e.target.value, service)
                  }
                />
              </Form.Item>
            ))}

            <Form.Item
              label={<span className="font-medium text-lg">Country</span>}
              name="countryCode"
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            >
              <Select
                showSearch
                size="large"
                onChange={handleCountryCodeChange}
                placeholder="Select a Country"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {options.map((option) => (
                  <Option key={option.label} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={<span className="font-medium text-lg">City</span>}
              name="city"
              rules={[{ required: true, message: "Please Enter  City Name!" }]}
            >
              <Input
                type="text"
                placeholder="Enter a City Name!"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="address"
              label={<span className="font-medium text-lg">Address</span>}
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input
                size="large"
                prefix={<HomeOutlined />}
                placeholder="Enter a Address"
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-medium text-lg">Phone Number</span>}
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number!",
                },
              ]}
              className="!w-full"
            >
              <PhoneInput
                country={countryCode ? countryCode?.toLowerCase() : "us"}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                inputProps={{ name: "phone", required: true }}
                containerStyle={{ width: "100%" }}
                buttonStyle={{ height: "100%" }}
                onCountryChange={handleCountryCodeChange}
                isValidNumber={true}
                errorMessage={phoneNumberError}
                specialLabel={""}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label={<span className="font-medium text-lg">Description</span>}
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Enter a Hospital Description"
                showCount
                maxLength={200}
              />
            </Form.Item>

            <div className="text-base mb-5">
              You will be redirected to purchase monthly or yearly subscription,
              which is necessary for hospital registration.
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="w-full md:w-auto !bg-clr3 hover:!bg-transparent border-2 border-clr3 hover:!text-clr3 font-semibold text-lg h-[50px]"
                loading={loading}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="bg-white shadow-2xl rounded-lg p-6 mt-4 md:w-[30%] w-full">
          <Typography.Title
            level={2}
            className="mb-4 text-center text-2xl font-semibold"
          >
            Upload Hospital Image
          </Typography.Title>
          <div className="mt-4 flex justify-center items-center flex-col">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="profile-image-upload"
              />
              <label htmlFor="profile-image-upload" className="cursor-pointer">
                <Avatar
                  size={120}
                  src={avatarUrl || "https://i.stack.imgur.com/l60Hf.png"}
                  alt="Hospital Logo"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out bg-black bg-opacity-50 rounded-full">
                  <Typography.Text className="text-white text-lg font-semibold">
                    Change Logo
                  </Typography.Text>
                </div>
              </label>
            </div>
            <Typography.Text
              type="secondary"
              className="mt-2 text-sm text-center"
            >
              Select a hospital image to upload (PNG, JPG, GIF)
            </Typography.Text>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default SignUpHospital;
