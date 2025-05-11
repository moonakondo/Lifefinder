import React from "react";
import { Link } from "react-router-dom";
import categories from "./data.json";
import { Tag } from "antd";

const CategoryDisplay = () => {
  return (
    <section className="mx-auto mt-14">
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-start gap-x-5 gap-y-5 pb-16">
        {categories?.map((item, index) => (
          // <div key={index} className="w-[45%]">
          <Link
            to={`/clinics/sub/${item?.searchString}`}
            className="w-full md:w-[45%] rounded-xl shadow-lg !min-h-[380px] flex flex-col p-[15px] border-2 border-white"
          >
            {/* <div className=""> */}
            <img
              src={item.image}
              loading="lazy"
              alt={item.title}
              className="w-full min-h-[250px] h-[250px] object-cover mb-4"
            />
            <div className="flex flex-col flex-grow px-[.7rem] gap-[1.7rem]">
              <h3 className="text-2xl font-bold text-clr1 truncate mb-[-1rem]">
                {item.title || item.name}
              </h3>
              <span className="text-base font-medium line-clamp-4 max-h-[80px]">
                {item.description}
              </span>
              <div className="flex justify-start items-center flex-wrap w-full gap-2 gap-y-3">
                {item.items.slice(0, 3).map((subItem, i) => (
                  <>
                    {/* <div
                      key={i}
                      className="bg-blue-100 min-w-fit text-blue-600 px-3 text-sm rounded-full border border-blue-300 py-[8px] text-center flex justify-center items-center whitespace-nowrap"
                    > */}
                    <Tag color="blue" className="text-sm">
                      {subItem}
                    </Tag>
                    {/* </div> */}
                    {/* <div
                        key={i}
                        className="bg-blue-100 text-blue-600 px-2 text-sm rounded-full border border-blue-300 py-[10px] text-center flex justify-center items-center"
                      >
                        {subItem}
                      </div> */}
                  </>
                ))}
              </div>
              <div className="mt-auto">
                <button
                  type="button"
                  className="w-full bg-clr1 hover:bg-transparent text-lg py-2 text-white font-semibold rounded-xl hover:text-clr1 border-2 border-clr1 transition-all duration-300 ease-in-out"
                >
                  View Clinics
                </button>
              </div>
            </div>
            {/* </div> */}
          </Link>
          // </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryDisplay;
