import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const DoctorContext = createContext();
const DoctorContextProvider = (props) => {
  //get backend url
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  //get token state
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  //get appointments state
  const [appointments, setAppointments] = useState([]);
  //get dashboard data state
  const [dashboard, setDashboard] = useState(false);
  //get doctors profile state
  const [profile, setProfile] = useState(false);
  //get all appointments for doctor
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/doctor-appointments",
        { headers: { dToken } }
      );
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  };
  //appointment complete  function
  const appointmentComplete = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  };
  //cancel appointment function
  const appointmentCancel = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  };
  //dashboard data for doctor plane
  const getDashboardData = async () => {
      try {
        const { data } = await axios.get(
          backendUrl + "/api/doctor/doctor-dashboard",
          { headers: { dToken } }
        );
        if (data.success) {
          setDashboard(data.data);
         
        }
     
      } catch (error) {
        console.log(error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      ); 
      }
  }
  //get doctors profile function
   const getDoctorsProfile = async () => {
     try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/doctor-profile",
        { headers: { dToken } }           
      );
      if (data.success) {
        setProfile(data.data);
      }
      toast.success(
        data.message
      )
     } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      ); 
     }
   }
  //context value
  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAllAppointments,
    appointmentComplete,
    appointmentCancel,
    dashboard,
    setDashboard,
    getDashboardData,
    profile,
    setProfile,
    getDoctorsProfile
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export default DoctorContextProvider;

DoctorContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
