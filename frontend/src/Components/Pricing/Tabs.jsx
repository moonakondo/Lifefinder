import React from "react";
import { ButtonVariant3 } from "./";

const Tabs = ({ tabs, selectedTab, changeHandler, type }) => {
  return (
    <div className="flex justify-center gap-2 bg-[#f3f4f6] rounded-[100px] p-1 w-full sm:w-auto overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.value} // Add a unique key for each tab
          className={`flex flex-shrink-0 items-center justify-center ${
            type === "small" ? "text-xs" : "text-sm"
          } font-medium font-avenir text-[#111827] px-5 py-2 grow min-h-[36px] border border-solid border-transparent rounded-[100px] transition-all hover:text-[#111827] focus:text-[#111827] active:text-[#111827] hover:border-[#E5E7EB] focus:border-[#E5E7EB] active:border-[#E5E7EB] hover:bg-white focus:bg-white active:bg-white ${
            selectedTab === tab.value ? "bg-white" : ""
          }`}
          onClick={() => changeHandler(tab.value)}
        >
          {tab.text}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
