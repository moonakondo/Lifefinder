import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Rate,
  Button,
  DatePicker,
  Checkbox,
  message,
  Spin,
} from "antd";
import countryList from "react-select-country-list";
import { servicesList } from "../Auth/Hospital/Signup/services";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { UseFeedBackClinic } from "../../apis/hospitals/auth";
import moment from "moment";
import ReactSelect from "react-select";
import { cities } from "../Clinic/ClinicsSub/data";

const { Option } = Select;

function FeedBack() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [recommend, setRecommend] = useState(false);
  const options = useMemo(() => countryList().getData(), []);
  const [services, setServices] = useState([]);
  const { mutateAsync: feedBackSubmit } = UseFeedBackClinic();
  const [clinic, setIsClinic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [city, setCity] = useState("");

  const sortedCitiesOptions = cities?.sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  const sortedList = servicesList.sort((a, b) => a.localeCompare(b));

  const handleFinish = async (values) => {
    setLoading(true);
    const { countryValue } = values;
    const country = countryValue.label;
    setFormLoading(false);
    try {
      const response = await feedBackSubmit({
        ...values,
        countryValue: country,
        clinic_email: "Urbane.acfortier@gmail.com",
      });

      if (response) {
        message.success("Feedback submitted successfully!");
        navigate("/");
        setFormLoading(false);
        setLoading(false);
        setIsClinic(true);
      }
      setFormLoading(false);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setFormLoading(false);
    }
  };

  const handleServiceChange = (value) => {
    setServices(value);
  };

  const rateStyle = {
    fontSize: 24,
    color: "#ff4d4f",
  };

  const disablePastDates = (current) => {
    return current && current < moment().endOf("day");
  };

  return (
    <Spin spinning={loading} className="w-full">
      <div className="max-w-5xl mx-auto m-[40px] p-6 bg-white shadow-xl rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Clinics Feedback Form</h1>
        <Form
          form={form}
          className="end-meeting"
          onFinish={handleFinish}
          layout="vertical"
          disabled={loading}
          initialValues={{
            recommend: false,
          }}
        >
          <Form.Item
            label={
              <span className="font-medium text-base">Name (Optional)</span>
            }
            name="name"
          >
            <Input placeholder="Enter your name" size="large" />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-medium text-base">Email (Optional)</span>
            }
            name="email"
          >
            <Input type="email" placeholder="Enter your email" size="large" />
          </Form.Item>

          <Form.Item
            className="w-full"
            name="countryValue"
            label={
              <span className="font-medium text-base">Select Country</span>
            }
            rules={[
              {
                required: true,
                message: "Please select a country!",
              },
            ]}
          >
            <ReactSelect
              showSearch
              options={options}
              placeholder="Select a country"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name={"services"}
            label={
              <span className="font-medium text-base">Select Services</span>
            }
          >
            <Select
              size="large"
              placeholder="Select Services"
              onChange={handleServiceChange}
            >
              {sortedList.map((service) => (
                <Option key={service} value={service}>
                  {service}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <span className="font-medium text-base">Name of the Clinic</span>
            }
            name="clinicName"
            rules={[
              { required: true, message: "Please enter the clinic name!" },
            ]}
          >
            <Input placeholder="Enter clinic name" size="large" />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-medium text-base">
                Location of the Clinic
              </span>
            }
            name="clinicLocation"
            rules={[
              { required: true, message: "Please enter the clinic location!" },
            ]}
          >
            <Select
              placeholder="Select a Country"
              size="large"
              value={city}
              onChange={(value) => setCity(value)}
              showSearch
            >
              <Option value="">Any City</Option>
              {sortedCitiesOptions?.map((country) => (
                <Option key={country.value} value={country.value}>
                  {country.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <span className="font-medium text-base">Date of Treatment</span>
            }
            name="treatmentDate"
            rules={[
              { required: true, message: "Please select the treatment date!" },
            ]}
          >
            <DatePicker
              className="w-full"
              size="large"
              disabledDate={disablePastDates}
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { name: "overallRating", label: "Overall Rating" },
              { name: "qualityRating", label: "Quality of Treatment" },
              { name: "hygieneRating", label: "Hygiene and Safety" },
              { name: "costRating", label: "Cost Transparency" },
              {
                name: "waitingRating",
                label: "Waiting Time and Accessibility",
              },
              { name: "postCareRating", label: "Post-Operative Care" },
            ].map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={
                  <span className="text-base font-medium">{field.label}</span>
                }
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Please give a rating" }]}
              >
                <Rate
                  allowHalf
                  character={({ index }) => {
                    const currentRating = form.getFieldValue(field.name);
                    if (index + 1 <= currentRating) {
                      return <HeartFilled style={rateStyle} />;
                    }
                    if (index + 0.5 === currentRating) {
                      return (
                        <HeartFilled style={{ ...rateStyle, opacity: 0.5 }} />
                      );
                    }
                    return <HeartOutlined style={rateStyle} />;
                  }}
                  style={{ fontSize: "24px" }}
                />
              </Form.Item>
            ))}
          </div>

          <Form.Item
            label={
              <span className="text-base font-medium">
                Describe Your Experience
              </span>
            }
            name="experience"
          >
            <Input.TextArea rows={4} placeholder="Describe your experience" />
          </Form.Item>

          {/* <Form.Item label="Pros" name="pros">
          <Input.TextArea rows={4} placeholder="List positive aspects" />
        </Form.Item>

        <Form.Item label="Cons" name="cons">
          <Input.TextArea rows={4} placeholder="List negative aspects" />
        </Form.Item> */}

          <Form.Item
            label={
              <span className="text-base font-medium">
                Would You Recommend This Clinic?
              </span>
            }
            name="recommend"
            valuePropName="checked"
          >
            <Checkbox onChange={(e) => setRecommend(e.target.checked)}>
              Yes
            </Checkbox>
          </Form.Item>

          <Form.Item
            label={
              <span className="text-base font-medium">
                Any Additional Comments or Suggestions
              </span>
            }
            name="additionalComments"
          >
            <Input.TextArea
              rows={4}
              placeholder="Any additional comments or suggestions"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              loading={loading}
              className="mr-4 bg-clr1 text-white hover:!bg-transparent hover:!text-clr1 border-[1px] border-clr1 hover:border-[1px] hover:!border-clr1 text-base font-semibold h-[40px]"
            >
              Submit Feedback
            </Button>
            <Button
              type="default"
              onClick={() => navigate("/")}
              className=" h-[40px]"
            >
              Back to Home
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
}

export default FeedBack;
