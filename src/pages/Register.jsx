import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Register.css";
 import axios from "axios";

function Register() {
  const navigate = useNavigate();
 const [success, setSuccess] = useState("");
 const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First Name is required";
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile Number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    return newErrors;
  };

 

const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  try {
    const res = await axios.post("https://movie-review-backend-vlzn.onrender.com/users", {
      firstName: formData.firstname,
      lastName: formData.lastname,
      email: formData.email,
      mobileNumber: formData.phone,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      gender: formData.gender,
      dob: formData.dob,
    });

    alert(res.data);

    navigate("/");
  } catch (err) {
    alert(err.response?.data || "Registration failed");
  }

  };

  return (
    <div className="register-container">
      <div className="register-box">

        <h1 className="logo">Movie Hub</h1>

        <h2>Create Your Account</h2>

        <p className="subtitle">
          Join Movie Hub and start reviewing your favourite movies.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-row">

            <div className="input-group">
              <input
                type="text"
                placeholder="Enter First Name"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
              {errors.firstname && (
                <p className="error">{errors.firstname}</p>
              )}
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Enter Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
              {errors.lastname && (
                <p className="error">{errors.lastname}</p>
              )}
            </div>

          </div>

          <div className="form-row">

            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="error">{errors.email}</p>
              )}
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Mobile Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="error">{errors.phone}</p>
              )}
            </div>

          </div>

          <div className="form-row">

           <div className="input-group">
  <div className="password-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      name="password"
      value={formData.password}
      onChange={handleChange}
    />

    <span
      className="toggle-password"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>

  {errors.password && (
    <p className="error">{errors.password}</p>
  )}
</div>

           <div className="input-group">
  <div className="password-wrapper">
    <input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm Password"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
    />

    <span
      className="toggle-password"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
    >
      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>

  {errors.confirmPassword && (
    <p className="error">{errors.confirmPassword}</p>
  )}
</div>
          </div>

          <div className="form-row">

            <div className="input-group">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && (
                <p className="error">{errors.dob}</p>
              )}
            </div>

            <div className="input-group">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="error">{errors.gender}</p>
              )}
            </div>

          </div>

          <button type="submit">
            Create Account
          </button>

          {success && (
            <p className="success-message">
              {success}
            </p>
          )}

        </form>

        <p className="bottom-text">
          Already have an account?{" "}
          <Link to="/">Sign In</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;