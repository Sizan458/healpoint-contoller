import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [doctorImg, setDoctorImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [fees, setFees] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const {backendUrl,aToken} =useContext(AdminContext)

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if(!doctorImg){
       return toast.error('Please upload doctor image')
      }
      const formData= new FormData();
      formData.append('image',doctorImg);
      formData.append('name',name);
      formData.append('email',email);
      formData.append('password',password);
      formData.append('experience',experience);
      formData.append('specialty',specialty);
      formData.append('fees',Number(fees));
      formData.append('degree',degree);
      formData.append('address',JSON.stringify({line1:address1,line2:address2}));
      formData.append('about',about);
      // send to backend
       const {data}=await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}});
       if(data.success){
        toast.success(data.message);
        setDoctorImg(false);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('');
        setSpecialty('');
        setFees('');
        setDegree('');
        setAddress1('');
        setAddress2('');
        setAbout('');
       }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    }

  }
  return (
    <form className="m-5 w-full " onSubmit={handleSubmit}>
      <p className="mb-3 text-lg font-m">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={
                doctorImg ? URL.createObjectURL(doctorImg) : assets.upload_area
              }
              alt=""
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input
            type="file"
            name=""
            id="doc-img"
            hidden
            onChange={(e) => setDoctorImg(e.target.files[0])}
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>
        <div className="flex flex-cols lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="w-full border border-zinc-300 outline-primary px-3 py-2 mt-1 rounded"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                required
                className="w-full border border-zinc-300 outline-primary px-3 py-2 mt-1 rounded"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                required
                className="w-full border border-zinc-300 outline-primary px-3 py-2 mt-1 rounded"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                name=""
                id=""
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="w-full border border-zinc-300 outline-primary px-3 py-2 mt-1 rounded"
              >
                <option defaultValue="No Experience">No Experience</option>
                <option value="1 Years">1 Years</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                type="number"
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                placeholder="Fees"
                required
                className="w-full border border-zinc-300 outline-primary px-3 py-2 mt-1 rounded"
              />
            </div>
          </div>
          <div className="w-full  lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Specialty</p>
              <select
                name=""
                id=""
                onChange={(e) => setSpecialty(e.target.value)}
                value={specialty}
                className="w-full border border-zinc-300 outline-primary px-3 py-2 mt-1 rounded"
              >
                <option defaultValue="Select Specialty" >
                  Select Specialty
                </option>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="Education"
                required
                className="w-full border border-zinc-300 outline-primary px-3 py-2 mt-1 rounded"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                type="text"
                placeholder="Address 1"
                required
                className="w-full border border-zinc-300 outline-primary px-3 py-2 mt-1 rounded"
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                type="text"
                placeholder="Address 2"
                required
                className="w-full border border-zinc-300 outline-primary px-3 py-2 mt-1 rounded"
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2 ">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="write about doctor"
            rows={5}
            className="w-full px-4 pt-2 border border-zinc-300 outline-primary rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-10 py-3 mt-4 rounded-full text-sm"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
