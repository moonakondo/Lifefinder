import { useEffect, useState } from "react";
import { Form, Select, Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { citiesOptions } from "./data";
import { useNavigate } from "react-router-dom";
import { useGetSearchOptions } from "../apis/hospitals/scrapClinics";
import { secondCategories } from "../utils/helpers";
import axios from "../services/axios";
function SearchOptions() {
  const [searchCity, setSearchCity] = useState("");
  const [current, setCurrent] = useState("treatments");
  const [visible, setVisible] = useState(false);

  const handleMenuClick = (e) => {
    setCurrent(e.key);
    setVisible(false);
    console.log(`You selected ${e.key}`);
  };

  const navigate = useNavigate();
  const { data: searchData, isLoading } = useGetSearchOptions();
  const [categoriesWithSubcategories, setCategoriesWithSubcategories] =
    useState([]);
  const [submenuVisibility, setSubmenuVisibility] = useState({});
  const onSearch = () => {
    const searchCityObj = {
      searchCity: searchCity,
      allCategeoriesFilter: current,
    };
    console.log("searchCity", searchCity);
    navigate(`/clinics/sub/treatments`, { state: searchCityObj });
  };

  const sortedCategories = Array.from(new Set(secondCategories)).sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  console.log("sortedCat Category", sortedCategories);

  const { Option } = Select;

  const sortedCitiesOptions = citiesOptions.sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        let fetchedData = [];
        for (let category of sortedCategories) {
          const response = await axios.get(
            `/clinic/category/child?searchString=${category.value}`
          );
          fetchedData.push({
            category: category.label,
            subCategories: response.data.categories,
          });
        }
        setCategoriesWithSubcategories(fetchedData);
      } catch (error) {
        console.log("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, []);

  console.log("categoriesWithSubcategories", categoriesWithSubcategories);

  const handleClick = (e) => {
    setCurrent(e.key);
    console.log(`You selected ${e.key}`);
  };
  const toggleSubmenu = (category) => {
    setSubmenuVisibility((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const menu = (
    <Menu
      forceSubMenuRender={true}
      mode="vertical"
      onClick={handleMenuClick}
      selectedKeys={[current]}
      className="md:w-full w-[300px] bg-white border border-gray-300 rounded-md shadow-sm overflow-y-auto h-[220px] scroll-category"
    >
      <Menu.Item key="treatments" className="hover:bg-gray-100">
        All Treatments
      </Menu.Item>
      {categoriesWithSubcategories.map((item) => (
        <Menu.SubMenu
          popupClassName="mobile-submenu-popup"
          key={item.category}
          title={<span className="px-3 py-2">{item.category}</span>}
          onTitleClick={() => toggleSubmenu(item.category)}
          popupVisible={submenuVisibility[item.category]}
        >
          {item.subCategories.length ? (
            <>
              <Menu.Item key={`${item.category}`} className="hover:bg-gray-100">
                All {item.category}
              </Menu.Item>
              {item.subCategories.slice(0, 10).map((subCategory) => (
                <Menu.Item key={subCategory} className="hover:bg-gray-100">
                  {subCategory}
                </Menu.Item>
              ))}
            </>
          ) : (
            <Menu.Item disabled className="!l-[30px]">
              <span>Data is not available</span>
            </Menu.Item>
          )}
        </Menu.SubMenu>
      ))}
    </Menu>
  );

  return (
    <section className="mt-[3vw]">
      <div className="w-[90%] mx-auto sm:mx-0 sm:w-full flex justify-center items-center flex-col mb-[30px] mt-[2.5rem]">
        <h1 className="text-4xl xs:text-5xl font-semibold text-center mb-[10px]">
          Find the Perfect Clinic
        </h1>
        <p className="text-[17px] xs:text-[20px] font-medium text-center">
          Choose your treatment and find the best clinic for you
        </p>
      </div>
      <div className="relative flex flex-col items-center py-4 container ">
        <img
          src="/hero/map.jpg"
          alt="Map Image"
          className="min-h-[330px] md:min-h-[400px] max-h-[500px] w-full rounded-xl "
        />
        <div className="w-full flex flex-col  items-center justify-center mt-[10px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <Form
            className="flex flex-col md:flex-row items-center gap-4 w-[85%]  p-4"
            onFinish={onSearch}
          >
            <Form.Item className="w-full  h-full items-center justify-center ">
              <Dropdown
                overlay={menu}
                onVisibleChange={(flag) => setVisible(flag)}
                visible={visible}
                trigger={["click"]}
                className="relative"
              >
                <Button
                  className="w-full  text-left bg-white rounded-md border border-gray-300 shadow-sm  py-2 flex justify-between"
                  size="large"
                >
                  {current === "treatments" ? "All Treatments" : current}{" "}
                  <DownOutlined />
                </Button>
              </Dropdown>
            </Form.Item>
            <Form.Item className="w-full ">
              <Select
                placeholder="Select a City"
                size="large"
                value={searchCity}
                onChange={(value) => setSearchCity(value)}
                showSearch
              >
                <Option value="">Any City</Option>
                {sortedCitiesOptions?.map((city) => (
                  <Option key={city.value} value={city.value}>
                    {city.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item className="w-full ">
              <button
                type="submit"
                className="text-lg font-semibold w-full bg-clr3 hover:bg-white text-white py-[6px] px-4 rounded-full border-2 border-clr3 hover:text-clr3 transition duration-300 ease-in-out"
              >
                Search
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default SearchOptions;
