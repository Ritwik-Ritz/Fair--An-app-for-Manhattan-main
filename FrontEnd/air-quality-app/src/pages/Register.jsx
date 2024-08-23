import { useState,  useRef } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import constants from "./../constant";
import axiosInstance from "../axios";
import CustomModal from "../components/custommodal";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const modalRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(userEmail)) {
      setEmailError("Invalid email address");
    } else {
      const registerData = {
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword,
      };

      axiosInstance
        .post("/auth/registerUser", registerData)
        .then((response) => {
          console.log(response);

          modalRef.current.openModal();
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 409) {
            console.log("Email is already in use!");
            alert("Email is already in use!")
          }
        });
    }
  };

  const validateEmail = (userEmail) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(userEmail);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Typography variant="h4" className="mb-3 font-bold">
        {constants.register.title}
      </Typography>
      <Typography variant="body1" className="mb-6 text-gray-500">
        {constants.register.body}
      </Typography>

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <TextField
            label="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            fullWidth
            error={emailError !== ""}
            helperText={emailError}
            required
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            fullWidth
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 w-full transition duration-300 ease-in-out"
        >
          {constants.register.btn}
        </button>
      </form>

      {/* //Maybe this can be linked to privacy tab in user dashboard  */}
      <p className="text-center mt-2">
        Learn more about our{" "}
        <Link to="/privacy" className="text-blue-500 underline">
          privacy
        </Link>{" "}
        policy here
      </p>
      <CustomModal
        ref={modalRef}
        title={constants.register.registration_modal_title}
        description={constants.register.registration_modal_text}
        IconComponent={TaskAltIcon}
        iconColor="green"
      />
    </div>
  );
};

export default Register;
