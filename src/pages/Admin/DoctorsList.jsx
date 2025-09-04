import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { X } from "lucide-react"; // Small cross icon

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aToken]);

  // Filter doctors based on search and availability
  const filteredDoctors = doctors
    ? doctors.filter((doctor) => {
        const matchesSearch =
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesAvailability = showAvailableOnly
          ? doctor.available
          : true;

        return matchesSearch && matchesAvailability;
      })
    : [];

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium mb-4">All Doctors</h1>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        {/* Search Input with Cross */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by name or specialty"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full pr-8 focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Available Only Toggle */}
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={() => setShowAvailableOnly((prev) => !prev)}
          />
          Show Available Only
        </label>
      </div>

      {/* Doctors List */}
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            >
              <img
                src={doctor.image}
                alt=""
                className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
              />
              <div className="p-4">
                <p className="text-neutral-800 text-lg font-medium">
                  {doctor.name}
                </p>
                <p className="text-zinc-600 text-sm">{doctor.specialty}</p>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={doctor.available}
                    onChange={() => changeAvailability(doctor._id)}
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
