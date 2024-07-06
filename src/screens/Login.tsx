

import React, {useState} from 'react';
import {FaFacebook} from "react-icons/fa";
import {BsGoogle} from "react-icons/bs";
import TextInput from "../components/components/TextInput.tsx";
import {api} from "../apis";
import {Link} from "react-router-dom";

const initialState = {
    fullName: "",
    email: "",
    password: ""
}

const Login = () => {

    const [state, setState] = useState(initialState)

    function handleChange(e) {
        const {name, value} = e.target;
        setState(prev => ({...prev, [name]: value}));
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            await api.post("/users", {
                "fullName": state.fullName,
                "email": state.email,
                "password": state.password,
            });
            setState(initialState)
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <div>
            <div className="min-h-screen flex  pt-20 justify-center">
                <div
                    className="bg-white grid justify-between grid-cols-2">

                    <div className="hidden md:block w-full md:w-1/2">
                        <img src="https://via.placeholder.com/400x400" alt="Sign Up Image" className="rounded-lg"/>
                    </div>


                    <div className="">
                        <h1 className="text-6xl font-bold mb-4 text-center">Log in to your ELearn <br/>account</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 mt-20">

                            <TextInput
                                label="Email"
                                name="email"
                                value={state.email}
                                onChange={handleChange}
                            />

                            <TextInput
                                label="Password"
                                name="password"
                                value={state.password}
                                onChange={handleChange}
                            />

                            <button className="btn btn-primary2 w-full">Sign up</button>
                        </form>

                        <div className="mt-4 text-center">
                            <span className="text-gray-600">Other Sign up options</span>
                            <div className="flex justify-center mt-2">
                                <button className="btn btn-outline w-1/2 mr-2">
                                    <BsGoogle/>
                                </button>
                                <button className="btn btn-outline w-1/2">
                                    <FaFacebook/>
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-gray-600">By signing up, you agree to our
                                <a href="#"
                                   className="link link-primary">Terms
                                    of Use</a> and <a href="#" className="link link-primary">Privacy Policy</a>.</p>
                            <p className="mt-2">Dont have an account? <Link to="/join/signup" className="link link-primary">Sign up
                                </Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;