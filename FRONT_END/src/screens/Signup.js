import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", location: "" });

    const Submitnow = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5200/api/CreateUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.location})
        });
        console.log(response)
        const json=await response.json();
        console.log(json);

        if(!json.success)
        {
            alert("enter valid credentails")
        }

    }

    const onchange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <div className="container bg-white">
                <form onSubmit={Submitnow}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={onchange} />
                    </div>
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
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
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
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="location"
                            name="location"
                            value={credentials.location}
                            onChange={onchange}
                        />
                    </div>

                    <button type="submit" className="m-3 btn btn-primary">
                        Submit
                    </button>

                    <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
                </form>
            </div>
        </div>
    );
}
