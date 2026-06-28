import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaHeart, FaStar, FaUserEdit, FaSignOutAlt,
  FaEnvelope, FaCalendarAlt
} from "react-icons/fa";
import "../styles/Profile.css";

export default function Profile() {
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const [user,setUser]=useState(null);
  const [edit,setEdit]=useState(false);
  const [form,setForm]=useState({
    firstName:"",lastName:"",email:"",
    mobileNumber:"",gender:"",dob:""
  });

  useEffect(() => {
  const logged = JSON.parse(localStorage.getItem("user"));
  if (!logged) return;

  axios.get(`https://movie-review-backend-vlzn.onrender.com/users/${logged._id}`)
    .then(res => {
      setUser(res.data);
      setForm({
        firstName: res.data.firstName || "",
        lastName: res.data.lastName || "",
        email: res.data.email || "",
        mobileNumber: res.data.mobileNumber || "",
        gender: res.data.gender || "",
        dob: res.data.dob ? res.data.dob.substring(0,10) : ""
      });

      localStorage.setItem("user", JSON.stringify(res.data));
    });
}, [refreshKey]);
  const refreshUser = () => {
  const logged = JSON.parse(localStorage.getItem("user"));

  axios.get(`https://movie-review-backend-vlzn.onrender.com/users/${logged._id}`)
    .then(res => {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    })
    .catch(console.error);
};

  const change=e=>setForm({...form,[e.target.name]:e.target.value});

  const save=async()=>{
    try{
      const logged=JSON.parse(localStorage.getItem("user"));
      const res=await axios.put(`https://movie-review-backend-vlzn.onrender.com/users/${logged._id}`,form);
      setUser(res.data);
      localStorage.setItem("user",JSON.stringify(res.data));
      alert("Profile updated");
      setEdit(false);
    }catch(e){
      alert(e.response?.data||"Update failed");
    }
  };

  const logout=()=>{
    localStorage.removeItem("user");
    navigate("/");
  };

  if(!user) return <h2 style={{color:"white",textAlign:"center"}}>Loading...</h2>;

  return (
  <div className="profile-page">
    <div className="profile-banner"></div>
    <div className="profile-card">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="profile-avatar" alt="profile"/>
      {!edit ? <>
      <h1>{user.firstName} {user.lastName}</h1>
      <p className="profile-role">🎬 Movie Lover & Reviewer</p>
      <div className="profile-details">
        <div className="detail"><FaEnvelope/><span>{user.email}</span></div>
        <div className="detail"><FaCalendarAlt/><span>{new Date(user.createdAt).toDateString()}</span></div>
      </div>
      </>:
      <div style={{display:"grid",gap:"10px",marginTop:"20px"}}>
        <input name="firstName" value={form.firstName} onChange={change}/>
        <input name="lastName" value={form.lastName} onChange={change}/>
        <input name="email" value={form.email} onChange={change}/>
        <input name="mobileNumber" value={form.mobileNumber} onChange={change}/>
        <input type="date" name="dob" value={form.dob} onChange={change}/>
        <select name="gender" value={form.gender} onChange={change}>
          <option>Male</option><option>Female</option><option>Other</option>
        </select>
      </div>}
      <div className="profile-stats">
        <div className="stat-box"><FaHeart/><h2>0</h2><p>Favorites</p></div>
         <div className="stat-box">
  <FaStar />
  <h2>{user.reviewCount || 0}</h2>
  <p>Reviews</p>
</div>
        <div className="stat-box">🎬<h2>0</h2><p>Watched</p></div>
      </div>
      <div className="profile-buttons">
        {!edit?
        <button className="edit-btn" onClick={()=>setEdit(true)}><FaUserEdit/>Edit Profile</button>:
        <button className="edit-btn" onClick={save}>Save Profile</button>}
        <button className="logout-btn" onClick={logout}><FaSignOutAlt/>Logout</button>
      </div>
    </div>
  </div>);
}
