import React from "react";
import { Table, Typography, Collapse, Divider } from "antd";

function ShowServices({ clinic }) {
  const columns1 = [
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
      render: (text) => (
        <span className="font-medium text-gray-700">{text}</span>
      ),
    },
    {
      title: "Service Price",
      dataIndex: "servicePrice",
      key: "servicePrice",
      render: (text) => (
        <span className="font-medium text-gray-500">${text}</span>
      ),
    },
    {
      title: "Available Days",
      dataIndex: "availability",
      key: "availability",
      render: (availability) => {
        if (!availability || Object.keys(availability).length === 0) {
          return <span className="text-gray-500">Not available</span>;
        }

        const days = Object.keys(availability);
        return (
          <div className="flex flex-col overflow-x-auto max-h-[100px]">
            {days.map((day) => (
              <div key={day} className="flex items-start mb-3">
                <div className="font-medium text-gray-700 mr-2 w-24">{day}</div>
                <div className="flex flex-wrap w-full">
                  {availability[day].map((time, index) => (
                    <span key={index} className="text-gray-500 mr-2">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  const columns2 = [
    {
      title: <span className="text-lg font-semibold">Available Days</span>,
      dataIndex: "openingHours",
      key: "availableDays",
      render: (openingHours) => (
        <div>
          {openingHours.length > 0 ? (
            openingHours.map((oh) => (
              <div key={oh._id} className="text-gray-700">
                <span className="font-medium mr-2 text-gray-700 text-base">
                  {oh.day}:{" "}
                </span>
                <Divider />
              </div>
            ))
          ) : (
            <span className="text-lg font-semibold">Not Available</span>
          )}
        </div>
      ),
    },
    {
      title: <span className="text-lg font-semibold">Available Times</span>,
      dataIndex: "openingHours",
      key: "availableTimes",
      render: (openingHours) => (
        <div>
          {openingHours.length > 0 ? (
            openingHours.map((oh) => (
              <div key={oh._id} className="text-gray-700">
                <span className="text-gray-700 font-medium text-base">
                  {oh.hours}
                </span>
                <Divider />
              </div>
            ))
          ) : (
            <span className="text-lg font-semibold">Not Available</span>
          )}
        </div>
      ),
    },
    {
      title: <span className="text-lg font-semibold">Treatments Name</span>,
      dataIndex: "categories",
      key: "categories",
      render: (category) => (
        <div className="text-start flex-col">
          {category.length > 0 ? (
            category.map((name) => (
              <div
                key={name}
                className="text-start flex justify-start flex-col items-start w-full"
              >
                <span className="text-gray-700 font-medium text-base">
                  {name}
                </span>
                <Divider />
              </div>
            ))
          ) : (
            <span className="text-lg font-semibold">Not Available</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full custom-table">
      {clinic?.services ? (
        <>
          <Table
            columns={columns1}
            dataSource={clinic.services}
            pagination={false}
            rowKey="_id"
            bordered
            size="middle"
          />
        </>
      ) : (
        <>
          <Table
            columns={columns2}
            dataSource={[clinic]}
            pagination={false}
            rowKey="_id"
            bordered
          />
        </>
      )}
    </div>
  );
}

export default ShowServices;
