import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NonRequireAuth from "../utils/auth/NonRequireAuth";
import RequireAuth from "../utils/auth/RequireAuth";
import { Spin } from "antd";
import ClinicsSubCategory from "../Components/Clinic/ClinicsSub";
import SuccessMeeting from "../Components/FeedBack/Sucess";
import { useLocation } from "react-router-dom";
import PricingArticle from "../Components/PricingArticles";

const Home = lazy(() => import("../Pages/Home"));
const Encology = lazy(() => import("../Pages/Encology"));
const PlasticSurgery = lazy(() => import("../Pages/PlasticSurgery"));
const Signup = lazy(() => import("../Pages/Signup"));
const Login = lazy(() => import("../Pages/Login"));
const Forgot = lazy(() => import("../Pages/Forgot"));
const Clinic = lazy(() => import("../Pages/Clinic"));
const ClinicDetail = lazy(() => import("../Pages/ClinicDetail"));
const Profile = lazy(() => import("../Pages/Profile"));
const EditProfile = lazy(() => import("../Pages/EditProfile"));
const Pricing = lazy(() => import("../Pages/Pricing"));
const SignUpHospital = lazy(() => import("../Pages/SignUpHospital"));
const AdminDashboard = lazy(() => import("../Pages/AdminDashboard"));
const Meeting = lazy(() => import("../Pages/Meeting"));
const VerifyPage = lazy(() => import("../Pages/Verify"));
const AboutUs = lazy(() => import("../Pages/About"));
const PaymentDone = lazy(() => import("../Pages/PaymentDone"));
const Price = lazy(() => import("../Pages/Price"));
const FeedBack = lazy(() => import("../Components/FeedBack"));
const VerificationHospital = lazy(() =>
  import("../Components/Auth/Hospital/VerifyOtp")
);
const ContactUsPage = lazy(() => import("../Pages/ContactUs"));
const RoomPage = lazy(() => import("../Components/Meeting/Room"));
const Navbar2 = lazy(() => import("../Components/Navbar2"));
const Footer = lazy(() => import("../Sections/Footer"));

function MainRoutes() {
  const location = useLocation();
  const isRoomPage = location.pathname.startsWith("/room/");

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-[100vh]">
          <Spin size="large" />
        </div>
      }
    >
      {!isRoomPage && <Navbar2 />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/premium-packages" element={<PricingArticle />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route
          path="/signup"
          element={
            <NonRequireAuth>
              <Signup />
            </NonRequireAuth>
          }
        />
        <Route path="/signup/hospital" element={<SignUpHospital />} />
        <Route path="/verify-otp" element={<VerifyPage />} />
        <Route path="/verify-hospital" element={<VerificationHospital />} />
        <Route
          path="/login"
          element={
            // <NonRequireAuth>
            <Login />
            // </NonRequireAuth>
          }
        />
        <Route path="/encology" element={<Encology />} />
        <Route path="/plasticsurgery" element={<PlasticSurgery />} />
        <Route path="/clinics/:id" element={<ClinicDetail />} />
        <Route path="/room" element={<Meeting />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="/clinics" element={<Clinic />} />
        <Route
          path="/clinics/sub/:searchString"
          element={<ClinicsSubCategory />}
        />
        <Route
          path="/profile/edit"
          element={
            <RequireAuth>
              <EditProfile />
            </RequireAuth>
          }
        />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/price-details" element={<Price />} />
        <Route path="/payment/success" element={<PaymentDone />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/end-meeting" element={<SuccessMeeting />} />
        <Route path="/feedback" element={<FeedBack />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      {!isRoomPage && <Footer />}
      {!isRoomPage && <TopButton />}
    </Suspense>
  );
}

const TopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="w-full">
      <button
        style={{ zIndex: 999 }}
        onClick={handleScrollToTop}
        className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-light-blue-600 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default MainRoutes;
