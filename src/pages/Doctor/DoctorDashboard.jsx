import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dToken,
    dashboard,
    getDashboardData,
    appointmentCancel,
    appointmentComplete,
  } = useContext(DoctorContext);
  const { slotDateFormat, currencySymbol } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashboardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dToken]);
  return (
    dashboard && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3 ">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
            <img
              src={assets.earning_icon}
              alt="doctor icon"
              className="w-14 h-14"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currencySymbol}
                {dashboard.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
            <img
              src={assets.appointments_icon}
              alt="appointments icon"
              className="w-14 h-14"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboard.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
            <img
              src={assets.patients_icon}
              alt=" patients icon"
              className="w-14 h-14"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboard.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>
        {/*latest  appointments */}
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10  rounded-t border border-gray-100">
            <img src={assets.list_icon} alt="list icon" />
            <p>Latest Appointments</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashboard.latestAppointments &&
              dashboard.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex item-center px-6 py-3 gap-3 hover:bg-gray-100"
                >
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="rounded-full w-10 h-10"
                  />
                  <div className="flex-1 text-sm ">
                    <p className="text-gray-800 font-medium">
                      {item.userData.name}
                    </p>
                    <p className="text-gray-600">
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-500 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Competed
                    </p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p>
                        <img
                          onClick={() => appointmentCancel(item._id)}
                          src={assets.cancel_icon}
                          alt="cancel"
                          className=" w-10 cursor-pointer"
                        />
                      </p>
                      <p>
                        <img
                          onClick={() => appointmentComplete(item._id)}
                          src={assets.tick_icon}
                          alt="complete"
                          className=" w-10 cursor-pointer"
                        />
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
