import { ConfigProvider } from "antd";
import * as theme from "./theme.json";
import "antd/dist/reset.css";
import "./main.css";

const Theme = ({ children }) => {
  return (
    <ConfigProvider theme={theme} componentSize="large">
      {children}
    </ConfigProvider>
  );
};
export default Theme;
