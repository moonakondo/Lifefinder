import { Spin, message } from "antd";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { UseLoginUser, UseSignupUser } from "../apis/auth";
import axios from "../services/axios";
import { UseLoginHospital, UseRegisterHospital } from "../apis/hospitals/auth";

const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const asPath = useLocation();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    service: "",
    location: "",
    price: "",
  });

  const { mutateAsync: createUser } = UseSignupUser();
  const { mutateAsync: loginUser } = UseLoginUser();

  const { mutateAsync: loginHospital } = UseLoginHospital();
  const { mutateAsync: createHospitals } = UseRegisterHospital();

  const register = useCallback(
    async ({ email, firstName, lastName, password, country, city }) => {
      try {
        const response = await createUser({
          email,
          password,
          firstName,
          lastName,
          city,
          country,
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    [createUser]
  );

  const registerHospital = useCallback(
    async ({
      email,
      title,
      password,
      services,
      countryCode,
      city,
      address,
      description,
      image,
      phone,
      offset,
    }) => {
      try {
        const response = await createHospitals({
          email,
          title,
          password,
          services,
          countryCode,
          city,
          address,
          description,
          image,
          phone,
          offset,
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    [createHospitals]
  );

  const login = useCallback(
    async ({ email, password }) => {
      try {
        const response = await loginUser({ email, password });
        Cookies.set("token", response?.token, { expires: 1 });
        Cookies.set("user_id", response?.user._id, { expires: 1 });
        Cookies.set("role", response?.user.role, { expires: 1 });
        Cookies.set("verified", response?.user.verified, { expires: 1 });
        return response;
      } catch (error) {
        throw error;
      }
    },
    [loginUser]
  );

  const loginHospitals = useCallback(
    async ({ email, password }) => {
      try {
        const response = await loginHospital({ email, password });
        Cookies.set("token", response?.token, { expires: 1 });
        Cookies.set("user_id", response?.hospital._id, { expires: 1 });
        Cookies.set("role", response?.hospital.role, { expires: 1 });
        Cookies.set("verified", "true");
        return response;
      } catch (error) {
        throw error;
      }
    },
    [loginHospital]
  );

  const loginHospitals2 = useCallback(
    async ({ email, password }) => {
      try {
        const response = await loginHospital({ email, password });
        // Cookies.set("token", response?.token, { expires: 1 });
        // Cookies.set("user_id", response?.hospital._id, { expires: 1 });
        // Cookies.set("role", response?.hospital.role, { expires: 1 });
        // Cookies.set("verified", "true");
        return response;
      } catch (error) {
        throw error;
      }
    },
    [loginHospital]
  );

  const logOut = useCallback(async () => {
    try {
      Cookies.remove("token");
      Cookies.remove("user_id");
      Cookies.remove("role");
      Cookies.remove("verified");
      setIsAuthenticated(false);
      message.info("SignOut Successfully");
    } catch (error) {
      throw error;
    }
  }, []);

  const handleSearch = useCallback(({ service, location, price }) => {
    setSearchCriteria({ service, location, price });
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    const userId = Cookies.get("user_id");
    const role = Cookies.get("role");
    const verified = Cookies.get("verified");
    console.log("🚀 ~ useEffect ~ verified:", verified);
    const mainVerified = Boolean(verified);
    console.log("🚀 ~ useEffect ~ mainVerified:", mainVerified);

    const fetchData = async () => {
      if (token && userId && verified === "true") {
        try {
          // Determine the endpoint based on user type
          const endpoint = role.startsWith("admin")
            ? `/hospital/${userId}`
            : `/user/${userId}`;
          const response = await axios.get(endpoint);
          setUser(response.data.result);
          setIsAuthenticated(!!token);
        } catch (error) {
          console.error("Error fetching user/hospital:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [asPath]);

  const value = useMemo(
    () => ({
      login,
      loginHospitals,
      registerHospital,
      register,
      loading,
      isAuthenticated,
      setIsAuthenticated,
      logOut,
      loginHospitals2,
      user,
      setSearchCriteria,
      searchCriteria,
      handleSearch,
    }),
    [
      register,
      login,
      loginHospitals,
      registerHospital,
      loginHospitals2,
      setSearchCriteria,
      loading,
      isAuthenticated,
      setIsAuthenticated,
      user,
      logOut,
      searchCriteria,
      handleSearch,
    ]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spin size="large" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthContextProvider };
