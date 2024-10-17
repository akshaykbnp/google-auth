import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios"

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
const API_GOOGLE_AUTH_URL = "";



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
        try{
            const response =  await axios.post(API_GOOGLE_AUTH_URL, userData, {
                headers: { "Content-Type": "application/json" },
            });
            setLoginData(response.data);
            localStorage.setItem("loginData", JSON.stringify(response.data));

        }catch(err){
            console.log("error", err);
        }

    };


    return (<div>
        <button type="button"><GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    handleLogin(credentialResponse.credential);
                }}
                onError={() => {
                    console.log("Login Error")
                }}
            />
        </GoogleOAuthProvider></button>
    </div>)
}

export default Login;
