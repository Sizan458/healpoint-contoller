import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { getAllAppointments, appointments, aToken, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currencySymbol } =
    useContext(AppContext);

  const [search, setSearch] = useState("");

  //call api to get all appointments function
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aToken]);

  // filter appointments based on search
  const filteredAppointments = appointments?.filter((item) => {
    const patientName = item.userData.name.toLowerCase();
    const doctorName = item.docData.name.toLowerCase();
    const date = slotDateFormat(item.slotDate).toLowerCase();
    return (
      patientName.includes(search.toLowerCase()) ||
      doctorName.includes(search.toLowerCase()) ||
      date.includes(search.toLowerCase())
    );
  });

  return (
    <div className="w-full max-w-6xl m-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <p className="text-lg font-medium">All Appointments</p>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by patient, doctor or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-medium text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {filteredAppointments && filteredAppointments.length > 0 ? (
          filteredAppointments.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
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
              <p className="max-sm:hidden">
                {calculateAge(item.userData.dob)}
              </p>
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-8 h-8 rounded-full bg-gray-200"
                />
                <p>{item.docData.name}</p>
              </div>
              <p>
                {currencySymbol}
                {item.amount}
              </p>
              {item.cancelled ? (
                <p className="text-red-500 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  src={assets.cancel_icon}
                  alt="cancel"
                  className="w-7 cursor-pointer hover:scale-110 transition"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
