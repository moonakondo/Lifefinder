import React from "react";
import { Form, Input, Rate, message, DatePicker } from "antd";
import { useForm } from "antd/es/form/Form";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import {
  useSaveReview,
  useFetchReviewsByClinicIdConditional,
} from "../../../apis/reviews";
import useAuth from "../../../hook/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { UseEditHospital } from "../../../apis/hospitals/auth";

function ReviewsForm({ clinic }) {
  const params = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  const { mutateAsync: SaveReview } = useSaveReview();
  const { user, isAuthenticated } = useAuth();
  const { mutateAsync: EditClinic } = UseEditHospital();
  const {
    data: apiReviews,
    isLoading,
    refetch,
  } = useFetchReviewsByClinicIdConditional({ clinic_id: params.id });

  // enable work or not?
  const onFinish = async (values) => {
    const { userName, comment, treatmentType, treatmentDate, stars } = values;
    try {
      if (!isAuthenticated) {
        navigate("/login");
        return message.info(
          "Please log in first, then you can leave a review."
        );
      }

      const response = await SaveReview({
        user_id: user._id,
        clinic_id: params.id,
        userName,
        comment,
        treatmentType,
        treatmentDate,
        stars,
      });

      if (response) {
        message.success("Review submitted successfully!");
        form.resetFields();
        await refetch();

        if (clinic.role === "adminmain") {
          const updatedClinic = {
            ratingCount: 1,
          };

          const response2 = await EditClinic({
            id: params.id,
            ...updatedClinic,
          });
        }
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to submit review. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
    message.error("Please check the form fields and try again.");
  };

  const rateStyle = {
    fontSize: 24,
    color: "#ff4d4f",
  };

  return (
    <div className="w-full mx-auto mt-8 p-6 bg-white rounded-lg shadow-2xl">
      <h2 className="text-4xl font-extrabold mt-8 mb-6 text-gray-800">
        Leave a Review
      </h2>
      <Form
        form={form}
        name="reviewForm"
        requiredMark={false}
        initialValues={{ rating: 3 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          name="userName"
          label={<span className="text-xl font-semibold">Your Name</span>}
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="treatmentType"
          label={
            <span className="text-xl font-semibold">
              Type of Treatment Received
            </span>
          }
          labelCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please enter the type of treatment" },
          ]}
        >
          <Input
            placeholder="Enter Type of Treatment (e.g., Cardio, Oncology, ENT)"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="treatmentDate"
          label={
            <span className="text-xl font-semibold">Date of Treatment</span>
          }
          labelCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please select the date of treatment" },
          ]}
        >
          <DatePicker size="large" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="stars"
          label={<span className="text-xl font-semibold">Rating</span>}
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: "Please give a rating" }]}
        >
          <Rate
            allowHalf
            character={({ index, count }) => {
              const currentRating = form.getFieldValue("stars");
              if (index + 1 <= currentRating) {
                return <HeartFilled style={rateStyle} />;
              }
              if (index + 0.5 === currentRating) {
                return <HeartFilled style={{ ...rateStyle, opacity: 0.5 }} />;
              }
              return <HeartOutlined style={rateStyle} />;
            }}
          />
        </Form.Item>
        <Form.Item
          name="comment"
          label={<span className="text-xl font-semibold">Your Review</span>}
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: "Please enter your review" }]}
        >
          <Input.TextArea rows={4} size="large" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <button
            type="submit"
            className="px-[50px] bg-clr1 hover:bg-transparent text-lg py-[7px] text-white font-semibold rounded-xl hover:text-clr1 border-2 border-clr1 transition-all duration-300 ease-in-out"
          >
            Submit
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ReviewsForm;
