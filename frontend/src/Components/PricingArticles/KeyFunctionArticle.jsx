// src/components/KeyFunctionsArticle.jsx

import React from "react";
import { FaChartLine, FaRegSmile, FaExpand, FaCog } from "react-icons/fa";

const KeyFunctionsArticle = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-full container mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Article Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          KEY FUNCTIONS OF MEDISPHERE’S AI TOOL FOR MEDICAL FACILITIES
        </h1>

        {/* Performance Optimization */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            PERFORMANCE OPTIMIZATION:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Tracks real-time clinic data (patient flow, resource utilization,
              treatment efficiency).
            </li>
            <li>
              Offers Customized Dashboards For Clear Visibility on performance
              metrics.
            </li>
            <li>
              Identifies bottlenecks in patient processing and administrative
              workflows.
            </li>
          </ul>
        </div>

        {/* Profit Growth */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            PROFIT GROWTH:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Revenue monitoring by pinpointing areas to reduce costs (e.g.,
              staffing adjustments, inventory management).
            </li>
            <li>
              Improves billing processes and tracks reimbursements, reducing
              financial leakages.
            </li>
          </ul>
        </div>

        {/* Expansion & Scalability */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            EXPANSION & SCALABILITY:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Assists clinics in expanding services by Tracking Demand Patterns
              and predicting future patient needs.
            </li>
            <li>
              Tools to manage satellite clinics under a centralized management
              system.
            </li>
            <li>
              Helps develop scalable models for multi-location growth by
              standardizing key processes across branches.
            </li>
          </ul>
        </div>

        {/* Comprehensive Management */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            COMPREHENSIVE MANAGEMENT:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Streamlines operations with a focus on staff productivity and
              patient satisfaction.
            </li>
            <li>
              Enhances compliance and reporting, which is essential for meeting
              regulatory standards.
            </li>
            <li>
              Supports executive-level decision-making through in-depth insights
              into clinic performance.
            </li>
          </ul>
        </div>

        {/* Impact on Clinics */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            Impact on Clinics:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Clinic Leadership:</strong> Allows head clinics to make
              informed decisions, particularly if they manage multiple satellite
              clinics, providing centralized control over operations.
            </li>
            <li>
              <strong>Data-Driven Decisions:</strong> Statra’s tool converts raw
              data into actionable insights, enabling clinics to adjust
              operations in real-time.
            </li>
            <li>
              <strong>Sustainable Growth:</strong> By increasing efficiency and
              providing insights for profitable growth, clinics can scale
              sustainably without sacrificing quality or service delivery.
            </li>
          </ul>
        </div>

        {/* Keywords in Bubbles */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            DISPLAY Keywords IN BUBBLES:
          </h3>
          <div className="flex flex-wrap gap-4">
            <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
              Performance optimization
            </span>
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              Revenue growth
            </span>
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              Real-time data
            </span>
            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
              Expansion & scalability
            </span>
            <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
              Cost efficiency
            </span>
            <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
              Centralized management
            </span>
            <span className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
              Patient flow analysis
            </span>
            <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
              Billing and reimbursement tracking
            </span>
            <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
              Executive decision-making tools
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFunctionsArticle;
