import { useContext, useState } from "react"
import { AdminContext } from "../context/AdminContext"
import axios from "axios"
import { toast } from "react-toastify"
import { DoctorContext } from "../context/DoctorContext"


const Login = () => {
  //admin state
  const [state , setState] = useState('Admin')
  //form state email
  const [email, setEmail] = useState('');
  //form state password
  const [password, setPassword] = useState('');
  //get  admin context
  const {  setAToken,backendUrl}=useContext(AdminContext);
 //get doctor context
 const {setDToken}=useContext(DoctorContext);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/admin-login', { email, password });

        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success(data.message);
        } 
      }else{
        const { data } = await axios.post(backendUrl + '/api/doctor/doctor-login', { email, password });

        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
          toast.success(data.message);
        }else{
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    }
};

    
  
  return (
    <form className="min-h-[80vh] flex items-center " onSubmit={handleLogin}>
     <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-xl">
     <p className="text-2xl font-semibold m-auto"><span className="text-primary">{state}</span> Login</p>
      <div className="w-full">
        <p>Email</p>
        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required className=" border border-[#DADADA] rounded w-full p-2 mt-1 outline-primary"/>
      </div>
      <div className="w-full">
        <p>Password</p>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required className=" border border-[#DADADA] rounded w-full p-2 mt-1 outline-primary"/>
      </div>
      <button className="bg-primary text-white px-4 py-2 rounded hover:scale-105 transition-all duration-300 w-full">Login</button>
      {
        state === 'Admin' ? 
        <p> Doctor Login ? <span className="text-primary cursor-pointer underline" onClick={() => setState('Doctor')}>Click here</span></p>
        :
        <p> Admin Login ? <span className="text-primary cursor-pointer underline" onClick={() => setState('Admin')}>Click here</span></p>
      }
     </div>
      </form>
  )
}

export default Login