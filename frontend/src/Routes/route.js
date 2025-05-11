import RoomPage from "../Components/Meeting/Room";
import {
  Home,
  Encology,
  PlasticSurgery,
  Signup,
  Login,
  Forgot,
  Clinic,
  ClinicDetail,
  Profile,
  EditProfile,
  Pricing,
  SignUpHospital,
  AdminDashboard,
  Meeting,
  VerifyPage,
  AboutUs,
} from "../Pages";
import PaymentDone from "../Pages/PaymentDone";
import Price from "../Pages/Price";
import NonRequireAuth from "../utils/auth/NonRequireAuth";
import RequireAuth from "../utils/auth/RequireAuth";
import EndMeeting from "../Components/EndMeeting";
import VerificationHospital from "../Components/Auth/Hospital/VerifyOtp";
import ContactUsPage from "../Pages/ContactUs";
import SuccessMeeting from "../Components/EndMeeting/Sucess";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/contact-us", element: <ContactUsPage /> },
  { path: "/forgot-password", element: <Forgot /> },
  {
    path: "/signup",
    element: (
      <NonRequireAuth>
        <Signup />
      </NonRequireAuth>
    ),
  },
  {
    path: "/signup/hospital",
    element: (
      // <NonRequireAuth>
      //   <SignUpHospital />
      // </NonRequireAuth>
      <SignUpHospital />
    ),
  },
  {
    path: "/verify-otp",
    element: <VerifyPage />,
  },
  {
    path: "/verify-hospital",
    element: <VerificationHospital />,
  },
  {
    path: "/login",
    element: (
      <NonRequireAuth>
        <Login />
      </NonRequireAuth>
    ),
  },
  { path: "/encology", element: <Encology /> },
  { path: "/plasticsurgery", element: <PlasticSurgery /> },
  {
    path: "/clinics/:id",
    element: <ClinicDetail />,
  },
  {
    path: "/room",
    element: <Meeting />,
  },
  { path: "/room/:roomId", element: <RoomPage /> },
  {
    path: "/profile",
    element: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
  },
  // {
  //   path: "/clinics",
  //   element: <Clinic />,
  // },
  {
    path: "/profile/edit",
    element: (
      <RequireAuth>
        <EditProfile />
      </RequireAuth>
    ),
  },
  { path: "/pricing", element: <Pricing /> },
  { path: "/price-details", element: <Price /> },
  { path: "/payment/success", element: <PaymentDone /> },
  { path: "/admindashboard", element: <AdminDashboard /> },
  { path: "/feedback", element: <EndMeeting /> },
  { path: "/about", element: <AboutUs /> },
];

export default routes;
