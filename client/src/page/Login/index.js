import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useMutation } from "@apollo/react-hooks";

import { LOGIN_USER } from './Mutation';
// import Dashboard from './Dashboard';

function Login() {

    const history = useHistory();
    const [authenticateUser] = useMutation(LOGIN_USER)
    const [signIn, setSignIn] = useState({
        userName: '',
        password: ''
    })

    const submitHandler = (e) => {
        e.preventDefault()
        authenticateUser({
            variables: signIn
        })
            .then(data => {
                localStorage.setItem("token", data.data.authenticateUser.token)
                localStorage.setItem("user", data.data.authenticateUser.user.userName)
                toast.success("Login Successfully");
                history.push("/dashboard")
            })
            .catch(err => {
                toast.error(err.message);
            })
    }
    const changeHandler = (event) => {
        setSignIn({
            ...signIn,
            [event.target.name]: event.target.value,
        })
    }

    const registrationHandler = () => {
        history.push({
            pathname: "/registration",
        })
    }
    const obj = localStorage.getItem('token')
    return (
        <>
            {/* {!obj && ( */}
            <div className="container d-flex justify-content-center align-items-center align-content-center vh-100 ">
                <form className="container form-signin">
                    <center> <h1> Login </h1> </center>
                    <div className="form-group input-box">
                        <label>Username : </label>
                        <div>
                            <i className="fa fa-user-circle" aria-hidden="true"></i>
                            <input
                                type="text"
                                placeholder="Enter Username"
                                name="userName"
                                onChange={changeHandler}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group  input-box">
                        <label>Password : </label>
                        <div>
                            <i className="fa fa-lock" aria-hidden="true"></i>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                onChange={changeHandler}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group text-center">
                        <input type="checkbox" /> Remember me
                            </div>
                    <div className="form-group text-center my-3">
                        <button type="submit" className="btn btn-primary rounded-pill btn-style mx-3" onClick={submitHandler}>Submit</button>
                        <button className="btn btn-primary rounded-pill btn-style" onClick={registrationHandler}>Registration</button>
                    </div>
                    {/* <div className="form-group text-center">
                            <a href="#">Forgot password? </a>
                        </div> */}
                </form>
            </div>
            {/* )} */}
            {/* {obj && (<Dashboard />)} */}
        </>
    );
}

export default Login

