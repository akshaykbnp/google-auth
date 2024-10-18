import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios"

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const API_GOOGLE_AUTH_URL = "http://localhost:3000/"




const Login: React.FC = () => {

    const [loginData, setLoginData] = useState(
        localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")!) : null
    );

    // const handelLogin = (googleData: string | undefined) => {
    //     if (!googleData) {
    //         console.error("Login failed: No credential received");
    //         return;
    //     }

    //     try {
    //         const userData = jwtDecode(googleData);
    //         console.log("userData====>", userData);
    //     } catch (error) {
    //         console.error("Error decoding JWT:", error);
    //     }
    // };

    const handleLogin = async (googleData: string | undefined) => {

        //const userData = jwtDecode(googleData);
        let userData = JSON.stringify({ token: googleData, });
        try {
            const response = await axios.post(API_GOOGLE_AUTH_URL, userData, {
                headers: { "Content-Type": "application/json" },
            });
            setLoginData(response.data);
            localStorage.setItem("loginData", JSON.stringify(response.data));

        } catch (err) {
            console.log("error", err);
        }

    };


    return (
        <div className="h-screen w-screen bg-white">
            <div className="h-full">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            alt="Your Company"
                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                            className="mx-auto h-10 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                                <button type="button" className="flex w-full justify-center my-4"><GoogleOAuthProvider clientId={CLIENT_ID}>
                                    <GoogleLogin
                                        onSuccess={(credentialResponse) => {
                                            handleLogin(credentialResponse.credential);
                                        }}
                                        onError={() => {
                                            console.log("Login Error")
                                        }}
                                    />
                                </GoogleOAuthProvider></button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
