import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useMutation } from "@apollo/react-hooks";

import { REGISTRATION_USER } from './Mutation';
import Dashboard from '../Dashboard';

const Registration = () => {
    const history = useHistory();
    const [registerUser] = useMutation(REGISTRATION_USER)
    const [signUP, setSignUP] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: ''
    })
    const submitHandler = (e) => {
        e.preventDefault()
        registerUser({
            variables: signUP
        })
            .then(data => {
                toast.success("Registration successful");
                history.push({
                    pathname: "/"
                })
            })
            .catch(err => {
                toast.error(err.message);
            })
    }
    const changeHandler = (event) => {
        setSignUP({
            ...signUP,
            [event.target.name]: event.target.value,
        })
    }
    const loginHandler = () => {
        history.push({
            pathname: "/",
        })
    }
    const obj = localStorage.getItem('token')

    return (
        <>
            {!obj && (
                <div className="container d-flex justify-content-center align-items-center align-content-center vh-100 ">
                    <div>
                        <form className="container form-signin">
                            <center> <h1> Registration </h1> </center>
                            <div className="form-group input-box">
                                <label>First Name : </label>
                                <div>
                                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                                    <input
                                        type="text"
                                        className=" "
                                        placeholder="Enter firstName"
                                        onChange={changeHandler}
                                        name="firstName"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group input-box">
                                <label>Last Name : </label>
                                <div>
                                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                                    <input
                                        type="text"
                                        className=" "
                                        placeholder="Enter lastName"
                                        name="lastName"
                                        onChange={changeHandler}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group input-box">
                                <label>User Name : </label>
                                <div>
                                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                                    <input
                                        type="text"
                                        className=" "
                                        placeholder="Enter Username"
                                        onChange={changeHandler}
                                        name="userName"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group input-box">
                                <label>Email : </label>
                                <div>
                                    <i className="fa fa-envelope"></i>
                                    <input
                                        type="text"
                                        placeholder="Enter email"
                                        name="email"
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
                                <button className="btn btn-primary rounded-pill btn-style" onClick={loginHandler}>Login</button>
                            </div>
                            {/* <div className="form-group text-center">
                                <a href="#">Forgot password? </a>
                            </div> */}
                        </form>
                    </div>
                </div>
            )}
            {obj && (<Dashboard />)}
        </>
    )
}

export default Registration
