import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Card, Form, Input, Popconfirm, Spin, Select, message } from "antd";
import useAuth from "../../../hook/useAuth";
import countryList from "react-select-country-list";
import { UseEditUser, UseUploadImage } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const EditProfile = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [file, setFile] = useState(null);
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const { mutateAsync: editUser } = UseEditUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { mutateAsync: UploadImage } = UseUploadImage();
  const { Option } = Select;

  const defaultUserData = user;
  const options = useMemo(() => countryList().getData(), []);

  // State to track selected country
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Set initial selected country when defaultUserData changes
  useEffect(() => {
    if (defaultUserData) {
      form.setFieldsValue({
        firstName: defaultUserData.firstName,
        lastName: defaultUserData.lastName,
        city: defaultUserData.city,
        country: defaultUserData.country,
      });
      setAvatarUrl(defaultUserData.imageUrl);
      setSelectedCountry(
        options.find((option) => option.label === defaultUserData.country)
      );
    }
  }, [defaultUserData, form, options]);

  const handleSubmit = useCallback(
    async (values) => {
      setLoading(true);
      try {
        let imageUrl = "";
        if (file || imageUrl) {
          const formData = new FormData();
          formData.append("file", file);
          const uploadResponse = await UploadImage(formData);
          imageUrl = uploadResponse.filePath;
          const response = await editUser({
            _id: defaultUserData._id,
            ...values,
            country: values.country,
            imageUrl: imageUrl,
          });

          if (response) {
            message.success("Profile updated successfully!");
            navigate("/profile");
          }
        } else {
          const response = await editUser({
            _id: defaultUserData._id,
            ...values,
            country: values.country,
            imageUrl: avatarUrl,
          });
          if (response) {
            message.success("Profile updated successfully!");
            navigate("/profile");
          }
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setLoading(false);
      }
    },
    [editUser, defaultUserData, avatarUrl, file, navigate]
  );

  // Handle image upload and set image preview
  const handleImageUpload = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file); // Set selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return (
    <Spin spinning={loading} className="w-full">
      <div className="container w-full flex flex-col items-center justify-center p-8">
        <div className="bg-gray-200 max-w-xl w-full p-8 flex flex-col rounded-xl shadow-xl">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold mb-4">Edit Profile</h2>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="profile-image-upload"
              />
              <label htmlFor="profile-image-upload">
                <img
                  src={imagePreview ? imagePreview : user?.imageUrl}
                  loading="lazy"
                  alt="Upload Image"
                  className={`rounded-full w-[200px] h-[200px] object-cover cursor-pointer`}
                />
                <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out">
                  <PlusOutlined
                    className="text-gray-600"
                    style={{ fontSize: "24px" }}
                  />
                </div>
              </label>
            </div>
            <Card className="mt-8 w-full max-w-lg bg-gray-50">
              <Form
                disabled={loading}
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
                initialValues={defaultUserData}
                colon={false}
              >
                <Form.Item
                  name="firstName"
                  label={
                    <span className="font-semibold text-lg">First Name</span>
                  }
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <Input size="large" placeholder="John" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  label={
                    <span className="font-semibold text-lg">Last Name</span>
                  }
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >
                  <Input size="large" placeholder="Doe" />
                </Form.Item>
                <Form.Item
                  name="city"
                  label={
                    <span className="font-semibold text-lg">City Name</span>
                  }
                  rules={[
                    { required: true, message: "Please enter your city name" },
                  ]}
                >
                  <Input size="large" placeholder="Karachi" />
                </Form.Item>
                <Form.Item
                  name="country"
                  label={
                    <span className="font-semibold text-lg">Country Name</span>
                  }
                  rules={[
                    { required: true, message: "Please select your country" },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Select a Country Name"
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    defaultValue={selectedCountry?.label}
                    onChange={(value) => {
                      const selected = options.find(
                        (option) => option.label === value
                      );
                      setSelectedCountry(selected);
                    }}
                  >
                    {options.map((option) => (
                      <Option key={option.value} value={option.label}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="imageUrl" style={{ display: "none" }}>
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item>
                  <Popconfirm
                    title={
                      <span className="text-base font-normal">
                        Are you sure you want to edit the Profile?
                      </span>
                    }
                    onConfirm={form.submit}
                  >
                    <button
                      type="button"
                      className="w-full bg-clr1 hover:bg-transparent py-2 text-white font-semibold text-xl rounded-xl hover:text-clr1 border-2 border-clr1 transition-all duration-300 ease-in-out"
                    >
                      Update Profile
                    </button>
                  </Popconfirm>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default EditProfile;
