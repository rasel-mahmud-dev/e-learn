import React, {useState} from 'react';
import {FaFacebook} from "react-icons/fa";
import {BsGoogle} from "react-icons/bs";
import TextInput from "../components/components/TextInput.tsx";
import {api} from "../apis";
import {Link, useNavigate} from "react-router-dom";
import {useAuthState} from "../store/authState.ts";
import "../styles/svg.scss"
import LoginSvg from "../components/Svgs/LoginSVG.tsx";
import axiosError from "../utils/axiosError.ts";
import ToastService from "../services/ToastService.tsx";

const initialState = {
    email: "",
    password: ""
}

const Login = () => {

    const [state, setState] = useState(initialState)
    const {setAuth} = useAuthState()

    const navigate = useNavigate()

    function handleChange(e) {
        const {name, value} = e.target;
        setState(prev => ({...prev, [name]: value}));
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const {data, status} = await api.post("/api/v1/auth/login", {
                "email": state.email,
                "password": state.password,
            });

            if (status === 200) {
                localStorage.setItem("token", data.token)
                setAuth(data.auth)
                return navigate("/")
            }


            ToastService.openError("Operation fail. try again later.")

        } catch (ex) {
            ToastService.openError(axiosError(ex))
        }
    }

    return (
        <div className="container">
            <div className="max-w-screen-xl w-full absolute top-1/4 left-1/2 -translate-x-1/2 justify-center">
                <div
                    className="bg-white grid justify-between grid-cols-2">
                    <LoginSvg/>

                    <div className="max-w-3xl">
                        <h1 className="text-6xl font-bold mb-4 text-center">Log in to your ELearn <br/>account</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 mt-10">

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

                            <button className="btn btn-primary2 py-8 w-full">Login</button>
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
                            <p className="mt-2">Dont have an account? <Link to="/join/signup"
                                                                            className="link link-primary">Sign up
                            </Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;