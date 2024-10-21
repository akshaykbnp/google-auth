import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Label from "../ui/label/Label";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import { ILoginFormData } from "../../interfaces/forms";
import { validateFormsInput } from "../../utils/formValidation";
import { useNavigate } from "react-router-dom";



const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const API_GOOGLE_AUTH_URL = "http://localhost:3000/";
const API_URL = import.meta.env.VITE_LOGIN_API_URL;

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<ILoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<ILoginFormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ILoginFormData, boolean>>>({
    email: false,
    password: false,
  });


  const checkInputErrors = (value: string, field: keyof ILoginFormData) => {
    const err = validateFormsInput({ ...formData, [field]: value }, "login");
    setErrors(err);
  };

  const setFormInputData = (value: string, field: keyof ILoginFormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (touched[field]) {
      checkInputErrors(value, field);
    }
  };

  const handleBlur = (field: keyof ILoginFormData) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    checkInputErrors(formData[field], field);
  };
  

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateFormsInput(formData, "login");
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(API_URL, formData);

      if (response.status === 202) {
        console.log("login successfull");
      } else {
        console.log("error occured");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData")!)
      : null
  );

  const handleLogin = async (googleData: string | undefined) => {
    //const userData = jwtDecode(googleData);
    let userData = JSON.stringify({ token: googleData });
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
    <form action="#" method="POST" className="space-y-6" onSubmit={handleFormSubmit}>
      <div>
        <Label htmlFor="email" content="Email address" />
        <div className="mt-2 relative">
          <Input
            id="email"
            name="email"
            type={"email"}
            required={true}
            onChange={(e) => setFormInputData(e.target.value, "email")}
            onBlur={() => handleBlur("email")}
          />
          {touched.email && errors.email&& <small className="text-red-500 absolute">{errors.email}</small>}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="password" content="Password" />
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
        </div>
        <div className="mt-2 relative">
          <Input
            id="password"
            name="password"
            type={"password"}
            required={true}
            onChange={(e) => setFormInputData(e.target.value, "password")}
            onBlur={() => handleBlur("password")}
          />
          {touched.password && errors.password && <small className="text-red-500 absolute">{errors.password}</small>}

        </div>
      </div>

      <div>
        <Button
          type={"submit"}
          content="Sign in"
          onClickFun={() => console.log("")}
        />
        <button type="button" className="flex w-full justify-center my-4">
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleLogin(credentialResponse.credential);
              }}
              onError={() => {
                console.log("Login Error");
              }}
            />
          </GoogleOAuthProvider>
        </button>
      </div>
    </form>
  );
};

const Login: React.FC = () => {

  const navigate = useNavigate();

  const navigateToSignUpPage = () => {
    navigate("/signup")
  }

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
            <LoginForm />
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                className="font-semibold leading-6 cursor-pointer text-indigo-600 hover:text-indigo-500"
                onClick={navigateToSignUpPage}
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
