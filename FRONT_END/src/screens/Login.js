import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

export default function Login() {
  let navigate=useNavigate();
  const [credentials, setcredentials] = useState({ email: "", password: "" });

  const Submitnow = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5200/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    console.log(response);
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
     localStorage.setItem("userEmail",credentials.email)
     localStorage.setItem("authToken",json.authToken)
     console.log(localStorage.getItem("authToken"))
     alert("loggedin suceesful")
      navigate('/')
    }

  };

  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container bg-white">
        <form onSubmit={Submitnow}>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="InputEmail"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="Password1"
              name="password"
              value={credentials.password}
              onChange={onchange}
            />
          </div>

          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/CreateUser" className="m-3 btn btn-danger">
            New User
          </Link>
        </form>
      </div>
    </div>
  );
}
