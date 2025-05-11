import { useCallback, useState } from "react";
import { Button, Form, Input, Spin, message as antMessage } from "antd";
import { useContact } from "../apis/contact";
import { useForm } from "antd/es/form/Form";

function Contact() {
  const { mutateAsync: ContactUser } = useContact();
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  const onFinish = useCallback(
    async (values) => {
      setLoading(true);
      try {
        const { user_name, user_email, status, message } = values;
        const response = await ContactUser({
          user_name,
          user_email,
          status,
          message,
        });
        console.log("🚀 ~ onFinish ~ response:", response);
        if (response?.data) {
          setLoading(false);
          antMessage.success("Message sent successfully!");
          form.resetFields();
        }
      } catch (error) {
        setLoading(false);
        console.log("🚀 ~ onFinish ~ error:", error);
      }
    },
    [ContactUser]
  );

  return (
    <section className="flex flex-col justify-center lg:flex-row mt-[10vh] lg:px-0 px-[40px]  lg:gap-x-[130px] mb-[6vh]">
      <div className="flex flex-col border-[3px] w-full lg:w-[37%] justify-center border-gray-300 px-[2.5rem] py-[3rem] rounded-[2.5rem] mt-[5vh] lg:mt-0">
        <Form
          form={form}
          disabled={loading}
          onFinish={onFinish}
          requiredMark={false}
          className="w-full"
          layout="vertical"
        >
          <Form.Item
            label={<span className="text-xl font-semibold">Name</span>}
            name="user_name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              className="rounded-[.8rem] px-[.9rem] py-[.6rem] border-2"
              placeholder="Enter the Name"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-xl font-semibold">Email</span>}
            name="user_email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              className="rounded-[.8rem] px-[.9rem] py-[.6rem] border-2"
              size="large"
              placeholder="Enter the Email Address"
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-xl font-semibold">Status</span>}
            name="status"
            rules={[
              {
                required: true,
                message: "Please input your status!",
              },
            ]}
          >
            <Input
              className="rounded-[.8rem] px-[.9rem] py-[.6rem] border-2"
              placeholder="Enter the Status"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-xl font-semibold">Message</span>}
            name="message"
            rules={[
              {
                required: true,
                message: "Please input your message!",
              },
              {
                max: 200,
                message: "Message should not exceed 200 characters!",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              size="large"
              className="rounded-[.8rem] px-[.9rem] border-2"
              placeholder="Enter the Message"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="w-full md:w-auto !bg-clr3 hover:!bg-transparent border-2 border-clr3 hover:!text-clr3 font-semibold text-lg h-[50px] rounded-[1.5rem]"
            loading={loading}
          >
            Submit
          </Button>
        </Form>
      </div>
      <div className="flex flex-col items-center lg:items-start">
        <p className="text-[10vw] md:text-[3vw] font-semibold text-clr2 text-center lg:text-left">
          Contact Us
        </p>
        <p className="text-[3vw] md:text-[1.4vw] text-clr3 font-bold text-center lg:text-left">
          Email: contact@LIFE-FINDER.COM
        </p>
        <img
          src="/contact-2.jpeg"
          loading="lazy"
          alt="Contact Image"
          className="w-[70vh] md:w-[50vh] h-[50vh] mt-[3vh] lg:mt-[3vh] rounded-xl object-contain "
        />
      </div>
    </section>
  );
}

export default Contact;
