import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { toast } from "react-toastify";
// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();
const AdminContextProvider = (props) => {
    //get token
    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
    //doctor state
    const [doctors, setDoctors] = useState([]);
    //all appointments state
    const [appointments, setAppointments] = useState([]);
    //dashboard data state
    const [dashboard, setDashboard] = useState([]);
    //get backend url
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
   //get all doctors for admin form backend
   const getAllDoctors = async () => {
       try {
        const { data } = await axios.post(backendUrl + '/api/admin/all-doctors',{},{headers:{aToken}});
        if(data.success){
            setDoctors(data.data);
           
        }
       } catch (error) {
        toast.error(error.response?.data?.message || "An unexpected error occurred");
       }
   }
   //change availability of doctor
   const changeAvailability = async(docId) => {
       try {
        const { data } = await axios.post(backendUrl + '/api/admin/change-availability',{docId},{headers:{aToken}});
        if(data.success){
            toast.success(data.message);
            getAllDoctors();
        }else{
            toast.error(data.message);
        }

       } catch (error) {
        toast.error(error.response?.data?.message || "An unexpected error occurred");
       }
   }
   //get all the appointments for admin
   const getAllAppointments = async () => {
       try {
        const { data } = await axios.get(backendUrl + '/api/admin/all-appointments-admin',{headers:{aToken}});
        if(data.success){
            toast.success(data.message);
            setAppointments(data.data);
        }
       } catch (error) {
        toast.error(error.response?.data?.message || "An unexpected error occurred");
       }
   }
   //cancel appointment for admin
   const cancelAppointment = async (appointmentId) => {
       try {
        const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}});
        if(data.success){
            toast.success(data.message);
            getAllAppointments();
        }
       } catch (error) {
        toast.error(error.response?.data?.message || "An unexpected error occurred");
       }
   }
   //dashboard data for admin
   const getDashboardData = async () => {
       try {
        const { data } = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}});
        if(data.success){
            
            setDashboard(data.data);
        }
       } catch (error) {
        toast.error(error.response?.data?.message || "An unexpected error occurred");
       }
   }
   const value ={
        aToken,
        setAToken,
        backendUrl,
        getAllDoctors,
        doctors,
        changeAvailability,
        getAllAppointments,
        appointments,
        cancelAppointment,
        getDashboardData,
        dashboard
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider

AdminContextProvider.propTypes = {
    children: PropTypes.node.isRequired
  };