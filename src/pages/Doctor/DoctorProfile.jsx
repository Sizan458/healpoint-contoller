import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  //doctor context
  const { dToken, setProfile, profile, getDoctorsProfile, backendUrl } =
    useContext(DoctorContext);
  //app context
  const { currencySymbol } = useContext(AppContext);
  //edit profile state
  const [edit, setEdit] = useState(false);
  //update profile  function
  const updateProfile = async () => {
    try {
      //update user profile data in database
      const updateData={
        address:profile.address,
        fees:profile.fees,
        available:profile.available
      };
    //send data to backend
    const {data}=await axios.post(backendUrl + '/api/doctor/profile-update',updateData,{headers:{dToken}});
    if(data.success){
      toast.success(data.message);
      setEdit(false);
      getDoctorsProfile();
    }
    } catch (error) {
       console.log(error);
            toast.error(
              error.response?.data?.message || "An unexpected error occurred"
            ); 
    }
  };

  useEffect(() => {
    if (dToken) {
      getDoctorsProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dToken]);
  return (
    profile && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              src={profile.image}
              alt={profile.name}
              className="bg-primary/80 w-full sm:max-w-64 h-64 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* docInfo:name,degree,specialty,experience */}
            <p className="flex item-center gap-2 text-3xl font-medium text-gray-700">
              {profile.name}
            </p>
            <div className="flex items-center gap-2  font-medium text-gray-600">
              <p>
                {profile.degree} - {profile.specialty}
              </p>
              <button className="py-0.5 px-2 text-xs rounded-full border">
                {profile.experience}
              </button>
            </div>

            <div>
              {/* docInfo:about */}
              <p className="flex items-center gap-1 text-sm font-medium mt-3 text-neutral-800">
                About:
              </p>
              <p className="text-sm text-gary-600  max-w-[700px] mt-1 text-justify">
                {profile.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-4">
              Appointment fees:{" "}
              <span className="text-gray-800">
                {currencySymbol}
                {edit ? (
                  <input
                    type="number"
                    name=""
                    onChange={(e) =>
                      setProfile((perv) => ({ ...perv, fees: e.target.value }))
                    }
                    value={profile.fees}
                  />
                ) : (
                  profile.fees
                )}
              </span>
            </p>
            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm ">
                {edit ? <input type="text" onChange={(e) => setProfile((perv) => ({ ...perv, address: { ...perv.address, line1: e.target.value } }))} value={profile.address.line1} /> : profile.address.line1}
                <br />
                {edit ? <input type="text"onChange={(e) => setProfile((perv) => ({ ...perv, address: { ...perv.address, line2: e.target.value } }))} value={profile.address.line2}/> : profile.address.line2}
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <input
                type="checkbox"
                name=""
                id=""
                checked={profile.available}
                onChange={() =>edit && setProfile((perv) => ({ ...perv, available: !perv.available }))}
              />
              <label htmlFor="">Available</label>
            </div>
            {edit?
              <button
             onClick={updateProfile}
              className="px-4  py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all duration-300"
            >
              Save
            </button>
            : <button
            onClick={()=>setEdit(!edit)}
            className="px-4  py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all duration-300"
          >
            Edit
          </button>
            }
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
