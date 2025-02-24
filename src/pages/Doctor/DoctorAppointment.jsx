import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointment = () => {
  const {
    dToken,
    getAllAppointments,
    appointments,
    appointmentComplete,
    appointmentCancel,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currencySymbol } =
    useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAllAppointments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dToken]);
  return (
    <div className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments &&
          appointments.reverse().map((item, index) => (
            <div
              key={item._id}
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base  sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center gap-1  text-gray-500  py-3 px-6 border-b hover:bg-gray-50"
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={item.userData.image}
                  alt={item.userData.name}
                  className="w-8 h-8 rounded-full"
                />
                <p>{item.userData.name}</p>
              </div>
              <div>
                <p className="text-xs inline border border-primary px-2  rounded-full">
                  {item.payment ? "Online" : "Cash"}
                </p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p>
                {slotDateFormat(item.slotDate)}
                <p>{item.slotTime}</p>
              </p>
              <p>
                {currencySymbol}
                {item.amount}
              </p>
              {item.cancelled ? (
                <p className="text-red-500 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Competed</p>
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
  );
};

export default DoctorAppointment;
