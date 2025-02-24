import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const {dToken}=useContext(DoctorContext);
  return (
    <div className="min-h-screen bg-white border-r ">
      {/* admin sidebar */}
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `flex items-center gap-2 py-3.5 px-3 md:px-9 min-w-12 md:min-w-25  lg:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF]  border-r-4 border-primary" : ""
              } `
            }
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden lg:block">DASHBOARD</p>
          </NavLink>
          <NavLink
            to={"/all-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-2 py-3.5 px-3 md:px-9 min-w-12 md:min-w-25 lg:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF]  border-r-4 border-primary" : ""
              } `
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden lg:block">APPOINTMENTS</p>
          </NavLink>
          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `flex items-center gap-2 py-3.5 px-3 md:px-9 min-w-12 md:min-w-25  lg:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF]  border-r-4 border-primary" : ""
              } `
            }
          >
            <img src={assets.add_icon} alt="" />
            <p className="hidden lg:block">ADD DOCTOR</p>
          </NavLink>
          <NavLink
            to={"/doctor-list"}
            className={({ isActive }) =>
              `flex items-center gap-2 py-3.5 px-3 md:px-9  min-w-12 md:min-w-25  lg:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF]  border-r-4 border-primary" : ""
              } `
            }
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden lg:block">DOCTORS LIST</p>
          </NavLink>
        </ul>
      )}
     {/* doctor sidebar */}
     {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `flex items-center gap-2 py-3.5 px-3 md:px-9 min-w-12 md:min-w-25 lg:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF]  border-r-4 border-primary" : ""
              } `
            }
          >
            <img src={assets.home_icon} alt="" className=""/>
            <p className='hidden lg:block'>DASHBOARD</p>
          </NavLink>
          <NavLink
            to={"/doctor-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-2 py-3.5 px-3 md:px-9 md:min-w-25  lg:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF]  border-r-4 border-primary" : ""
              } `
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden lg:block'>APPOINTMENTS</p>
          </NavLink>
          <NavLink
            to={"/doctor-profile"}
            className={({ isActive }) =>
              `flex items-center gap-2 py-3.5 px-3 md:px-9  md:min-w-25 lg:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF]  border-r-4 border-primary" : ""
              } `
            }
          >
            <img src={assets.people_icon} alt="" />
            <p className='hidden lg:block'>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
